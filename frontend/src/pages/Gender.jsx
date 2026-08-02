import {useNavigate} from "react-router-dom";
import "./Auth.css";


function Gender(){


const navigate=useNavigate();


return(

<div className="auth-page">


<div className="auth-card">


<h1>
Choose Gender
</h1>


<p className="subtitle">
Help us personalize your experience
</p>



<div className="option-box">


<div 
className="option"
onClick={()=>navigate("/looking-for")}
>
Male
</div>


<div 
className="option"
onClick={()=>navigate("/looking-for")}
>
Female
</div>



<div 
className="option"
onClick={()=>navigate("/looking-for")}
>
Other
</div>



</div>



</div>


</div>


)


}


export default Gender;