import { useState, useEffect, useRef } from "react";

export function useCounterAnimation(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);

          const frames = 60;
          const totalFrames = (duration / 1000) * frames;
          const step = target / totalFrames;
          let current = 0;

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            setCount(Math.floor(current));
          }, 1000 / frames);

          return () => clearInterval(timer);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      }
    );

    // Element ko dhundne ka naya tarika (ID ki zarurat nahi padegi)
    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    } else {
      setHasStarted(true);
      setCount(target);
    }

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, [target, duration, hasStarted]);

  return { count, elementRef };
}
