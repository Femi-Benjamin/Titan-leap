"use client";
import { useState } from "react";
import Logo from "../assets/Logo.png";

export default function Topbar() {
  const [activeItem, setActiveItem] = useState("Home");
  const [hoveredItem, setHoveredItem] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = ["Home", "Our work", "Services", "Pricing", "Contacts"];

  const handleNavClick = (item: string) => {
    setActiveItem(item);
    setIsMobileMenuOpen(false); // Close mobile menu when item is clicked
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="relative">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[65px]">
            {/* Logo */}
            <div className="flex-shrink-0 items-center">
              <img className="w-40" src={Logo} alt="titanleap logo" />
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item} className="relative">
                  <button
                    onClick={() => handleNavClick(item)}
                    onMouseEnter={() => setHoveredItem(item)}
                    onMouseLeave={() => setHoveredItem("")}
                    className={`relative px-3 py-2 xl:text-xl md:text-md font-medium transition-colors duration-200 ${
                      activeItem === item
                        ? "text-[#411697]"
                        : "text-[#4116974D] hover:text-[#411697]"
                    }`}
                  >
                    {item}
                    {/* Yellow dot indicator */}
                    <div
                      className={`absolute top-[9px] right-1 transform translate-y-1/2 w-2 h-2 bg-yellow-400 rounded-full transition-opacity duration-200 ${
                        activeItem === item || hoveredItem === item
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <button className="hidden md:inline-flex items-center px-4 py-2 border border-purple-600 text-purple-600 text-sm font-medium rounded-md hover:bg-purple-50/80 transition-colors duration-200 backdrop-blur-sm">
              {"Let's talk"}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100/80 transition-colors duration-200 backdrop-blur-sm"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              <svg
                className={`h-6 w-6 transition-transform duration-300 ${
                  isMobileMenuOpen ? "rotate-90" : ""
                }`}
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

        {/* Mobile Navigation - Positioned absolutely to not affect layout */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 backdrop-blur-md bg-white/90 border-t border-white/20 shadow-lg z-40 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-4 invisible"
          }`}
        >
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navItems.map((item, index) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`block px-4 py-3 text-base font-medium w-full text-left rounded-lg transition-all duration-200 transform backdrop-blur-sm ${
                  activeItem === item
                    ? "text-[#411697] bg-purple-50/80 border-l-4 border-[#411697]"
                    : "text-gray-600 hover:text-[#411697] hover:bg-gray-50/80"
                }`}
                style={{
                  animationDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms",
                }}
              >
                <div className="flex items-center justify-between">
                  {item}
                  {activeItem === item && (
                    <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                  )}
                </div>
              </button>
            ))}
            <div className="pt-4 border-t border-gray-100/50">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full inline-flex justify-center items-center px-6 py-3 border border-purple-600 text-purple-600 text-sm font-medium rounded-lg hover:bg-purple-50/80 transition-colors duration-200 backdrop-blur-sm"
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

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-[65px]"></div>

      {/* Content area */}
      {/* <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Titan Leap
          </h1>
          <p className="text-lg text-gray-600">
            Currently viewing:{" "}
            <span className="font-semibold text-purple-600">{activeItem}</span>
          </p>
        </div>
      </main> */}
    </div>
  );
}

// "use client";
// import { useState } from "react";
// import Logo from "../assets/Logo.png";

// export default function Topbar() {
//   const [activeItem, setActiveItem] = useState("Home");
//   const [hoveredItem, setHoveredItem] = useState("");
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const navItems = ["Home", "Our work", "Services", "Pricing", "Contacts"];

//   const handleNavClick = (item: string) => {
//     setActiveItem(item);
//     setIsMobileMenuOpen(false); // Close mobile menu when item is clicked
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <div className="relative">
//       <header className="shadow-2xl relative z-50">
//         <div className="mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-[65px]">
//             {/* Logo */}
//             <div className="flex-shrink-0 items-center">
//               <img className="w-40" src={Logo} alt="titanleap logo" />
//             </div>

