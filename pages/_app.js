import '@/style/main.css'

import { UserAuthContextProvider } from '@/context/UserAuthContext'
import { CartState } from '../context/Cart/CartState'

function Application({ Component, pageProps }) {
  return (
    <UserAuthContextProvider>
      <CartState>
        <main id="_app_">
          <Component {...pageProps} />
        </main>
      </CartState>
    </UserAuthContextProvider>
  )
}

export default Application
