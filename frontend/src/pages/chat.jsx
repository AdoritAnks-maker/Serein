import {
    useEffect,
    useState
} from "react";

import {
    useParams
} from "react-router-dom";

import {
    io
} from "socket.io-client";



function Chat(){


    const {id} = useParams();



    const [socket,setSocket] = useState(null);


    const [message,setMessage] = useState("");


    const [messages,setMessages] = useState([]);




    useEffect(()=>{


        const newSocket = io(
            "http://localhost:5000"
        );


        setSocket(newSocket);





        newSocket.emit(

            "join-room",

            id

        );







        newSocket.on(

            "receive-message",

            (data)=>{


                setMessages(

                    prev=>[

                        ...prev,

                        data

                    ]

                );


            }

        );





        return()=>{


            newSocket.disconnect();


        };



    },[id]);









    const sendMessage=()=>{


        if(!message.trim())
            return;




        socket.emit(

            "send-message",

            {

                room:id,

                text:message

            }

        );



        setMessage("");



    };









    return(


        <div>



            <h1>
                Chat Room
            </h1>




            <div>


            {
                messages.map(

                    (msg,index)=>(


                        <p key={index}>

                            {msg.text}

                        </p>


                    )

                )
            }


            </div>






            <input


            value={message}


            onChange={

                e=>

                setMessage(
                    e.target.value
                )

            }


            placeholder="Type message"



            />





            <button

            onClick={sendMessage}

            >

                Send

            </button>




        </div>


    );



}


export default Chat;