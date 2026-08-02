import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";


import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Gender from "./pages/Gender";
import LookingFor from "./pages/LookingFor";
import Vibe from "./pages/Vibe";
import Matching from "./pages/Matching";
import Chat from "./pages/Chat";



function App(){


return(

<Routes>


{/* Default Page */}

<Route
path="/"
element={
<Navigate to="/signup"/>
}
/>



{/* Authentication */}

<Route
path="/signup"
element={<Signup/>}
/>


<Route
path="/login"
element={<Login/>}
/>



{/* User Setup */}

<Route
path="/gender"
element={<Gender/>}
/>


<Route
path="/looking-for"
element={<LookingFor/>}
/>


<Route
path="/vibe"
element={<Vibe/>}
/>



{/* Main App */}

<Route
path="/matching"
element={<Matching/>}
/>


<Route
path="/chat/:id"
element={<Chat/>}
/>



</Routes>

);


}


export default App;