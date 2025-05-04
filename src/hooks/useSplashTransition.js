import { useEffect, useState } from "react";

export function useSplashTransition(duration = 2000, contentDelay = 2200) {
  const [showSplash, setShowSplash] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const splashTimer = setTimeout(() => setShowSplash(false), duration);
    const contentTimer = setTimeout(() => setShowContent(true), contentDelay);

    return () => {
      clearTimeout(splashTimer);
      clearTimeout(contentTimer);
    };
  }, [duration, contentDelay]);

  return { showSplash, showContent };
}
