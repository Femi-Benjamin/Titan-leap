import Linkedin from "../assets/Linkedin.svg";
import Behance from "../assets/Behance.svg";
import Twitter from "../assets/Twitter.svg";

const Footer = () => {
  return (
    <footer className="bg-[#4C12BF] text-white px-12 py-16">
      <div className="mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mb-16 md:pl-20">
          {/* Our services */}
          <div>
            <h3 className="text-xl font-semibold mb-8">Our services</h3>
            <ul className="space-y-6">
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Online Media Mangement
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Content Creation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Search Engine Optimization
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Product Design
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Motion Design
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Brand Identity
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-xl font-semibold mb-8 md:text-left text-right">
              Solutions
            </h3>
            <ul className="space-y-6 md:text-left text-right">
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Digital Marketing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  E-commerce Solutions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Analytics and Reporting
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Consulting Services
                </a>
              </li>
            </ul>
          </div>

          {/* Cases */}
          <div>
            <h3 className="text-xl font-semibold mb-8  xl:pt-0 md:pt-0 pt-6">
              Cases
            </h3>
            <ul className="space-y-6">
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Future Pay
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Future labs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  E-commerce Giant
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Kloudaa
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Client XYZ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  See more cases
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xl font-semibold mb-8 xl:pt-0 md:pt-6 pt-6 md:text-left text-right">
              Company
            </h3>
            <ul className="space-y-6 md:text-left text-right">
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Who we are
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Clients
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Jobs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Contacts
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider line */}
        <div className="border-t border-[#F7F7F9] mb-8"></div>

        {/* Bottom section */}
        <div className="flex justify-between items-center">
          {/* Contact info */}
          <div className="text-gray-200 flex md:pl-40 items-center">
            <span>+1 (415) 655-1002</span>
            <span className="mx-3">|</span>
            <span>830 Stewart Drive, #212, Sunnyvale, CA, USA, 94085</span>

            {/* Social icons and copyright */}
            <div className="flex justify-center items-center space-x-6 pl-10">
              {/* Social icons */}
              <div className="flex space-x-4">
                {/* LinkedIn */}
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  <img src={Linkedin} alt={Linkedin} />
                </a>
                {/* Twitter */}
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  <img src={Twitter} alt={Twitter} />
                </a>
                {/* Behance */}
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  <img src={Behance} alt={Behance} />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-gray-200 flex">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span className="mx-3">|</span>
            <span>© {new Date().getFullYear()}, Titan leap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
