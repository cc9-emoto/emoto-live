import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "../styles/Callback.scss";

const Callback = ({ location }) => {
  const [loaded, setLoaded] = useState(false);
  const code = location.search;

  useEffect(() => {
    const getTokens = async () => {
      const res = await axios.get(
        `https://hur7tfyff1.execute-api.us-east-2.amazonaws.com/Prod/spotify/callback${code}`,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      Cookies.set("emoto-access", res.data.access_token);
      Cookies.set("emoto-refresh", res.data.refresh_token);
      Cookies.set("emoto-id", res.data.uid);
      setLoaded(true);
      return;
    };
    getTokens();
    return;
  }, []);

  if (loaded) return <Redirect to="/dashboard" />;
  else {
    return (
      <div class="container">
        <div class="ring">
          Loading
          <span class="spin"></span>
        </div>
      </div>
    );
  }
};
export default Callback;
