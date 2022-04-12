// will have to manage login state if we choose to have auth system -- meaning sign-in if no user isLoggedIn deteIsctegedIns = useState(false)ign-out if user isLoggedIn currIsentgedIn  = useState(false)active (buttons)
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import routes from '../../routes'
import toggleMenu from '@/constants/utils'

import { useUserAuth } from '../../context/UserAuthContext'
import { useCartContext } from '../../context/Cart/CartState'

export default function Navbar() {
  const { user, logOut } = useUserAuth()
  const router = useRouter()
  const { cartItems } = useCartContext()

  const renderAvatar = () => {
    if (user) {
      if (user.photoURL === null) {
        return (
          <img
            className="w-8 h-8 rounded-full"
            src="https://www.pngkey.com/png/detail/115-1150152_default-profile-picture-avatar-png-green.png"
            alt="avatar"
          />
        )
      }
      return (
        <img
          className="w-8 h-8 rounded-full"
          src={user.photoURL}
          alt="avatar"
        />
      )
    } else {
      return (
        <img
          className="w-8 h-8 rounded-full"
          src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
          alt="avatar"
        />
      )
    }
  }

  const handleLogout = async () => {
    // clearing local storage to ensure if another user logs in the previous storage doesn't load in -- this is the only option for now
    localStorage.clear()
    try {
      await logOut()
      router.reload(window.location.pathname)
    } catch (err) {
      // change this eventually
      console.log(err)
    }
  }

  return (
    <nav className="bg-green-600">
      <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>

              <svg
                onClick={() => toggleMenu('mobile-menu', 'sm:hidden', 'hidden')}
                className="block w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <svg
                className="hidden w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
            <div className="flex items-center flex-shrink-0">
              {/* logo - will need to change */}
              <img
                className="block w-auto h-8 lg:hidden"
                src="https://cdn-icons-png.flaticon.com/512/135/135620.png"
                alt="Workflow"
              />
              {/* logo with name - will need to change */}
              <img
                className="hidden w-auto h-8 lg:block"
                src="https://cdn-icons-png.flaticon.com/512/135/135620.png"
                alt="Workflow"
              />
              <p className="hidden px-2 font-bold text-white lg:block">
                T-Shirts
              </p>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {routes.map((route) => {
                  return (
                    <Link key={route.id} href={route.path}>
                      <a className="px-3 py-2 text-sm font-bold text-white rounded-md hover:bg-green-700 hover:text-white">
                        {route.name}
                      </a>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* THESE BUTTONS NEED TO BE INSIDE THE DROPDOWN MENU -- THIS BREAKS THE RESPONSIVENESS OF THE NAVBAR  */}

            {/* <div className="relative flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex-shrink-0 order-3 w-full mt-2 sm:order-2 sm:mt-0 sm:w-auto">
                <Link href="/login">
                    <a className="flex items-center px-6 py-3 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 hover:text-gray-600">
                      Login
                    </a>
                </Link>
              </div>
              <div className="flex-shrink-0 order-3 w-full mt-2 sm:order-2 sm:mt-0 sm:w-auto">
                <Link href="/register">
                  <a className="flex items-center px-6 py-3 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 hover:text-gray-600">
                    Register
                  </a>
                </Link>
              </div>
            </div>   */}
            {user && (
              <Link href="/store/checkout" type="button">
                <button className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="white"
                      d="M24 3l-.743 2h-1.929l-3.474 12h-13.239l-4.615-11h16.812l-.564 2h-13.24l2.937 7h10.428l3.432-12h4.195zm-15.5 15c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.9-7-1.9 7c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5z"
                    />
                  </svg>
                  <span className="inline-flex items-center justify-center w-6 h-6 ml-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                    {cartItems.length}
                  </span>
                </button>
              </Link>
            )}

            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="flex text-sm bg-green-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() =>
                    toggleMenu('dropdown-menu', 'hidden', '_dropdown_')
                  }
                >
                  <span className="sr-only">Open user menu</span>
                  {/* AVATAR*/}
                  {renderAvatar()}
                </button>
              </div>

              <div
                className="hidden"
                role="menu"
                id="dropdown-menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex="-1"
              >
                {user && (
                  <>
                    <Link href="/">
                      <a
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-0"
                      >
                        Dashboard
                      </a>
                    </Link>
                    <a
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                    >
                      Sign Out
                    </a>
                  </>
                )}
                {!user && (
                  <>
                    <Link href="/auth/register">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-1"
                      >
                        Register
                      </a>
                    </Link>
                    <Link href="/auth/login">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-2"
                      >
                        Sign In
                      </a>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {routes.map((route) => {
            return (
              <Link key={route.id} href={route.path}>
                <a
                  className="block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-green-700"
                  aria-current="page"
                >
                  {route.name}
                </a>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
