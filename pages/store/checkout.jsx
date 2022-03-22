import { useCartContext } from '@/context/Cart/CartState'
import ContainerBlock from '@/layout/ContainerBlock'
import { useEffect, useState } from 'react'
import ProtectedRoute from '../../components/Auth/ProtectedRoute'
import OrderDataService from '../../services/orders.services'

export default function CartPage() {
  const { cartItems, removeItem, clearCart } = useCartContext()

  const [total, setTotal] = useState(0)
  const [tax, setTax] = useState(0)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postal, setPostal] = useState('')
  const [notes, setNotes] = useState('')

  // sets the total when page loads
  useEffect(() => {
    if (cartItems.length === 0) {
      setTax(0)
    } else {
      setTax(15)
    }

    let t = cartItems.reduce(function (sum, current) {
      return sum + current.price * current.qty
    }, 0)
    setTotal(t)
  }, [cartItems])

  function reset() {
    setAddress('')
    setFirstName('')
    setCity('')
    setEmail('')
    setLastName('')
    setPostal('')
    setNotes('')
  }

  const removeItemHandler = (id) => {
    removeItem(id)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newOrder = {
      name: firstName + ' ' + lastName,
      email: email,
      address: address,
      city: city,
      postal: postal,
      notes: notes,
      total: total,
      items: cartItems,
    }

    try {
      await OrderDataService.addOrder(newOrder)
    } catch (error) {
      console.log(error)
    }

    clearCart()
    reset()
    window.location.reload(false)
    localStorage.setItem('User-Cart', [])
  }

  return (
    <ProtectedRoute>
      <ContainerBlock>
        <div className="mt-20 px-16">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Checkout
              </h2>
            </div>
          </div>
        </div>
        <div className="container p-12 mx-auto">
          <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
            <div className="flex flex-col md:w-full">
              <h2 className="mb-4 font-bold md:text-xl text-heading ">
                Shipping Address
              </h2>

              <form
                onSubmit={handleSubmit}
                className="justify-center w-full mx-auto"
              >
                <input type="hidden" name="form-name" value="checkout" />
                <div>
                  <div className="space-x-0 lg:flex lg:space-x-4">
                    <div className="w-full lg:w-1/2">
                      <label className="block mb-3 text-sm font-semibold text-gray-500">
                        First Name
                      </label>
                      <input
                        name="first-name"
                        onChange={(e) => setFirstName(e.target.value)}
                        type="text"
                        required
                        placeholder="First Name"
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                    <div className="w-full lg:w-1/2 ">
                      <label className="block mb-3 text-sm font-semibold text-gray-500">
                        Last Name
                      </label>
                      <input
                        name="last-name"
                        onChange={(e) => setLastName(e.target.value)}
                        type="text"
                        required
                        placeholder="Last Name"
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full">
                      <label className="block mb-3 text-sm font-semibold text-gray-500">
                        Email
                      </label>
                      <input
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        required
                        placeholder="Email"
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full">
                      <label className="block mb-3 text-sm font-semibold text-gray-500">
                        Address
                      </label>
                      <textarea
                        className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                        name="address"
                        cols="20"
                        onChange={(e) => setAddress(e.target.value)}
                        rows="4"
                        placeholder="Address"
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="space-x-0 lg:flex lg:space-x-4">
                    <div className="w-full lg:w-1/2">
                      <label className="block mb-3 text-sm font-semibold text-gray-500">
                        City
                      </label>
                      <input
                        name="city"
                        type="text"
                        onChange={(e) => setCity(e.target.value)}
                        required
                        placeholder="City"
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                    <div className="w-full lg:w-1/2 ">
                      <label className="block mb-3 text-sm font-semibold text-gray-500">
                        Postcode
                      </label>
                      <input
                        name="postalcode"
                        type="text"
                        onChange={(e) => setPostal(e.target.value)}
                        required
                        placeholder="Post Code"
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <label className="flex items-center text-sm group text-heading">
                      <input
                        type="checkbox"
                        className="w-5 h-5 border border-gray-300 rounded focus:outline-none focus:ring-1"
                      />
                      <span className="ml-2">
                        Save this information for next time
                      </span>
                    </label>
                  </div>
                  <div className="relative pt-3 xl:pt-6">
                    <label className="block mb-3 text-sm font-semibold text-gray-500">
                      {' '}
                      Notes (Optional)
                    </label>

                    <textarea
                      name="notes"
                      className="flex items-center w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                      rows="4"
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Notes for delivery"
                    ></textarea>
                  </div>
                  <div className="mt-4">
                    {cartItems.length === 0 ? (
                      <button
                        type="submit"
                        disabled={true}
                        className="w-full px-6 py-2 text-blue-200 bg-green-600 hover:bg-green-800"
                      >
                        Process
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="w-full px-6 py-2 text-blue-200 bg-green-600 hover:bg-green-800"
                      >
                        Process
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>

            <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
              <div className="pt-12 lg:px-0 px-8 md:pt-0 2xl:ps-4">
                <h2 className="text-xl font-bold">Order Summary</h2>
                <div className="mt-8">
                  <div className="flex flex-col space-y-4">
                    {cartItems.map((item, idx) => {
                      return (
                        <div key={idx} className="flex space-x-4">
                          <div>
                            <img
                              src={item.product.img}
                              alt="image"
                              className="w-60"
                            />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold">
                              {item.product.name}
                            </h2>
                            <p className="text-sm">{item.qty} Item(s)</p>
                            <span className="text-red-600">Price </span>
                            <span>${item.product.price * item.qty}</span>
                          </div>
                          <div
                            onClick={(e) => {
                              removeItemHandler(item._id)
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-6 h-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="flex mt-4">
                  <h2 className="text-xl font-bold">
                    Cart Items: {cartItems.length}
                  </h2>
                </div>
                <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                  Subtotal<span className="ml-2">${total}</span>
                </div>
                <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                  Shipping Tax<span className="ml-2">${tax}</span>
                </div>
                <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                  Total<span className="ml-2">${total + tax}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContainerBlock>
    </ProtectedRoute>
  )
}
