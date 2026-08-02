import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../services/api";
import "./Auth.css";


function Signup(){


const navigate=useNavigate();


const [form,setForm]=useState({

username:"",
email:"",
password:"",
bio:""

});


const [loading,setLoading]=useState(false);



const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};



const submit=async()=>{


try{

setLoading(true);


const res=await api.post(
"/auth/signup",
form
);


console.log(res.data);


// next step

navigate("/gender");


}

catch(err){

console.log(err);

}

finally{

setLoading(false);

}


};



return(

<div className="auth-page">


<div className="auth-card">


<h1>
Create Account
</h1>


<p className="subtitle">
Join your college vibe community
</p>



<input

name="username"

placeholder="Username"

onChange={handleChange}

/>



<input

name="email"

placeholder="College Email"

type="email"

onChange={handleChange}

/>



<input

name="password"

placeholder="Password"

type="password"

onChange={handleChange}

/>



<textarea

name="bio"

placeholder="Tell something about yourself..."

onChange={handleChange}

/>



<button onClick={submit}>

{
loading?
"Creating..."
:
"Create Account"
}

</button>



<div className="auth-link">


Already have an account?


<span
onClick={()=>navigate("/login")}
>

Login

</span>


</div>



</div>


</div>


)

}


export default Signup;