import { useNavigate } from "react-router-dom";
import "./Auth.css";


function Gender(){

    const navigate = useNavigate();



    const selectGender = (gender)=>{


        localStorage.setItem(

            "gender",

            gender

        );



        navigate("/looking-for");


    };





    return(


        <div className="auth-page">


            <div className="auth-card">


                <h1>
                    A little about you
                </h1>



                <p className="subtitle">
                    This helps us introduce you to the right people.
                </p>





                <div className="option-box">





                    <div

                    className="option"

                    onClick={()=>selectGender("Male")}

                    >

                        Male

                    </div>






                    <div

                    className="option"

                    onClick={()=>selectGender("Female")}

                    >

                        Female

                    </div>






                    <div

                    className="option"

                    onClick={()=>selectGender("Other")}

                    >

                        Other

                    </div>





                </div>



            </div>


        </div>


    );


}



export default Gender;
