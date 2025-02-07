import gsap from "gsap";
import { useEffect, useState } from "react";
import { useGSAP } from '@gsap/react';
import { Typing } from "./Typing";

export const DashBoredCards = () => {
    const [clickCount, setClickCount] = useState(0);
    const [cardArray, setCardArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState(0);

    useGSAP(() => {
        gsap.from('.word3', {
            y: 0,
            opacity: 0,
            stagger: { each: 0.01, from: "random" },
            scrollTrigger: {
                trigger: ".sectionDashboredCardBlock",
                start: "top 80.67%",
                end: "bottom 80.67%",
                scrub: false,
            },
        });
    }, []);
    
    const fetchCardArray = async () => {
        const storedId = localStorage.getItem("id"); // Retrieve id from localStorage
        try {
            const response = await fetch(`https://dashboredjsapi.onrender.com/api/cardarrays/${storedId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch card array");
            }
            const result = await response.json(); 
    
            // console.log("Fetched Data:", result); 
    
            if (result && result.success && result.data && typeof result.data === "object") {
                setCardArray(result.data.cardArray || []);
                setId(result.data._id);
                console.log("Updated ID:", result.data._id);
            } else {
                console.error("Unexpected response format:", result);
                setCardArray([]);
            }
        } catch (error) {
            console.error("Error fetching card array:", error);
            setCardArray([]);
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchCardArray();
    }, []);
    
    const generateRandomCard = async () => {
        let randomCardNumber;
        const randomRarityNumber = Math.floor(Math.random() * 10000) + 1;
        let rarity;
    
        if (randomRarityNumber === 1) {
            rarity = 5;
            randomCardNumber = 1;
        } else if (randomRarityNumber >= 2 && randomRarityNumber <= 47) {
            rarity = 4;
            randomCardNumber = 1;
        } else if (randomRarityNumber >= 48 && randomRarityNumber <= 399) {
            rarity = 3;
            randomCardNumber = Math.floor(Math.random() * 3) + 1;
        } else if (randomRarityNumber >= 400 && randomRarityNumber <= 3399) {
            rarity = 2;
            randomCardNumber = Math.floor(Math.random() * 2) + 1;
        } else {
            rarity = 1;
            randomCardNumber = Math.floor(Math.random() * 2) + 1;
        }
    
        const randomCardSrc = `./images/cards/${rarity}_${randomCardNumber}.png`;
    
        setCardArray(prevArray => {
            const updatedArray = [...prevArray];
            const existingCardIndex = updatedArray.findIndex(card => card.src === randomCardSrc);
    
            if (existingCardIndex !== -1) {
                updatedArray[existingCardIndex] = {
                    ...updatedArray[existingCardIndex],
                    count: updatedArray[existingCardIndex].count + 1
                };
            } else {
                updatedArray.push({ src: randomCardSrc, count: 1 });
            }
    
            updateCardArray(updatedArray,id);
    
            return updatedArray;
        });
    };
    
    const updateCardArray = async (updatedCardArray,id) => {
        try {
            console.log("a",cardArray,updatedCardArray,id);
            const response = await fetch(`https://dashboredjsapi.onrender.com/api/cardarrays/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cardArray: updatedCardArray }),
            });
    
            if (!response.ok) {
                throw new Error("Failed to update card array");
            }
    
            console.log("Card array successfully updated!");
        } catch (error) {
            console.error("Error updating card array:", error);
        }
    };
    
    useEffect(() => {
        const id = localStorage.getItem("id");
      }, []);
    
      useEffect(() => {
        if (clickCount > 0) {
            generateRandomCard();
        }
    }, [clickCount]);

    const handleClick = () => {
        setClickCount(prevCount => prevCount + 1);
    };

    const handleTypingComplete = () => {
        generateRandomCard();
    };

    return (
        <div>
            <Typing onComplete={handleTypingComplete} /> 
            <div style={{ height: 1 }}></div>
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
                <hr />
                <div className="cardButtonWrapper">
                    {/* <button className="cardButton" onClick={handleClick}>{clickCount} clicks</button> */}
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
