import React from "react";
import { Typography } from "@material-tailwind/react";
import Typing from "../../Common/Typing/Typing";

const TextContent = ({ index, data }) => {
  return (
    <div key={index} style={{ whiteSpace: "pre-wrap" }}>
      <Typography variant="small">{data}</Typography>
      {data.length === 0 && <Typing />}
    </div>
  );
};

export default TextContent;
