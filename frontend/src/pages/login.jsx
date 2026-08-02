import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const res = await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

            // Save JWT
            localStorage.setItem(
                "token",
                res.data.token
            );

            // Save User
            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            alert("Login Successful");

            // Redirect to Profile Page
            navigate("/profile");

        } catch (err) {

            console.log(
                err.response?.data || err.message
            );

            alert(
                err.response?.data?.message ||
                "Login Failed"
            );

        }

    };

    return (

        <div>

            <h1>Login</h1>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    required
                />

                <br />
                <br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    required
                />

                <br />
                <br />

                <button type="submit">
                    Login
                </button>

            </form>

            <br />

            <button
                onClick={() =>
                    navigate("/signup")
                }
            >
                Create New Account
            </button>

        </div>

    );

}

export default Login;