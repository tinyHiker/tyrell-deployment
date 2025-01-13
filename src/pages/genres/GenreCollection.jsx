import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';
import categories from '../../utils/getCategories';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const GenreCollection = () => {
  let { genre } = useParams();
  let mod_genre = genre.toLowerCase().replace("-", " ")
  const { data: books = [] } = useFetchAllBooksQuery();
  const filteredBooks = books.filter((book) => book.category === mod_genre );
  let navigate = useNavigate()
  
  
  const [categoryFilter, setCategoryFilter] = useState('');
 

  let category_options = categories.map(category => {
    return <option value={category.route}>{category.name}</option>;
  });

  console.log(genre)

  if (filteredBooks.length == 0) {
    navigate("/404")

  } 

  

  return (
    <>
      <div className="mx-auto max-w-4xl p-6">
       
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">{genre[0].toUpperCase() + genre.substring(1).toLowerCase()}</h1>
          <hr className="my-2" />
          <div className="flex justify-center gap-4 items-center">
            <label>Other genres:</label>
            <select 
              value={categoryFilter} 
              onChange={(e) => {
                setCategoryFilter(e.target.value)
                navigate(`/categories/${e.target.value}`)
            }} 
              className="border border-gray-300 rounded p-2">

              {category_options}
            </select>
            <Link to={`/categories/none`} className="text-blue-500 hover:text-black hover:underline mt-3">View All Books →</Link>
          </div>

          
        </div>

        <div className="grid grid-cols-3 gap-7">
          {filteredBooks.map((book) => (
            <div key={book._id} className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105" onClick={() => { navigate(`/books/${book._id}`)}}>
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-[20rem] object-contain"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-lg font-bold">${book.newPrice}</span>
                  {book.oldPrice && (
                    <span className="text-sm line-through">${book.oldPrice}</span>
                  )}
                </div>
                {book.stock > 0 ? (
                  <span className="text-sm text-green-500">In stock</span>
                ) : (
                  <span className="text-sm text-red-500">Out of stock</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GenreCollection;


