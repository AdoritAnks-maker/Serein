import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Vibe() {
  const navigate = useNavigate();
  const [vibes, setVibes] = useState([]);
  const options = [
    "Coding", "Music", "Gaming", "Films", "Photography", "Books",
    "Fitness", "Food", "Travel", "Art", "Anime", "Sports",
    "Startups", "Design", "Dance", "Debate",
  ];

  const toggleVibe = (vibe) => {
    setVibes((selected) => (
      selected.includes(vibe) ? selected.filter((item) => item !== vibe) : [...selected, vibe]
    ));
  };

  const next = () => {
    if (vibes.length === 0) {
      alert("Choose at least one interest to continue.");
      return;
    }
    localStorage.setItem("vibes", JSON.stringify(vibes));
    navigate("/matching");
  };

  return (
    <div className="auth-page">
      <div className="auth-card vibe-card">
        <h1>What draws you in?</h1>
        <p className="subtitle">Choose a few interests. Shared ground makes an easy first hello.</p>
        <div className="vibe-grid">
          {options.map((vibe) => (
            <button
              className={`vibe-option ${vibes.includes(vibe) ? "selected" : ""}`}
              key={vibe}
              type="button"
              onClick={() => toggleVibe(vibe)}
              aria-pressed={vibes.includes(vibe)}
            >
              {vibe}
            </button>
          ))}
        </div>
        <p className="selection-count">
          {vibes.length === 0 ? "Select at least one interest" : `${vibes.length} interest${vibes.length === 1 ? "" : "s"} selected`}
        </p>
        <button onClick={next}>Find my people</button>
      </div>
    </div>
  );
}

export default Vibe;
