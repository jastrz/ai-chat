import React, { useEffect } from "react";
import { connectWithSocketServer } from "./socketConnection";
import NavBar from "./components/NavBar";
import Chat from "./components/Chat/Chat";

function App() {
  useEffect(() => {
    connectWithSocketServer();
  }, []);

  return (
    <>
      <NavBar />
      <div className="absolute inset-x-0 bottom-0 w-full 2xl:inset-x-1/4 2xl:w-1/2">
        <Chat />
      </div>
    </>
  );
}

export default App;
