import React, { useEffect } from "react";
import { ImagePromptComponent } from "./components/ImagePromptComponent";
import { connectWithSocketServer } from "./socketConnection";
import NavBar from "./components/NavBar";
import Chat from "./components/Chat";

function App() {
  useEffect(() => {
    connectWithSocketServer();
  }, []);

  return (
    <>
      <NavBar />
      <div className="absolute inset-x-0 bottom-2 w-full 2xl:inset-x-1/4 2xl:w-1/2">
        <Chat />
      </div>
    </>
  );
}

export default App;

/* <div class="w-full sm:w-full md:w-3/4 max-w-d space-y-4 flex-grow">
{/* <ImagePromptComponent /> */
//</div> */
