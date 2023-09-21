import Join from "./components/join/join";
import "./App.css";
import Chat from "./components/chat/chat";
import { useState } from "react";

const App = () => {
  const [handShake, setHandShake] = useState(null);
  const [chatVisibility, setChatVisibility] = useState(false);
  return (
    <div className="App">
      {chatVisibility ? (
        <Chat socket={handShake} />
      ) : (
        <Join state={setChatVisibility} handShake={setHandShake} />
      )}
    </div>
  );
};

export default App;
