"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type OurStoryImageProps = {
  filename: string;
  index: number;
  width: number;
};

export const OurStoryImage = ({
  filename,
  index,
  width,
}: OurStoryImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayMs = index * 120;
  const delaySec = delayMs / 1000;

  return (
    <div
      ref={ref}
      className="relative aspect-auto transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: isVisible ? `${delaySec}s` : "0s",
      }}
    >
      <Image
        src={`/images/story/${filename}`}
        alt={`Our story ${filename}`}
        width={width}
        height={800}
      />
    </div>
  );
};
