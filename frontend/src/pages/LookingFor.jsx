import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function LookingFor() {

    const navigate = useNavigate();

    const [selected, setSelected] = useState("");

    const handleSelect = (option) => {

        setSelected(option);

        // Later:
        // await api.put("/auth/profile", { lookingFor: option });

        console.log("Looking For:", option);

        setTimeout(() => {
            navigate("/vibe");
        }, 200);

    };

    return (

        <div className="auth-page">

            <div className="auth-card">

                <h1>
                    Looking For
                </h1>

                <p className="subtitle">
                    What brings you here today?
                </p>

                <div className="option-box">

                    <div
                        className={`option ${selected === "Friends" ? "selected" : ""}`}
                        onClick={() => handleSelect("Friends")}
                    >
                        👥 Friends
                    </div>

                    <div
                        className={`option ${selected === "Study Partner" ? "selected" : ""}`}
                        onClick={() => handleSelect("Study Partner")}
                    >
                        📚 Study Partner
                    </div>

                    <div
                        className={`option ${selected === "Projects" ? "selected" : ""}`}
                        onClick={() => handleSelect("Projects")}
                    >
                        💻 Projects
                    </div>

                </div>

            </div>

        </div>

    );

}

export default LookingFor;