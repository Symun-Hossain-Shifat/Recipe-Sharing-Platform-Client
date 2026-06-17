import React from "react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FiPhoneForwarded } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineMarkEmailUnread } from "react-icons/md";

function FooterPage() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-800 pb-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white tracking-wider">
              Recipes<span className="text-green-500">Hub</span>
            </span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Explore thousands of homemade recipes from around the world. Whether
            you are a beginner or a pro chef, RecipeHub helps you find,
            share, and save your favorites.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 tracking-wider uppercase text-sm">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Our Portfolio
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 tracking-wider uppercase text-sm">
            Contact Us
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-center space-x-2">
              <span><IoLocationOutline /></span>
              <span>123 Innovation Way, Tech Suite 500</span>
            </li>
            <li className="flex items-center space-x-2">
              <span><FiPhoneForwarded /></span>
              <a
                href="tel:+15551234567"
                className="hover:text-white transition-colors"
              >
                +1 (555) 123-4567
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <span><MdOutlineMarkEmailUnread /></span>
              <a
                href="mailto:hello@yourbrand.com"
                className="hover:text-white transition-colors"
              >
                hello@yourbrand.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 tracking-wider uppercase text-sm">
            Follow Us
          </h3>

          <div className="flex space-x-4 mb-4">
            <a
              href="#"
              className="w-10 h-10 bg-gray-800 hover:bg-blue-500 text-white rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label="Twitter"
            >
             <FaFacebook />
            </a>

            <a
              href="#"
              className="w-10 h-10 bg-gray-800 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label="LinkedIn"
            >
             <FaLinkedin />
            </a>

            <a
              href="#"
              className="w-10 h-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label="GitHub"
            >
              <FaTwitter />
            </a>
          </div>

          <p className="text-xs text-gray-500">
            Stay connected for updates and insights.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>&copy; 2026 Brand Inc. All rights reserved.</p>

        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-400 transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-gray-400 transition-colors">
            Cookie Settings
          </a>
        </div>
      </div>
    </footer>
  );
}

export default FooterPage;