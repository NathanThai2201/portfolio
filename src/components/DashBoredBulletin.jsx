import gsap from "gsap";
import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useGSAP } from '@gsap/react';

export const DashBoredBulletin = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://dashboredjsapi.onrender.com/api/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        setPosts(Array.isArray(data.data) ? data.data : []);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);  
    useGSAP(() => {
    gsap.from('.word2', {
      y: 0,
      opacity: 0,
      stagger: {
          each: 0.01,
          from: "random"
      },
      scrollTrigger: {
          trigger: ".sectionDashboredBulletinBlock",
          start: "top 80.67%",
          end: "bottom 80.67%",
          scrub: false,
      },
  });}, []);
    return (
        <div>
            <section className="sectionDashboredBulletinBlock">   
            <div className="txt1">
              <div className="horizontalTextMap">
                {' - BULLETIN - '.split('').map((char, index) => (
                  <div className="word2" key={index}>
                      {char === ' ' ? '\u00A0' : char}
                  </div>
                ))}
              </div>
            </div>
            <hr></hr>
            <div>
              {posts.map((post) => (
                <div>
                  <div className="Post" key={post._id}>
                    <div className="txtPostName">{post.name}</div>
                    <div className="txt1Post">{post.description}</div>
                  </div>
                  <div className="txtPostTime">{post.createdAt.slice(0, 10)}</div>
                </div>
              ))}
            </div>
            </section>
        </div>
    )
  }
  
  