//             {/* Navigation */}
//             <nav className="hidden md:flex items-center space-x-8">
//               {navItems.map((item) => (
//                 <div key={item} className="relative">
//                   <button
//                     onClick={() => handleNavClick(item)}
//                     onMouseEnter={() => setHoveredItem(item)}
//                     onMouseLeave={() => setHoveredItem("")}
//                     className={`relative px-3 py-2 xl:text-xl md:text-md font-medium transition-colors duration-200 ${
//                       activeItem === item
//                         ? "text-[#411697]"
//                         : "text-[#4116974D] hover:text-[#411697]"
//                     }`}
//                   >
//                     {item}
//                     {/* Yellow dot indicator */}
//                     <div
//                       className={`absolute top-[9px] right-1 transform translate-y-1/2 w-2 h-2 bg-yellow-400 rounded-full transition-opacity duration-200 ${
//                         activeItem === item || hoveredItem === item
//                           ? "opacity-100"
//                           : "opacity-0"
//                       }`}
//                     />
//                   </button>
//                 </div>
//               ))}
//             </nav>

//             {/* CTA Button */}
//             <button className="hidden md:inline-flex items-center px-4 py-2 border border-purple-600 text-purple-600 text-sm font-medium rounded-md hover:bg-purple-50 transition-colors duration-200">
//               {"Let's talk"}
//             </button>

//             {/* Mobile menu button */}
//             <button
//               onClick={toggleMobileMenu}
//               className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors duration-200"
//               aria-expanded={isMobileMenuOpen}
//               aria-label="Toggle mobile menu"
//             >
//               <svg
//                 className={`h-6 w-6 transition-transform duration-300 ${
//                   isMobileMenuOpen ? "rotate-90" : ""
//                 }`}
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 {isMobileMenuOpen ? (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 ) : (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation - Positioned absolutely to not affect layout */}
//         <div
//           className={`md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 transition-all duration-300 ease-in-out ${
//             isMobileMenuOpen
//               ? "opacity-100 translate-y-0 visible"
//               : "opacity-0 -translate-y-4 invisible"
//           }`}
//         >
//           <div className="px-4 pt-4 pb-6 space-y-2">
//             {navItems.map((item, index) => (
//               <button
//                 key={item}
//                 onClick={() => handleNavClick(item)}
//                 className={`block px-4 py-3 text-base font-medium w-full text-left rounded-lg transition-all duration-200 transform ${
//                   activeItem === item
//                     ? "text-[#411697] bg-purple-50 border-l-4 border-[#411697]"
//                     : "text-gray-600 hover:text-[#411697] hover:bg-gray-50"
//                 }`}
//                 style={{
//                   animationDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms",
//                 }}
//               >
//                 <div className="flex items-center justify-between">
//                   {item}
//                   {activeItem === item && (
//                     <div className="w-2 h-2 bg-yellow-400 rounded-full" />
//                   )}
//                 </div>
//               </button>
//             ))}
//             <div className="pt-4 border-t border-gray-100">
//               <button
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="w-full inline-flex justify-center items-center px-6 py-3 border border-purple-600 text-purple-600 text-sm font-medium rounded-lg hover:bg-purple-50 transition-colors duration-200"
//               >
//                 {"Let's talk"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Backdrop overlay for mobile menu */}
//       {isMobileMenuOpen && (
//         <div
//           className="fixed inset-0 bg-opacity-25 z-30 md:hidden transition-opacity duration-300"
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//       )}

//       {/* Content area */}
//       {/* <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">
//             Welcome to Titan Leap
//           </h1>
//           <p className="text-lg text-gray-600">
//             Currently viewing:{" "}
//             <span className="font-semibold text-purple-600">{activeItem}</span>
//           </p>
//         </div>
//       </main> */}
//     </div>
//   );
// }
