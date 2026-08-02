import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./Auth.css";


function Vibe(){

    const navigate = useNavigate();


    const [vibes,setVibes] = useState([]);



    const options = [

        "Coding",
        "Music",
        "Gaming",
        "Movies"

    ];





    const toggleVibe = (vibe)=>{


        if(vibes.includes(vibe)){


            setVibes(

                vibes.filter(
                    item => item !== vibe
                )

            );


        }

        else{


            setVibes([

                ...vibes,

                vibe

            ]);


        }


    };







    const next = ()=>{


        if(vibes.length===0){

            alert(
                "Please select at least one vibe"
            );

            return;

        }





        localStorage.setItem(

            "vibes",

            JSON.stringify(vibes)

        );




        navigate("/matching");


    };







    return(


        <div className="auth-page">


            <div className="auth-card">



                <h1>
                    Select Your Vibes
                </h1>



                <p className="subtitle">

                    Select one or more vibes

                </p>





                <div className="option-box">



                {

                options.map(

                    (vibe)=>(


                        <div

                        key={vibe}


                        className={

                            vibes.includes(vibe)

                            ?

                            "option selected"

                            :

                            "option"

                        }


                        onClick={()=>toggleVibe(vibe)}


                        >

                            {vibe}


                        </div>



                    )

                )


                }


                </div>







                <p>

                    Selected:

                    {" "}

                    {
                    vibes.length>0
                    ?
                    vibes.join(", ")
                    :
                    "None"
                    }

                </p>








                <button

                onClick={next}

                >

                    Find Match

                </button>




            </div>


        </div>


    );


}


export default Vibe;