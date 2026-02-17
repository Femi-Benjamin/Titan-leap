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

          <div className="md:text-left text-right">
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

          <div className="md:text-left text-right">
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
