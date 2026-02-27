import React from "react";
import { Linkedin, Instagram, Facebook, Mail } from "lucide-react";
import { Link } from "react-router-dom";

// X (Twitter) SVG icon since lucide-react's Twitter icon is the old bird logo
const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.632L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
);

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
            <a
              href="mailto:Info@titanleap.co"
              className="hover:text-accent-yellow transition-colors flex items-center gap-1.5"
            >
              <Mail size={14} />
              <span>Info@titanleap.co</span>
            </a>
            <Link
              to="/admin/audits"
              className="hover:text-accent-yellow transition-colors underline"
            >
              Audit Admin
            </Link>
          </div>

          <div className="flex items-center gap-6 order-1 md:order-2">
            <a
              href="https://www.linkedin.com/company/100059033/admin/dashboard/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://x.com/Titanleapagency"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="X (Twitter)"
            >
              <XIcon size={18} />
            </a>
            <a
              href="https://www.instagram.com/titanleapagency/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61586492704181"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={18} />
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
