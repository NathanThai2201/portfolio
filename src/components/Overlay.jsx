import { Scroll, ScrollControls, useScroll } from "@react-three/drei";
import gsap from "gsap";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useGSAP } from '@gsap/react';
import baffle from 'baffle'

gsap.registerPlugin(ScrollTrigger, useGSAP);
  
export const Overlay = () => {
    const isMobile = useRef(window.innerWidth <= 768);
    //const scroll = useScroll();
    //   const tl1 = useRef();
    //   useFrame(() => {
    //     tl1.current.seek(scroll.offset * tl1.current.duration());
    //   });
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    useEffect(() => {
        const target= baffle('.scrollText')
        target.set({
            characters: "░▒▓█",
            speed: 140
        })
        target.start()
        target.reveal(3500)
    })
    useGSAP(() => {
        gsap.from('.word2', {
          y: 0,
          opacity: 0,
          stagger: {
              each: 0.01,
              from: "random"
          },scrollTrigger: {
            trigger: ".sectionwheader",
            start: "top 80.67%",
            end: "bottom 80.67%",
            scrub: false,
          },     
        });
        gsap.to('.sectioncover1', {
            scaleY:0,
            transformOrigin:"top",
            duration:2,
            ease: "expo.out",
            opacity:1,
            delay:0.5,
        });
        gsap.to('.sectioncover2', {
            scaleY:0,
            transformOrigin:"bottom",
            duration:2,
            ease: "expo.out",
            opacity:1,
            delay:0.5,
        });
        gsap.fromTo('.sectioncover3',{}, {
            scaleX:0,
            rotation:0,
            transformOrigin:"left",
            duration:2,
            ease: "expo.out",
            opacity:1,
            delay:0.5,
        });
        gsap.fromTo('.sectioncover4',{}, {
            scaleX:0,
            transformOrigin:"right",
            duration:2,
            ease: "expo.out",
            opacity:1,
            delay:0.5,
        });
    }, {});
  
    const getTextContent = () => {
        if (isMobile.current) {
          return ' - SOFTWARE DEVELOPMENT - '.split('');
        }
        return ' - SOFTWARE DEVELOPMENT - GRAPHIC DESIGN - ANIMATION - '.split('');
      };
    
      return (
        <div>
          <section className="sectionscroll">
            <div className="txt1scroll">
              <div className="scrollText"> - SCROLL DOWN - </div>
            </div>
          </section>
          <section className="sectioncover1" />
          <section className="sectioncover2" />
          <section className="sectioncover3" />
          <section className="sectioncover4" />
          <section className="sectionwheader">
            <div className="txt1">
              <div className="horizontalTextMap">
                {getTextContent().map((char, index) => (
                  <div className="word2" key={index}>
                    {char === ' ' ? '\u00A0' : char}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      );
    };