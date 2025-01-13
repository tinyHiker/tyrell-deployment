import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle, FaUserCircle } from "react-icons/fa"
import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthContext'
import Swal from "sweetalert2"

const Login = () => {
  const [message, setMessage] = useState("")
  const { loginUser, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password)
      alert("Login successful!")
      navigate("/")
    } catch (error) {
      setMessage("Please provide a valid email and password")
      console.error(error)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      Swal.fire({
        icon: 'success',
        title: 'Login was successful',
        text: 'Welcome back! You are now logged in.',
        width: '600px',
        background: '#f8fafc',
        timer: 2000, 
        showConfirmButton: false, 
      });
      navigate("/")
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login unsuccessful',
        text: 'Your login failed. Please double check the credentials that you entered.',
        width: '600px',
        background: '#f8fafc',
        timer: 2000, 
        showConfirmButton: false, 
      });
      
      console.error(error)
    }
  }

  return (
    <div className="flex items-center justify-center px-4 mt-20">
      <div className="relative max-w-sm w-full bg-slate-100 rounded-lg shadow-xl p-6">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-md">
            <FaUserCircle className="text-5xl text-gray-500" />
          </div>
        </div>
        <h2 className="text-xl font-bold mb-6 text-center font-secondary mt-10">
          Please Login
        </h2>
        {message && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              placeholder="Email Address"
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                Email is required
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              id="password"
              placeholder="Password"
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                Password is required
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none  focus:ring-2 focus:ring-blue-400 transition-colors duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center font-medium mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex justify-center items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors duration-300"
          >
            <FaGoogle />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login


