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

    const getLocation = () => new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Location is not supported by this browser."));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => resolve({ latitude: coords.latitude, longitude: coords.longitude }),
        () => reject(new Error("Location permission is needed to find people near you.")),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
      );
    });

    const findMatch = async () => {
      if (inFlightRef.current || !active) return;
      inFlightRef.current = true;

      try {
        const location = await getLocation();
        if (!active) return;

        const response = await api.post("/match/find", {
          userId: localStorage.getItem("userId"),
          gender: localStorage.getItem("gender"),
          lookingFor: localStorage.getItem("lookingFor"),
          vibes: JSON.parse(localStorage.getItem("vibes") || "[]"),
          requestId: requestIdRef.current,
          location,
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
        if (active) {
          setStatus(error.message === "Location permission is needed to find people near you."
            ? "Allow location to find people nearby"
            : "We could not find a match right now");
        }
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
        : status === "Allow location to find people nearby"
          ? "Turn on location access. We only match people within 10 km."
        : "Please try again in a moment.";

  return (
    <div className="auth-page">
      <div className="auth-card matching-card">
        <span className="match-orb" aria-hidden="true"><span /></span>
        <h1>{status}</h1>
        <p className="subtitle">{description}</p>
      </div>
    </div>
  );
}

export default Matching;
