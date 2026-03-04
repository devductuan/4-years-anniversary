import React from "react";
import { Logo } from "../Logo/Logo";
import Link from "next/link";

export const Footer = () => {
  return (
    <>
      <hr className="w-full text-zinc-200" />
      <footer className="py-10 h-full bg-white pb-40">
        <div className="px-4 w-full container mx-auto md:flex gap-10 justify-between">
          <div>
            <Logo src="/images/lily-logo.webp" />
            <p className="text-sm text-gray-500 mt-2">From Chris with love</p>
            <hr className="my-4 w-full md:hidden text-zinc-200" />
          </div>
          <div>
            <p className="text-lg font-bold">Legacy websites</p>
            <ul className="flex flex-col gap-2 mt-4 md:flex-row gap-6">
              <li>
                <Link
                  target="_blank"
                  href="https://legendary-tapioca-c2ddc4.netlify.app/">
                  300 Days
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  href="https://anniversary-anh-yeu-em.netlify.app/">
                  First Anniversary
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  href="https://thuhuecuaanh.netlify.app/">
                  Second Anniversary
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};
