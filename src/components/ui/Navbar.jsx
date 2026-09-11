import { Menu, X } from "lucide-react";
import { useState } from "react";

import Logo from "./Logo";
import Button from "./Button";

const links = [
  {
    label: "Home",
    href: "#",
  },
  {
    label: "Menu",
    href: "#menu",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant/30 bg-surface/90 backdrop-blur-xl">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-10">

        <Logo />

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-8 md:flex">

          {links.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-xs uppercase tracking-[0.18em] transition-colors ${
                index === 0
                  ? "text-primary"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {link.label}
            </a>
          ))}

        </nav>

        {/* DESKTOP BUTTON */}
        <div className="hidden md:block">
          <Button
            onClick={() =>
              document
                .getElementById("reservation")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Reserve a Table
          </Button>
        </div>

        {/* MOBILE BUTTON */}
        <button
          type="button"
          className="text-on-surface md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* MOBILE NAVIGATION */}
      {open && (
        <nav className="border-t border-outline-variant/30 bg-surface px-5 py-5 md:hidden">

          <div className="flex flex-col gap-4">

            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="text-sm uppercase tracking-[0.16em] text-on-surface-variant transition hover:text-primary"
              >
                {link.label}
              </a>
            ))}

            <Button
              className="mt-2 w-full"
              onClick={() => {
                closeMenu();

                document
                  .getElementById("reservation")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Reserve a Table
            </Button>

          </div>

        </nav>
      )}

    </header>
  );
}