import {
    useEffect,
    useRef,
    useState
} from "react";


import {
    useNavigate
} from "react-router-dom";


import api from "../services/api";



function Matching(){


    const navigate = useNavigate();


    const [status,setStatus] = useState(
        "Finding Match..."
    );


    const [loading,setLoading] = useState(false);



    const intervalRef = useRef(null);






    const findMatch = async()=>{


        if(loading)
            return;



        try{


            setLoading(true);



            const userId = localStorage.getItem(
                "userId"
            );


            const gender = localStorage.getItem(
                "gender"
            );


            const lookingFor = localStorage.getItem(
                "lookingFor"
            );


            const vibes = JSON.parse(

                localStorage.getItem("vibes") || "[]"

            );






            console.log(
                "SENDING MATCH DATA:",
                {
                    userId,
                    gender,
                    lookingFor,
                    vibes
                }
            );







            const res = await api.post(

                "/match/find",

                {

                    userId,
                    gender,
                    lookingFor,
                    vibes

                }

            );







            console.log(
                "MATCH RESPONSE:",
                res.data
            );







            if(res.data.matched){


                setStatus(
                    "Match Found 🎉"
                );



                // stop checking

                if(intervalRef.current){

                    clearInterval(
                        intervalRef.current
                    );

                }






                setTimeout(()=>{


                    navigate(

                        "/chat/" + res.data.chatId

                    );


                },500);




            }

            else{


                setStatus(

                    "Waiting for someone..."

                );


            }






        }
        catch(error){


            console.log(
                "MATCH ERROR:",
                error
            );


            setStatus(
                "Error finding match"
            );


        }
        finally{


            setLoading(false);


        }



    };









    useEffect(()=>{



        // first search

        findMatch();





        // check every 3 seconds

        intervalRef.current = setInterval(()=>{


            findMatch();


        },3000);







        return()=>{


            if(intervalRef.current){

                clearInterval(
                    intervalRef.current
                );

            }


        };



    },[]);











    return(


        <div className="auth-page">


            <div className="auth-card">



                <h1>

                    {status}

                </h1>






                {
                    status === "Waiting for someone..." &&


                    <p className="subtitle">

                        Searching for your vibe partner...

                    </p>


                }





                {
                    status === "Finding Match..." &&


                    <p className="subtitle">

                        Please wait...

                    </p>


                }






            </div>


        </div>


    );



}



export default Matching;