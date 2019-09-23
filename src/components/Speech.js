import React, { useEffect } from "react";
import "../styles/Speech.scss";
import Cookies from "js-cookie";
import Spotify from "../helpers/Spotify";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const Speech = ({ player, voiceLang, setVoiceLang, playlist }) => {
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = voiceLang;

  useEffect(() => {
    handleListen();
  }, [voiceLang]);

  const secretPlay = async () => {
    const token = Cookies.get("emoto-access");
    const deviceId = player.current._options.id;
    await Spotify.startSecretTrack({ token, deviceId });
  };

  const handleListen = async () => {
    await recognition.start();
    recognition.onresult = async e => {
      const text = e.results[e.resultIndex][0].transcript;
      if (
        text.toLowerCase().includes("stop") ||
        text.includes("ポーズ") ||
        text.includes("止まれ") ||
        text.includes("ストップ")
      ) {
        player.current.pause();
      }
      if (
        text.toLowerCase().includes("play") ||
        text.toLowerCase().includes("start") ||
        text.includes("スタート")
      ) {
        player.current.resume();
      }
      if (
        text.toLowerCase().includes("skip") ||
        text.toLowerCase().includes("next") ||
        text.includes("スキップ") ||
        text.includes("次")
      ) {
        player.current.nextTrack();
      }
      if (text.toLowerCase().includes("back") || text.includes("戻れ")) {
        player.current.previousTrack();
      }
      if (
        text.toLowerCase().includes("test") ||
        text.toLowerCase().includes("police please")
      ) {
        console.log("Oh, yeah!");
        secretPlay();
      }
    };
  };

  return (
    <div className="speech">
      <button
        className="speech__button"
        aria-expanded={voiceLang === "en-US"}
        onClick={() => setVoiceLang("en-US")}
      >
        EN
      </button>
      <button
        className="speech__button"
        aria-expanded={voiceLang === "ja-JP"}
        onClick={() => setVoiceLang("ja-JP")}
      >
        JP
      </button>
    </div>
  );
};

export default Speech;
