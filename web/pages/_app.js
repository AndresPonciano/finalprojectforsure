import { ApolloProvider } from '@apollo/client';
import Layout from '../components/Layout'
import client from '../apollo-client';
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}

export default MyApp
