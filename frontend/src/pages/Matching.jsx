import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Auth.css";

function Matching() {
  const navigate = useNavigate();
  const intervalRef = useRef(null);
  const inFlightRef = useRef(false);
  const requestIdRef = useRef(null);
  const [status, setStatus] = useState("Finding your people...");

  useEffect(() => {
    let active = true;

    const findMatch = async () => {
      if (inFlightRef.current || !active) return;
      inFlightRef.current = true;

      try {
        const response = await api.post("/match/find", {
          userId: localStorage.getItem("userId"),
          gender: localStorage.getItem("gender"),
          lookingFor: localStorage.getItem("lookingFor"),
          vibes: JSON.parse(localStorage.getItem("vibes") || "[]"),
          requestId: requestIdRef.current,
        });

        if (!active) return;
        if (response.data.matched) {
          setStatus("A good match is ready");
          clearInterval(intervalRef.current);
          window.setTimeout(() => navigate(`/chat/${response.data.chatId}`), 500);
        } else {
          requestIdRef.current = response.data.requestId;
          setStatus("Still looking...");
        }
      } catch (error) {
        if (active) setStatus("We could not find a match right now");
        console.log("MATCH ERROR:", error);
      } finally {
        inFlightRef.current = false;
      }
    };

    findMatch();
    intervalRef.current = window.setInterval(findMatch, 3000);
    return () => {
      active = false;
      clearInterval(intervalRef.current);
    };
  }, [navigate]);

  const description = status === "Still looking..."
    ? "We are looking for someone with your kind of energy."
    : status === "A good match is ready"
      ? "Opening your conversation now."
      : status === "Finding your people..."
        ? "Getting everything ready."
        : "Please try again in a moment.";

  return (
    <div className="auth-page">
      <div className="auth-card matching-card">
        <span className="match-orb" aria-hidden="true" />
        <h1>{status}</h1>
        <p className="subtitle">{description}</p>
      </div>
    </div>
  );
}

export default Matching;
