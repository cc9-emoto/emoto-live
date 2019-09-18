import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import "../styles/Camera.scss";

const Camera = ({ setEmotionValue }) => {
  const webcam = useRef(null);
  const videoConstraints = { width: 450, height: 250, facingMode: "user" };

  useEffect(() => {
    setInterval(updateEmotionValue, 10000);
  }, []);

  const submitData = async base64 => {
    const base64Data = base64.replace(/^data:image\/jpeg;base64,/, "");
    const response = await axios.post(
      "https://d3swd275y6.execute-api.us-east-2.amazonaws.com/default/face_recognition2",
      base64Data
    );
    console.log(response.data);
    return response.data;
  };

  const updateEmotionValue = async () => {
    const webcamData = webcam.current.getScreenshot();
    const feelings = await submitData(webcamData);
    setEmotionValue(feelings.happiness + 0.5 * feelings.neutral);
  };

  const getNextSong = async () => {
    const webcamData = webcam.current.getScreenshot();
    const feelings = await submitData(webcamData);
  };

  return (
    <div className="camera">
      <Webcam
        audio={false}
        ref={webcam}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
    </div>
  );
};

export default Camera;
