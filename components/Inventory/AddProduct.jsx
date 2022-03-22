import React, { useState, useEffect } from 'react'
import ProductDataService from '../../services/product.services'

export default function AddProduct({ id, setProductId}) {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(25)
  const [desc, setDesc] = useState('')
  const [img, setImage] = useState('')
  const [avail, setAvail] = useState(true)
  const [message, setMessage] = useState({ error: false, msg: '' })

  function reset() {
    setTitle('')
    setDesc('')
    setPrice(0)
    setImage("")
    setAvail(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    if (title === '' || desc === '') {
      setMessage({ error: true, msg: 'All fields are manditory' })
    } else if (price <= 0 ) {
      setMessage({
        error: true,
        msg: 'The product has to have a price and quantity',
      })
    }

    const newProduct = {
      name: title,
      price: price,
      description: desc,
      img: img,
      status: avail,
    }

    try {
      if (id !== undefined && id !== '') {
        await ProductDataService.updateProduct(id, newProduct)
        setProductId('')
        setMessage({ error: false, msg: 'Product was successfully updated' })
      } else {
        await ProductDataService.addProducts(newProduct)
        setMessage({ error: false, msg: 'Product was successfully added' })
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message })
    }
    reset()
  }

  const editHandler = async () => {
    setMessage('')
    try {
      const docSnap = await ProductDataService.getProduct(id)
      setTitle(docSnap.data().name)
      setDesc(docSnap.data().description)
      setAvail(docSnap.data().status)
      setImage(docSnap.data().img)
      setPrice(docSnap.data().price)
    } catch (err) {
      setMessage({ error: true, msg: err.message })
    }
  }

  useEffect(() => {
    if (id !== undefined && id !== '') {
      editHandler()
    }
  }, [id])

  return (
    <div className="px-10 py-12">
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Admin Inventory
              </h3>
              <>
                {message?.msg && (
                  <p className="mt-1 text-sm text-red-600">{message.msg}</p>
                )}
              </>
            </div>
          </div>

          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Product Title
                      </label>
                      <input
                        type="text"
                        placeholder="Product Name"
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        className="_input_"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Price
                      </label>
                      <input
                        type="number"
                        placeholder="$0.00"
                        className="_input_"
                        value={price}
                        required
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>

                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        placeholder="Product Description"
                        value={desc}
                        required
                        onChange={(e) => setDesc(e.target.value)}
                        className="_input_"
                      />
                    </div>

                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Image Link
                      </label>
                      <input
                        value={img}
                        placeholder='Image Link'
                        onChange={(e) => setImage(e.target.value)}
                        type="text"
                        required
                        className="_input_"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        defaultValue={avail}
                        onChange={(e) => setAvail(e.target.value)}
                        className="_input_"
                      >
                        <option value='true'>In Stock</option>
                        <option value='false'>Out Of Stock</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-3 bg-gray-50 text-left sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Add / Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
