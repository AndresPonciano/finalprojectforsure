import Head from "next/head"
import { gql } from "@apollo/client"
import client from "../apollo-client"
import { useState } from "react";
import Searchbar from '../components/Searchbar'

export default function Home({ profiles }) {
  console.log('AAA', profiles)
  const [searchText, setSearchText] = useState("");


  return (
    <div>
      <Head>
        <title>Google Scholar IO</title>
        <meta name='keywords' content='test meta tag' />
      </Head>
      <div className='h-screen bg-black text-white flex items-center justify-center'>
        <div className='bg-red-200 w-2/5 h-32 flex flex-col'>
          <div className='bg-yellow-300 w-2/5'>
            <div className='text-3xl my-2'>
              Google Scholar
              {/* <span className='bg-yellow-400 h-full'>Google Scholar</span> */}
            </div>

          </div>
          <Searchbar searchText={searchText} setSearchText={setSearchText} />
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Example {
        authors {
          id
          name
        }
      }
    `,
  });

  return {
    props: {
      profiles: data,
    },
  };
}