import React, { useState } from "react";
import img1 from "../../assets/about/IMG1.jpg";
import img2 from "../../assets/about/IMG2.jpg";
import img3 from "../../assets/about/IMG3.jpg";
import img4 from "../../assets/about/IMG4.jpg";

import { FaEnvelope, FaPhone, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom"; 

const About = () => {
  
  const [showFAQ, setShowFAQ] = useState(false);

  
  const [openQuestion, setOpenQuestion] = useState(null);

  
  const faqs = [
    {
      question: "1. What is your return policy?",
      answer:
        "You can return any book within 30 days of purchase if it’s in its original condition. A receipt or proof of purchase is required for a full refund or exchange.",
    },
    {
      question: "2. How do I track my order?",
      answer:
        "Once your order is shipped, we’ll email you a tracking link. Click on it to see the latest updates on your delivery status.",
    },
    {
      question: "3. Do you ship internationally?",
      answer:
        "Yes, we do ship internationally to most countries. Shipping times and rates vary by location, so please check our shipping page for more details.",
    },
    {
      question: "4. Are eBooks available?",
      answer:
        "Yes, we offer a wide selection of eBooks. Once you purchase an eBook, it will be available in your account library to download in various formats.",
    },
    {
      question: "5. What forms of payment do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and store gift cards. For bulk or corporate orders, you can also request an invoice and pay via bank transfer.",
    },
  ];

  
  const handleToggle = (index) => {
    if (openQuestion === index) {
      setOpenQuestion(null);
    } else {
      setOpenQuestion(index);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
    
      <div className="flex justify-center gap-6 mb-8">
        <img
          src={img1}
          alt="About 1"
          className="w-28 h-28 object-cover rounded-full shadow-md"
        />
        <img
          src={img2}
          alt="About 2"
          className="w-28 h-28 object-cover rounded-full shadow-md"
        />
        <img
          src={img3}
          alt="About 3"
          className="w-28 h-28 object-cover rounded-full shadow-md"
        />
        <img
          src={img4}
          alt="About 4"
          className="w-28 h-28 object-cover rounded-full shadow-md"
        />
      </div>

      
      <h2 className="text-2xl font-bold text-center mb-3">Hey, I'm Taha!</h2>
      <p className="text-center mb-6">
        I developed Tyrell bookstore. I put a lot of my favorite books in here:
        A Game of Thrones, Percy Jackson, Dune, etc.
      </p>

    
      <div className="flex flex-col items-center space-y-3 mb-6">
        <a
          href="mailto:t4iqbal@torontomu.ca"
          className="flex items-center space-x-2 text-lg hover:underline"
        >
          <FaEnvelope />
          <span>t4iqbal@torontomu.ca</span>
        </a>

        <p className="flex items-center space-x-2 text-lg">
          <FaPhone />
          <span>+1 647 208 2625</span>
        </p>

        <a
          href="https://github.com/tinyHiker"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-lg hover:underline"
        >
          <FaGithub />
          <span>tinyHiker</span>
        </a>
      </div>

     
      <div className="flex justify-center gap-4 mb-6">
        
        <Link
          to="/contact"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Contact Me
        </Link>

        
        <button
          onClick={() => setShowFAQ(!showFAQ)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
        >
          {showFAQ ? "Hide FAQ" : "Show FAQ"}
        </button>
      </div>

      
      {showFAQ && (
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
          <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
          {faqs.map((item, index) => (
            <div key={index} className="border-b border-gray-200 mb-2">
              <button
                onClick={() => handleToggle(index)}
                className="w-full text-left py-2 focus:outline-none flex justify-between items-center"
              >
                <span className="text-base font-medium">{item.question}</span>
                <span className="text-lg">
                  {openQuestion === index ? "-" : "+"}
                </span>
              </button>
              {openQuestion === index && (
                <p className="text-sm text-gray-700 pb-2 px-2">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default About;
