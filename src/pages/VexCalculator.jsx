import gsap from "gsap";
import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useGSAP } from '@gsap/react';
import { Link, useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function VexCalculator() {

  useEffect(() => {
    document.title = 'VexCalculator';
  }, []);
  return (
      <div className ="calccontainer">
        <div className="calcmenucontainer"></div>
        <div className="calcmenucontainer">
          <img className="calcmenuimage" src="./images/calculator/menu.png" alt="hello" ></img>
        </div>
        <div className="calcmenucontainer"></div>
        <div className="calcmenucontainer"></div>


        
        <div className = "calccontainer1">
          <div>yo123</div>
        </div>
        <div className = "calccontainer2">
          <div>yo123</div>
        </div>


        <div className = "calccontainer3">
          <div className="calc-row">
            <button className="greycalcbuttons">
              <img className="calcimage" src="./images/calculator/ac.png" alt="hello" ></img>
            </button>
            <button className="greycalcbuttons">
              <img className="calcimage" src="./images/calculator/switch.png" alt="hello" ></img>
            </button>
            <button className="greycalcbuttons">
              <img className="calcimage" src="./images/calculator/percent.png" alt="hello" ></img>
            </button>
            <button className="orangecalcbuttons">
              <img className="calcimage" src="./images/calculator/divide.png" alt="hello" ></img>
            </button>
          </div>
          <div className="calc-row">
            <button className = "darkgreycalcbuttons">7</button>
            <button className = "darkgreycalcbuttons">8</button>
            <button className = "darkgreycalcbuttons">9</button>
            <button className = "orangecalcbuttons">
              <img className="calcimage" src="./images/calculator/times.png" alt="hello" ></img>
            </button>
          </div>
          <div className="calc-row">
            <button className = "darkgreycalcbuttons">4</button>
            <button className = "darkgreycalcbuttons">5</button>
            <button className = "darkgreycalcbuttons">6</button>
            <button className = "orangecalcbuttons">
              <img className="calcimage" src="./images/calculator/minus.png" alt="hello" ></img>
            </button>
          </div>
          <div className="calc-row">
            <button className = "darkgreycalcbuttons">1</button>
            <button className = "darkgreycalcbuttons">2</button>
            <button className = "darkgreycalcbuttons">3</button>
            <button className = "orangecalcbuttons">
              <img className="calcimage" src="./images/calculator/plus.png" alt="hello" ></img>
            </button>
          </div>
          <div className="calc-row">
            <button className = "darkgreycalcbuttons">
              <img className="calcimage" src="./images/calculator/calc.png" alt="hello" ></img>
            </button>
            <button className = "darkgreycalcbuttons">0</button>
            <button className = "darkgreycalcbuttons">.</button>
            <button className = "orangecalcbuttons">
              <img className="calcimage" src="./images/calculator/equals.png" alt="hello" ></img>
            </button>
          </div>
        </div>
      </div>
  )
}