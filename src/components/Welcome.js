// frontend/src/components/Welcome.js

import React, { useEffect, useState } from "react";
import { getWelcomeMessage } from "../services/api";

const Welcome = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const welcomeMessage = await getWelcomeMessage();
        console.log(welcomeMessage);    
        setMessage(welcomeMessage);
      } catch (err) {
        setError("Error fetching welcome message");
      }
    };
  
    fetchMessage();
  }, []);
  

  return (
    <div>
      {error && <p>{error}</p>}
      {message ? <h1>{message}</h1> : <p>Loading...</p>}
    </div>
  );
};

export default Welcome;
