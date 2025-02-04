import gsap from "gsap";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useGSAP } from '@gsap/react';

export const DashBoredCards = () => {
    useGSAP(() => {
    gsap.from('.word3', {
      y: 0,
      opacity: 0,
      stagger: {
          each: 0.01,
          from: "random"
      },
      scrollTrigger: {
          trigger: ".sectionDashboredCardBlock",
          start: "top 80.67%",
          end: "bottom 80.67%",
          scrub: false,
      },
  });}, []);
    return (
        <div>
            <section className="sectionDashboredCardBlock">   
            <div className="txt1">
              <div className="horizontalTextMap">
                {' - YOUR CARDS - '.split('').map((char, index) => (
                  <div className="word3" key={index}>
                      {char === ' ' ? '\u00A0' : char}
                  </div>
                ))}
              </div>
            </div>
            <hr></hr>
            
            </section>
        </div>
    )
  }
  
  