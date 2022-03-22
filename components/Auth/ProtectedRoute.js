import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useUserAuth } from '../../context/UserAuthContext';

const ProtectedRoute = ({ children }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  const { user } = useUserAuth()

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
    }

    setLoading(false)

  }, [user, loading])


  if (loading) {
    return (
      <>
        <div>loading...</div>
      </>
    )
  }

  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRoute;