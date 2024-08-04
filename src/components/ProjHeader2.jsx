import gsap from "gsap";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// prop test should be lowercase
export const ProjHeader2 = ({ text }) => {
    const chars = ['ᛮ','ᚸ', 'ᛃ','ᛨ', 'ᛒ','ᚭ', 'ᚻ','ᛥ'];
    const mixchar = () => chars[Math.floor(Math.random() * chars.length)];
    const mix1 = (text) => {
        return text.replace(/[acegikmoqsuwyå]/gi, () => mixchar());
    };

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".projheaderwrapper2",
                start: "top 70.67%",
                end: "bottom 70.67%",
                scrub: false,
            }
        });

        tl.from(".projheader2", {
            yPercent: -700,
            ease: "steps(7)",
            duration: 0.6,
            delay: 0.2,
        }).to('.projheader2', {
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
        <div className="projheaderwrapper2">
            <div className="projheader2">{text} █</div>
            <div className="projheader2">{text}</div>
            <div className="projheader2">{text1}█</div>
            <div className="projheader2">ᛮᚻᛒᚭᚻᛃᚷᛟᛨᛥᚸᛃᚷᚺᛖᛟ█</div>
            <div className="projheader2">ᛃᛨᛥᛮᚭᚻᛃᛥᛃᚷᛟᚻᛃᛨᛥᛒᚭ█</div>
            <div className="projheader2">ᛚᛟᚷᛟᛊ ᚹᚨᛊ ᚺᛖᚱᛖᚻᛨᛥᚸ█</div>
            <div className="projheader2">ᛟᛮᛒᛥᚸᛟ ᚺᛖᚱᚻᚹᚨᚭᚻᚭᚻᛊ█</div>
            <div className="projheader2"></div>
        </div>
    );
};
