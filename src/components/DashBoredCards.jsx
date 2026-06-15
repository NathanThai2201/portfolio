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
    const [username, setUsername] = useState("");
    const [sortOption, setSortOption] = useState("default");
    const totalCardsCollected = cardArray.reduce((sum, card) => sum + card.count, 0);
    const ADMIN_USERNAME = "Coperime";

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
        
        const storedUsername = localStorage.getItem("username"); 
        setUsername(storedUsername);

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
    
    const generateRandomCard = async (count = 1) => {
        let newCardDiscovered = false;
        
        setCardArray((prevArray) => {
            let updatedArray = [...prevArray];
    
            for (let i = 0; i < count; i++) {
                // IMPORTANT!!!!! - CHANGE TO UPDATE CARD AMOUNT
                const amounts = [16, 17, 12, 12, 6];
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
                // rarity = 3;
                // randomCardNumber = 10;
    
                const randomCardSrc = `./images/cards/${rarity}_${randomCardNumber}.png`;

                const existingCardIndex = updatedArray.findIndex((card) => card.src === randomCardSrc);
    
                if (existingCardIndex !== -1) {
                    updatedArray[existingCardIndex] = {
                        ...updatedArray[existingCardIndex],
                        count: updatedArray[existingCardIndex].count + 1,
                    };
                } else {
                    updatedArray.push({ src: randomCardSrc, count: 1 });
                    newCardDiscovered = true;
                }
            }
    
            updateCardArray(updatedArray, id);
            return updatedArray;
        });
    
        // Notify if at least one new card was discovered
        if (newCardDiscovered) {
            toast(
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img
                    src={"./images/notifcards2.png"}
                    alt="New Card"
                    style={{ width: "40px", height: "auto", borderRadius: "5px" }}
                />
                <span style={{ fontSize: "16px"}} >New card discovered!</span>
            </div>, 
                {
                position: "bottom-left",
                style: {
                    fontFamily: "Electrolize",
                        backgroundColor: "rgb(239, 247, 254)",
                        color: "rgb(16, 57, 139)",
                        borderRadius: "8px",
                        padding: "11px",
                },
            });
        }
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
            toast(
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <img
                        src={"./images/notifcards.png"}
                        alt="New Card"
                        style={{ width: "40px", height: "auto", borderRadius: "5px" }}
                    />
                    <span style={{ fontSize: "16px"}} >{notifytext}</span>
                </div>, 
                    {
                    position: "bottom-right",
                    style: {
                        fontFamily: "Electrolize",
                        backgroundColor: "rgb(239, 247, 254)",
                        color: "rgb(16, 57, 139)",
                        borderRadius: "8px",
                        padding: "11px",
                    },
                });
        };
    const handleTypingComplete = async () => {
        if (username === ADMIN_USERNAME) {
            let updatedArray = [...cardArray];

            // IMPORTANT!!!!! - CHANGE TO UPDATE CARD AMOUNT
            const amounts = [16, 17, 12, 12, 6];

            for (let rarity = 1; rarity <= 5; rarity++) {
                for (let i = 0; i < 100; i++) {
                    const randomCardNumber =
                        Math.floor(Math.random() * amounts[rarity - 1]) + 1;

                    const randomCardSrc = `./images/cards/${rarity}_${randomCardNumber}.png`;

                    const existingCardIndex = updatedArray.findIndex(
                        (card) => card.src === randomCardSrc
                    );

                    if (existingCardIndex !== -1) {
                        updatedArray[existingCardIndex].count += 1;
                    } else {
                        updatedArray.push({ src: randomCardSrc, count: 1 });
                    }
                }
            }

            setCardArray(updatedArray);
            await updateCardArray(updatedArray, id);

            toast("admin: Generated 100 cards of each rarity", {
                position: "bottom-right",
            });

            return; // 🚨 IMPORTANT: stop normal execution
        }

        // ===== Normal logic =====
        let cardCount = 2;

        if (WPM >= 70) cardCount++;
        if (WPM >= 90) cardCount++;
        if (WPM >= 110) cardCount++;

        notify();
        await generateRandomCard(cardCount);
    };

    const sortedCards = [...cardArray].sort((a, b) => {
        if (sortOption === "name") {
            return a.src.localeCompare(b.src);
        }
        return 0;
    });
    // header text
    const headerText = username === ADMIN_USERNAME 
        ? " - YOUR CARDS - ADMIN ACCESS " 
        : " - YOUR CARDS - ";     
    return (
        <div>
             <ToastContainer
                position="bottom-right"
                icon="none"
                autoClose={3500}
                hideProgressBar={true}/>
            <Typing 
                onComplete={handleTypingComplete}
                onWPMChange={setWPM} 
            /> 
            <div style={{ height: 1 }}></div>
            <section className="sectionDashboredCardBlock">
                <div className="txt1">
                    <div className="horizontalTextMap">
                        {/* Dynamic Header Logic */}
                        {headerText.split('').map((char, index) => (
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
