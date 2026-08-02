import { useNavigate } from "react-router-dom";
import "./Auth.css";


function LookingFor(){


    const navigate = useNavigate();



    const selectOption = (option)=>{


        localStorage.setItem(

            "lookingFor",

            option

        );


        navigate("/vibe");


    };






    return(


        <div className="auth-page">


            <div className="auth-card">


                <h1>
                    Looking For
                </h1>



                <p className="subtitle">

                    Who do you want to connect with?

                </p>





                <div className="option-box">



                    <div

                    className="option"

                    onClick={()=>selectOption("Male")}

                    >

                        👨 Male

                    </div>






                    <div

                    className="option"

                    onClick={()=>selectOption("Female")}

                    >

                        👩 Female

                    </div>






                    <div

                    className="option"

                    onClick={()=>selectOption("Other")}

                    >

                        🌈 Other

                    </div>





                </div>



            </div>


        </div>


    );



}


export default LookingFor;