import gsap from "gsap";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// prop test should be lowercase
export const ProjHeader = ({ text }) => {
    useGSAP(() => {
        gsap.from(".projheader", {
            yPercent: -700,
            ease: "steps(7)",
            duration: 1,
            scrollTrigger: {
                trigger: ".projheaderwrapper",
                start: "top 70.67%",
                end: "bottom 70.67%",
                scrub: false,
            },
            delay: 0.2,
        });
    }, {});
    
    // chars ░ ▒ ▓ █
    return (
        <div className="projheaderwrapper">
            <div className="projheader">{text}</div>
            <div className="projheader">░█▒▓█░█▒▓█▓░▒▒█▒ █▒▓</div>
            <div className="projheader">▒▓ ▒▒██░▒ █░██▒░█▒▒</div>
            <div className="projheader">▒██░▒░█░██▒▒▒█░ ▒▓█</div>
            <div className="projheader">█░▒░█▒░ ▒█▒▒██▓█▒▓█▒▓</div>
            <div className="projheader">███░▒▒▒▒█▒ █▒▒█▒ ██░</div>
            <div className="projheader">▒██▓█▒ ░▒ ██▓█░▒░█▒</div>
            <div className="projheader"></div>
        </div>
    );
};
