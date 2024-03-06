import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const AuthHeader = ({ title, nextTitle, nextRoute }) => {
  const navigate = useNavigate();
  const onClickNextTitle = () => {
    navigate(nextRoute);
  };

  return (
    <div className="flex flex-row mb-8">
      <div className="basis-1/2">
        <Typography variant="h4">{title}</Typography>
      </div>
      <div className="basis-1/2 flex justify-end">
        <div className="flex flex-col">
          <Button size="sm" variant="text" onClick={onClickNextTitle}>
            {nextTitle}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;
