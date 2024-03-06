import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Chat from "./components/Chat/Chat";
import SignIn from "components/Auth/SignIn";
import Login from "components/Auth/Login";

function App() {
  return (
    <div className="flex flex-col bg-gray-200">
      <NavBar />
      <div className="2xl:w-1/2 w-full mx-auto">
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/chat" />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="*"
              element={
                <div>
                  <h2>404 Page not found</h2>
                </div>
              }
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
