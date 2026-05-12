import { useEffect, useRef } from "react";
import { socket } from "./socket";



// /**
//  *  Setting the room ID and embos.top tmdb_id
//  *  for tmdb, search themoviedb.org and copy the numerical code in the URL
//  *  for youtube links, add the alphanumeric code
//  *  e.g. http://localhost:5173/#/watchparty/?r=room123&i=980431&t=e
//  *. e.g. http://localhost:5173/#/watchparty/?r=skibidi&i=I5pG1wbRKOg
//  */

const hash = window.location.hash;
const queryString = hash.split("?")[1] || "";
const params = new URLSearchParams(queryString);

const ROOM_ID = params.get("r") || "room123"; 
const VIDEO_ID = params.get("i") || "I5pG1wbRKOg"; // 980431 for embos.top
const PLAYER_TYPE = params.get("t") || "y"; // y = youtube, e = embos

export const VideoPlayer = () => {
  useEffect(() => {
    const callServer = () => {
      fetch("https://simple-watchparty-server.onrender.com/")
        .then(res => res.json())
        .then(data => {
          console.log("Server response:", data);
        })
        .catch(err => {
          console.error("Error calling server:", err);
        });
    };

    // call immediately once
    callServer();

    // then repeat every 2 minutes (120000 ms)
    const interval = setInterval(callServer, 120000);

    // cleanup on unmount
    return () => clearInterval(interval);
  }, []);
  const playerRef = useRef(null);
  const isSyncing = useRef(false);

  useEffect(() => {
    if (PLAYER_TYPE !== "y") return; // 🚫 don't run for iframe

    // Load YT API if not already loaded
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("player", {
        height: "100%",
        width: "100%",
        videoId: VIDEO_ID,
        playerVars: { rel: 0, modestbranding: 1 },
        events: {
          onStateChange: onPlayerStateChange,
        },
      });
    };

    socket.emit("join_room", ROOM_ID);

    socket.on("video_event", ({ action, time }) => {
      if (!playerRef.current) return;

      isSyncing.current = true;

      if (action === "play") {
        playerRef.current.seekTo(time, true);
        playerRef.current.playVideo();
      } else if (action === "pause") {
        playerRef.current.pauseVideo();
      } else if (action === "seek") {
        playerRef.current.seekTo(time, true);
      }

      setTimeout(() => {
        isSyncing.current = false;
      }, 600);
    });

    return () => {
      socket.off("video_event");
    };
  }, []);

  const onPlayerStateChange = (event) => {
    if (isSyncing.current) return;

    const currentTime = playerRef.current.getCurrentTime();

    if (event.data === window.YT.PlayerState.PLAYING) {
      socket.emit("video_event", {
        roomId: ROOM_ID,
        action: "play",
        time: currentTime,
      });
    } else if (event.data === window.YT.PlayerState.PAUSED) {
      socket.emit("video_event", {
        roomId: ROOM_ID,
        action: "pause",
        time: currentTime,
      });
    }
  };

  return (
    <div style={{ width: "100%", aspectRatio: "16/9" }}>
      {PLAYER_TYPE === "y" ? (
        <div id="player"></div>
      ) : (
        <iframe
          src={`https://embos.top/movie/?mid=${VIDEO_ID}&sv=1`}
          style={{ width: "100%", height: "100%", border: "none" }}
          allowFullScreen
        />
      )}
    </div>
  );
};

