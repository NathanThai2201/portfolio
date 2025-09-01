import gsap from "gsap";
import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import baffle from 'baffle';
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
  const [skin, setSkin] = useState(0);
  const tl = useRef(null);
  const menuRef = useRef(null);
  const menutl = gsap.timeline({paused:true});

  useEffect(() => {

    const menuEl = menuRef.current;
    const handleEnter = () => menutl.play();
    const handleLeave = () => menutl.reverse();

    menuEl.addEventListener("mouseenter", handleEnter);
    menuEl.addEventListener("mouseleave", handleLeave);

    //cleanup
    return () => {
      menuEl.removeEventListener("mouseenter", handleEnter);
      menuEl.removeEventListener("mouseleave", handleLeave);
    };
  }, []);


  useEffect(() => {
    document.title = 'RingTrainer';
  }, []);
  useEffect(() => {
    const target = baffle('.scrollText');
    target.set({
        characters: "ᛮᚸᛃᛨᛒᚭᚻᛥ",
        speed: 140
    });
    target.start();
    target.reveal(1000);
  }, []);
  useGSAP(() => {
    gsap.to('.correct_circle', {
          scale: correct_circle_scale,
          duration: 0,
          opacity: 1
    });


    menutl.add(gsap.fromTo('.TrainerMenuLine', {
      scaleX:1,
      transformOrigin: "right",
      opacity:1,
    },{
      scaleX:0,
      opacity:1,
      duration:0.2,
      ease:"linear",
    })); 
    menutl.add(gsap.fromTo('.TrainerMenuLine2', {
      scaleX:1,
      transformOrigin: "right",
      opacity:1,
    },{
      scaleX:0,
      opacity:1,
      duration:0.2,
      ease:"linear",
    }),"<"); 
    menutl.add(gsap.fromTo('.TrainerMenuLine1', {
      scaleY:1,
      opacity:1,
    },{
      scaleY:9,
      opacity:1,
      borderRadius:"20% 20%",
      duration:0.25,
      ease:"linear",
    })); 
    menutl.add(gsap.fromTo('.TrainerMenuLine1', {
      opacity:1,
    },{
      opacity:0,
      duration:0.25,
      ease:"linear",
    })); 
    menutl.add(gsap.fromTo('.TrainerMenu', {
    height: 35,
    width: 35,
    }, {
      height: 120, 
      width: 210,
      duration: 0.4,
      ease: "easein",
    }));
    menutl.add(gsap.fromTo('.difficultyOptions', {
      scale:0,
    }, {
      scale:1,
      duration: 0.4,
      ease: "easein",
    }),"<");
    menutl.add(gsap.fromTo('.skinOptions', {
      scale:0,
    }, {
      scale:1,
      duration: 0.4,
      ease: "easein",
    }),"<");
     menutl.add(gsap.fromTo('.TrainerMenuWhiteLine', {
     scaleX:0,
      opacity:1,
    },{
      scaleX:8,
      opacity:1,
      duration:0.2,
      ease:"linear",
    }));
    menutl.add(gsap.fromTo('.difficultyOptions', {
      opacity:0,
    }, {
      opacity:1,
      duration: 0.4,
      ease: "easein",
    }),"<");
    menutl.add(gsap.fromTo('.skinOptions', {
      opacity:0,
    }, {
      opacity:1,
      duration: 0.4,
      ease: "easein",
    }),"<");


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
  const handleDifficulty = (difficulty) => {
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
    if (difficulty === 3) {
      tl.current.timeScale(3.9);   // hard
      setDelay(1);
    }
  }
    const handleSkin = (skinId) => {
    setSkin(skinId);
  };
  const skins = {
    0: {
      base: "./images/rings/default_base_circle.png",
      correct: "./images/rings/default_correct_circle.png",
      moving: "./images/rings/default_moving_circle.png"
    },
    1: {
      base: "./images/rings/ecos_base_circle.png",
      correct: "./images/rings/ecos_correct_circle.png",
      moving: "./images/rings/ecos_moving_circle.png"
    }
  };
  return (
      <div className ="container3">
        <div className="navbarTrainer">
          <div className="navbarLeft">
            <Link to="/">
                  <button className="genericButtonTrainer">BACK</button>
            </Link>
          </div>
        </div>
        <section className="sectionscroll"> 
          <div className="txt1scrollTrainer">
            <div className="scrollText"> - SCROLL DOWN - </div>
          </div> 
        </section>
        <div className="navbarTrainer"></div>
        <section className="sectionTrainer"></section>
        {/* <div>hello!</div>  */}
        <div className="ring_game_block">
          <div className="ring_wrapper">
            <img className="base_circle" src={skins[skin].base} alt="base circle" />
          <img className="correct_circle" src={skins[skin].correct} alt="correct circle" />
          <img className="moving_circle" src={skins[skin].moving} alt="moving circle" />
            <input className="ringinput" type="text" ref={inputRef} onChange={handleChange}></input>
          </div>
        </div>
        <div>
          <section className = "ring_stats">
            <div className="txt1scrollTrainer">
              <p>Accuracy: <strong>{accuracy.toFixed(2)}</strong></p>
            </div>
          </section>
        </div>
        <div className="TrainerMenuWrapper">
          <div ref={menuRef} className="TrainerMenu">
            <div className="TrainerMenuLine"></div>
            <div className="TrainerMenuLine1"></div>
            <div className="TrainerMenuLine2"></div>
            <div className="TrainerMenuWhiteLine"></div>
            <div className="difficultyOptions">
              <label>DIFFICULTY: </label>
              <select className ="difficultypicker" onChange={(e) => handleDifficulty(parseInt(e.target.value))}>
                  <option value="0">EASY</option>
                  <option value="1">MEDIUM</option>
                  <option value="2">HARD</option>
                  <option value="3">INSANE</option>
              </select>
            </div>
            <div className="skinOptions">
              <label>SKIN: </label>
              <select className ="skinpicker" onChange={(e) => handleSkin(parseInt(e.target.value))}>
                  <option value="0">TRON</option>
                  <option value="1">ECOS</option>
              </select>
            </div>
          </div>
        </div>
      </div>
  )
}