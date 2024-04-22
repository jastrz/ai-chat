import React from "react";
import { Typography } from "@material-tailwind/react";

const UsernameIndicator = ({ username }) => {
  return (
    <Typography
      color="white"
      style={{ fontSize: "0.7rem", fontWeight: "bold" }}
    >
      {username}
    </Typography>
  );
};

export default UsernameIndicator;
