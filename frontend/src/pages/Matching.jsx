import {
    useEffect,
    useState
} from "react";

import api from "../services/api";

import {
    useNavigate
} from "react-router-dom";



function Matching(){


const navigate = useNavigate();


const [status,setStatus] = useState(
"Finding Match..."
);



useEffect(()=>{

    findMatch();

},[]);





const findMatch = async()=>{


try{


const res =
await api.post(
"/match/find",
{

userId:
localStorage.getItem("userId"),


gender:
localStorage.getItem("gender"),


lookingFor:
localStorage.getItem("lookingFor"),


vibes:
JSON.parse(
localStorage.getItem("vibes")
)


}
);




if(res.data.chatId)
{

navigate(
"/chat/"+res.data.chatId
);

}
else
{

setStatus(
"Waiting for match..."
);

}



}
catch(error){

console.log(error);

setStatus(
"Error finding match"
);

}



};





return(

<div>

<h2>
{status}
</h2>


</div>

);


}



export default Matching;