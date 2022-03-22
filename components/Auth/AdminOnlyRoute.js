import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useUserAuth } from '../../context/UserAuthContext'

const AdminOnlyRoute = ({ children, email }) => {
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  const { user } = useUserAuth()

  useEffect(() => {
    if (user && user.email === email) {
      setAuthorized(true)
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (!authorized) {
      setLoading(false)
    }
  })

  if (loading) {
    return <div>loading...</div>
  }

  if (!authorized) {
    return (
      <div className="bg-gray-50 grid place-items-center h-screen">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Access Denied...</span>
            <span className="block text-green-600">
              you don't have access to this page
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                {' '}
                Home
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                onClick={() => router.back()}
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50"
              >
                {' '}
                Go Back
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default AdminOnlyRoute
