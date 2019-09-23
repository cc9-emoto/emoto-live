import React from "react";
// import axiosConfig from "../helpers/axiosConfig.js";
import axios from "axios";
import "../styles/Login.scss";
import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css";
import wilson from "../assets/images/wilson.jpg";
import matt from "../assets/images/matt.jpg";
import go from "../assets/images/go.jpg";
import rina from "../assets/images/rina.jpg";
import spotifyLogo from "../assets/images/spotifyLogo.png";
import emotologo from "../assets/images/emotologo.svg";

AOS.init();

const Login = () => {
  const handleLogin = async () => {
    // const response = await axiosConfig.get("/spotify/authorize");
    const response = await axios.get(
      "https://hur7tfyff1.execute-api.us-east-2.amazonaws.com/Prod/spotify/authorization",
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    window.open(response.data);
  };

  return (
    <div className="login">
      <nav className="navbar">
        <div className="navbar__emoto">
          <img src={emotologo} alt="emoto" />
          <h1 className="navbar__appname">Emoto</h1>
        </div>
        <button
          type="button"
          className="navbar__btn btn btn-lg"
          onClick={handleLogin}
        >
          <img src={spotifyLogo} />
          Login
        </button>
      </nav>

      <section className="home">
        <div className="home__description animated fadeInDown delay-1s">
          <h1 className="home__description--big">Music for every emotion.</h1>
          <p className="home__description--small">
            Infinite music recommendations, <br /> powered by facial recognition
          </p>
          <button className="home__loginBtn" onClick={handleLogin}>
            <img src={spotifyLogo} />
            <div className="home__loginBtnText">
              <h2>Login with Spotify</h2>
              <small>(Requires Spotify Premium)</small>
            </div>
          </button>
        </div>
      </section>

      <section className="visual">
        <div data-aos="fade-right" className="description">
          <p className="description__detail">
            Equalizer that responds to <br />
            your music and your mood.
          </p>
          <h1 className="description__emoto">
            Visualize <br />
            your music.
          </h1>
        </div>
      </section>

      <section className="speaker">
        <div data-aos="fade-left" className="description">
          <p className="description__detail">
            Always-on voice recognition <br />
            listening to your every command.
          </p>
          <h1 className="description__emoto">
            Control music <br />
            with your voice.
          </h1>
        </div>
      </section>

      <section className="ai">
        <div className="description" data-aos="fade-right">
          <p className="description__detail">
            Cutting-edge computer vision algorithm
            <br />
            detects changes in your emotional state.
          </p>
          <h1 className="description__emoto">
            Powered by <br /> AI Facial Analysis
          </h1>
        </div>
      </section>

      <section className="team">
        <div data-aos="fade-right" className="description">
          <h1 className="description__emoto">Meet the team.</h1>
        </div>
        <div className="faces">
          <div data-aos="fade-up" className="description__person wilson">
            <div
              className="team__head"
              style={{ backgroundImage: `url(${wilson})` }}
            ></div>
            <button
              className="team__btn"
              onClick={() => {
                window.open("https://www.linkedin.com/in/wilsonplau", "_blank");
              }}
            >
              Wilson
            </button>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="description__person matt"
          >
            <div
              className="team__head matt"
              style={{ backgroundImage: `url(${matt})` }}
            ></div>
            <button
              className="team__btn"
              onClick={() => {
                window.open("https://www.linkedin.com/in/mc255v", "_blank");
              }}
            >
              Matt
            </button>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="description__person go"
          >
            <div
              className="team__head"
              style={{ backgroundImage: `url(${go})` }}
            ></div>
            <button
              className="team__btn"
              onClick={() => {
                window.open("https://www.linkedin.com/in/go-nakano/", "_blank");
              }}
            >
              Go
            </button>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className="description__person rina"
          >
            <div
              className="team__head"
              style={{ backgroundImage: `url(${rina})` }}
            ></div>
            <button
              className="team__btn"
              onClick={() => {
                window.open(
                  "https://www.linkedin.com/in/rinasakamaki/",
                  "_blank"
                );
              }}
            >
              Rina
            </button>
          </div>
        </div>
      </section>

      <div className="bottom">
        <p>
          Copyright <span>©</span>️ Emoto 2019
        </p>
      </div>
    </div>
  );
};

export default Login;
