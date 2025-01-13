import React from 'react';
import { Link } from 'react-router-dom';

const SmallBookCard = ({ book }) => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-2 hover:shadow-md transition-shadow duration-300">
      {/* Book Cover */}
      <Link to={`/books/${book._id}`}>
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-20 h-36 rounded mb-2 transition-transform duration-200 hover:scale-105"
        />
      </Link>

      {/* Book Info */}
      <Link to={`/books/${book._id}`}>
        <h3 className="text-sm font-semibold text-gray-800 mb-1 hover:text-blue-600 transition-colors">
          {book.title.length > 20 ? `${book.title.slice(0, 20)}...` : book.title}
        </h3>
      </Link>

      {/* Pricing */}
      <div>
        <span className="font-medium text-gray-700 text-sm">
          ${book.newPrice.toFixed(2)}
        </span>
        <span className="line-through text-gray-500 text-xs ml-1">
          ${book.oldPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default SmallBookCard;

