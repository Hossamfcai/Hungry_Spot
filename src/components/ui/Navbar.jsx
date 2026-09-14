/* eslint-disable no-constant-condition */
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant/30 bg-surface/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between  px-5 lg:px-10">
        <Logo />

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link, index) => {
            return location.pathname === "/Authentication/Login" ||
              location.pathname === "/Authentication/Sign_Up" ? (
              <a
                key={link.label}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/landingpage${link.href}`);
                }}
                className={`text-xs uppercase tracking-[0.18em] transition-all text-on-surface-variant hover:text-primary cursor-pointer `}
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className={`text-xs uppercase tracking-[0.18em] transition-all cursor-pointer ${
                  index === 0
                    ? "text-primary"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* DESKTOP BUTTON */}

        <div
          className={`hidden md:block ${location.pathname.includes("/Authentication") ? "invisible" : ""}`}
        >
          <Button onClick={() => navigate("/Authentication/Login")}>
            Order Now
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
            {links.map((link) => {
              return location.pathname === "/Authentication/Login" ||
                location.pathname === "/Authentication/Sign_Up" ? (
                <a
                  key={link.label}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/landingpage${link.href}`);
                  }}
                  className={`text-xs uppercase tracking-[0.18em] transition-all text-on-surface-variant hover:text-primary cursor-pointer `}
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs uppercase tracking-[0.18em] transition-all cursor-pointer text-on-surface-variant hover:text-primary"
                >
                  {link.label}
                </a>
              );
            })}

            {!location.pathname.includes("/Authentication") && (
              <Button onClick={() => navigate("/Authentication/Login")}>
                Order Now
              </Button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
