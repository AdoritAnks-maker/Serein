import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


function Signup(){

    const navigate = useNavigate();


    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [gender,setGender] = useState("");
    const [lookingFor,setLookingFor] = useState("");
    const [bio,setBio] = useState("");
    const [vibes,setVibes] = useState([]);



    const handleSignup = async(e)=>{

        e.preventDefault();


        try{

            const res = await api.post(
                "/auth/register",
                {
                    username,
                    email,
                    password,
                    gender,
                    lookingFor,
                    bio,
                    vibes
                }
            );


            alert(
                "Signup Successful"
            );


            navigate("/login");


        }
        catch(err){

            console.log(
                err.response?.data
            );

            alert(
                err.response?.data?.message ||
                "Signup Failed"
            );

        }

    };


    return(

        <div>

            <h1>
                Create Account
            </h1>


            <form onSubmit={handleSignup}>


                <input
                    placeholder="Username"
                    onChange={
                        e=>setUsername(e.target.value)
                    }
                />


                <input
                    placeholder="Email"
                    onChange={
                        e=>setEmail(e.target.value)
                    }
                />


                <input
                    type="password"
                    placeholder="Password"
                    onChange={
                        e=>setPassword(e.target.value)
                    }
                />


                <input
                    placeholder="Gender (Male/Female/Other)"
                    onChange={
                        e=>setGender(e.target.value)
                    }
                />


                <input
                    placeholder="Looking For"
                    onChange={
                        e=>setLookingFor(e.target.value)
                    }
                />


                <textarea
                    placeholder="Bio"
                    onChange={
                        e=>setBio(e.target.value)
                    }
                />


                <input
                    placeholder="Vibes: Coding,Music,Tech"
                    onChange={
                        e=>
                        setVibes(
                            e.target.value.split(",")
                        )
                    }
                />


                <button>
                    Signup
                </button>


            </form>


        </div>

    );

}


export default Signup;