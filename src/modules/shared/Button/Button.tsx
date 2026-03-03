import React from "react";
import clsx from "clsx";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
  className?: string;
  href?: string;
};

export const Button = ({ children, className, href }: Props) => {
  return (
    <Link
      href={href ?? ""}
      className={clsx(
        "border border-zinc-500 w-max hover:border-pink-500 focus:border-pink-500 cursor-pointer outline-none block text-sm text-black hover:bg-pink-500 hover:text-white focus:text-white focus:bg-pink-500 transition-all duration-300  px-4 py-2 rounded-md font-semibold",
        className,
      )}>
      {children}
    </Link>
  );
};
