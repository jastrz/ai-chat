import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import Chat from "./components/Chat/Chat";

import { connectWithSocketServer } from "./socketConnection";

function App() {
  useEffect(() => {
    connectWithSocketServer();
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <NavBar />
        <Chat />
      </div>
    </>
  );
}

export default App;
