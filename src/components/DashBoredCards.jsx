import gsap from "gsap";
import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useGSAP } from '@gsap/react';

export const DashBoredCards = () => {
    const [clickCount, setClickCount] = useState(0);
    const [cardArray, setCardArray] = useState([]);
    const quotes = [];

    useGSAP(() => {
        gsap.from('.word3', {
            y: 0,
            opacity: 0,
            stagger: {
                each: 0.01,
                from: "random"
            },
            scrollTrigger: {
                trigger: ".sectionDashboredCardBlock",
                start: "top 80.67%",
                end: "bottom 80.67%",
                scrub: false,
            },
        });
    }, []);
    useEffect(() => {
      if (clickCount % 5 === 0 && clickCount !== 0) { // every 5 cards
          let randomCardNumber;
          const randomRarityNumber = Math.floor(Math.random() * 10000) + 1; // 1-10000
          let rarity;

          if (randomRarityNumber === 1) {
              rarity = 5;
              randomCardNumber = 1;
          } else if (randomRarityNumber >= 2 && randomRarityNumber <= 47) {
              rarity = 4;
              randomCardNumber = 1;
          } else if (randomRarityNumber >= 48 && randomRarityNumber <= 399) {
              rarity = 3;
              randomCardNumber = 1;
          } else if (randomRarityNumber >= 400 && randomRarityNumber <= 3399) {
              rarity = 2;
              randomCardNumber = Math.floor(Math.random() * 2) + 1; // 1-2
          } else {
              rarity = 1;
              randomCardNumber = Math.floor(Math.random() * 2) + 1; // 1-2
          }

          const randomCardSrc = `./images/cards/${rarity}_${randomCardNumber}.png`;

          setCardArray((prevArray) => {
              const existingCardIndex = prevArray.findIndex(card => card.src === randomCardSrc);

              if (existingCardIndex !== -1) {
                  // Update count if the card already exists
                  const updatedArray = [...prevArray];
                  updatedArray[existingCardIndex] = {
                      ...updatedArray[existingCardIndex],
                      count: updatedArray[existingCardIndex].count + 1
                  };
                  return updatedArray;
              } else {
                  // Add new card
                  return [...prevArray, { src: randomCardSrc, count: 1 }];
              }
          });
      }
  }, [clickCount]);

  const handleClick = () => {
      setClickCount(prevCount => prevCount + 1);
  };

    return (
        <div>
            <section className="sectionDashboredCardBlock">   
                <div className="txt1">
                    <div className="horizontalTextMap">
                        {' - YOUR CARDS - '.split('').map((char, index) => (
                            <div className="word3" key={index}>
                                {char === ' ' ? '\u00A0' : char}
                            </div>
                        ))}
                    </div>
                </div>
                <hr></hr>
                <div className="cardButtonWrapper" >
                    <button className="cardButton" onClick={handleClick}>{clickCount} clicks</button>
                </div>
                <div className="cardImageContainer">
                  {cardArray.map((card, index) => (
                        <div key={index} className="cardWrapper">
                          <p className="cardCount">x{card.count}</p>
                          <img className="card" src={card.src} alt="none" />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};
