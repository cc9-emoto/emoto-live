import React, { useRef, useEffect } from 'react';
import Webcam from "react-webcam";
import axios from 'axios';
import "../styles/Camera.scss"

const Camera = ({ setEmotionValue }) => {
  const webcam = useRef(null);
  const videoConstraints = { width: 450, height: 250, facingMode: "user" };

  const submitData = async (base64) => {
    const response = await axios.post("http://localhost:4000/azure", { base64, userID: "test" });
    return response.data;
  };

  const setEmotion = async () => {
    const webcamData = webcam.current.getScreenshot();
    const feelings = await submitData(webcamData);
    setEmotionValue(feelings.happiness + 0.5 * feelings.neutral);
  }

  const getNextSong = async () => {
    const webcamData = webcam.current.getScreenshot();
    const feelings = await submitData(webcamData);
  }

  return (
    <div className="camera">
      <Webcam
        audio={false}
        ref={webcam}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
    </div>
  )
}

export default Camera;