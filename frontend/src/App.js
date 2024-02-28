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
        <div className="2xl:w-1/2 w-full mx-auto">
          <Chat />
        </div>
      </div>
    </>
  );
}

export default App;
