import React from 'react'

import {Link} from "react-router-dom"
import {HiMiniBars3CenterLeft} from "react-icons/hi2"
import { IoSearchOutline } from "react-icons/io5";
import {HiOutlineUser} from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { HiOutlineShoppingCart } from "react-icons/hi";

import avatarImg from "../assets/avatar.png"
import {useState} from "react";
import {useSelector} from "react-redux";
import { useAuth } from '../context/AuthContext';
import { GiAcorn } from "react-icons/gi";

const navigation = [
    {name: "Dashboard", href: "/dashboard"},
    {name: "Orders", href:"/orders"}, 
    {name: "Cart Page", href:"/cart"}, 
    {name: "Check Out", href: "/checkout"}
]

const Navbar = () => {
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const cartItems = useSelector(state => state.cart.cartItems)
    console.log(cartItems)

    
    const {currentUser, logout} = useAuth()

    const handleLogOut = () => {
        logout()
    }

    

    console.log(isDropdownOpen)
  return (

    <header className="max-w-screen-2xl mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
            {/*left side */}
            <div className="flex items-center md:gap-16 gap-4">
                

                <div className="relative sm:w-72 w-40 space-x-2">
                    <IoSearchOutline className="absolute inline-block left-3 inset-y-2"/>
                    <input type="text" placeholder="Search here" className="bg-[#EAEAEA] text-lg w-full py-2 md:px-8 px-6 rounded-md focus:outline-none"/>
                </div>
            </div>

            
            <Link to="/" className="w-64 p-1 sm:px-6 px-10 rounded-lg flex items-center justify-center">
            <span className="font-cursive text-5xl">Harrenhall</span>
            <GiAcorn size="50px" className=" ml-3  inline-block" />
            </Link>



            {/*right side */}
            <div className= "relative flex items-center md:space-x-3 space-x-2">
                <div>
                    {
                        currentUser ?
                         <>
                         <button onClick = {() => setIsDropdownOpen(!isDropdownOpen)}>
                            <img src={avatarImg} alt="" className={` w-10 h-10 size-7 rounded-full ${currentUser ? "ring-2 ring-blue-500": ""}`}/>
                         </button>
                         {/* show dropdowns */}
                         {
                            isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                                    <ul className="py-2">
                                        {
                                            navigation.map((item) => {
                                                return <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                                    <Link to={item.href} >
                                                    {item.name}
                                                    </Link>
                                                </li>

                                            })
                                        }
                                    </ul>
                                    <li>
                                        <button onClick={handleLogOut} className='block w-full px-4 py-1 text-sm hover:bg-gray-200 hover:scale-105'>Logout</button>
                                    </li>
                                </div>
                            )
                         }
                        </> :  
                        <>
                        
                        <Link to="/login" className="bg-primary sm:px-6 px-1 py-2 flex items-center rounded-sm hover:scale-105">
                        <span className='text-xl font-semibold sm:ml-1'>Login  </span>
                        <HiOutlineUser className="size-6"/>
                        </Link>
                        </>
                        
                        /*< Link to="/login"><HiOutlineUser className="size-8"/></Link>*/
                    }
                </div>
               
                <button className="hidden sm:block">
                    <HiOutlineHeart className="size-8"/>
                </button>

                <Link to="/cart" className="bg-primary p-1 sm:px-6 px-2 py-2 flex items-center rounded-sm hover:scale-105">
                    <HiOutlineShoppingCart className="size-6" />
                    {
                        cartItems.length > 0 ? <span className='text-xl font-semibold sm:ml-1'>{cartItems.length}</span> : <span className='text-xl font-semibold sm:ml-1'>0</span>
                    }
                    
                </Link>

            </div>
        </nav>

    </header>
  )
}

export default Navbar