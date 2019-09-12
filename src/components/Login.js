import React from "react";
import axiosConfig from "../helpers/axiosConfig.js";
import spotifyLogo from '../assets/images/spotifyLogo.png'
import "../styles/Login.scss"

const Login = () => {
  const handleLogin = async () => {
    const response = await axiosConfig.get("/spotify/authorize");
    window.open(response.data);
  };
  
  return (
    <div className="login">
      <button onClick={handleLogin}>
        <img src={spotifyLogo} />
        Login with Spotify
      </button>
    </div>
  );
};

export default Login;
