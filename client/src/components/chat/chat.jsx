import style from "./chat.module.css";
import SendIcon from "@mui/icons-material/Send";
import { Input } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const Chat = ({ socket }) => {
  const messageRef = useRef();
  const bottomRef = useRef();
  const [messageBox, setMessageBox] = useState([]);
  // messageRef.current.focus();

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageBox((current) => [...current, data]);
    });

    return () => socket.off("receive_message");
  }, [socket]);

  useEffect(() => {
    bottomRef.current.scrollIntoView({ beahavior: "smooth" });
  }, [messageBox]);

  const messageSubmit = () => {
    const message = messageRef.current.value;
    if (!message.trim()) return;

    socket.emit("message", message);

    clearInput();
    messageRef.current.focus();
  };

  const clearInput = () => {
    messageRef.current.value = "";
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      messageSubmit();
    }
  };
  return (
    <div>
      <div className={style["chat-container"]}>
        <div className={style["chat-body"]}>
          {messageBox.map((message, index) => (
            <div
              className={`${style["message-container"]} ${
                message.authorID === socket.id && style["message-mine"]
              } `}
              key={index}
            >
              <div className={style["message-author"]}>
                <strong>{message.author}</strong>
              </div>
              <div className={style["message-text"]}>{message.text}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className={style["chat-footer"]}>
          <Input
            inputRef={messageRef}
            placeholder="Mensagem"
            fullWidth
            onKeyDown={handleKeyPress}
          />
          <SendIcon
            sx={{ m: 1, cursor: "pointer" }}
            style={{ color: "#129d93" }}
            onClick={() => messageSubmit()}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;  
