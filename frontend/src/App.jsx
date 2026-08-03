import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";


import Signup from "./pages/signup";
import Login from "./pages/login";
import Gender from "./pages/Gender";
import LookingFor from "./pages/LookingFor";
import Vibe from "./pages/Vibe";
import Matching from "./pages/Matching";
import Chat from "./pages/chat";



function App() {

    return (

        <Routes>


            {/* Default Page */}

            <Route
                path="/"
                element={<Navigate to="/signup" />}
            />


            {/* Authentication */}

            <Route
                path="/signup"
                element={<Signup />}
            />


            <Route
                path="/login"
                element={<Login />}
            />



            {/* User Setup */}

            <Route
                path="/gender"
                element={<Gender />}
            />


            <Route
                path="/looking-for"
                element={<LookingFor />}
            />


            <Route
                path="/vibe"
                element={<Vibe />}
            />



            {/* Main App */}

            <Route
                path="/matching"
                element={<Matching />}
            />


            {/* Chat Routes */}

            <Route
                path="/chat"
                element={<Chat />}
            />


            <Route
                path="/chat/:id"
                element={<Chat />}
            />


            {/* Unknown Route */}

            <Route
                path="*"
                element={<Navigate to="/signup" />}
            />


        </Routes>

    );

}


export default App;
