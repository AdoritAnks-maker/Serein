import {
    useEffect,
    useState
} from "react";

import {io} from "socket.io-client";


const socket = io(
    "http://localhost:5000"
);



function Chat(){


    const [message,setMessage] = useState("");
    const [messages,setMessages] = useState([]);
    const [online,setOnline] = useState(0);



    const sendMessage=()=>{


        if(!message.trim())
            return;


        socket.emit(
            "send_message",
            {
                text:message
            }
        );


        setMessage("");

    };



    useEffect(()=>{


        socket.on(
            "receive_message",
            (data)=>{

                setMessages(
                    prev=>[
                        ...prev,
                        data
                    ]
                );

            }
        );


        socket.on(
            "online_users",
            (count)=>{

                setOnline(count);

            }
        );



        return()=>{

            socket.off(
                "receive_message"
            );

            socket.off(
                "online_users"
            );

        }


    },[]);



    return(

        <div>


            <h2>
                Chat Room
            </h2>


            <h4>
                {online} Online
            </h4>



            {
                messages.map(
                    (msg,index)=>(

                        <p key={index}>
                            {msg.text}
                        </p>

                    )
                )
            }



            <input
                value={message}
                onChange={
                    e=>setMessage(
                        e.target.value
                    )
                }
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