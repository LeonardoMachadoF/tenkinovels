import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthContextProvider } from '../src/context/authContext/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthContextProvider>
            <Component {...pageProps} />
        </AuthContextProvider>
    )
}

export default MyApp
