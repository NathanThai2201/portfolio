import gsap from "gsap";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// prop test should be lowercase
export const ProjHeader = ({ text }) => {
    const chars = ['ᛮᚸ', 'ᛃᛨ', 'ᛒᚭ', 'ᚻᛥ'];
    const mixchar = () => chars[Math.floor(Math.random() * chars.length)];
    const mix1 = (text) => {
        return text.replace(/[ace]/gi, () => mixchar());
    };

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".projheaderwrapper",
                start: "top 70.67%",
                end: "bottom 70.67%",
                scrub: false,
            }
        });

        tl.from(".projheader", {
            yPercent: -600,
            ease: "steps(6)",
            duration: 0.6,
            delay: 0.2,
        }).to('.projheader', {
            yPercent: -100, 
            repeat: -1, 
            duration: 0.5, 
            yoyo: true,
            ease: "steps(1)", 
        });
    }, {});
    
    // chars ░ ▒ ▓ █
    const text1 = mix1(text);

    return (
        <div className="projheaderwrapper">
            <div className="projheader">{text} █</div>
            <div className="projheader">{text}</div>
            <div className="projheader">{text1}</div>
            <div className="projheader">ᛮᛒᚭᚻᛃᛨᛥᚸᛃᛨᛒᚭᚻᛥ</div>
            <div className="projheader">ᛃᛨᛮᚸᛃᛨᛒᚭᚻᛨᛥᛥᚸᛃ</div>
            <div className="projheader">ᛁᚲᛖ x ᚨᚾᛞ x ᛊᚾᛟᚹ</div>
            <div className="projheader"></div>
        </div>
    );
};
