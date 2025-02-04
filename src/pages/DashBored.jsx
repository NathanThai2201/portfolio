import gsap from "gsap";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useGSAP } from '@gsap/react';
import baffle from 'baffle';
import { DashBoredCards } from "../components/DashBoredCards";
import { DashBoredBulletin } from "../components/DashBoredBulletin";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function DashBored() {

  let tl = gsap.timeline({repeat:-1})
  let tl2 = gsap.timeline()
  let tl3 = gsap.timeline()
  let tl4 = gsap.timeline()
  let tl5 = gsap.timeline()

  useEffect(() => {
    document.title = 'DashBored';
  }, []);
  useEffect(() => {
    const target = baffle('.scrollText');
    target.set({
        characters: "ᛮᚸᛃᛨᛒᚭᚻᛥ",
        speed: 140
    });
    target.start();
    target.reveal(1000);
  }, []);
  useGSAP(() => {
      gsap.fromTo('.dashBoredImg1', {
        scale:0,
        opacity:0,
        y:'-=6%',
        x:'-=12%',
      },{
        scale:0.69,
        opacity:1,
        duration:0.5,
        ease:"ease.inOut",
        delay:1.5
      });

      tl2.add(gsap.fromTo('.txtDashboredMainTitle1', {
        scaleY:0,
        x:-10,
        rotation:-90,
        opacity:0
      },{
        scaleY:1,
        rotation:-90,
        opacity:1,
        duration:0.5,
        yoyo:true,
        ease:"sine.inOut",
        delay:1
      }));
      tl2.add(gsap.fromTo('.txtDashboredMainTitle1', {
        rotation:-90,
      },{
        rotation:0,
        duration:0.5,
        yoyo:true,
        ease:"quad.inOut",
      }));
      tl2.add(gsap.fromTo('.txtDashboredMainTitle1', {
        x:-10,
      },{
        x:0,
        duration:0.5,
        ease:"quad.inOut",
      }));

      gsap.fromTo('.txtDashboredMainTitle2', {
        scale:0,
        opacity:0,
      },{
        scale:1,
        opacity:1,
        duration:0.5,
        ease:"ease.inOut",
        delay:1
      });

      tl3.add(gsap.fromTo('.txtDashboredMainTitle3', {
        scaleY:0,
        scaleX:1,
        opacity:0,
      },{
        scaleY:1,
        opacity:1,
        duration:0.5,
        yoyo:true,
        ease:"sine.inOut",
        delay:1
      }));
      tl3.add(gsap.fromTo('.txtDashboredMainTitle3', {
        scaleX:1,
      },{
        scaleX:-1,
        duration:0.75,
        ease:"sine.inOut",
        delay:0.2
      }));
      tl3.add(gsap.fromTo('.txtDashboredMainTitle3', {
        scaleX:-1,
      },{
        scaleX:1,
        duration:0.75,
        ease:"sine.inOut",
        delay:0.2
      }));

      tl4.add(gsap.fromTo('.txtDashboredMainTitle4', {
        scaleY:0,
        opacity:0,
        y:10,
        rotation:-90
      },{
        scaleY:1,
        opacity:1,
        duration:0.5,
        yoyo:true,
        ease:"sine.inOut",
        delay:1
      }));
      tl4.add(gsap.fromTo('.txtDashboredMainTitle4', {
        rotation:-90
      },{
        rotation:0,
        duration:0.5,
        yoyo:true,
        ease:"sine.inOut",
        delay:0.5
      }));
      tl4.add(gsap.fromTo('.txtDashboredMainTitle4', {
        y:10
      },{
        y:0,
        duration:0.5,
        yoyo:true,
        ease:"sine.inOut",
      }));

      tl5.add(gsap.fromTo('.txtDashboredMainTitle5', {
        scaleY:0,
        y:-10,
        opacity:0,
      },{
        scaleY:1,
        opacity:1,
        duration:0.5,
        yoyo:true,
        ease:"sine.inOut",
        delay:1
      }));
      tl5.add(gsap.fromTo('.txtDashboredMainTitle5', {
        y:-10
      },{
        y:0,
        duration:0.5,
        yoyo:true,
        ease:"sine.inOut",
      }));

      gsap.fromTo('.txtDashboredMainTitle6', {
        scale:0,
        opacity:0,
      },{
        scale:1,
        opacity:1,
        duration:0.5,
        ease:"ease.inOut",
        delay:1
      });

      tl.add(gsap.fromTo('.dashBoredImg1', {
        rotation:0,
      },{
        rotation:90,
        duration:1,
        ease:"elastic.inOut"
      }));
      tl.add(gsap.fromTo('.dashBoredImg1', {
        rotation:90
      },{
        rotation:180,
        duration:1,
        ease:"elastic.inOut"
      }));
      tl.add(gsap.fromTo('.dashBoredImg1', {
        rotation:180
      },{
        rotation:270,
        duration:1,
        ease:"elastic.inOut"
      }));
      tl.add(gsap.fromTo('.dashBoredImg1', {
        rotation:270
      },{
        rotation:360,
        duration:1,
        ease:"elastic.inOut"
      }));
  }, {});
  return (
      <div className ="container2">
        <section className="sectionscroll"> 
          <div className="txt1scroll">
            <div className="scrollText"> - SCROLL DOWN - </div>
          </div> 
        </section>
        <section className="sectionb2" style={{height:30}}></section>
        <section className="sectionDashboredwtb">
          <div className="txtDashboredMainTitle1">d</div>
          <div className="txtDashboredMainTitle2">as</div>

          <div className="txtDashboredMainTitle3">h</div>

          <div className="txtDashboredMainTitle4">b</div>
          <div className="txtDashboredMainTitle5">o</div>
          <div className="txtDashboredMainTitle6">red</div>
          <img className="dashBoredImg1" src="./images/cardglyph.gif" alt="hello"></img>
        </section>
        <DashBoredBulletin></DashBoredBulletin>
        <div style={{height:1}}></div>
        <DashBoredCards></DashBoredCards>
      </div>
  )
}