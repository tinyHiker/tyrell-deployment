

import React from 'react';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { FaBook } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';
import { Link } from 'react-router-dom';
import Quote from '../home/sections/Quote';
import useScrollToAnchor from "../../utils/useScrollToAnchor.js"


const SingleBook =  () => {
  useScrollToAnchor()
  const { id } = useParams();
  const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);
  const navigate = useNavigate()
  

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  

  

  if (isLoading || !book.authors) return <div>Loading...</div>;
  if (isError ) return <div>Error loading book info</div>;


  
  console.log(book)
  let authors_text = book.authors.map(author => {
    return <Link to={`#author-redirect`}><span className="text-blue-600">{author.fullName}</span></Link>
  })

  let quotes_text = book.quotes.map(quote => {
    return <div className='my-3 text-center'><Quote quote={quote}/></div>
  })

  let authors_descriptions = book.authors.map(author => (
    <div className="p-6 mt-1 font-secondary">
    <p className="text-md">{author.about}</p>
    <img
      src={author.image}
      alt={author.fullName}
      className="w-48 h-48 mx-auto object-cover rounded-lg mt-4" // Adjust size and shape as needed
    />
  </div>
  ))

 


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white  rounded-md  border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        <div className="flex justify-center md:justify-start">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full h-auto object-cover rounded-md md:max-w-xs"
          />
        </div>

        
        <div className='mt-11'>
          <h1 className="text-xl text-gray-800 mb-2 text-center">
            <div className="mb-5 font-bold text-4xl">{book.title}</div> - Written by {authors_text[0]}
          </h1>
          <p className="text-xl text-gray-600 mb-4">
             <strong>{book.authors?.map(author => author.name).join(', ')}</strong>
          </p>
          <div className="text-lg mb-4 text-center">
            <span className="font-bold text-gray-800">${book.newPrice}</span>
            {book.oldPrice && (
              <span className="ml-2 text-gray-500 line-through">${book.oldPrice}</span>
            )}
          </div>
          <div className="mb-2 text-center">
            <span className="text-sm text-gray-500"><Link to="/shipping" className="text-blue-500 underline hover:text-black">Shipping</Link> will be calculated at checkout.</span>
          </div>
          
          <div className="mb-7 mt-4">
            
            <span className={`text-sm ${book.stock < 20 ? 'text-red-600' : 'text-green-600'}`}>
              {book.stock} left in stock.
            </span>
              
            
            <div className="w-full bg-gray-200 h-2 mt-1 rounded-full overflow-hidden">
              
              <div className="bg-yellow-400 h-full" style={{ width: `${(book.stock / 150) * 100}%` }} />
            </div>
          </div>


          
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => handleAddToCart(book)}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              disabled={book.stock < 1}
            >
              <FiShoppingCart />
              <span>Add to Cart</span>
            </button>
            <button className="flex items-center gap-2 px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors" onClick = {() => { navigate(`/categories/${book.category.replace(" ", "-")}`)}}>
              <FaBook />
              <span>View Related Books</span>
            </button>
          </div>
       
          <div className=" font-secondary mt-7 w-200">
            <p className="text-md text-gray-700"><span className= "font-bold">Preview: </span>{book.description}</p>
          </div>
        </div>

        
      </div>

      {quotes_text}

      {/* Product Details Section */}
  <div className="mt-1 mb-3 p-4 rounded-md">
    <h3 className="text-lg font-semibold text-gray-800 mb-3">Product Details</h3>
    <ul className="text-sm text-gray-600">
      {book.hardcoverPageCount && (
        <li><strong>Page Count:</strong> {book.hardcoverPageCount} pages</li>
      )}
      {book.publisher && (
        <li><strong>Publisher:</strong> {book.publisher}</li>
      )}
      <li><strong>Category:</strong> {book.category[0].toUpperCase() + book.category.substring(1).toLowerCase()}</li>
      {book.createdAt && (
        <li><strong>Published On:</strong> {new Date(book.createdAt).toLocaleDateString()}</li>
      )}
    </ul>
  </div>


  <h2 className="text-2xl font-semibold mb-1 text-center">ABOUT THE AUTHOR</h2>
  <span id="author-redirect"></span>
  {authors_descriptions}



      
    </div>
  );
};

export default SingleBook;
