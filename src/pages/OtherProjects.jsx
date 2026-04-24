import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function OtherProjects() {
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
                    <div className="otherproj-title2">More and More and More... </div>
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
                                <a className="otherproj3videowrapper" href="https://nathan-thai.com/#/ringtrainer/">
                                <video className="other-proj-video" src="./videos/other-proj3.mp4" muted playsInline/>
                                </a>
                            </div>
                            <div className="otherproj4wrapper">
                            </div>
                            <div className="otherproj5wrapper">
                            </div>
                    </div>  
                </div>
            </div>
    );
}
