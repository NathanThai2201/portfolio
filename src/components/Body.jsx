import gsap from "gsap";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useGSAP } from '@gsap/react';
import StarCanvas from "./StarCanvas";
import { ProjHeader } from "./ProjHeader";
import { ProjHeader2 } from "./ProjHeader2";
import { ProjHeader3 } from "./ProjHeader3";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const Body = () => {
    //video hover
    useEffect(() => {
      const videos = document.querySelectorAll("video");
      videos.forEach((video) => {
        video.muted = true;
        video.playbackRate = 0.8;
        video.style.opacity = 0;
        function start() {
          video.currentTime = 0;
          video.play();
          video.style.opacity = 1;
        }
        function stop() {
          video.currentTime = 0;
          video.pause();
          video.style.opacity = 0;
        }
        let previewTimeout = null;
        video.addEventListener("mouseenter", () => {
          start();
          previewTimeout = setTimeout(stop, 255000);
        });
        video.addEventListener("mouseleave", () => {
          clearTimeout(previewTimeout);
          previewTimeout = null;
          stop();
        });
      });
    }, []);
    useGSAP(() => {
        gsap.from('.word3', {
          x: 30,
          opacity: 0,
          duration:0.65,
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
            ease: "elastic.out(1,0.3)",
            duration:1.5,
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
        duration: 1.2,
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
            duration:1.2,
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
            duration:1.2,
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
              }, delay: 0.6,
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
                start: "top 40.67%",
                end: "bottom 110%",
                scrub: true,
              }, delay: 0.4,
        }); 
        gsap.from(".word5", {
          opacity: 0,
          scaleX:0,
          duration:0.5,
          stagger: {
              each: 0.03,
          }, scrollTrigger: {
              trigger: ".sectionwtb",
              start: "top 25.67%",
              end: "bottom 25.67%",
              scrub: false,
            }, delay: 0,
        });
        gsap.to('.word5', {
          yPercent: 50, 
          repeat: -1, 
          duration: 1, 
          yoyo: true,
          ease: "back.inOut(1.7)", 
        });
        gsap.from(".plane2", {
          y:50,
          scrollTrigger: {
              trigger: ".sectionwtb",
              start: "top 20.67%",
              // end: "bottom 100%",
              scrub: true,
            }, delay: 0.6,
        });
        gsap.from(".plane3", {
          y:100,
          scrollTrigger: {
              trigger: ".sectionwtb",
              start: "top 20.67%",
              // end: "bottom 100%",
              scrub: true,
            }, delay: 0.6,
        });
        gsap.from(".word6", {
          y:20,
          opacity:0,
          duration:1,
          stagger: {
            each: 0.01
          },scrollTrigger: {
              trigger: ".sectionb2",
              start: "top 70.67%",
              end: "bottom 70.67%",
              scrub: false,
            }, delay: 0,
        });
        gsap.from(".button1", {
          scale:0,
          duration:0.4,
          stagger: {
            each: 0.2
          },scrollTrigger: {
              trigger: ".sectionb2",
              start: "top 70.67%",
              end: "bottom 70.67%",
              scrub: false,
            }, delay: 0.3,
        });
        gsap.from(".proj1videowrapper", {
          scale:0,
          ease: "expo.out",
          borderRadius:"400px",
          duration:2,
          scrollTrigger: {
              trigger: ".sectionb2",
              start: "top 70.67%",
              end: "bottom 70.67%",
              scrub: false,
            }, delay: 0.2,
        });
        gsap.from(".word7", {
          y:20,
          opacity:0,
          duration:1,
          stagger: {
            each: 0.01
          },scrollTrigger: {
              trigger: ".sectionb3",
              start: "top 70.67%",
              end: "bottom 70.67%",
              scrub: false,
            }, delay: 0,
        });
        gsap.from(".button2", {
          scale:0,
          duration:0.4,
          stagger: {
            each: 0.2
          },scrollTrigger: {
              trigger: ".sectionb3",
              start: "top 70.67%",
              end: "bottom 70.67%",
              scrub: false,
            }, delay: 0.3,
        });
        gsap.from(".proj2videowrapper", {
          scale:0,
          ease: "expo.out",
          borderRadius:"400px",
          duration:2,
          scrollTrigger: {
              trigger: ".sectionb3",
              start: "top 70.67%",
              end: "bottom 70.67%",
              scrub: false,
            }, delay: 0.2,
        });
        gsap.from(".word8", {
          y:20,
          opacity:0,
          duration:1,
          stagger: {
            each: 0.01
          },scrollTrigger: {
              trigger: ".sectionb4",
              start: "top 70.67%",
              end: "bottom 70.67%",
              scrub: false,
            }, delay: 0,
        });
        gsap.from(".button3", {
          scale:0,
          duration:0.4,
          stagger: {
            each: 0.2
          },scrollTrigger: {
              trigger: ".sectionb4",
              start: "top 70.67%",
              end: "bottom 70.67%",
              scrub: false,
            }, delay: 0.3,
        });
        gsap.from(".proj3videowrapper", {
          scale:0,
          ease: "expo.out",
          borderRadius:"400px",
          duration:2,
          scrollTrigger: {
              trigger: ".sectionb4",
              start: "top 70.67%",
              end: "bottom 70.67%",
              scrub: false,
            }, delay: 0.2,
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
              <StarCanvas/>
              <div className="planewrapper">
                <img className="plane1" src="./images/plane1.png" alt="hello"></img>
                <img className="plane2" src="./images/plane2.png" alt="hello"></img>
                <img className="plane3" src="./images/plane3.png" alt="hello"></img>
                <img className="w" src="./images/w.png" alt="hello"></img>
              </div>
              <div className="txtspace">
                  {
                          'Technical Projects:'.split('').map((char, index) => {
                          return (
                              <div className="word5" key={index}>
                                  {char === ' ' ? '\u00A0' : char}
                              </div>
                          );
                          })
                  }
              </div>
            </section>
            <section className="sectionb2">
              <ProjHeader text="portfolio websites"/>
              <div>
                <div className="proj1wrapper">
                  <div className="proj1content">
                    <div className="proj1text">
                      {'There is cabin in the middle of these mountains. Who knows when the blizzard will subside. It may be worth the risk for a bit of shelter.'.split(' ').map((word, index) => (
                        <div className="word6" key={index}>
                          {word + '\u00A0'}
                        </div>
                      ))}
                    </div>
                    <div className="proj1tech">
                      <div className="button1" key={1}>Three.js</div>
                      <div className="button1" key={2}>R3F</div>
                      <div className="button1" key={3}>GSAP</div>
                      <div className="button1" key={4}>React.js</div>
                      <div className="button1" key={5}>JQuery</div>
                      <div className="button1" key={5}>Javascript</div>
                    </div>
                  </div> 
                  <a className="proj1videowrapper" href="https://coperimescabin.com">
                    <video className="proj1video" src="./videos/proj1.mp4"/>
                  </a>
                </div>
              </div>
            </section>
            <section className="sectionb3">
              <ProjHeader2 text="CollatzCheckIn"/>
              <div>
                <div className="proj2wrapper">
                  <a className="proj2videowrapper" href="https://github.com/NathanThai2201/CollatzCheckIn">
                    <video className="proj2video" src="./videos/proj2.mp4"/>
                  </a>
                  <div className="proj2content">
                    <div className="proj2text">
                      {'An Android app for event organization with QR code scanning. Integrated Google authentication, Firebase database, HTTP requests to Firebase Messaging.'.split(' ').map((word, index) => (
                        <div className="word7" key={index}>
                          {word + '\u00A0'}
                        </div>
                      ))}
                    </div>
                    <div className="proj2tech">
                      <div className="button2" key={1}>Java</div>
                      <div className="button2" key={2}>Android</div>
                      <div className="button2" key={3}>Firebase</div>
                      <div className="button2" key={4}>Figma</div>
                    </div>
                  </div> 
                </div>
              </div>
            </section>
            <section className="sectionb4">
              <ProjHeader3 text="ImageBork"/>
              <div>
                <div className="proj3wrapper">
                  <div className="proj3content">
                    <div className="proj3text">
                      {'An image processing app that is able to chain different image effects and algorithms. Able to work on batch images and animations.'.split(' ').map((word, index) => (
                        <div className="word8" key={index}>
                          {word + '\u00A0'}
                        </div>
                      ))}
                    </div>
                    <div className="proj3tech">
                      <div className="button3" key={1}>Python</div>
                      <div className="button3" key={2}>Skimage</div>
                      <div className="button3" key={3}>Scipy</div>
                      <div className="button3" key={4}>Numpy</div>
                    </div>
                  </div> 
                  <a className="proj3videowrapper" href="https://github.com/NathanThai2201/ImageBork">
                    <video className="proj3video" src="./videos/proj3.mp4"/>
                  </a>
                </div>
              </div>
            </section>
            <section className="sectionicons">
                <div className="txticons">
                  <a href="https://github.com/NathanThai2201">
                    <img className="img2" src="./images/github.png" alt="hello"></img>
                  </a>
                  <a href="https://www.linkedin.com/in/nathan-thai-762537240/" >
                    <img className="img3" src="./images/linkedin.png" alt="hello"></img>
                  </a>
                  <a href= "mailto:thainhatanh2201@gmail.com">
                    <img className="img3" src="./images/gmail.png" alt="hello"></img>
                  </a>
                </div>
            </section>
        </div>
    //  </Scroll>
    )
  }
  
  