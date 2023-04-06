import { useState, useEffect } from "react";

/**
 * Copied from StackOverflow
 * @see {@link https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs}
 * @author eagor <https://stackoverflow.com/users/1457181/eagor>
 */
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

/**
 * Copied from StackOverflow
 * @see {@link https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs}
 * @author eagor <https://stackoverflow.com/users/1457181/eagor>
 */
export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
