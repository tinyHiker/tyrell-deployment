import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import { IoHome } from "react-icons/io5";
import Swal from "sweetalert2";
import {
  HiOutlineUser,
  HiOutlineHeart,
  HiOutlineShoppingCart
} from 'react-icons/hi';
import { HiMiniBars3CenterLeft } from 'react-icons/hi2';
import { GiAcorn } from 'react-icons/gi';
import avatarImg from '../assets/avatar.png';

const categories = [
  { name: "All Books", link: "none" },
  { name: "Fantasy", link: "fantasy" },
  { name: "Science Fiction", link: "science-fiction" },
  { name: "Superhero", link: "superhero" },
  { name: "Mystery", link: "mystery" },
  { name: "Dystopian Fantasy", link: "dystopian-fantasy" },
  { name: "Thriller", link: "thriller" },
  { name: "Horror", link: "horror" },
];

const navigation = [
  { name: 'My Profile', href: '/profile' },
  { name: 'Orders', href: '/orders' },
  { name: 'Cart Page', href: '/cart' },
  { name: 'Check Out', href: '/checkout' },
];

const Navbar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isBooksMenuOpen, setIsBooksMenuOpen] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const { currentUser, logout } = useAuth();

  const handleLogOut = () => {
    logout();
    setIsUserMenuOpen(false);
    Swal.fire({
      icon: 'success',
      title: 'Logout was successful',
      text: 'Goodbye! You are now logged out.',
      width: '600px',
      background: '#f8fafc',
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
    });
  };

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6 bg-white shadow-sm">
      <nav className="flex justify-between items-center text-lg lg:text-xl">
        
        
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-gray-700 hover:text-gray-900"
          >
            <IoHome />
            <span className="hidden md:inline">Home</span>
          </Link>

          <Link
            to="/about"
            className="hidden sm:inline-block text-gray-700 hover:text-gray-900"
          >
            About Us
          </Link>

          {currentUser && (
            <Link
              to="/orders"
              className="hidden sm:inline-block text-gray-700 hover:text-gray-900"
            >
              View My Orders
            </Link>
          )}

          
          <div className="relative">
            <button
              onClick={() => setIsBooksMenuOpen(!isBooksMenuOpen)}
              className="inline-flex items-center gap-1 font-semibold text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              Books
              <svg
                className={`w-5 h-5 transition-transform ${isBooksMenuOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isBooksMenuOpen && (
              <div className="origin-top-left absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat.name}
                      onClick={() => setIsBooksMenuOpen(false)}
                      to={`/categories/${cat.link}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        
        <Link
          to="/"
          className="flex items-center justify-center text-3xl font-bold font-cursive text-gray-800"
        >
          Tyrell
          <GiAcorn size="40px" className="ml-2 inline-block" />
        </Link>

        
        <div className="flex items-center space-x-6 relative">
          {!currentUser ? (
            <>
              <Link
                to="/register"
                className="text-gray-700 hover:text-gray-900"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="bg-primary px-4 py-2 rounded-md text-black hover:opacity-90 flex items-center gap-1"
              >
                <span className="text-base font-semibold">Login</span>
                <HiOutlineUser />
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="focus:outline-none"
              >
                <img
                  src={avatarImg}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full ring-2 ring-blue-500"
                />
              </button>

              {isUserMenuOpen && (
                <div className="absolute top-16 right-0 w-48 bg-white shadow-lg rounded-md z-40">
                  <ul className="py-2">
                    {navigation.map((item) => (
                      <li key={item.name} onClick={() => setIsUserMenuOpen(false)}>
                        <Link
                          to={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-200"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}

          <button className="hidden sm:block text-gray-700 hover:text-gray-900">
            <HiOutlineHeart size={28} />
          </button>

          <Link
            to="/cart"
            className="bg-primary px-6 py-3 flex items-center gap-2 rounded-md text-black text-lg font-semibold hover:opacity-90"
          >
            <HiOutlineShoppingCart size={24} />
            <span>{cartItems.length > 0 ? cartItems.length : 0}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
