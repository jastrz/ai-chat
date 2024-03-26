import React from "react";
import { Typography } from "@material-tailwind/react";

const UsernameIndicator = ({ username, timestamp }) => {
  return (
    <div className="mb-2">
      <Typography
        color="white"
        style={{ fontSize: "0.7rem", fontWeight: "bold" }}
      >
        {username}
      </Typography>
      <Typography color="white" style={{ fontSize: "0.6rem" }}>
        {timestamp.slice(11, 16)}
      </Typography>
    </div>
  );
};

export default UsernameIndicator;
