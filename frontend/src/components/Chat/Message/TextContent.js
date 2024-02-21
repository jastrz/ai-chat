import React from "react";
import { Typography } from "@material-tailwind/react";

const TextContent = ({ index, data }) => {
  return (
    <div key={index} style={{ whiteSpace: "pre-wrap" }}>
      <Typography variant="small">{data}</Typography>
    </div>
  );
};

export default TextContent;
