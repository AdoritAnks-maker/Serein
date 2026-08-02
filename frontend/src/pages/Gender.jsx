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
                    Choose Gender
                </h1>



                <p className="subtitle">
                    Help us find better matches
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