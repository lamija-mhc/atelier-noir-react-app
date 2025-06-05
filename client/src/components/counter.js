import React, { useState, useEffect, useRef } from "react";

function Counter({ target, duration = 2000, start = 0 }) {
  const [count, setCount] = useState(start);
  const ref = useRef();
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let current = start;
          const end = parseFloat(target);
          const totalSteps = Math.abs(end - start);
          const stepTime = Math.abs(Math.floor(duration / totalSteps));

          const timer = setInterval(() => {
            current += 1;
            setCount(() => {
              if (current >= end) {
                clearInterval(timer);
                return end;
              }
              return current;
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
  }, [target, duration, start]);

  return (
    <strong ref={ref} className="counter">
      {Number.isInteger(target) ? Math.floor(count) : count.toFixed(1)}
    </strong>
  );
}


export default Counter;
