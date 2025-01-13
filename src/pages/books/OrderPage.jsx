import React from 'react';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi';
import { useAuth } from '../../context/AuthContext';
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineCalendar,
  AiOutlinePhone,
} from 'react-icons/ai';
import {useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { GiBlackBook } from "react-icons/gi";

const OrderPage = () => {
    const navigate = useNavigate()
  const { currentUser } = useAuth();
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrderByEmailQuery(currentUser.email);

  if (isLoading) {
    return (
      <div className="text-center mt-10 text-xl font-semibold text-blue-500">
        Loading...
      </div>
    );
  }

  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white p-6 rounded-md shadow-md">
        <h2 className="text-3xl font-bold text-black mb-4">
          No Orders Found
        </h2>
        <p className="text-gray-700 text-center max-w-md mb-6">
          It looks like you haven't placed any orders yet. 
          Take a look at our store and find something you love!
        </p> 
        
        <GiBlackBook className="w-60 h-40 mb-6"/>
        <button
          className="px-6 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-md shadow transition-colors duration-200"
          onClick={() => {
            navigate("/")
            
          }}
        >
          Start Shopping
        </button>
      </div>
    );
  }
  
  function backToCart(book) {
    
    handleAddToCart(book)
    navigate("/cart/")
  }

  



  return (
    <div className="min-h-screen  px-4 py-8">
      <div className="container mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-center text-black mb-8 drop-shadow-sm">
          Your Order History
        </h1>
        <hr class="h-1 bg-black my-8"></hr>
        <button
          className="px-6 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-md shadow transition-colors duration-200"
          onClick={() => {
            navigate("/")
            
          }}
        >
          Continue Shopping
        </button>

        {orders.length === 0 ? (
          <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
            <p className="text-gray-600 text-lg">No orders found!</p>
          </div>
        ) : (
          <div className="space-y-10">
            {orders.map((order, index) => {
              
              const displayedBooks = order.productIds.slice(0, 3);
              const remainingCount = order.productIds.length - 3;

              return (
                <div
                  key={order._id}
                  className="bg-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300 ease-in-out"
                >
                
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 space-y-4 sm:space-y-0">
                    
                    <div className="flex flex-wrap gap-6">
                      <div>
                        <h4 className="text-sm text-gray-500 uppercase font-semibold">
                          Order Placed
                        </h4>
                        <p className="text-sm text-gray-700">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm text-gray-500 uppercase font-semibold">
                          Total
                        </h4>
                        <p className="text-sm text-gray-700">
                          ${order.totalPrice}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm text-gray-500 uppercase font-semibold">
                          Ship To
                        </h4>
                        <p className="text-sm text-gray-700">
                          {order.name} 
                        </p>
                      </div>
                    </div>

                
                    <div className="sm:text-right">
                      <p className="text-sm text-gray-500 font-semibold uppercase">
                        Order # {order._id}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:justify-end items-start sm:items-center gap-3 mt-2">
                        <button className="text-blue-600 text-sm font-medium hover:underline" onClick = {() => { navigate(`one-order/${order._id}`)}}>
                          View order details
                        </button>
                        <button className="text-blue-600 text-sm font-medium hover:underline" onClick = {() => { 
                            navigate(`one-order/${order._id}`)}}>
                          Invoice
                        </button>
                      </div>
                    </div>
                  </div>

                 
                  <div className="mb-4">
                    {order.status ? (
                      <h2 className="font-semibold text-green-600 text-lg mb-1">
                        Delivered on{' '}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </h2>
                    ) : (
                      <h2 className="font-semibold text-yellow-600 text-lg mb-1">
                        In Transit
                      </h2>
                    )}
                    <p className="text-sm text-gray-600">
                      Package was left near the front door or porch
                    </p>
                  </div>

                 
                  <div className="space-y-3 mb-4">
                    {displayedBooks.map((book) => (
                      <div
                        key={book._id}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gray-50 p-3 rounded-xl shadow-sm"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={book.coverImage}
                            alt="Book Cover"
                            className="w-16 h-20 object-cover rounded-md shadow-sm hover:scale-105"

                            onClick = {() => { navigate(`/books/${book._id}`)}}
                          />
                          <div className="flex flex-col hover:scale-105">
                            <p className="font-medium text-gray-700">
                              {book.title}
                            </p>
                            <p className="text-sm text-gray-600">
                              Price: ${book.newPrice}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center sm:flex-col gap-2 sm:gap-3 sm:items-end">
                          <button className="px-4 py-2 text-sm font-semibold text-gray-900 bg-yellow-300 hover:bg-yellow-400 rounded-md shadow-sm transition-colors duration-200" onClick = {() => {backToCart(book)}} >
                            Buy it again
                          </button>
                          <button className="px-4 py-2 text-sm font-semibold text-blue-600 bg-gray-200 hover:bg-gray-300 rounded-md shadow-sm transition-colors duration-200" onClick = {() => { navigate(`/books/${book._id}`)}}>
                            View this item
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                 
                  {order.productIds.length > 3 && (
                    <p className="text-sm text-gray-500">
                      + {remainingCount} more
                      {remainingCount === 1 ? ' item' : ' items'}
                    </p>
                  )}

                
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Shipping Address:
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {order.address.city}, {order.address.state},{' '}
                      {order.address.country}, {order.address.zipcode}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
