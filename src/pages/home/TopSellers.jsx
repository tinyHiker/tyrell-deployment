import React, {useEffect, useState} from 'react'
import BookCard from '../books/BookCard'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';
import { Link } from 'react-router-dom';




const categories = ["Choose a genre", "Fantasy", "Science Fiction", "Superhero", "Dystopian Fantasy", "Mystery", "Thriller", "Horror"]

const TopSellers = () => {
    
    const [selectedCategory, setSelectedCategory] = useState("Choose a genre")

    const {data: books = []} = useFetchAllBooksQuery()
    

    let filteredBooks = selectedCategory === "Choose a genre" ? books : books.filter(book => book.category === selectedCategory.toLowerCase())
    

  return (
    <div className="py-10">

<Link to="categories/none"><h2 className="text-3xl font-semibold mb-1 text-center hover:text-gray-600 hover:scale-95 ">Our Collection</h2></Link>
       
        <div className="mb-8 flex items-center">
            <select onChange={(e) => setSelectedCategory(e.target.value)} name="category" id="category" className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none" >
                {
                    categories.map((category,index) => (
                        <option key={index} value={category}>{category}</option>
                    ))
                }

                
                
            </select>

            
        </div>

        <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          }
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        
        {
            filteredBooks.length > 0 && filteredBooks.map((book, index) => (
                <SwiperSlide key={index}><BookCard key={index} book={book}/></SwiperSlide>
                
            ))
        }
        
        
      </Swiper>

      <div className="mt-8 flex justify-center">
        <Link to="/categories/none" className="bg-yellow border-2 border-black hover:border-transparent hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded transition-all duration-150">
        View All
        </Link>
        </div>

       

    </div>
  )
}

export default TopSellers