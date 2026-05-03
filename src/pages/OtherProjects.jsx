import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function OtherProjects() {
    const { pathname } = useLocation();
    useGSAP(() => {
        gsap.to('.otherproj-title2', {
                xPercent: -4000, 
                repeat: -1, 
                duration: 2000, 
                ease: "linear", 
            });
    }, {});
    // reset scroll
    useEffect(() => {
        window.scrollTo(0, 0); // Use { top: 0, behavior: "smooth" } for smooth scrolling
    }, [pathname]);
    //video hover
    useEffect(() => {
        const videos = document.querySelectorAll(".other-proj-video");
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
    return (
            <div className="container4">
                <div className="navbarLeft">
                    <Link to="/">
                        <button className="genericButtonTrainer">BACK</button>
                    </Link>
                </div>
                    <div className="otherproj-title">OTHER PROJECTS</div>
                    <div className="otherproj-title2">The End is Never The End is Never The End is Never The End is Never The End is Never The End
                                                        is Never The End is Never The End is Never The End is Never The End is Never The End is Never The End
                                                        is Never The End is Never The End is Never The End is Never The End is Never The End is Never The End
                                                        is Never The End is Never The End is Never The End is Never The End is Never The End is Never The End
                                                        is Never The End is Never The End is Never The End is Never The End is Never The End is Never The End
                                                        is Never The End is Never The End is Never The End is Never The End is Never The End is Never The End
                                                        is Never The End is Never The End is Never The End is Never The End is Never The End is Never The End
                                                        is Never The End is Never The End is Never The End is Never The End is Never The End is Never The End
                                                        is Never The End is Never The End is Never The End is Never The End is Never The End is Never The End
                                                        is Never The End is Never The End is Never The End is Never The End is Never The End is Never The End
                                                        is Never The End is Never The End is Never The End is Never The End is Never The End is Never The End
                                                        is Never The End is Never The End is Never The End is Never The End is Never The End is Never The End
                                                        is Never The End is Never The End is Never The End is Never The End is Never The End is Never The End
                    </div>
                <div style={{padding:'8px'}}>
                    <div className="otherprojectsmaincontainer">
                            {/* PROJECTS */}
                            <div className="otherproj1wrapper">
                                <a className="otherproj1videowrapper" href="https://nathan-thai.com/#/vexcalculator/">
                                <video className="other-proj-video" src="./videos/other-proj1.mp4" muted playsInline/>
                                </a>
                            </div>
                            <div className="otherproj2wrapper">
                                <a className="otherproj2videowrapper" href="https://nathan-thai.com/#/ringtrainer/">
                                <video className="other-proj-video" src="./videos/other-proj2.mp4" muted playsInline/>
                                </a>
                            </div>
                            <div className="otherproj3wrapper">
                                <a className="otherproj3videowrapper" href="https://coperime.itch.io/thanatosis-early-demo">
                                <video className="other-proj-video" src="./videos/other-proj3.mp4" muted playsInline/>
                                </a>
                            </div>
                            <div className="otherproj4wrapper">
                                <a className="otherproj4videowrapper" href="https://nathan-thai.com/#/watchparty/">
                                <video className="other-proj-video" src="./videos/other-proj4.mp4" muted playsInline/>
                                </a>
                            </div>
                            <div className="otherproj5wrapper">
                            </div>
                    </div>  
                </div>
            </div>
    );
}
