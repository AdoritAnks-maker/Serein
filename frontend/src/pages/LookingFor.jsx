import { useNavigate } from "react-router-dom";
import "./Auth.css";

function LookingFor() {
  const navigate = useNavigate();

  const selectOption = (option) => {
    localStorage.setItem("lookingFor", option);
    navigate("/vibe");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Choose your circle</h1>
        <p className="subtitle">Who would you like to meet today?</p>
        <div className="option-box">
          {["Male", "Female", "Other"].map((option) => (
            <button className="option" key={option} type="button" onClick={() => selectOption(option)}>
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LookingFor;
