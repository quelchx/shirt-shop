import React, { useEffect, useState } from 'react'
import Heading from '@/components/Store/Heading'
import StoreItem from '@/components/Store/Products/StoreItem'

import ProductDataService from '@/services/product.services'
import ContainerBlock from '@/layout/ContainerBlock'

import meta from '@/constants/meta'
import ProtectedRoute from '../../components/Auth/ProtectedRoute'

export default function StorePage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    const data = await ProductDataService.getAllProducts()
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  return (
    <ProtectedRoute>
      <ContainerBlock
        title={meta.store.title}
        description={meta.store.description}
      >
        <div className="flex flex-col items-center justify-center px-4 py-32">
          <Heading />
          <div className="bg-white">
            <div className="max-w-2xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
              <h2 className="sr-only">Products</h2>

              <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {products.map((item, idx) => {
                  return (
                    <StoreItem
                      key={idx}
                      route={`/store/${item.id}`}
                      name={item.name}
                      price={item.price}
                      image={item.img}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </ContainerBlock>
    </ProtectedRoute>
  )
}
