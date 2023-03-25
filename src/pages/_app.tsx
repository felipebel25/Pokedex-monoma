import '../../styles/globals.css'
import { ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { lightTheme } from 'themes'
import { AuthProvider } from '@/context'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <AuthProvider>
      <ThemeProvider theme={lightTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  )
}
