import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react';
import { SessionProvider } from 'src/components/sessionContext';
import { CookiesProvider } from 'react-cookie';

import './Login.css';


export default function App({ Component, pageProps }: AppProps) {
  return <CookiesProvider>
            <SessionProvider>
               <Component {...pageProps} />
         </SessionProvider>
   </CookiesProvider>
}
