import React from 'react';
import { useNavigate } from 'react-router-dom';
import categories from '../../../utils/getCategories';

const CategoriesGrid = () => {
  

  const navigate = useNavigate()

  return (
    <div className="py-10 px-5">
      <h2 className="text-3xl font-semibold mb-6 text-center ">Popular Categories</h2>
      <div className="grid grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <div key={index} onClick={() => { navigate(`/categories/${category.route}`)}} className="bg-black text-white text-center p-6 rounded flex justify-center h-25 w-90 border-r-transparent border-r-8 hover:text-yellow-300 hover:scale-105">
            <button ><h3 className="text-xl">{category.name}</h3></button>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesGrid;
