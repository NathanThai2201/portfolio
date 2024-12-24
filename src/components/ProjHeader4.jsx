import gsap from "gsap";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// prop test should be lowercase
export const ProjHeader4 = ({ text }) => {
    const chars = ['ᛮ','ᚸ', 'ᛃ','ᛨ', 'ᛒ','ᚭ', 'ᚻ','ᛥ'];
    const mixchar = () => chars[Math.floor(Math.random() * chars.length)];
    const mix1 = (text) => {
        return text.replace(/[acegikmoqsuwyå]/gi, () => mixchar());
    };

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".projheaderwrapper4",
                start: "top 70.67%",
                end: "bottom 70.67%",
                scrub: false,
            }
        });

        tl.from(".projheader4", {
            yPercent: -700,
            ease: "steps(7)",
            duration: 0.6,
            delay: 0.2,
        }).to('.projheader4', {
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
        <div className="projheaderwrapper4">
            <div className="projheader4">{text} █</div>
            <div className="projheader4">{text}</div>
            <div className="projheader4">{text1}█</div>
            <div className="projheader4">ᛮ ᛥᛃᛮᛒᛥᚱᚻᚹᚨᛒᛥᚸᛖᛟ█</div>
            <div className="projheader4">ᛃᛨᛥᚷᛟᚻᛃᛨᛖᚱᛖᚻᚸᛟᛮᛒᚭ█</div>
            <div className="projheader4">ᛚᛟᚷᛟᛊ ᚹᚨᛊ ᚺᛖᚱᛖᚻᛨᛥᚸ█</div>
            <div className="projheader4">ᛟᚭᚻᚭᚸᛟ ᚺᛖᚻᛒᚭᚺᛥᛮ ᚭᚻᚻᛊ█</div>
            <div className="projheader4"></div>
        </div>
    );
};
