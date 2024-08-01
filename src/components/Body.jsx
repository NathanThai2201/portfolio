import gsap from "gsap";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const Body = () => {
    useGSAP(() => {
        gsap.from('.word3', {
          x: 30,
          opacity: 0,
          stagger: {
              each: 0.1,
          },scrollTrigger: {
            trigger: ".sectionwMainTitle1",
            start: "top 80.67%",
            end: "bottom 80.67%",
            scrub: false,
          },delay: 0,     
        });
        gsap.from('.img1', {
            scale: 0,
          //   rotation:-90,
            scrollTrigger: {
              trigger: ".sectionwMainTitle1",
              start: "top 80.67%",
              end: "bottom 80.67%",
              scrub: false,
            },delay: 0.4,     
          });
        gsap.from('.word4', {
        y: 20,
        opacity: 0,
        duration: 0.65,
        scrollTrigger: {
            trigger: ".sectionwMainTitle2",
            start: "top 80.67%",
            end: "bottom 80.67%",
            scrub: false,
        },delay: 0.3,     
        });
        gsap.from('.img2', {
            opacity: 0,
            scaleX: -0.5,
            scrollTrigger: {
              trigger: ".sectionwMainTitle2",
              start: "top 80.67%",
              end: "bottom 80.67%",
              scrub: false,
            },delay: 0.3,     
        });
        gsap.from('.img3', {
            scaleX: -0.5,
            opacity: 0,
            scrollTrigger: {
              trigger: ".sectionwMainTitle2",
              start: "top 80.67%",
              end: "bottom 80.67%",
              scrub: false,
            },delay: 0.3,     
        });
        gsap.to(".sectionb", {
            backgroundColor: "#10398B",
            duration: 2,
            scrollTrigger: {
                trigger: ".sectionwMainTitle2",
                start: "top 80.67%",
                end: "bottom 30%",
                scrub: false,
              }, delay: 0.4,
            // repeat: -1,
            // yoyo: true,
            // ease: "linear"
        });
        gsap.to('.txtScrub1', {
            xPercent: -4000, 
            repeat: -1, 
            duration: 2000, 
            ease: "linear", 
        });
        gsap.to(".w", {
            opacity:0,
            scrollTrigger: {
                trigger: ".sectionwtb",
                start: "top 30.67%",
                end: "bottom 100%",
                scrub: true,
              }, delay: 0.4,
        });
        gsap.from(".plane1", {
          y:50,
          scrollTrigger: {
              trigger: ".sectionwtb",
              start: "top 30.67%",
              // end: "bottom 100%",
              scrub: true,
            }, delay: 0.6,
        });
        gsap.from(".plane2", {
          y:200,
          scrollTrigger: {
              trigger: ".sectionwtb",
              start: "top 30.67%",
              // end: "bottom 100%",
              scrub: true,
            }, delay: 0.6,
        });
        gsap.from(".plane3", {
          y:400,
          scrollTrigger: {
              trigger: ".sectionwtb",
              start: "top 30.67%",
              // end: "bottom 100%",
              scrub: true,
            }, delay: 0.6,
        });
    }, {});
    return (
    //  <Scroll html>
        <div>
            <section className="sectionwMainTitle1">
                <hr/>
                <div className="txtMainTitle1">
                {
                        'Hi.'.split('').map((char, index) => {
                        return (
                            <div className="word3" key={index}>
                                {char === ' ' ? '\u00A0' : char}
                            </div>
                        );
                        })
                }
                <img className="img1" src="./images/hand.gif" alt="hello"></img>
                </div>
            </section>
            <section className="sectionwMainTitle2">
                <div className="txtMainTitle2">
                    <img className="img2" src="./images/glyph.png" alt="hello"></img>
                    <div className="word4">I'm Nathan</div>
                    <img className="img3" src="./images/glyph2.png" alt="hello"></img>
                </div>
                <hr/>
            </section>
            <section className="sectionb">
                <div className="txtScrub1"> WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! 
                                            WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! 
                                            WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! 
                                            WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! 
                                            WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! 
                                            WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! 
                                            WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! 
                                            WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! 
                                            WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! 
                                            WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! 
                                            WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! 
                                            WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! 
                                            WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! WELCOME! 
                </div>
            </section>
            <section className="sectionwtb">
              <img className="plane1" src="./images/plane1.png" alt="hello"></img>
              <img className="plane2" src="./images/plane2.png" alt="hello"></img>
              <img className="plane3" src="./images/plane3.png" alt="hello"></img>
              <img className="w" src="./images/w.png" alt="hello"></img>
            </section>
            <section className="sectionb2"></section>
            <section className="sectionicons">
                <div className="txticons">
                  <a href="https://github.com/NathanThai2201" class="link1">
                    <img className="img2" src="./images/github.png" alt="hello"></img>
                  </a>
                  <a href="https://www.linkedin.com/in/nathan-thai-762537240/" class="link1">
                    <img className="img3" src="./images/linkedin.png" alt="hello"></img>
                  </a>
                  <a href= "mailto:thainhatanh2201@gmail.com" class="link1" >
                    <img className="img3" src="./images/gmail.png" alt="hello"></img>
                  </a>
                </div>
            </section>
        </div>
    //  </Scroll>
    )
  }
  