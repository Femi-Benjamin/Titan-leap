"use client";
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.png";

const navItems: { label: string; path: string }[] = [
  { label: "Home", path: "/" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Services", path: "/services" },
  { label: "Pricing", path: "/pricing" },
  { label: "Contacts", path: "/contacts" },
];

export default function Topbar() {
  const [activeItem, setActiveItem] = useState("Home");
  const [hoveredItem, setHoveredItem] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [textColor, setTextColor] = useState("text-black"); // default

  const location = useLocation();

  // 🔹 Helper to get effective background color at a point
  const getBackgroundColorAtPoint = (x: number, y: number) => {
    const elements = document.elementsFromPoint(x, y);

    for (const el of elements) {
      // Skip the navbar/header and any of its children
      if (el.closest("header") || el.classList.contains("fixed")) continue;

      const style = window.getComputedStyle(el);
      const bgColor = style.backgroundColor;

      // Skip transparent or unset colors
      if (
        bgColor &&
        bgColor !== "rgba(0, 0, 0, 0)" &&
        bgColor !== "transparent"
      ) {
        return bgColor;
      }
    }
    return "rgb(255, 255, 255)"; // Default to white
  };

  // 🔹 Detect the background color behind the header on scroll
  useEffect(() => {
    const handleScroll = () => {
      // If at the very top (or close to it), use default gray
      if (window.scrollY < 50) {
        setTextColor("text-gray-300");
        return;
      }

      // Check multiple points to be safer, or just center
      const x = window.innerWidth / 2;
      const y = 32; // Middle of header

      const bgColor = getBackgroundColorAtPoint(x, y);

      const rgb = bgColor.match(/\d+/g)?.map(Number);

      if (rgb && rgb.length >= 3) {
        const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
        setTextColor(brightness > 128 ? "text-black" : "text-white");
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger once immediately
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (item: string) => {
    setActiveItem(item);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const match = navItems.find((n) => n.path === location.pathname);
    if (match) setActiveItem(match.label);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="relative">
      <header className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
        {/* Background Blur Layer with Fade Mask */}
        <div
          className="absolute inset-0 backdrop-blur-2xl z-0"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 50%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 50%, transparent 100%)",
          }}
        />

        <div className="mx-auto px-5 sm:px-6 lg:px-[90px] relative z-10">
          <div
            className={`flex items-center justify-between h-[65px] ${textColor}`}
          >
            {/* Logo */}
            <div className="flex-shrink-0 items-center">
              <img
                className="w-40 transition-all duration-300"
                src={Logo}
                alt="titanleap logo"
              />
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-5 ">
              {navItems.map((item) => (
                <div key={item.path} className="relative">
                  <NavLink
                    to={item.path}
                    onMouseEnter={() => setHoveredItem(item.label)}
                    onMouseLeave={() => setHoveredItem("")}
                    onClick={() => handleNavClick(item.label)}
                    className={({ isActive }) =>
                      `relative px-3 py-2 text-base leading-10 font-medium transition-colors duration-200  ${
                        isActive
                          ? "text-purple-600"
                          : `${textColor} hover:text-purple-600`
                      }`
                    }
                  >
                    {item.label}
                    <div
                      className={`absolute top-[9px] right-1 transform translate-y-1/2 w-2 h-2 bg-yellow-400 rounded-full transition-opacity duration-200 ${
                        activeItem === item.label || hoveredItem === item.label
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />
                  </NavLink>
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <button
              className={`hidden md:inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md transition-colors duration-200 ${
                textColor === "text-gray-300"
                  ? "border-gray-300 text-gray-300 hover:bg-gray-50/10"
                  : "border-yellow-400 text-yellow-600 hover:bg-yellow-50/80"
              }`}
            >
              {"Let's talk"}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className={`md:hidden inline-flex items-center justify-center p-2 rounded-md ${textColor} hover:bg-gray-200/40 transition-colors duration-200`}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              <svg
                className={`h-6 w-6 transition-transform duration-300`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 backdrop-blur-md bg-white/90 border-t border-white/20 shadow-lg z-40 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-4 invisible"
          }`}
        >
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navItems.map((item, index) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => handleNavClick(item.label)}
                className={({ isActive }) =>
                  `block px-4 py-3 text-base font-medium w-full text-left rounded-lg transition-all duration-200 transform ${
                    isActive
                      ? "text-[#411697] bg-purple-50/80 border-l-4 border-[#411697]"
                      : "text-gray-700 hover:text-[#411697] hover:bg-gray-50/80"
                  }`
                }
                style={{
                  animationDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms",
                }}
              >
                <div className="flex items-center justify-between">
                  {item.label}
                  {activeItem === item.label && (
                    <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                  )}
                </div>
              </NavLink>
            ))}
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className={`w-full inline-flex justify-center items-center px-6 py-3 border text-sm font-medium rounded-lg transition-colors duration-200 ${
                  textColor === "text-gray-300"
                    ? "border-gray-300 text-gray-300 hover:bg-gray-50/10"
                    : "border-yellow-400 text-yellow-600 hover:bg-yellow-50/80"
                }`}
              >
                {"Let's talk"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
