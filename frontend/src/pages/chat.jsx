import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import api, { SOCKET_URL } from "../services/api";
import "../App.css";

function Chat() {
  const { id } = useParams();
  const bottomRef = useRef(null);
  const socketRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!id) return undefined;

    const newSocket = io(SOCKET_URL);
    socketRef.current = newSocket;

    newSocket.on("connect", () => {
      setConnected(true);
      newSocket.emit("join-room", id);
    });
    newSocket.on("disconnect", () => setConnected(false));
    newSocket.on("receive-message", (data) => {
      setMessages((previous) => [...previous, data]);
    });

    const loadChat = async () => {
      try {
        const response = await api.get(`/chat/${id}`);
        setMessages(response.data.messages || []);
      } catch (error) {
        console.log("Chat Load Error:", error);
      }
    };
    loadChat();

    return () => {
      socketRef.current = null;
      newSocket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    const text = message.trim();
    if (!text || !socketRef.current || !id || !connected) return;

    socketRef.current.emit("send-message", {
      room: id,
      sender: localStorage.getItem("userId"),
      text,
    });
    setMessage("");
  };

  const currentUserId = localStorage.getItem("userId");

  return (
    <main className="chat-page">
      <section className="chat-shell" aria-label="Private conversation">
        <header className="chat-header">
          <div className="chat-identity">
            <span className="brand-orb" aria-hidden="true" />
            <div>
              <p className="chat-name">Serein</p>
              <p className="chat-subtitle">Closer conversations, less noise</p>
            </div>
          </div>
          <span className={`connection-state ${connected ? "is-connected" : ""}`}>
            <span className="status-dot" />
            {connected ? "Connected" : "Connecting"}
          </span>
        </header>

        <div className="chat-body" aria-live="polite">
          {messages.length === 0 && (
            <p className="chat-empty">You’re connected. Say hello when you’re ready.</p>
          )}
          {messages.map((msg, index) => (
            <div
              className={`message-row ${String(msg.sender) === String(currentUserId) ? "own" : "other"}`}
              key={msg._id || `${msg.createdAt || "message"}-${index}`}
            >
              <p className="message-bubble">{msg.text}</p>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="chat-composer">
          <form className="composer-form" onSubmit={sendMessage}>
            <input
              aria-label="Message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Write a message..."
              autoComplete="off"
            />
            <button className="send-button" type="submit" aria-label="Send message" disabled={!message.trim() || !connected}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z" /><path d="m22 2-11 11" /></svg>
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Chat;
