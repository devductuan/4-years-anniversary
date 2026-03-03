"use client";

import { useEffect, useState } from "react";
import { Logo } from "../Logo/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../Button/Button";

const SCROLL_THRESHOLD = 10;

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll(); // run once in case page loads scrolled
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-2 transition-colors duration-300 flex gap-4 flex-wrap items-center justify-between ${
        isScrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}>
      <div className="flex items-center flex-wrap gap-x-10 md:gap-x-20">
        <Logo src="/images/lily-logo.webp" />
        <ul className="flex gap-4 items-center font-bold text-sm md:gap-10">
          <li>
            <Link
              href="/anniversaries"
              className={pathname === "/anniversaries" ? "text-pink-500" : ""}>
              Anniversaries
            </Link>
          </li>
          <li>
            <Link
              href="/portfolio"
              className={pathname === "/portfolio" ? "text-pink-500" : ""}>
              Portfolio
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <Button href="/admin" className="text-sm">Admin</Button>
      </div>
    </header>
  );
};
