import { useState, useEffect } from 'react';
import debounce from '../utils/debounce';

function getWindowDimensions() {
  const { innerWidth=1200, innerHeight=1200 } = window;
  return {
    width: innerWidth,
    height: innerHeight,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    const resizeFunc = debounce(handleResize, 300);

    window.addEventListener('resize', resizeFunc);
    return () => window.removeEventListener('resize', resizeFunc);
  }, []);

  return windowDimensions;
}
