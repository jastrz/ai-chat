import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

const Animation = ({ children, animationConfig }) => {
  const springProps = useSpring(animationConfig);

  return <animated.div style={springProps}>{children}</animated.div>;
};

export const HoverableAnimation = ({ children, animationConfig }) => {
  const [currentConfig, setCurrentConfig] = useState(animationConfig);

  const handleMouseEnter = () => {
    console.log("mouse enter");
    setCurrentConfig({
      to: animationConfig.from,
      from: animationConfig.to,
    });
  };

  const handleMouseLeave = () => {
    setCurrentConfig({
      from: animationConfig.from,
      to: animationConfig.to,
    });
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Animation animationConfig={currentConfig}>{children}</Animation>
    </div>
  );
};

export default Animation;
