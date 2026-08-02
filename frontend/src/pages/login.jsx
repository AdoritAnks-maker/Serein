import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./Auth.css";


function Login(){

const navigate=useNavigate();


const [form,setForm]=useState({

email:"",
password:""

});


const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

})

}



const login=()=>{

console.log(form);

// API call later

navigate("/chat");

}



return(

<div className="auth-page">


<div className="auth-card">


<h1>
Welcome Back
</h1>


<p className="subtitle">
Login to your college community
</p>



<input

name="email"

type="email"

placeholder="College Email"

onChange={handleChange}

/>



<input

name="password"

type="password"

placeholder="Password"

onChange={handleChange}

/>



<button onClick={login}>
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

)

}


export default Login;