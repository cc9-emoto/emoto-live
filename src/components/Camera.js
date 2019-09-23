import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import "../styles/Camera.scss";

const Camera = ({ setEmotionValue }) => {
  const webcam = useRef(null);
  const videoConstraints = { width: 450, height: 250, facingMode: "user" };

  useEffect(() => {
    const updateEmotionValue = async () => {
      const webcamData = webcam.current.getScreenshot();
      const feelings = await submitData(webcamData);
      setEmotionValue(feelings.happiness + 0.5 * feelings.neutral);
    };
    setInterval(updateEmotionValue, 10000);
  }, [setEmotionValue]);

  const submitData = async base64 => {
    const base64Data = base64.replace(/^data:image\/jpeg;base64,/, "");
    const response = await axios.post(
      "https://d3swd275y6.execute-api.us-east-2.amazonaws.com/default/face_recognition2",
      base64Data
    );
    return response.data;
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
