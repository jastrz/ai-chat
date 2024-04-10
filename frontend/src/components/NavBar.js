import React, { useEffect, useState } from "react";
import SettingsDialog from "./Settings/SettingsDialog";
import { IconButton, Navbar, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset as resetAuth } from "store/authSlice";
import { reset as resetChat } from "store/chatSlice";
import { disconnectFromSocketServer } from "socketConnection/socketConnection";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(userData && !!userData.userId);
  }, [userData]);

  const onClickLogout = () => {
    localStorage.clear("userToken");
    navigate("/login");
    disconnectFromSocketServer();
    dispatch(resetAuth());
    dispatch(resetChat());
  };

  return (
    <Navbar
      style={{ height: "70px" }}
      variant="gradient"
      color="blue-gray"
      className="mx-auto from-blue-gray-900 to-blue-gray-500 px-4 py-3"
      fullWidth
    >
      <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
        <Typography
          as="a"
          href=""
          variant="h6"
          className="mr-4 ml-2 cursor-pointer py-1.5 tracking-widest subpixel-antialiased"
        >
          HeHe-adder
        </Typography>
        {loggedIn && (
          <div className="ml-auto flex gap-1 md:mr-4">
            <SettingsDialog />
            <IconButton onClick={onClickLogout}>
              <i className="fa-solid fa-sign-out"></i>
            </IconButton>
          </div>
        )}
      </div>
    </Navbar>
  );
};

export default NavBar;
