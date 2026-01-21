import gsap from "gsap";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// prop test should be lowercase
export const ProjHeader6 = ({ text }) => {
    const chars = ['ᛮ','ᚸ', 'ᛃ','ᛨ', 'ᛒ','ᚭ', 'ᚻ','ᛥ'];
    const mixchar = () => chars[Math.floor(Math.random() * chars.length)];
    const mix1 = (text) => {
        return text.replace(/[acegikmoqsuwyå]/gi, () => mixchar());
    };

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".projheaderwrapper6",
                start: "top 70.67%",
                end: "bottom 70.67%",
                scrub: false,
            }
        });

        tl.from(".projheader6", {
            yPercent: -700,
            ease: "steps(7)",
            duration: 0.6,
            delay: 0.2,
        }).to('.projheader6', {
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
        <div className="projheaderwrapper6">
            <div className="projheader6">{text} █</div>
            <div className="projheader6">{text}</div>
            <div className="projheader6">{text1}█</div>
            <div className="projheader6">ᛮ ᛮᚹᚨᛒᚻᛨᛟᚻᛃ ᛖᛖᛟ█</div>
            <div className="projheader6">ᛃᛨᛟ ᚺᛖᛖᚻᚸᛟᚭ█</div>
            <div className="projheader6">ᛚᛟᚷᛟᛊ ᚹᚨᛊ ᚺᛖᚱᛖᛥᚸ█</div>
            <div className="projheader6">ᚻ  ᚻᛒᚷᛟᚻᛃ ᚻᛮ ᚭᚻᚻᛊ█</div>
            <div className="projheader6"></div>
        </div>
    );
};
