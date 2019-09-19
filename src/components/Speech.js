import React, { useEffect } from "react";
import "../styles/Speech.scss";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const Speech = ({ player, voiceLang, setVoiceLang }) => {
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = voiceLang;

  useEffect(() => {
    handleListen();
  }, [voiceLang]);

  const handleListen = async () => {
    await recognition.start();
    recognition.onresult = async e => {
      const text = e.results[e.resultIndex][0].transcript;
      console.log(text);
      if (
        text.toLowerCase().includes("stop") ||
        text.includes("ポーズ") ||
        text.includes("止まれ") ||
        text.includes("ストップ")
      ) {
        console.log("STOP");
        player.current.pause();
      }
      if (text.toLowerCase().includes("play") || text.toLowerCase().includes("start") || text.includes("スタート")) {
        console.log("PLAY");
        player.current.resume();
      }
      if (
        text.toLowerCase().includes("skip") ||
        text.toLowerCase().includes("next") ||
        text.includes("スキップ") ||
        text.includes("次")
      ) {
        console.log("SKIP");
        player.current.nextTrack();
      }
      if (text.toLowerCase().includes("back") || text.includes("戻れ")) {
        console.log("BACK");
        player.current.previousTrack();
      }
    };
  };

  return (
    <div className="speech">
      <button
        className="speech__button"
        aria-selected={voiceLang === "en-US"}
        onClick={() => setVoiceLang("en-US")}
      >
        EN
      </button>
      <button
        className="speech__button"
        aria-selected={voiceLang === "ja-JP"}
        onClick={() => setVoiceLang("ja-JP")}
      >
        JP
      </button>
    </div>
  );
};

export default Speech;
