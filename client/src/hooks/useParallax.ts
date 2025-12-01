import { useEffect, useRef, useState } from "react";

interface ParallaxOptions {
  offset?: number;
  speed?: number;
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const { offset: initialOffset = 0, speed = 0.5 } = options;

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const elementOffset = rect.top + scrolled;
        const distance = scrolled - elementOffset + window.innerHeight;
        setOffset(distance * speed);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return { ref, offset: offset + initialOffset };
};
