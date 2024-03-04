import React from "react";
import { useSpring, animated } from "react-spring";

const Animation = ({ children, animationConfig }) => {
  const springProps = useSpring(animationConfig);

  return <animated.div style={springProps}>{children}</animated.div>;
};

export default Animation;
