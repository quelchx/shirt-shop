import React, { useState, useEffect } from 'react'
import AdminOnlyRoute from '../../components/Auth/AdminOnlyRoute'
import AddProduct from '../../components/Inventory/AddProduct'
import ProductList from '../../components/Inventory/ProductList'
import ContainerBlock from '@/layout/ContainerBlock'
// import { useUserAuth } from '../../context/UserAuthContext'

export default function PortalPage({ email }) {
  const [productId, setProductId] = useState('')

  const getProductHandler = (id) => {
    setProductId(id)
  }

  return (
    <AdminOnlyRoute email={email}>
      <ContainerBlock
        title={'Admin Panel - ' + email}
        description="T-Shirt Shop Admin Panel"
      >
        <div className="p-2">
          <div className="mx-2">
            <AddProduct id={productId} setProductId={setProductId} />
          </div>
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200"></div>
            </div>
          </div>
          <div className="mx-6">
            <ProductList getProductId={getProductHandler} />
          </div>
        </div>
      </ContainerBlock>
    </AdminOnlyRoute>
  )
}

export async function getStaticProps() {
  const email = process.env.ADMIN_EMAIL
  return {
    props: {
      email,
    },
  }
}
