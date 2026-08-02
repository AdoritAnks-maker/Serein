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


const socket = io(
    "http://localhost:5000"
);



function Chat(){

    const { id } = useParams();


    const [message,setMessage] = useState("");

    const [messages,setMessages] = useState([]);

    const [online,setOnline] = useState(0);



    useEffect(()=>{


        // join matched chat room

        socket.emit(
            "join-room",
            id
        );



        // receive messages

        socket.on(
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



        // online users

        socket.on(
            "online_users",
            (count)=>{


                setOnline(count);


            }
        );



        return()=>{


            socket.off(
                "receive-message"
            );


            socket.off(
                "online_users"
            );


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


            <h2>
                Chat Room
            </h2>



            <h4>
                {online} Online
            </h4>



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


                placeholder="Type message..."

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