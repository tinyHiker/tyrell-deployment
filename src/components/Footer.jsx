import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { FaCcAmex } from "react-icons/fa6";
import applePayLogo from "../../public/payment-icons/apple-pay.svg"
import discoverLogo from "../../public/payment-icons/discover.svg"
import mastercardLogo from "../../public/payment-icons/mastercard.svg"
import visaLogo from "../../public/payment-icons/visa.svg"
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-8">
       
        <div className="md:w-1/2 w-full flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <img src="../../public/payment-icons/amex.png" alt="Amex" className="h-8"/>
            <img src={applePayLogo} className="h-8"/>
            <img src={discoverLogo} className="h-8"/>
            <img src="../../public/payment-icons/google-pay.png" alt="Google Pay" className="h-8"/>
            <img src={mastercardLogo} className="h-8"/>
            <img src={visaLogo} className="h-8"/>
          </div>
          <ul className="flex flex-col md:flex-row gap-4 text-sm lg:text-base justify-center md:justify-start">
            <li>
              <Link to="/" className="transition-colors duration-300 hover:text-primary">Home</Link>
              
            </li>
           
            <li>
              <Link to="/about" className="transition-colors duration-300 hover:text-primary">About Us</Link>
            </li>

            <li>
            <Link to="/contact" className="transition-colors duration-300 hover:text-primary">Contact</Link>
            </li>
          </ul>
        </div>

        
        <div className="md:w-1/2 w-full flex flex-col gap-4">
          <p className="text-sm lg:text-base">
            Subscribe to our newsletter to receive the latest updates, news, and offers!
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-l-md text-black focus:outline-none"
            />
            <button className="bg-primary px-6 py-3 rounded-r-md text-black font-semibold text-sm lg:text-base transition-colors duration-300 hover:bg-primary-dark">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-700 pt-6 gap-6">
        
        <ul className="flex gap-6 text-sm lg:text-base">
          <li>
            <a
              href="#privacy"
              className="transition-colors duration-300 hover:text-primary"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="#terms"
              className="transition-colors duration-300 hover:text-primary"
            >
              Terms of Service
            </a>
          </li>
        </ul>

        
        <div className="flex gap-6 text-white">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-primary"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-primary"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-primary"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
