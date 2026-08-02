import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get("/users/profile");
                setUser(res.data);
            } catch (error) {
                console.log(error.response?.data || error.message);

                alert("Please login first");

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    if (loading) {
        return <h2>Loading Profile...</h2>;
    }

    if (!user) {
        return <h2>User Not Found</h2>;
    }

    return (
        <div
            style={{
                maxWidth: "700px",
                margin: "40px auto",
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "10px",
            }}
        >
            <h1>My Profile</h1>

            <hr />

            <p>
                <strong>Username:</strong> {user.username}
            </p>

            <p>
                <strong>Email:</strong> {user.email}
            </p>

            <p>
                <strong>Gender:</strong> {user.gender}
            </p>

            <p>
                <strong>Looking For:</strong> {user.lookingFor}
            </p>

            <p>
                <strong>Bio:</strong>
            </p>

            <p>{user.bio || "No bio added."}</p>

            <h3>Vibes</h3>

            {user.vibes && user.vibes.length > 0 ? (
                <ul>
                    {user.vibes.map((vibe, index) => (
                        <li key={index}>{vibe}</li>
                    ))}
                </ul>
            ) : (
                <p>No vibes selected.</p>
            )}

            <br />

            <button
                onClick={() => navigate("/discover")}
                style={{ marginRight: "10px" }}
            >
                Discover Students
            </button>

            <button
                onClick={() => navigate("/chat")}
                style={{ marginRight: "10px" }}
            >
                Open Chat
            </button>

            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default Profile;