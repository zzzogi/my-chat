"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";

interface LanguageSelectProps {
  lng: string;
  onSubmit: (ln: string) => void;
}

export const LanguageSelect = ({ lng, onSubmit }: LanguageSelectProps) => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleToggleMenu = (e: any) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-between gap-x-1.5 w-32 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-zinc-800 dark:ring-zinc-700 dark:text-gray-100 dark:ring-opacity-10 dark:shadow-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={handleToggleMenu}
        >
          {lng === "en" ? "English" : "Tiếng Việt"}
          <svg
            className="-mr-1 h-5 w-5 text-gray-400 dark:text-gray-100"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        className={clsx(
          `absolute z-10 mt-2 w-28 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-800 dark:divide-zinc-700 dark:ring-zinc-700 dark:text-gray-100 dark:ring-opacity-10 dark:shadow-zinc-700
        `,
          open
            ? `block`
            : `hidden
        `
        )}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div className="py-1" role="none">
          <a
            href="#"
            className="text-gray-700 block px-4 py-2 text-sm dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-zinc-700"
            role="menuitem"
            id="menu-item-0"
            onClick={() => {
              if (lng === "en") return;
              onSubmit("en");
              setOpen(false);
            }}
          >
            {lng === "en" ? "English" : "Tiếng Anh"}
          </a>
          <a
            href="#"
            className="text-gray-700 block px-4 py-2 text-sm dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-zinc-700"
            role="menuitem"
            id="menu-item-1"
            onClick={() => {
              if (lng === "vi") return;
              onSubmit("vi");
              setOpen(false);
            }}
          >
            {lng === "en" ? "Vietnamese" : "Tiếng Việt"}
          </a>
        </div>
      </div>
    </div>
  );
};
