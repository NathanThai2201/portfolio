import gsap from "gsap";
import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useGSAP } from '@gsap/react';
import { Link, useNavigate } from "react-router-dom";


gsap.registerPlugin(ScrollTrigger, useGSAP);

export function RingTrainer() {
  const inputRef = useRef(null);
  const [accuracy, setAccuracy] = useState(0);
  const [correct_circle_scale,set_correct_circle_scale] = useState(0.5);
  const [ring_finished, set_ring_finished] = useState(false);
  const [speed, setSpeed] = useState(0.5);
  const [delay, setDelay] = useState(1.0);
  const tl = useRef(null);

  useGSAP(() => {
    gsap.to('.correct_circle', {
          scale: correct_circle_scale,
          duration: 0,
          opacity: 1
    });
    tl.current = gsap.timeline({ repeat: -1});
    tl.current.timeScale(2.2); 
    tl.current.add(gsap.fromTo('.moving_circle', {
        scale:1,
        opacity:1,
      },{
        scale:0.5,
        opacity:1,
        duration:speed,
        ease:"linear",
      })); 
      tl.current.add(gsap.fromTo('.moving_circle', {
        scale:0.5,
        opacity:1,
      },{
        scale:0,
        opacity:0,
        duration:speed,
        ease:"linear",
      })); 
      //pause
      tl.current.add(gsap.fromTo('.moving_circle', {
      },{
        duration:speed,
        ease:"linear",
      })); 
      }, {});
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  const handleChange = () => {
    if (!ring_finished){
      console.log("button detected");

      const moving_circle_scale = gsap.getProperty(".moving_circle", "scale");
      console.log("correct:",correct_circle_scale," moving:",moving_circle_scale);

      // adaptive accuracy measurement
      setAccuracy((accuracy + 1-Math.abs(correct_circle_scale-moving_circle_scale))/2);
      console.log("accuracy:", accuracy);

      // reset for next ring
      tl.current.pause();
      set_ring_finished(true);
      //skip to the start of the loop by setting 10
      gsap.delayedCall((delay), () => { 
        tl.current.restart();
        const newScale = getRandomArbitrary(0.3,0.7);
        set_correct_circle_scale(newScale);
        // setSpeed(0.1);
        gsap.to(".correct_circle", { scale: newScale, duration: 0 }); // directly overwrite
        set_ring_finished(false);
      });
  }};
  const handleClick = (difficulty) => {
    if (difficulty === 0) {
    tl.current.timeScale(2.2); // easy
    setDelay(0.7);
    }
    if (difficulty === 1) {
      tl.current.timeScale(2.7);   // medium
      setDelay(1);
    }
    if (difficulty === 2) {
      tl.current.timeScale(3.2);   // hard
      setDelay(1);
    }
  }
  return (
      <div className ="container2">
        <div className="navbar">
          <div className="navbarLeft">
            <Link to="/">
                  <button className="genericButton">BACK</button>
            </Link>
          </div>
          <div className="navbarRight">
          </div>
        </div>
        <section className="sectionDashboredwtb"></section>
        {/* <div>hello!</div>  */}
        <div className="ring_game_block">
          <div className="ring_wrapper">
            <img className="correct_circle" src="./images/rings/ecos_correct_circle.png" alt="hello"></img>
            <img className="moving_circle" src="./images/rings/ecos_moving_circle.png" alt="hello"></img>
            <input className="ringinput" type="text" ref={inputRef} onChange={handleChange}></input>
          </div>
        </div>
        <div>
          <section className = "ring_stats">
            <div className="txt1scroll">
              <p>Accuracy: <strong>{accuracy.toFixed(2)}</strong></p>
            </div>
          </section>
          <button className="genericButton" onClick={() => handleClick(0)}>EASY</button>
            <button className="genericButton" onClick={() => handleClick(1)}>MEDIUM</button>
            <button className="genericButton" onClick={() => handleClick(2)}>HARD</button>
        </div>
      </div>
  )
}