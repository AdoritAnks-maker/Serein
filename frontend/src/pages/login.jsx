import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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


            const res = await axios.post(

                "http://localhost:5000/api/auth/login",

                form

            );



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

                    Welcome Back

                </h1>





                <p className="subtitle">

                    Login to your college community

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

                    Login

                </button>









                <p className="subtitle">


                    Don't have account?



                    <span


                    style={{

                        color:"#60a5fa",

                        cursor:"pointer"

                    }}



                    onClick={()=>navigate("/signup")}



                    >

                    Signup

                    </span>


                </p>







            </div>



        </div>


    );


}



export default Login;