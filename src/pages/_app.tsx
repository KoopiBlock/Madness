import React from 'react';
import { SnipcartProvider } from 'use-snipcart';
import Layout from '../components/Layout/Layout';
import '../../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <SnipcartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SnipcartProvider>
  )
}

export default MyApp
