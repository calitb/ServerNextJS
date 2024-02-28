"use client";

import { CloseIcon, OpenIcon } from "@/components/Icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Navbar() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="notch bg-gray-800">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              className="flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
              onClick={() => setMenuOpen((state) => !state)}
            >
              {!menuOpen && <OpenIcon />}
              {menuOpen && <CloseIcon />}
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/" className="text-lg text-white">
                calitb.dev
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  href="/repositories"
                  className={twMerge(
                    pathname === "/repositories"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white ",
                    "rounded-md px-3 py-2 text-sm font-medium",
                  )}
                >
                  Repositories
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={twMerge("sm:hidden", menuOpen ? "block" : "hidden")}>
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link
            href="/repositories"
            className={twMerge(
              pathname === "/repositories"
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white ",
              "block rounded-md px-3 py-2 text-base font-medium",
            )}
          >
            Repositories
          </Link>
        </div>
      </div>
    </nav>
  );
}
