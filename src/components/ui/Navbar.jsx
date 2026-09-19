/* eslint-disable no-constant-condition */
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Button from "./Button";
import UserDropdown from "./DropDown";
import { useMenuState } from "../../Contexts/AppContext";

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
  const { menu } = useMenuState();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const categories = [...new Set(menu.map((item) => item.category))];

  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant/30 bg-surface/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between  px-5 lg:px-10">
        <Logo />

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-8 md:flex">
          {location.pathname !== "/Restaurant" &&
            links.map((link, index) => {
              if (
                location.pathname === "/Authentication/Login" ||
                location.pathname === "/Authentication/Sign_Up"
              ) {
                return (
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
                );
              } else {
                return (
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
              }
            })}
          {location.pathname == "/Restaurant" &&
            categories.map((category, i) => {
              return (
                <a
                  key={i}
                  href={`#${category.toLowerCase()}`}
                  className={`text-xs uppercase tracking-[0.18em] transition-all cursor-pointer focus:text-primary`}
                >
                  {category}
                </a>
              );
            })}
        </nav>

        {/* DESKTOP BUTTON */}

        {!location.pathname.includes("/Restaurant") ? (
          <div
            className={`hidden md:block ${location.pathname.includes("/Authentication") ? "invisible" : ""}`}
          >
            <Button onClick={() => navigate("/Authentication/Login")}>
              Order Now
            </Button>
          </div>
        ) : (
          <UserDropdown />
        )}

        {/* MOBILE BUTTON */}
        {!location.pathname.includes("/Restaurant") && (
          <button
            type="button"
            className="text-on-surface md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
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

            {!location.pathname.includes("/Authentication") &&
            !location.pathname.includes("/Restaurant") ? (
              <Button onClick={() => navigate("/Authentication/Login")}>
                Order Now
              </Button>
            ) : (
              ""
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
