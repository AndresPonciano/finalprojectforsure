import { useState } from 'react';
import { gql, useQuery } from "@apollo/client"
import Head from "next/head"
import Image from "next/image"
import Homesearch from "../components/Homesearch";
import TopProfileData, { data } from "../components/TopProfileData";
import LoadingSpinner from '../components/LoadingSpinner';

const TOP_PEOPLE_QUERY = gql`
  query TopPeople( $topic: String ) {
    topPeople( topic: $topic ) {
      name
      total_citations
      h_index
      topics
    }
  }
`;

export default function Home() {
  const [topic, setTopic] = useState(null);

  const { loading: loadingTop, error: errorTop, data: dataTop, refetch } = useQuery(TOP_PEOPLE_QUERY, {
    variables: { topic: topic }
  });

  if(errorTop)
  return <div>Error loading all profiles</div>

  if(loadingTop)
    return <LoadingSpinner />

  console.log('data is: ', dataTop);

  return (
    <div>
      <Head>
        <title>Google Scholar IO</title>
        <meta name='keywords' content='test meta tag' />
      </Head>
      <div className="h-screen bg-hero-pattern text-white flex items-center justify-center">

        {/* <div className="flex flex-col w-full"> */}

          <div className='w-2/5 h-auto flex flex-col'>
            <div className='w-2/5'>
              <div className='flex mb-4 w-full h-16'>
                <h2 className="flex items-center justify-center font-semibold text-base sm:text-2xl bg-yellow-500 p-2 w-3/4 rounded-l-md">CS Scholar .</h2>
                <h2 className="flex items-center justify-center font-semibold text-2xl text-gray-100 bg-green-500 p-2 w-1/4 rounded-r-md">IO</h2>
              </div>
            </div>
            <Homesearch />

            <div className="flex flex-col items-center justify-center self-center mt-28">
              <button className="py-2 px-4 bg-gray-200 text-gray-900 rounded hover:animate-bounce">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <h2 className="p-2">Learn more</h2>
            </div>
          </div>


        {/* </div> */}


      </div>

      <div className="h-auto p-16">
        <TopProfileData topPeople={dataTop} loading={loadingTop}/>
      </div>

    </div>
  )
}