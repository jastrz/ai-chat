import React from "react";
import SettingsDialog from "./Settings/SettingsDialog";

import { IconButton, Navbar, Typography } from "@material-tailwind/react";

const NavBar = () => {
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
        <div className="ml-auto flex gap-1 md:mr-4">
          <SettingsDialog />
          <IconButton>
            <i className="fa-solid fa-id-card"></i>
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
};

export default NavBar;
