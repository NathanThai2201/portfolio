import gsap from "gsap";
import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useGSAP } from '@gsap/react';
import { Link, useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function VexCalculator() {
  const operators = ["+", "-", "×", "÷"];
  const isPercent = (char) => char === "%";

  const [justEvaluated, setJustEvaluated] = useState(false);

  const [lastOp, setLastOp] = useState(null);
  const [lastValue, setLastValue] = useState(null);

  const isOperator = (char) => operators.includes(char);

  const [expression, setExpression] = useState("");
  const [display, setDisplay] = useState("");

  const getDisplayFontSize = (text) => {
    const baseSize = 85;
    const minSize = 58;
    const threshold = 9;

    if (!text) return baseSize;

    const extraChars = Math.max(0, text.length - threshold);
    const size = baseSize - extraChars * 5;

    return Math.max(size, minSize);
  };

  const handleToggleSign = () => {
    if (!display) return;

    // Match last number OR last wrapped negative number
    const match = display.match(/(.*?)(\(-?\d+\.?\d*\)|-?\d+\.?\d*)$/);

    if (!match) return;

    const [, left, value] = match;

    let toggled;

    // If already wrapped like (-5) → unwrap
    if (value.startsWith("(-") && value.endsWith(")")) {
      toggled = value.slice(2, -1); // remove (- )
    }
    // If negative without parentheses → unwrap
    else if (value.startsWith("-")) {
      toggled = value.slice(1);
    }
    // Otherwise wrap positive
    else {
      toggled = `(-${value})`;
    }

    setDisplay(left + toggled);
  };

  const handleDigit = (value) => {
    setDisplay((prev) => {
      const lastChar = prev.slice(-1);

      // prevent starting with operator (except minus)
      if (prev === "" && isOperator(value) && value !== "-") {
        return prev;
      }

      // After equals → number starts new calculation
      if (justEvaluated && !isOperator(value)) {
        setJustEvaluated(false);
        return value;
      }

      // After equals → operator continues calculation
      if (justEvaluated && isOperator(value)) {
        setJustEvaluated(false);
        return prev + value;
      }

      // Replace operator with operator
      if (isOperator(lastChar) && isOperator(value)) {
        return prev.slice(0, -1) + value;
      }

      return prev + value;
    });
  };

  const handlePercent = () => {
    if (!display) return;

    // Match last number OR parenthesized number at the end
    const match = display.match(
      /(.*?)(\(-?\d+\.?\d*\)|-?\d+\.?\d*)$/
    );

    if (!match) return;

    const [, left, value] = match;

    // Prevent double %
    if (value.endsWith("%")) return;

    const wrapped = `(${value})%`;

    setDisplay(left + wrapped);
  };

  const transformIOSPercent = (expr) => {
    let result = expr;

    // Handle A + (B)%  and A - (B)%
    result = result.replace(
      /(\d+\.?\d*|\([^)]+\))\s*([+\-])\s*\(([^)]+)\)%/g,
      (_, base, op, percent) =>
        `${base}${op}(${base}*(${percent})/100)`
    );

    // Handle A × (B)%  and A ÷ (B)%
    result = result.replace(
      /(\d+\.?\d*|\([^)]+\))\s*([×÷])\s*\(([^)]+)\)%/g,
      (_, base, op, percent) =>
        op === "×"
          ? `${base}*((${percent})/100)`
          : `${base}/((${percent})/100)`
    );

    // Handle standalone (B)%
    result = result.replace(
      /\(([^)]+)\)%/g,
      "($1/100)"
    );

    return result;
  };

  const handleEquals = () => {
    if (!display) return;
    // If display is just a number (no operators or %), do nothing
    const isPlainNumber = /^\(?-?\d+(\.\d+)?\)?$/.test(display);

    if (isPlainNumber && !justEvaluated) {
      return;
    }

    // ===== vexcalc secret output =====
    // Check if user multiplied by 69420
    if (display.match(/×69420$/)) {
      setExpression(display);
      setDisplay("972864627325e20");
      setJustEvaluated(true);
      return;
    }

    // iOS behavior: number % anotherNumber → number
    const percentBinaryMatch = display.match(
      /^(\([^)]+\)|-?\d+\.?\d*)\s*%\s*(\([^)]+\)|-?\d+\.?\d*)$/
    );

    if (percentBinaryMatch) {
      setExpression(display);

      // Strip outer parentheses ONLY for display result
      let result = percentBinaryMatch[1];
      if (result.startsWith("(") && result.endsWith(")")) {
        result = result.slice(1, -1);
      }

      setDisplay(result);
      setJustEvaluated(true);
      return;
    }

    const lastChar = display.slice(-1);

    // Repeat equals logic
    if (justEvaluated && lastOp && lastValue !== null) {
      try {
        const repeatedExpression = `${display} ${lastOp} ${lastValue}`;
        setExpression(repeatedExpression); // 🔥 update calccontainer1

        const percentFixed = transformIOSPercent(repeatedExpression);

        const jsExpr = percentFixed
          .replace(/×/g, "*")
          .replace(/÷/g, "/");


        const result = Function(`return ${jsExpr}`)();

        if (!isFinite(result)) {
          setDisplay("Error");
          return;
        }

        const rounded =
          Math.round((result + Number.EPSILON) * 1e8) / 1e8;

        setDisplay(rounded.toString());
        return;
      } catch {
        setDisplay("Error");
        return;
      }
    }


    // Do nothing if last input is operator
    if (isOperator(lastChar)) return;

    try {
      setExpression(display);

      // extract last operation
      const match = display.match(/(.+?)([+\-×÷])(\(-?\d+\.?\d*\)|-?\d+\.?\d*)$/);
      if (match) {
        setLastOp(match[2]);
        setLastValue(match[3]); // keep parentheses intact 
      }


      const percentFixed = transformIOSPercent(display);

      const jsExpression = percentFixed
        .replace(/×/g, "*")
        .replace(/÷/g, "/");


      const result = Function(`return ${jsExpression}`)();

      if (!isFinite(result)) {
        setDisplay("Error");
        return;
      }

      const rounded =
        Math.round((result + Number.EPSILON) * 1e8) / 1e8;

      setDisplay(rounded.toString());
      setJustEvaluated(true);
    } catch {
      setDisplay("Error");
    }
  };

  const handleClear = () => {
    const isZero = display === "" || display === "0";

    // AC behavior
    if (justEvaluated || isZero) {
      setLastOp(null);
      setLastValue(null);

      setDisplay("");
      setExpression("");
      setJustEvaluated(false);
      return;
    }

    // C behavior
    setDisplay((prev) => {
      const next = prev.slice(0, -1);
      return next === "" ? "" : next;
    });
  };



  useEffect(() => {
    document.title = 'VexCalculator';
  }, []);
  useGSAP(() => {
    document.querySelectorAll(".button-flash").forEach((btn) => {
      const flash = btn.querySelector(".flash");

      const press = () => {
        gsap.killTweensOf(flash);
        gsap.set(flash, { opacity: 0.4 });
      };

      const release = () => {
        gsap.to(flash, {
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
        });
      };

      btn.addEventListener("pointerdown", press);
      btn.addEventListener("pointerup", release);
      btn.addEventListener("pointerleave", release);
      btn.addEventListener("pointercancel", release);
    });
  }, []);



  return (
      <div className ="calccontainer">
        <div className="calcmenucontainer">
          <img className="calcmenuimage" src="./images/calculator/menu.png" alt="hello" ></img>
        </div>
        <div className="calcmenucontainer"></div>
        <div className="calcmenucontainer"></div>



        <div className="calccontainer1">
          <div>{expression}</div>
        </div>

        <div className="calccontainer2" style={{ fontSize: `${getDisplayFontSize(display || "0")}px` }}
        >
          <div>{display || "0"}</div>
        </div>




        <div className = "calccontainer3">
          <div className="calc-row">
            <button className="greycalcbuttons button-flash" onClick={handleClear}>
              <span className="flash"></span>
              <img
                  className="calcimage"
                  src={
                    justEvaluated || display === "" || display === "0"
                      ? "./images/calculator/ac.png"
                      : "./images/calculator/back.png"
                  }
                  alt="clear"
                />

            </button>

            <button className="greycalcbuttons button-flash" onClick={handleToggleSign}>
              <span className="flash"></span>
              <img className="calcimage" src="./images/calculator/switch.png" alt="hello" ></img>
            </button>
            <button className="greycalcbuttons button-flash" onClick={handlePercent}>
              <span className="flash"></span>
              <img className="calcimage" src="./images/calculator/percent.png" alt="hello" ></img>
            </button>
            <button className="orangecalcbuttons button-flash" onClick={() => handleDigit("÷")}> 
              <span className="flash"></span>
              <img className="calcimage" src="./images/calculator/divide.png" alt="hello" ></img>
            </button>
          </div>
          <div className="calc-row">
            <button className="darkgreycalcbuttons button-flash" onClick={() => handleDigit("7")}>
              <span className="flash"></span>
              7
            </button>
            <button className = "darkgreycalcbuttons button-flash" onClick={() => handleDigit("8")}>
              <span className="flash"></span>
              8
              </button>
            <button className = "darkgreycalcbuttons button-flash" onClick={() => handleDigit("9")}>
              <span className="flash"></span>
              9
              </button>
            <button className = "orangecalcbuttons button-flash" onClick={() => handleDigit("×")}>
              <span className="flash"></span>
              <img className="calcimage" src="./images/calculator/times.png" alt="hello" ></img>
            </button>
          </div>
          <div className="calc-row">
            <button className = "darkgreycalcbuttons button-flash" onClick={() => handleDigit("4")}>
              <span className="flash"></span>
              4
              </button>
            <button className = "darkgreycalcbuttons button-flash" onClick={() => handleDigit("5")}>
              <span className="flash"></span>
              5
              </button>
            <button className = "darkgreycalcbuttons button-flash" onClick={() => handleDigit("6")}>
              <span className="flash"></span>
              6
              </button>
            <button className = "orangecalcbuttons button-flash" onClick={() => handleDigit("-")}>
              <span className="flash"></span>
              <img className="calcimage" src="./images/calculator/minus.png" alt="hello" ></img>
            </button>
          </div>
          <div className="calc-row">
            <button className = "darkgreycalcbuttons button-flash" onClick={() => handleDigit("1")}>
              <span className="flash"></span>
              1
              </button>
            <button className = "darkgreycalcbuttons button-flash" onClick={() => handleDigit("2")}>
              <span className="flash"></span>
              2
              </button>
            <button className = "darkgreycalcbuttons button-flash" onClick={() => handleDigit("3")}>
              <span className="flash"></span>
              3
              </button>
            <button className = "orangecalcbuttons button-flash" onClick={() => handleDigit("+")}>
              <span className="flash"></span>
              <img className="calcimage" src="./images/calculator/plus.png" alt="hello" ></img>
            </button>
          </div>
          <div className="calc-row">
            <button className = "darkgreycalcbuttons button-flash">
              <span className="flash"></span>
              <img className="calcimage" src="./images/calculator/calc.png" alt="hello" ></img>
            </button>
            <button className = "darkgreycalcbuttons button-flash" onClick={() => handleDigit("0")}>
              <span className="flash"></span>
              0
              </button>
            <button className = "darkgreycalcbuttons button-flash" onClick={() => handleDigit(".")}>
              <span className="flash"></span>
              .
              </button>
            <button className = "orangecalcbuttons button-flash"  onClick={handleEquals}>
              <span className="flash"></span>
              <img className="calcimage" src="./images/calculator/equals.png" alt="hello" ></img>
            </button>
          </div>
        </div>
      </div>
  )
}