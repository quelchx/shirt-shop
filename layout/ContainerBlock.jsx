import Head from 'next/head'
import { useRouter } from 'next/router'

import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'

export default function ContainerBlock({ children, ...customMeta }) {
  const router = useRouter()

  const meta = {
    title: 'Group Nine T-Shirt Shop',
    description: 'Group Nine Project T-Shirt Shop',
    image: 'https://avatars.githubusercontent.com/u/74473426?v=4',
    type: 'website',
    ...customMeta,
  }

  function unToggleMenu() {
    let menu = document.getElementById('dropdown-menu')
    if (menu.className === '_dropdown_') {
      menu.className = 'hidden'
    }
  }

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins&family=Ubuntu&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
          integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/flowbite@1.3.4/dist/flowbite.min.css"
        />

        <script src="https://cdnjs.cloudflare.com/ajax/libs/alpinejs/2.8.0/alpine.js"></script>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`https://quelchx${router.asPath}`} />
        {/* <link rel="canonical" href={`https://quelchx.com${router.asPath}`} /> */}
        <meta property="og:type" content={meta.type} />
        {/* <meta property="og:site_name" content="quelchx.com" /> */}
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        {/* <meta name="twitter:site" content="@wcbblez" /> */}
        {/* <meta name="twitter:title" content={meta.title} /> */}
        {/* <meta name="twitter:description" content={meta.description} /> */}
        {/* <meta name="twitter:image" content={meta.image} /> */}
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <section>
        <Navbar />
        <div onClick={unToggleMenu}>{children}</div>
        <Footer />
      </section>
    </>
  )
}
