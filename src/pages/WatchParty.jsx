import { VideoPlayer } from "../components/VideoPlayer";
import { useRef, useState } from "react";



export function WatchParty () {
  const [dynamiccol, setdynamiccol] = useState("");
  const [dynamiccol2, setdynamiccol2] = useState("");
  const dynamiccolswitch = useRef(0);
  const [formData, setFormData] = useState({ room: "", id: "" });


  const handleClick = () => {
    console.log(dynamiccolswitch);
        if (dynamiccolswitch.current ===0){
          setdynamiccol('#FFFFFF');
          setdynamiccol2('#000000');
          dynamiccolswitch.current = 1;
        } else{
          setdynamiccol('#2e2e2e');
          setdynamiccol2('#FFFFFF');
          dynamiccolswitch.current = 0;
        }
    };
  const handleChange = (e) => {
        // console.log(e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  const handleClipboard = () => {
      let room = formData.room;
      let youtube_url = formData.id;
      let id;
      let urlstring;
      // account for different youtube string types
      if (youtube_url.startsWith("https://youtu.be")){
        // generated link type
        id = youtube_url.split(/[?\/]+/).at(2);
        urlstring = 'https://nathan-thai.com/#/watchparty/?r=' + room + '&i=' + id;
      } else {
        if (youtube_url.includes("list")){
          // playlist type
          id = youtube_url.split("=").at(-1);
          urlstring = 'https://nathan-thai.com/#/watchparty/?r=' + room + '&i=' + id + '&t=p' ;
        }else{
          // normal youtube link
          id = youtube_url.split("=").at(-1);
          urlstring = 'https://nathan-thai.com/#/watchparty/?r=' + room + '&i=' + id;
        }
      }
      
      navigator.clipboard.writeText(urlstring).then(function(){
        console.log('Async copy was succesful!', urlstring);
      }, function(err) {
        console.error('Async copy could not copy text: ', err);
      })

  }
  return (
    <div className='main-container-wp' style={{backgroundColor:dynamiccol}}>
      {/* <h1>Watch Party</h1> */}
      <VideoPlayer />
      <div style={{height:'4vh', padding:'1rem 1.5rem'}}></div>
      <button className="button-wp" style={{borderColor:dynamiccol2, color:dynamiccol2}}onClick={handleClick}> Toggle Nightmode</button>
      
      <div style={{height:'6vh', padding:'1rem 1.5rem'}}></div>
      <div className="text-wp" style={{color:dynamiccol2}}>Watchparty Generator</div>
      <div className="url-generator-wp">
        <div className="text-wp" style={{color:dynamiccol2}}>Room Code:</div>
        <input className="input-wp" type="text" name="room" style={{backgroundColor:dynamiccol}} placeholder="room123" onChange={handleChange} required></input>
        <div className="text-wp" style={{color:dynamiccol2}}>Youtube URL:</div>
        <input className="input-wp" type="text" name="id" style={{backgroundColor:dynamiccol}} placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ" onChange={handleChange} required></input>
        <div style = {{width:"10px"}}></div>
        <button className="button-wp" style={{borderColor:dynamiccol2, color:dynamiccol2}}onClick={handleClipboard}> Copy URL</button>
      </div>
      <div style={{height:'4vh', padding:'1rem 1.5rem'}}></div> 

      
      <a className="hyperlink-wp" style={{color:dynamiccol2}} href= "https://github.com/NathanThai2201/simple-watchparty-client">Click here for the desktop local version</a>
    </div>
  );
}

