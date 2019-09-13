import React, { useEffect } from 'react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; 

const Speech = ({ player }) => {
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = "en-US";

  useEffect(() => {
    handleListen();
  }, [])

  const handleListen = async () => {
    await recognition.start();
    recognition.onresult = async (e) => {
      const text = e.results[e.resultIndex][0].transcript;
      console.log(text);
      if (text.toLowerCase().includes("stop")) {
        console.log("STOP");
        player.current.pause();
      }
      if (text.toLowerCase().includes("play")) {
        console.log("PLAY");
        player.current.resume();
      }
      if (text.toLowerCase().includes("skip") || text.toLowerCase().includes("next")) {
        console.log("SKIP");
        player.current.nextTrack();
      }
      if (text.toLowerCase().includes("back")) {
        console.log("BACK");
        player.current.previousTrack();
      }
    }
  }

  return (
    <></>
  )
}

export default Speech;