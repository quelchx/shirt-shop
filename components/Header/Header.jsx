import React from 'react'
import Link from 'next/link'

export default function Header() {
  return (
    <section className="px-2 py-16 bg-white md:px-0">
      <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
        <div className="flex flex-wrap items-center sm:-mx-3">
          <div className="w-full md:w-1/2 md:px-3">
            <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                <span className="block xl:inline">Start Shopping</span>
                <span className="block text-green-600 xl:inline">
                  Get your Style on!
                </span>
              </h1>
              <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                Browse our selections of different memorabilia.
              </p>
              <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                <Link href="/store">
                  <a className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-green-600 rounded-md sm:mb-0 hover:bg-green-700 sm:w-auto">
                    Shop
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 ml-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </Link>

                <Link href="/about">
                  <a className="flex items-center px-6 py-3 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 hover:text-gray-600">
                    About Us
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
              {/* temporary image */}
              <img src="https://imgs.michaels.com/MAM/assets/1/5E3C12034D34434F8A9BAAFDDF0F8E1B/img/DF9D7F41F8FF4693B79B79205A6BE9B0/M20001555_3.jpg?fit=inside|540:540" />
            </div>
          </div>

          
        </div>
      </div>
    </section>
  )
}
