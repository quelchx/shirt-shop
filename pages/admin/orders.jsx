import React, { useEffect, useState } from 'react'
import AdminOnlyRoute from '../../components/Auth/AdminOnlyRoute'
import ContainerBlock from '../../layout/ContainerBlock'

import OrderDataService from '../../services/orders.services'
import ShippingDataService from '../../services/shipping.services'

export default function OrdersPage({ email }) {
  const [orders, setOrders] = useState([])
  const [shipped, setShipping] = useState([])

  useEffect(() => {
    getOrders()
    getShippedOrders()
  }, [])

  const getOrders = async () => {
    const data = await OrderDataService.getAllOrders()
    setOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  const getShippedOrders = async () => {
    const data = await ShippingDataService.getAllOrders()
    setShipping(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  const deleteHandler = async (id, doc) => {
    await OrderDataService.deleteOrder(id)
    getOrders()
  }

  const shipOrderHandler = async (doc, id) => {
    await ShippingDataService.addOrder(doc)
    await OrderDataService.deleteOrder(id)
    getShippedOrders()
    getOrders()
  }

  const shippedDeleteHandler = async (id) => {
    await ShippingDataService.deleteOrder(id)
    getShippedOrders()
    getOrders()
  }

  return (
    <AdminOnlyRoute email={email}>
      <ContainerBlock title={`Admin Panel - ${email}`}>
        <div className="px-16 py-16 rounded-lg shadow">
          <h2 className="font-bold text-2xl pb-2">Current Orders</h2>
          {orders.length > 0 ? (
            <ul className="divide-y-2 shadow-lg divide-gray-100">
              {orders.map((doc) => {
                return (
                  <li key={doc.id} className="p-3 border-2">
                    <div>
                      <strong>Name: </strong>
                      {doc.name}
                    </div>
                    <div>
                      <strong>Email: </strong>
                      {doc.email}
                    </div>
                    <div>
                      <strong>Address: </strong>
                      {doc.address}, {doc.city} {doc.postal}
                    </div>
                    {doc.items.map((el) => {
                      return (
                        <div key={el.product.id}>
                          <div>
                            <strong>Order ID:</strong> {el.product.id}
                          </div>
                          <div>
                            <strong>Order: </strong> {el.product.name}
                          </div>
                          <div>
                            <strong>Size:</strong> {el.size}
                          </div>
                          <div>
                            <div>
                              <strong>Price Per Item:</strong> ${el.price}
                            </div>{' '}
                            <strong>Qty:</strong> {el.qty}
                          </div>
                          <div>
                            <strong>Total Price:</strong> ${el.price * el.qty}
                          </div>
                        </div>
                      )
                    })}
                    <p>Notes: {doc.notes}</p>
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={(e) => {
                          deleteHandler(doc.id, doc)
                        }}
                        className="px-2 py-1 bg-red-600 text-white"
                      >
                        Delete Order
                      </button>
                      <button
                        onClick={(e) => shipOrderHandler(doc, doc.id)}
                        className="px-2 py-1 bg-blue-600 text-white"
                      >
                        Ship Order
                      </button>
                      <a
                        href={`mailto:${doc.email}`}
                        className="px-2 py-1 bg-green-600 text-white"
                      >
                        Contact Buyer
                      </a>
                    </div>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p>No Orders</p>
          )}
          <br />
          <hr />
          <div className="pt-10">
            <h2 className="font-bold text-2xl pb-2">Shipped Orders</h2>
            {shipped.length > 0 ? (
              <>
                <ul className="divide-y-2 shadow-lg divide-gray-100">
                  {shipped.map((doc) => {
                    return (
                      <li key={doc.id} className="p-3 border-2">
                        <div className="py-2">
                          <strong>Name: </strong>
                          {doc.name}
                        </div>
                        <hr />
                        <div className="py-2">
                          <strong>Email: </strong>
                          {doc.email}
                        </div>
                        <hr />

                        <div className="py-2">
                          <strong>Address: </strong>
                          {doc.address}, {doc.city} {doc.postal}
                        </div>
                        <hr />
                        <p className='py-2'>Notes: {doc.notes}</p>
                        <hr />
                        {doc.items.map((el) => {
                          return (
                            <div className="p-2" key={el.product.id}>
                              <div>
                                <strong>Order ID:</strong> {el.product.id}
                              </div>
                              <div>
                                <strong>Order: </strong> {el.product.name}
                              </div>
                              <div>
                                <strong>Size:</strong> {el.size}
                              </div>
                              <div>
                                <div>
                                  <strong>Price Per Item:</strong> ${el.price}
                                </div>{' '}
                                <strong>Qty:</strong> {el.qty}
                              </div>
                              <div>
                                <strong>Total Price:</strong> $
                                {el.price * el.qty}
                              </div>
                              <hr />
                            </div>
                          )
                        })}
                        <div className="mt-2 flex gap-2">
                          <button
                            onClick={(e) => {
                              shippedDeleteHandler(doc.id)
                            }}
                            className="px-2 py-1 bg-red-600 text-white"
                          >
                            Delete Order
                          </button>

                          <a
                            href={`mailto:${doc.email}`}
                            className="px-2 py-1 bg-green-600 text-white"
                          >
                            Contact Buyer
                          </a>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </>
            ) : (
              <>
                <p>Nothing has been shipped</p>
              </>
            )}
          </div>
        </div>
      </ContainerBlock>
    </AdminOnlyRoute>
  )
}

export async function getStaticProps() {
  const email = 'admin@test.com'
  return {
    props: {
      email,
    },
  }
}