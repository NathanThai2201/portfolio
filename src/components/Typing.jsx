import React, { useEffect, useRef, useState } from "react";

export const Typing = ({onComplete, onWPMChange}) => {

    const maxTime = 60;
    const [timeLeft, setTimeLeft] = useState(maxTime);
    const [charIndex, setcharIndex] = useState(0);
    const [isTyping ,setIsTyping] = useState(false);
    const [WPM, setWPM] = useState(0);
    const inputRef = useRef(null);
    const charRefs = useRef([]);
    const [correctWrong,setCorrectWrong] = useState([]);
    const [mistakes, setMistakes] = useState(0);
    const [paragraphs, setParagraphs] = useState([]);
    const [paragraph, setParagraph] = useState(paragraphs[0]?.text || '');

    useEffect(() => {
        fetch("https://dashboredjsapi.onrender.com/api/typingtexts")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            // console.log("API Response:", data);
            const fetchedParagraphs = Array.isArray(data.data) ? data.data : [];
                setParagraphs(fetchedParagraphs);
                if (fetchedParagraphs.length > 0) {
                    const randomParagraph = fetchedParagraphs[Math.floor(Math.random() * fetchedParagraphs.length)];
                    setParagraph(randomParagraph.text);
                    charRefs.current = [];
                }
        })
        .catch((error) => console.error("Error fetching typing texts:", error));
    }, []);  

    useEffect(() => {
        inputRef.current.focus();
        setCorrectWrong(Array(charRefs.current.length).fill(''))
    },[])

    useEffect(() => {
        let interval;
        if(isTyping && timeLeft > 0) {
            interval = setInterval(()=>{

                setTimeLeft(timeLeft - 1);
                let correctChars = charIndex - mistakes;
                let totalTime = maxTime - timeLeft;
                
                let wpm = Math.round((correctChars/5/totalTime)*60);
                wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
                setWPM(wpm);

            }, 1000);

        } else if (timeLeft === 0) {
            clearInterval(interval);
            setIsTyping(false);
            resetGame(0);
        }
        return () => {
            clearInterval(interval);

        };
    },[isTyping,timeLeft])

    const resetGame = (finished) => {
        setIsTyping(false);
        setTimeLeft(maxTime);
        setcharIndex(0);
        setWPM(0);
        setMistakes(0);
        setCorrectWrong(Array(charRefs.current.length).fill(''));
        inputRef.current.value = "";
        inputRef.current.focus();
        const randomParagraph = paragraphs[Math.floor(Math.random() * paragraphs.length)];
        if (randomParagraph) {
            setParagraph(randomParagraph.text);
        }    

        charRefs.current = [];

        if (finished == 1) {
            // console.log("finished");
            handleGameFinish();
        }
    }
    const handleChange = (e) => {
        const characters = charRefs.current;
        let currentChar = charRefs.current[charIndex];
        let typedChar = e.target.value.slice(-1);
    
        if (charIndex < characters.length && timeLeft > 0) {
            if (!isTyping) {
                setIsTyping(true);
            }
    
            const newCorrectWrong = [...correctWrong];
    
            if (typedChar === currentChar.textContent) {
                setcharIndex(charIndex + 1);
                newCorrectWrong[charIndex] = " correct ";
            } else {
                setMistakes(mistakes + 1);
                newCorrectWrong[charIndex] = " wrong ";
            }
    
            setCorrectWrong(newCorrectWrong);
    
            if (charIndex >= characters.length - 1) {
                setIsTyping(false);
                resetGame(1);
            }
        } else {
            setIsTyping(false);
            resetGame(0);
        }
    }

    // handle sending data upstream
    const handleGameFinish = () => {
        if (onComplete) onComplete();
    };
    useEffect(() => {
        if (onWPMChange) {
            onWPMChange(WPM);
        }
    }, [WPM, onWPMChange]);
    
    return(
        <div>
             <section className="sectionDashboredTypingBlock">
                <div className="txt1">
                    <div className="horizontalTextMap">
                        {' - TYPING STATION - '.split('').map((char, index) => (
                            <div className="word3" key={index}>
                                {char === ' ' ? '\u00A0' : char}
                            </div>
                        ))}
                    </div>
                </div>
                <hr></hr>
            </section>
            <div className = 'typingcontainer'>
            <div className="test">
            {
            paragraph.split("").map((char, index) => (
                <span 
                    key={index} 
                    className={`char ${index === charIndex ? "active" : ""} ${correctWrong[index]}`} 
                    ref={(el) => { if (el) charRefs.current[index] = el; }}
                >
                    {char}
                </span>
            ))}
            </div>
            <div className="stats">
                <p>Time Left: <strong>
                    {Math.floor(timeLeft / 60)
                    .toString()
                    .padStart(1, "0")}
                    :
                    {(timeLeft % 60)
                    .toString()
                    .padStart(2, "0")}
                    </strong></p>
                <p>WPM: <strong>{WPM}</strong></p>
                {/* <button className="typingResetButton" onClick={resetGame}>Try Again</button> */}
            </div>
            <input className="typinginput" type="text" ref={inputRef} onChange={handleChange}></input>

        </div>
        </div>
       
    )
}