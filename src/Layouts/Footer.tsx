import React from "react";
import { Linkedin, Twitter, Dribbble } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#4C12BF] pt-20 pb-10 border-t border-white/5 text-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Our services</h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-accent-yellow transition-colors"
                >
                  Online Media Management
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent-yellow transition-colors"
                >
                  Content Creation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent-yellow transition-colors"
                >
                  Search Engine Optimization
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent-yellow transition-colors"
                >
                  Product Design
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent-yellow transition-colors"
                >
                  Motion Design
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent-yellow transition-colors"
                >
                  Brand Identity
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Solutions</h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-accent-yellow transition-colors"
                >
                  Digital Marketing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent-yellow transition-colors"
                >
                  E-commerce Solutions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent-yellow transition-colors"
                >
                  Analytics and Reporting
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent-yellow transition-colors"
                >
                  Consulting Services
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Cases</h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-accent-yellow transition-colors"
                >
                  Future Pay
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent-yellow transition-colors"
                >
                  Future labs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent-yellow transition-colors"
                >
                  E-commerce Giant
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent-yellow transition-colors"
                >
                  Kloudaa
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent-yellow transition-colors"
                >
                  Client XYZ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent-yellow transition-colors underline"
                >
                  See more cases
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Company</h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-accent-yellow transition-colors"
                >
                  Who we are
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent-yellow transition-colors"
                >
                  Clients
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent-yellow transition-colors"
                >
                  Jobs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent-yellow transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent-yellow transition-colors"
                >
                  Contacts
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-500">
          <div className="flex items-center gap-4 order-2 md:order-1">
            <span>+1 (415) 655-1002</span>
            <span className="hidden md:inline">|</span>
            <span>830 Stewart Drive, #212, Sunnyvale, CA, USA, 94085</span>
          </div>

          <div className="flex items-center gap-6 order-1 md:order-2">
            <a href="#" className="hover:text-white transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Dribbble size={18} />
            </a>
          </div>

          <div className="flex items-center gap-6 order-3">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span>© {new Date().getFullYear()}, Titan Leap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// import { Linkedin, Twitter } from "lucide-react";

// const Footer = () => {
//   return (
//     <footer className="w-full bg-[#4C12BF] text-white pt-20 pb-8 px-6 md:px-12 border-t border-purple-500/30">
//       <div className="max-w-7xl mx-auto">
//         {/* Top Section - 4 Columns */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
//           {/* Our Services */}
//           <div>
//             <h3 className="font-bold text-lg md:text-xl mb-8">Our services</h3>
//             <ul className="space-y-4 text-purple-200 text-sm md:text-base font-light">
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Online Media Management
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Content Creation
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Search Engine Optimization
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Product Design
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Motion Design
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Brand Identity
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Solutions */}
//           <div className="text-right md:text-left">
//             <h3 className="font-bold text-lg md:text-xl mb-8">Solutions</h3>
//             <ul className="space-y-4 text-purple-200 text-sm md:text-base font-light">
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Digital Marketing
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   E-commerce Solutions
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Analytics and Reporting
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Consulting Services
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Cases */}
//           <div>
//             <h3 className="font-bold text-lg md:text-xl mb-8">Cases</h3>
//             <ul className="space-y-4 text-purple-200 text-sm md:text-base font-light">
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Future Pay
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Future Labs
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   E-commerce Giant
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Kloudaa
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Client XYZ
//                 </a>
//               </li>
//               {/* <li>
//                 <a
//                   href="#"
//                   className="hover:text-white transition-colors mt-8 inline-block opacity-70"
//                 >
//                   See more cases
//                 </a>
//               </li> */}
//             </ul>
//           </div>

//           {/* Company */}
//           <div className="text-right md:text-left">
//             <h3 className="font-bold text-lg md:text-xl mb-8">Company</h3>
//             <ul className="space-y-4 text-purple-200 text-sm md:text-base font-light">
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Who we are
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Clients
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Jobs
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Blog
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Contacts
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Separator Line */}
//         <div className="w-full h-px bg-purple-400/30 mb-8"></div>

//         {/* Bottom Section */}
//         <div className="flex flex-col md:flex-row items-center justify-between text-purple-200 gap-6 md:gap-0 text-sm md:text-base">
//           {/* Contact Info (Left) */}
//           <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
//             <span>+234 81-4115-1183</span>
//             <span className="hidden md:inline">|</span>
//             <span>830 Stewart Drive, #212, Sunnyvale, CA, USA, 94085</span>
//           </div>

//           {/* Social Icons (Center) */}
//           <div className="flex items-center gap-6">
//             <a href="#" className="hover:text-white transition-colors">
//               <Linkedin size={20} />
//             </a>
//             <a href="#" className="hover:text-white transition-colors">
//               <Twitter size={20} />
//             </a>
//             <a
//               href="#"
//               className="hover:text-white transition-colors font-bold text-lg"
//             >
//               Bē
//             </a>{" "}
//             {/* Behance text fallack/icon */}
//           </div>

//           {/* Legal (Right) */}
//           <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
//             <a href="#" className="hover:text-white transition-colors">
//               Privacy Policy
//             </a>
//             <span className="hidden md:inline">|</span>
//             <span>© {new Date().getFullYear()}, Titan Leap</span>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
