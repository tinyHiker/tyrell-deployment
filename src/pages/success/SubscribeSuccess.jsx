import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const SubscribeSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white p-8 rounded shadow text-center">
        <FaCheckCircle className="text-green-500 text-6xl mb-4 mx-auto" />
        <h2 className="text-3xl font-bold mb-3 text-gray-800">Subscription Successful!</h2>
        <p className="text-gray-700 mb-4">
          You will receive an email verifying your enrollment within 1 business day.
        </p>
        <p className="text-gray-500 mb-8">
          Thanks for subscribing with us!
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Continue shopping
          </button>
          <button
            onClick={() => navigate("/categories/none")}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition duration-200"
          >
            View our catalogue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribeSuccess;

