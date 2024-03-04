import React from "react";
import { Typography } from "@material-tailwind/react";
import Typing from "components/Common/Typing/Typing";

const TextContent = ({ index, data }) => {
  return (
    <div key={index} style={{ whiteSpace: "pre-wrap" }}>
      <Typography className="text-white" variant="small">
        {data}
      </Typography>
      {data.length === 0 && <Typing />}
    </div>
  );
};

export default TextContent;
