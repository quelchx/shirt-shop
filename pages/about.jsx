import React from 'react'
import ContainerBlock from '../layout/ContainerBlock'

import meta from '../constants/meta'

export default function AboutPage() {
  return (
    <ContainerBlock title={meta.about.title} description={meta.about.description}>
      <div className="flex flex-col items-center justify-center px-4 py-32">
        <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0"></div>
        <div className="w-full md:w-1/2 md:px-3"></div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
          <span className="block xl:inline">About Us</span>
          {/* <span className="block text-green-600 xl:inline">Us</span> */}
        </h1>

        <div className="text-left">
          <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Welcome to <strong>T-Shirts</strong>, your number one source for
            t-shirt’s emoji design. We're dedicated to providing you the very best
            quality, with an emphasis on social responsibility, and health.
          </p>

          <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Founded in 2022 by <strong>Group Nine – Fanshawe College</strong>,
            T-Shirts has come a long way from its beginnings in London, Ontario.
            When we first started out, our passion for nutrition, exercise and
            healthy living lifestyles drove us to start our own business.
          </p>

          <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            We hope you enjoy our products as much as we enjoy creating and
            offering them to you. If you have any questions or comments, please
            don't hesitate to contact us.
          </p>

          <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Sincerely,
          </p>

          <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Group Nine – Fanshawe College
          </p>
        </div>
      </div>
    </ContainerBlock>
  )
}
