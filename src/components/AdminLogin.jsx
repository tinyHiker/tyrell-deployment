import React from 'react'
import {useForm} from "react-hook-form"
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from "axios"
import getBaseUrl from '../utils/baseURL';


const AdminLogin = () => {
    const [message, setMessage] = useState("");

    const {
            register,
            handleSubmit,
            watch,
            formState: { errors },
          } = useForm()

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        console.log(data)
            try {
                const response = await axios.post( `${getBaseUrl()}/api/auth/admin`, data, {
                    headers: {
                        'Content-Type' : 'application/json'
                    }

                })
                const auth = response.data;
                console.log(auth)
                if (auth.token) {
                    localStorage.setItem('token', auth.token);
                    setTimeout(() => {
                        localStorage.removeItem('token')
                        alert('Token has been expired! Please login again');
                        navigate("/")
                    }, 3600 * 1000)
                }

                alert("Admin login successful!")
                navigate("/dashboard")

            } catch (error) {
                setMessage("Please provide a valid email and password")
                console.error(error)
            }
            
          }


  return (
    <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
        <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-ul font-semibold mb-4">Admin Dashboard Login</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                    <input {...register("username", { required: true })} type="text" name="username" id="username" placeholder="username" className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"/>
                </div>

                <div className='mb-4'>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <input {...register("password", { required: true })} type="password" name="password" id="password" placeholder="Password" className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"/>
                </div>
                {
                    message && <p className="text-red-500 text-xs italic mb-3">{message}</p>
                }
                <div className="w-full">
                    <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none">Login</button>

                </div>
            </form>
            
            
        
        </div>
    </div>
  )
}

export default AdminLogin