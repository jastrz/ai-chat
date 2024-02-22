import React from "react";
import { Button } from "@material-tailwind/react";

const SettingsTabControls = ({ onApply, onReset }) => {
  return (
    <div className="space-x-4 self-end">
      <Button size="sm" onClick={onReset}>
        Reset
      </Button>
      <Button size="sm" onClick={onApply}>
        Apply
      </Button>
    </div>
  );
};

export default SettingsTabControls;
