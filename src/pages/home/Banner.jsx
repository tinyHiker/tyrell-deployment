import React, { useState } from "react";
import bannerImg from "../../assets/banner.png";
import { useNavigate } from "react-router-dom"; 

const Banner = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubscribe = () => {
    setError("");

    if (!email.endsWith("@gmail.com")) {
      setError("Please use a valid Gmail address.");
      return;
    }

    
    navigate("/subscribe-success");
  };

  return (
    <div className="bg-gray-200 flex flex-col md:flex-row py-16 px-4 justify-between items-center gap-12">
      <div className="md:w-1/2 w-full text-center md:text-left">
        <h1 className="text-5xl font-bold mb-7">New Releases This Week</h1>
        <p className="text-lg mb-6">
          It's time to update your reading list with some of the latest releases.
        </p>
        
        {error && (
          <div className="bg-red-100 text-red-700 border border-red-200 rounded-md p-3 mb-4">
            {error}
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-md text-black w-full md:w-auto"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition-colors"
            onClick={handleSubscribe}
          >
            Subscribe
          </button>
        </div>
      </div>

      <div className="md:w-1/2 w-full flex justify-center">
        <img src={bannerImg} alt="Banner" className="max-w-full h-auto" />
      </div>
    </div>
  );
};

export default Banner;

