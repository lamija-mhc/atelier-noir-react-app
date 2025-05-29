import React, { useState, useEffect, useRef } from "react";

function Counter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const end = parseFloat(target);
          const stepTime = Math.abs(Math.floor(duration / end));

          const timer = setInterval(() => {
            start += 1;
            setCount((prev) => {
              if (start >= end) {
                clearInterval(timer);
                return end;
              }
              return start;
            });
          }, stepTime);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [target, duration]);

  return (
    <strong ref={ref} className="counter">
      {Number.isInteger(target) ? Math.floor(count) : count.toFixed(1)}
    </strong>
  );
}

export default Counter;
