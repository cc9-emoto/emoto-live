import React from "react";
import axiosConfig from "../helpers/axiosConfig.js";
import "../styles/Login.scss";
import "bootstrap/dist/css/bootstrap.css";
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
    const response = await axiosConfig.get("/spotify/authorize");
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
        <div className="container">
          <div className="row">
            <div
              data-aos="fade-down"
              className="col-lg-6 col-md-8 col-sm-8 col-xs-8"
            ></div>
            <div className="description animated fadeInDown delay-1s col-lg-6 col-md-4 col-sm-4 col-xs-4">
              <h1 className="description__emoto">Music for every emotion.</h1>
              <p className="description__detail">
                Infinite music recommendations,
                <br />
                powered by facial recognition
              </p>
              <button
                type="button"
                className="description__btn btn btn-lg"
                onClick={handleLogin}
              >
                <img src={spotifyLogo} />
                Login with Spotify
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="visual">
        <div className="container">
          <div data-aos="fade-right" className="row">
            <div className="description col-lg-6 col-md-6 col-sm-6 col-xs-6">
              <p className="description__detail">
                Equalizer that responds to <br />
                your music and your mood.
              </p>
              <h1 className="description__emoto">
                Visualize <br />
                your music.
              </h1>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6"></div>
          </div>
        </div>
      </section>

      <section className="speaker">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6"></div>
            <div
              data-aos="fade-left"
              className="description col-lg-7 col-md-6 col-sm-6 col-xs-6"
            >
              <p className="description__detail">
                Always-on voice recognition <br />
                listening to your every command.
              </p>
              <h1 className="description__emoto">
                Control music <br />
                with your voice.
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="ai">
        <div className="container">
          <div className="row">
            <div
              data-aos="fade-right"
              className="description col-lg-7 col-md-6 col-sm-6 col-xs-6"
            >
              <p className="description__detail">
                Cutting-edge computer vision algorithm
                <br />
                detects changes in your emotional state.
              </p>
              <h1 className="description__emoto">
                Powered by <br />
                AI Facial Analysis
              </h1>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6"></div>
          </div>
        </div>
      </section>

      <section className="team">
        <div className="container">
          <div className="row">
            <div
              data-aos="fade-right"
              className="description col-lg-8 col-md-8 col-sm-8 col-xs-8"
            >
              <h1 className="description__emoto">Meet the team.</h1>
            </div>
          </div>
          <div className="row">
            <div
              data-aos="fade-up"
              className="description__person col-lg-3 col-md-3 col-sm-3 col-xs-3"
            >
              <img className="team__head" src={wilson} alt="wilson"></img>
              <button
                className="github__btn"
                onClick={() => {
                  window.open(
                    "https://www.linkedin.com/in/wilsonplau",
                    "_blank"
                  );
                }}
              >
                Wilson
              </button>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="description__person col-lg-3 col-md-3 col-sm-3 col-xs-3"
            >
              <img className="team__head" src={matt} alt="matt"></img>
              <button
                className="github__btn"
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
              className="description__person col-lg-3 col-md-3 col-sm-3 col-xs-3"
            >
              <img className="team__head" src={go} alt="go"></img>
              <button
                className="github__btn"
                onClick={() => {
                  window.open(
                    "https://www.linkedin.com/in/go-nakano/",
                    "_blank"
                  );
                }}
              >
                Go
              </button>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="600"
              className="description__person col-lg-3 col-md-3 col-sm-3 col-xs-3"
            >
              <img className="team__head" src={rina} alt="rina"></img>
              <button
                className="github__btn"
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
