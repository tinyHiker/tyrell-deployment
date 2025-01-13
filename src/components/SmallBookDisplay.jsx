import React, {useEffect, useState} from 'react'
import SmallBookCard from '../pages/books/SmallBookCard';
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css/navigation';

import { Link } from 'react-router-dom';


const SmallBookDisplay = ({books, title}) => {
    

    let filteredBooks = books
    

  return (
    <div className="py-10">
        <h2 className="text-3xl font-semibold mb-7 text-center text-blue-600">{title}</h2>

        <Swiper
        slidesPerView={5}
        spaceBetween={30}
        navigation={true}
        
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        
        {
            filteredBooks.length > 0 && filteredBooks.map((book, index) => (
                <SwiperSlide key={index}><SmallBookCard key={index} book={book}/></SwiperSlide>
                
            ))
        }
        
        
      </Swiper>



       

    </div>
  )
}

export default SmallBookDisplay