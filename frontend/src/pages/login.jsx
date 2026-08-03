import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Auth.css";


function Login(){

    const navigate = useNavigate();


    const [form,setForm] = useState({

        email:"",
        password:""

    });



    const [error,setError] = useState("");




    const handleChange = (e)=>{


        setForm({

            ...form,

            [e.target.name]:e.target.value

        });


    };







    const login = async()=>{


        try{


            const res = await api.post("/auth/login", form);



            console.log(res.data);





            // save token

            localStorage.setItem(

                "token",

                res.data.token

            );







            // save user id

            localStorage.setItem(

                "userId",

                res.data.userId

            );







            // go for profile preferences

            navigate("/gender");



        }

        catch(err){


            console.log(err);



            setError(

                err.response?.data?.message ||

                "Login Failed"

            );


        }


    };








    return(


        <div className="auth-page">


            <div className="auth-card">





                <h1>

                    Welcome back

                </h1>





                <p className="subtitle">

                    Pick up where the good conversations left off.

                </p>







                {
                    error &&

                    <p style={{color:"red"}}>

                        {error}

                    </p>

                }








                <input


                    name="email"


                    type="email"


                    placeholder="College Email"


                    value={form.email}


                    onChange={handleChange}


                />








                <input


                    name="password"


                    type="password"


                    placeholder="Password"


                    value={form.password}


                    onChange={handleChange}


                />








                <button

                    onClick={login}

                >

                    Continue to Serein

                </button>









                <p className="subtitle">


                    New here?



                    <span


                    style={{

                        color:"#60a5fa",

                        cursor:"pointer"

                    }}



                    onClick={()=>navigate("/signup")}



                    >

                    Create an account

                    </span>


                </p>







            </div>



        </div>


    );


}



export default Login;
