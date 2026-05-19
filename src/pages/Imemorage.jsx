import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Link, useNavigate } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// Fisher-Yates shuffle (referenced from )
function shuffle(array) {
  let newArray = [...array];

  let currentIndex = newArray.length;

  while (currentIndex !== 0) {

    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex], newArray[currentIndex]];

  }
  return newArray;
}

export function Imemorage() {
  // temporary hardcode
  const blank_url = "https://i.imgur.com/qFmcbT0.png";
  const [imageCount, setImageCount] = useState(20);
  const [imageArray, setImageArray] = useState([]);
  const [userBlankArray, setUserBlankArray] = useState(new Array(imageCount).fill(blank_url));
  const [userImageArray, setUserImageArray] = useState([[],[]]);
  const [userImageArrayRefs, setUserImageArrayRefs] = useState(new Array(imageCount).fill(10000)); // default out of range
  const [timeLeft, setTimeLeft] = useState(-1);
  const [phaseList, setPhaseList] = useState(["None","None","None","None","None"]);
  const [menuDisplay, setMenuDisplay] = useState("flex");
  const [stats, setStats] = useState([0,60,240]) // score, memorization time, recall time
  const [selectedBlankIndex, setSelectedBlankIndex] = useState(0);

  // game loop timer
  useEffect(() => {
    let interval;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      
      if (phaseList[0] === "block") {
        setPhaseList(["None", "block", "None", "None", "None"]);
        setTimeLeft(60);
      } 
      else if (phaseList[1] === "block") {
        // Memorization timer expired naturally (used all 60s)
        setStats(prev => [prev[0], 0, prev[2]]);
        setPhaseList(["None", "None", "block", "None", "None"]);
        setTimeLeft(240);
      } 
      else if (phaseList[2] === "block") {
        // Recall timer expired naturally (used all 240s)
        setStats(prev => [prev[0], prev[1], 0]);
        validateResults();
        setPhaseList(["None", "None", "None", "block", "None"]);
        setTimeLeft(-1);
      } 
      else if (phaseList[3] === "block") {
        setPhaseList(["None", "None", "None", "None", "block"]);
        setTimeLeft(-1);
      } 
      else if (phaseList[4] === "block") {
        setPhaseList(["block", "None", "None", "None", "None"]);
        setTimeLeft(20);
        fetchImageUrls();
      }
    }
    return () => clearInterval(interval);
  }, [timeLeft, phaseList]);

  //console.log("FIRST",imageArray,userImageArray); 
  // **this also serves as a way to reset the game.**
  const fetchImageUrls = async () => {
        setUserBlankArray(new Array(imageCount).fill(blank_url));
        const accessKey = 'NUnYdcxM5FQOtF00QDzuIWjfYrHyR8up1TynlkVmmhc';
        //const accessKey = 'none';
        const count = imageCount;
        const url = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${count}`;

        try {
          const response = await fetch(url);
          if (!response.ok) {
                throw new Error("Failed to fetch image array");
            }
          const result = await response.json(); 
          var temporary_array = [];
          for (const item of result) {
              temporary_array.push(item.urls.small);
          }
    
          console.log("Fetched Data:", response); 

  
          setImageArray(temporary_array || []);
          const shuffled = shuffle(temporary_array);
          setUserImageArray([shuffled,[]] || [[],[]]);
        } catch (error) {
            console.error("Error fetching image array:", error);
        }
    };
  const validateResults = async () => {
    // set array to blank array
    const tempBlankArray = [...userBlankArray];
    const colors = [];
    for (var i = 0; i<imageCount; i++){
      if (imageArray[i] === tempBlankArray[i]){
        colors.push('#48e87d');
      }else{
        colors.push('#e85555');
      }
    }
    setUserImageArray([tempBlankArray,colors])
  }
  // main game loop:
  const handleMoveables = (i,list) => {
    const tempBlankArray = [...userBlankArray];
    const tempImageArray = [...userImageArray[0]];
    const tempImageArrayRefs = [...userImageArrayRefs];

    // console.log("input args:",i,list);
    // console.log("arrays:");
    // console.log(tempBlankArray,tempImageArray);
    if (list === "image") {

      // prevent placing blank images
      if (tempImageArray[i] === blank_url) return;

      // search starting from selected index
      for (let offset = 0; offset < tempBlankArray.length; offset++) {

        const targetIndex = (selectedBlankIndex + offset) % tempBlankArray.length;

        if (tempBlankArray[targetIndex] === blank_url) {

          // place image
          tempBlankArray[targetIndex] = tempImageArray[i];

          // store original location reference
          tempImageArrayRefs[targetIndex] = i;

          // blank out source
          tempImageArray[i] = blank_url;

          // update states
          setUserBlankArray(tempBlankArray);
          setUserImageArrayRefs(tempImageArrayRefs);
          setUserImageArray([tempImageArray,[]]);

          break;
        }
      }
    }
    if (list === "blank"){
      if (tempBlankArray[i] !== blank_url){
        tempImageArray[tempImageArrayRefs[i]] = tempBlankArray[i]

        tempBlankArray[i] = blank_url;
        setUserBlankArray(tempBlankArray);
        setUserImageArrayRefs(tempImageArrayRefs);
        setUserImageArray([tempImageArray,[]]);
      }
    }
  }
  const getNextAvailableIndex = () => {
    for (let offset = 0; offset < userBlankArray.length; offset++) {

      const targetIndex =
        (selectedBlankIndex + offset) % userBlankArray.length;

      if (userBlankArray[targetIndex] === blank_url) {
        return targetIndex;
      }
    }

    return -1; // no available slots
  }
  const nextAvailableIndex = getNextAvailableIndex();
  return (
    <div>
    <div className="navbarLeft" style={{top:"0px",position:"absolute"}}>
            <Link to="/OtherProjects">
                  <button className="genericButtonTrainer" style={{backgroundColor:"#FFFFFF",color:"black",borderColor:"black",position:"absolute"}}>BACK</button>
            </Link>
      </div>
    <div className="imemorage-main">
      <div className="container-imemorage">
        <div className="menu"style={{display:menuDisplay,flexDirection:"column",textAlign:"center",alignItems:"center",justifyContent:"center"}}>
          <p>Number of Images to Remember:</p>
          <input
            type="number"
            min="1"
            max="30"
            value={imageCount}
            onChange={(e) => setImageCount(Number(e.target.value))}
            placeholder="20"
            style={{fontFamily: "input-mono-narrow, monospace;"}}
          />
          <p></p>
          <button className="imemorage-button2" onClick={() => {setMenuDisplay("None"),setStats([0,60,240]),setTimeLeft(20),setPhaseList(["block","None","None","None","None"]),fetchImageUrls()}}>
            Start Game!
          </button>

        </div>
        <div className="phase0"style={{display:phaseList[0]}}>
          <p>Get Ready: <strong>{timeLeft}</strong></p>
          <button className="imemorage-button2" onClick={() => setTimeLeft(0)}>
            Ready
          </button>
          <button className="imemorage-button2" onClick={() => {setMenuDisplay("block"),setTimeLeft(-1),setPhaseList(["None","None","None","None","None"])}}>
            Exit to Menu
          </button>
        </div>
        <div className="phase1" style={{display:phaseList[1]}}>
          <p>Memorization Time Left: <strong>
            {Math.floor(timeLeft / 60)
          .toString()
          .padStart(1, "0")}
        :
        {(timeLeft % 60)
          .toString()
          .padStart(2, "0")}
          </strong></p>

          <Swiper className='custom-swiper-style'
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            speed={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            loop={true}
          >
            {imageArray.slice(0,imageCount).map((image, index) => (
                          <SwiperSlide>
                          <div key={index} className="imemorage-memo-image-wrapper">
                              <img className="imemorage-memo-image" src={image} alt={index} />
                          </div>
                          </SwiperSlide>
                      ))}
          </Swiper>
          <button 
            className="imemorage-button2" 
            onClick={() => {
              // nave the exact remaining time right now
              setStats(prev => [prev[0], timeLeft, prev[2]]);
              // advance to 2, bypassing the natural timer-end overwrite
              setPhaseList(["None", "None", "block", "None", "None"]);
              setTimeLeft(240);
            }}
          >
            Done
          </button>
          <button className="imemorage-button2" onClick={() => {setMenuDisplay("block"),setTimeLeft(-1),setPhaseList(["None","None","None","None","None"])}}>
            Exit to Menu
          </button>
        </div> 
        <div className="phase2" style={{display:phaseList[2]}}>              
          <p>Recall Time Left: <strong>  
            {Math.floor(timeLeft / 60)
          .toString()
          .padStart(1, "0")}
        :
        {(timeLeft % 60)
          .toString()
          .padStart(2, "0")}
          </strong></p>
          <div className="ImageContainerMoveables">
                      {
                      userBlankArray.slice(0,10).map((image, index) => (
                          <div key={index} className="imemorage-image-wrapper">
                            <button
                                className="imemorage-button"
                                style={{
                                  backgroundColor:
                                  nextAvailableIndex === index
                                    ? "#ffe44d"
                                    : "#c4c4c4"
                                }}
                                onClick={() => {
                                  setSelectedBlankIndex(index);
                                  handleMoveables(index,"blank");
                                }}
                              >
                              <img className="imemorage-image" src={image} alt={index} />
                            </button>
                          </div>
                      ))}
          </div>
          <div className="ImageContainerMoveables">
                      {
                      userBlankArray.slice(10,20).map((image, index) => (
                          <div key={index} className="imemorage-image-wrapper">
                            <button
                                className="imemorage-button"
                                style={{
                                  backgroundColor:
                                  nextAvailableIndex === index + 10
                                    ? "#ffe44d"
                                    : "#c4c4c4"
                                }}
                                onClick={() => {
                                  setSelectedBlankIndex(index + 10)
                                  handleMoveables(index + 10,"blank");
                                }}
                              >
                              <img className="imemorage-image" src={image} alt={index} />
                            </button>
                          </div>
                      ))}
          </div>
          <div className="ImageContainerMoveables">
                      {
                      userBlankArray.slice(20,30).map((image, index) => (
                          <div key={index} className="imemorage-image-wrapper">
                            <button
                                className="imemorage-button"
                                style={{
                                  backgroundColor:
                                  nextAvailableIndex === index + 20
                                    ? "#ffe44d"
                                    : "#c4c4c4"
                                }}
                                onClick={() => {
                                  setSelectedBlankIndex(index + 20)
                                  handleMoveables(index + 20,"blank");
                                }}
                              >
                              <img className="imemorage-image" src={image} alt={index} />
                            </button>
                          </div>
                      ))}
          </div>

          
          <div className="ImageContainerMoveables">
                      {
                      userImageArray[0].slice(0,10).map((image, index) => (           
                          <div key={index} className="imemorage-image-wrapper">
                            <button className="imemorage-button" onClick={() => handleMoveables(index,"image")}>
                              <img className="imemorage-image" src={image} alt={index} />
                            </button>
                          </div>
                      ))}
                      
          </div>
          <div className="ImageContainerMoveables">
                      {
                      userImageArray[0].slice(10,20).map((image, index) => (           
                          <div key={index} className="imemorage-image-wrapper">
                            <button className="imemorage-button" onClick={() => handleMoveables(index+10,"image")}>
                              <img className="imemorage-image" src={image} alt={index} />
                            </button>
                          </div>
                      ))}
                      
          </div>
          <div className="ImageContainerMoveables">
                      {
                      userImageArray[0].slice(20,30).map((image, index) => (           
                          <div key={index} className="imemorage-image-wrapper">
                            <button className="imemorage-button" onClick={() => handleMoveables(index+20,"image")}>
                              <img className="imemorage-image" src={image} alt={index} />
                            </button>
                          </div>
                      ))}
                      
          </div>
          <button 
            className="imemorage-button2" 
            onClick={() => {
              // save the time right now
              setStats(prev => [prev[0], prev[1], timeLeft]);
              validateResults();
              // advance to 3
              setPhaseList(["None", "None", "None", "block", "None"]);
              setTimeLeft(-1);
            }}
          >
            Finished
          </button>
          <button className="imemorage-button2" onClick={() => {setMenuDisplay("block"),setTimeLeft(-1),setPhaseList(["None","None","None","None","None"])}}>
            Exit to Menu
          </button>
        </div>
        <div className="phase3" style={{display:phaseList[3]}}>   
            <p>Results:</p>      
          <div className="ImageContainerResults">
                      {
                      imageArray.slice(0,10).map((image, index) => (
                          <div key={index} className="imemorage-image-wrapper">
                              <img className="imemorage-image" src={image} alt={index} />
                          </div>
                      ))}
          </div>
          <div className="ImageContainerResults" style={{height:"150px"}}>
                      {
                      userImageArray[0].slice(0,10).map((image, index) => (
                          <div key={index} className="imemorage-image-wrapper" style={{borderColor:userImageArray[1][index], border:"4px solid"}}>
                              <img className="imemorage-image" src={image} alt={index} />
                          </div>
                      ))}
          </div>
          <div className="ImageContainerResults">
                      {
                      imageArray.slice(10,20).map((image, index) => (
                          <div key={index} className="imemorage-image-wrapper">
                              <img className="imemorage-image" src={image} alt={index} />
                          </div>
                      ))}
          </div>
          <div className="ImageContainerResults" style={{height:"150px"}}>
                      {
                      userImageArray[0].slice(10,20).map((image, index) => (
                          <div key={index} className="imemorage-image-wrapper" style={{borderColor:userImageArray[1][index+10], border:"4px solid"}}>
                              <img className="imemorage-image" src={image} alt={index} />
                          </div>
                      ))}
          </div>
          <div className="ImageContainerResults">
                      {
                      imageArray.slice(20,30).map((image, index) => (
                          <div key={index} className="imemorage-image-wrapper">
                              <img className="imemorage-image" src={image} alt={index} />
                          </div>
                      ))}
          </div>
          <div className="ImageContainerResults" style={{height:"150px"}}>
                      {
                      userImageArray[0].slice(20,30).map((image, index) => (
                          <div key={index} className="imemorage-image-wrapper" style={{borderColor:userImageArray[1][index+20], border:"4px solid"}}>
                              <img className="imemorage-image" src={image} alt={index} />
                          </div>
                      ))}
          </div>
          {/* <button onClick={() => validateResults()}>
            Validate results
          </button> */}
          <button className="imemorage-button2" onClick={() => setTimeLeft(0)}>
            Finished
          </button>
          <button className="imemorage-button2" onClick={() => {setMenuDisplay("block"),setTimeLeft(-1),setPhaseList(["None","None","None","None","None"])}}>
            Exit to Menu
          </button>
        </div>  
        <div className="phase4" style={{display:phaseList[4]}}>
          <div>Stats:</div>
          <p>Score: <strong>{userImageArray[1].filter(x => x === '#48e87d').length}/{imageCount}</strong></p>
          <p>Memorization Time: <strong>
            {Math.floor((60 - stats[1]) / 60)
          .toString()
          .padStart(1, "0")}
        :
        {((60 - stats[1]) % 60)
          .toString()
          .padStart(2, "0")}
            </strong></p>
            
          <p>Recall Time: <strong>
            {Math.floor((240 - stats[2]) / 60)
          .toString()
          .padStart(1, "0")}
        :
        {((240 - stats[2]) % 60)
          .toString()
          .padStart(2, "0")}
            </strong></p>
          <button className="imemorage-button2" onClick={() => setTimeLeft(0)}>
            Start Again
          </button>
          <button className="imemorage-button2" onClick={() => {setMenuDisplay("flex"),setTimeLeft(-1),setPhaseList(["None","None","None","None","None"])}}>
            Exit to Menu
          </button>
        </div> 
      </div>
    </div>
    </div>
  )
}

