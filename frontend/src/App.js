import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Chat from "./components/Chat/Chat";
import SignIn from "components/Auth/SignIn";
import Login from "components/Auth/Login";
import { getUserData } from "api/authApi";
import { useDispatch } from "react-redux";
import { setUserData } from "store/authSlice";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const user = await getUserData();
        if (user) {
          dispatch(setUserData(user));
          navigate("/chat");
        }
      } catch (error) {
        navigate("/login");
      }
    };

    getData();
  }, []);

  return (
    <div className="flex flex-col bg-gray-200">
      <NavBar />
      <div className="w-full mx-auto">
        <Routes>
          <Route path="/" element={<div>Loading...</div>} />
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
      </div>
    </div>
  );
}

export default App;
