"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "./Icon";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Sources", href: "/sources" },
  { label: "Account", href: "/account" },
];

export function TopNavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed top-0 left-0 w-full z-50 h-16 bg-surface border-b border-outline-variant flex justify-between items-center px-gutter">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="md:hidden text-on-surface-variant hover:text-primary transition-colors duration-200"
            aria-label="Open menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center border border-outline-variant overflow-hidden">
              <Icon name="auto_awesome" filled size={18} />
            </div>
            <span className="text-headline-md font-display font-bold text-primary">
              Seerah Q&A
            </span>
          </Link>
        </div>
      </div>

      <nav className="hidden md:flex gap-6 items-center h-full">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`font-label-md text-label-md transition-colors duration-200 h-full flex items-center ${
              isActive(link.href)
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="hidden md:flex items-center gap-2 bg-primary-container text-on-primary font-label-md text-label-md px-4 py-2 rounded-full hover:bg-primary transition-colors duration-200"
        >
          Ask a Question
        </Link>
        <Link
          href="/account"
          className="p-2 text-on-surface-variant hover:text-primary transition-colors duration-200 rounded-full hover:bg-surface-variant"
          aria-label="Account"
        >
          <Icon name="person" />
        </Link>
      </div>

      {menuOpen ? (
        <div className="md:hidden fixed top-16 left-0 w-full bg-surface-container-lowest border-b border-outline-variant shadow-organic-lg p-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-3 rounded-xl font-label-md text-label-md transition-colors ${
                isActive(link.href)
                  ? "bg-secondary-container text-on-secondary-container"
                  : "text-on-surface-variant hover:bg-surface-variant"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}
