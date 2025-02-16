import gsap from "gsap";
import { useEffect, useState } from "react";
import { useGSAP } from '@gsap/react';
import { Typing } from "./Typing";
import { ToastContainer, toast } from 'react-toastify';

export const DashBoredCards = () => {
    const [WPM, setWPM] = useState(0);
    const [clickCount, setClickCount] = useState(0);
    const [cardArray, setCardArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState(0);
    const [sortOption, setSortOption] = useState("default");
    const totalCardsCollected = cardArray.reduce((sum, card) => sum + card.count, 0);


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
                // console.log("Updated ID:", result.data._id);
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
        // amounts: rarity from 1 -> 5
        let amounts = [7,7,6,6,5]
        let randomCardNumber;
        const randomRarityNumber = Math.floor(Math.random() * 10000) + 1;
        let rarity;
    
        if (randomRarityNumber === 1) {
            rarity = 5;
            randomCardNumber = Math.floor(Math.random() * amounts[4]) + 1;
        } else if (randomRarityNumber >= 2 && randomRarityNumber <= 47) {
            rarity = 4;
            randomCardNumber = Math.floor(Math.random() * amounts[3]) + 1;
        } else if (randomRarityNumber >= 48 && randomRarityNumber <= 399) {
            rarity = 3;
            randomCardNumber = Math.floor(Math.random() * amounts[2]) + 1;
        } else if (randomRarityNumber >= 400 && randomRarityNumber <= 3399) {
            rarity = 2;
            randomCardNumber = Math.floor(Math.random() * amounts[1]) + 1;
        } else {
            rarity = 1;
            randomCardNumber = Math.floor(Math.random() * amounts[0]) + 1;
        }
        
        // // Force cheating to get cards
        // randomCardNumber = Math.floor(Math.random() * amounts[3]) + 1;
        // rarity = 4;

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
            // console.log("a",cardArray,updatedCardArray,id);
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
    const notify = () => {
        let notifytext = "Good! You earned 2 cards!";
        if (WPM>=70){
            notifytext = "Amazing! You earned 3 cards!";
        }
        if (WPM>=90){
            notifytext = "Exceptional! You earned 4 cards!";
        }
        if (WPM>=110){
            notifytext = "Speed Demon! You earned 5 cards!";
        }
            toast(notifytext, {
                style: {
                    fontFamily:"Electrolize",
                    backgroundColor: "rgb(239, 247, 254)",
                    color: "rgb(16, 57, 139)",
                    borderRadius: "8px",
                    padding: "10px",
                }
            });
        };
    const handleTypingComplete = async () => {
        //default generate 2 cards
        await generateRandomCard();
        await generateRandomCard();

        //WPM bonuses
        if (WPM>=70){
            await generateRandomCard();
        }
        if (WPM>=90){
            await generateRandomCard();
        }
        if (WPM>=110){
            await generateRandomCard();
        }
        console.log(WPM);
        notify();
    };

    const sortedCards = [...cardArray].sort((a, b) => {
        if (sortOption === "name") {
            return a.src.localeCompare(b.src);
        }
        return 0;
    });
        
    return (
        <div>
             <ToastContainer
                position="bottom-right"
                icon="none"
                autoClose={2000}
                hideProgressBar={true}/>
            <Typing 
                onComplete={handleTypingComplete}
                onWPMChange={setWPM} 
            /> 
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
                <div className="aboveCards">
                    <div className="cardButtonWrapper">
                        {/* <button className="cardButton" onClick={handleClick}>{clickCount} clicks</button> */}
                    </div>
                    <div className="sortOptions">
                        <label>Sort by: </label>
                        <select className ="sorter" onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
                            <option value="default">DATE</option>
                            <option value="name">RARITY</option>
                        </select>
                    </div>
                    <div>
                         Total Cards Collected: {totalCardsCollected}
                    </div>
                    <div></div>
                </div>
                <div className="cardImageContainer">
                    {sortedCards.map((card, index) => (
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
