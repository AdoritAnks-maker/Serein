import {useState} from "react";
import {useNavigate} from "react-router-dom";


function Vibe(){

    const navigate = useNavigate();


    const [vibes,setVibes] = useState([]);



    const add = (v)=>{


        if(!vibes.includes(v))
        {

            setVibes([
                ...vibes,
                v
            ]);

        }

    };



    const next = ()=>{


        localStorage.setItem(
            "vibes",
            JSON.stringify(vibes)
        );


        navigate("/matching");


    };



    return(

        <div>

            <h2>
                Select Your Vibe
            </h2>


            <button onClick={()=>add("coding")}>
                Coding
            </button>


            <button onClick={()=>add("music")}>
                Music
            </button>


            <button onClick={()=>add("gaming")}>
                Gaming
            </button>


            <button onClick={()=>add("movies")}>
                Movies
            </button>



            <br/><br/>


            <button onClick={next}>
                Find Match
            </button>


        </div>

    );


}


export default Vibe;