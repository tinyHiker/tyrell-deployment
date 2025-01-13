import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { clearCart } from '../../redux/features/cart/cartSlice'



const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems)
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.newPrice, 0)
    .toFixed(2)

  const { currentUser } = useAuth()
  console.log(currentUser)


  const dispatch = useDispatch()


  const handleClearCart = () => {
        dispatch(clearCart())
    }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [createOrder, { isLoading }] = useCreateOrderMutation()
  const navigate = useNavigate()


  const [isChecked, setIsChecked] = useState(false)
 
  const [termsError, setTermsError] = useState(false)

  const submitOrder = async (data) => {
    const newOrder = {
      userUid: currentUser.uid,
      content: {
        name: data.name,
        email: currentUser?.email,
        address: {
          city: data.city,
          country: data.country,
          state: data.state,
          zipcode: data.zipcode,
        },
        phone: data.phone,
        productIds: cartItems.map((item) => item?._id),
        totalPrice: totalPrice,
        delivered: false
      }
      
    }

    try {
      await createOrder(newOrder).unwrap()
      handleClearCart()
      Swal.fire({
        title: 'Order confirmed',
        text: 'Your order was placed successfully!',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok',
      })
      console.log(currentUser.uid)
      navigate('/orders')
    } catch (error) {
      console.error('Error creating an order', error)
      alert('Failed to place the order')
    }
  }



  const handleFormSubmit = (data) => {
    if (!isChecked) {
      setTermsError(true)
      return
    }
    setTermsError(false)
    submitOrder(data)
  }


  let cartList = cartItems.map((item) => {
    const truncatedTitle =
      item.title.length > 22
        ? item.title.substring(0, 25) + '...'
        : item.title
    return (
      <div key={item._id} className="flex items-center justify-between">
        <span className="text-gray-500">{truncatedTitle}</span>
        <span className="text-md font-bold">${item.newPrice}</span>
      </div>
    )
  })

  // Slice the cart list if it has more than 6 items
  if (cartList.length > 6) {
    cartList = cartList.slice(0, 6)
    cartList.push(
      <div key="ellipsis" className="text-gray-500">
        ...
      </div>
    )
  }

  if (isLoading) return <div>Loading.....</div>

  return (
    <section>
      <div className="min-h-screen p-6 bg-gray-100">
        <h1 className="mx-auto max-w-screen-lg mb-9 text-center font-primary text-3xl mt-7 font-semibold">
          Billing and Shipping Details
        </h1>
        <div className="container max-w-screen-lg mx-auto rounded-lg">
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8"
            >
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6 lg:mb-0 mr-5">
                <h2 className="font-semibold text-xl text-gray-700 mb-3">
                  Order Summary
                </h2>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-500">Items in Cart</span>
                  <span className="font-medium">{cartItems?.length}</span>
                </div>
                <hr className="mb-2" />
                {cartList}
                <hr className="mb-2 mt-2" />
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Total Price</span>
                  <span className="text-lg font-bold">${totalPrice}</span>
                </div>
                <hr className="mb-2 mt-2" />
                <p className="text-sm text-gray-400 mt-4">
                  Shipping costs may vary depending on your location. By placing
                  an order, you agree to our Terms &amp; Conditions.
                </p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label htmlFor="full_name">Full Name</label>
                    <input
                      {...register('name', { required: true })}
                      type="text"
                      name="name"
                      id="name"
                      className="h-10 border mt-1 rounded-lg px-4 w-full bg-gray-50"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        Name is required
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="h-10 border mt-1 rounded-lg px-4 w-full bg-gray-50"
                      disabled
                      defaultValue={currentUser?.email}
                      placeholder="email@domain.com"
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      {...register('phone', { required: true })}
                      type="number"
                      name="phone"
                      id="phone"
                      className="h-10 border mt-1 rounded-lg px-4 w-full bg-gray-50"
                      placeholder="+123 456 7890"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        Phone number is required
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-3">
                    <label htmlFor="address">Address / Street</label>
                    <input
                      {...register('address', { required: true })}
                      type="text"
                      name="address"
                      id="address"
                      className="h-10 border mt-1 rounded-lg px-4 w-full bg-gray-50"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        Address is required
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="city">City</label>
                    <input
                      {...register('city', { required: true })}
                      type="text"
                      name="city"
                      id="city"
                      className="h-10 border mt-1 rounded-lg px-4 w-full bg-gray-50"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">
                        City is required
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="country">Country / region</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded-lg items-center mt-1">
                      <input
                        {...register('country', { required: true })}
                        name="country"
                        id="country"
                        placeholder="Country"
                        className="px-4 appearance-none rounded-lg outline-none text-gray-800 w-full bg-transparent"
                      />
                    </div>
                    {errors.country && (
                      <p className="text-red-500 text-sm mt-1">
                        Country is required
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="state">State / province</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded-lg items-center mt-1">
                      <input
                        {...register('state', { required: true })}
                        name="state"
                        id="state"
                        placeholder="State"
                        className="px-4 appearance-none rounded-lg outline-none text-gray-800 w-full bg-transparent"
                      />
                    </div>
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">
                        State is required
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-1">
                    <label htmlFor="zipcode">Zipcode</label>
                    <input
                      {...register('zipcode', { required: true })}
                      type="text"
                      name="zipcode"
                      id="zipcode"
                      className="transition-all flex items-center rounded-lg h-10 border mt-1 px-4 w-full bg-gray-50"
                    />
                    {errors.zipcode && (
                      <p className="text-red-500 text-sm mt-1">
                        Zipcode is required
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-5 mt-3">
                    <div className="inline-flex items-center">
                      <input
                        onChange={(e) => {
                          setIsChecked(e.target.checked)
                          setTermsError(false)
                        }}
                        type="checkbox"
                        name="billing_same"
                        id="billing_same"
                        className="form-checkbox"
                      />
                      <label htmlFor="billing_same" className="ml-2">
                        I agree to the{' '}
                        <Link className="underline underline-offset-2 text-blue-600">
                          Terms &amp; Conditions
                        </Link>
                      </label>
                    </div>
                    {termsError && (
                      <p className="text-red-500 text-sm mt-1">
                        You must accept Terms &amp; Conditions to place an order
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                      <button
                        disabled={isLoading}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Place an Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CheckoutPage
