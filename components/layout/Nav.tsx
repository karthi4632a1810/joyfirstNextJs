"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/content";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-white md:px-10">
        <a href="#hero" className="font-serif-display text-lg tracking-tight">
          Joy First <span className="italic">Interiors</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm uppercase tracking-[0.14em] opacity-80 transition-opacity hover:opacity-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="flex flex-col gap-6 px-6 pb-10 text-white md:hidden"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-serif-display text-3xl italic"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
