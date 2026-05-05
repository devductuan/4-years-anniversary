"use client";

import { Button } from "@/modules/shared/Button/Button";

export const PortfolioScrollButton = () => {
  const handleClick = () => {
    document.getElementById("portfolio")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <Button onClick={handleClick} className="mx-auto md:mx-0 my-8">
      Know more about me
    </Button>
  );
};
