import { useState } from 'react';
import { gql, useQuery } from "@apollo/client"
import Head from "next/head"
import Image from "next/image"
import Homesearch from "../components/Homesearch";
import TopProfileData from "../components/TopProfileData";
import LoadingSpinner from '../components/LoadingSpinner';
import Footer from '../components/Footer';
import Link from 'next/link';

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
  const [topic, setTopic] = useState("None");

  const { loading: loadingTop, error: errorTop, data: dataTop, refetch } = useQuery(TOP_PEOPLE_QUERY, {
    variables: { topic: topic }
  });

  if(errorTop)
  return <div>Error loading top profiles</div>

  let loadingOrData;

  if(loadingTop)
    loadingOrData =  <LoadingSpinner />;
  else
    loadingOrData = 
      <div>
        <TopProfileData topPeople={dataTop.topPeople} loading={loadingTop} topic={topic} handleTopicChange={setTopic}/>
      </div>

    return (
      <div>
        <Head>
          <title>Google Scholar IO</title>
          <meta name='keywords' content='test meta tag' />
        </Head>
        <div className="flex flex-col h-screen bg-hero-pattern text-white">

          <div className="flex items-center justify-center h-4/6 w-full">
            <div className='w-2/5 h-auto flex flex-col mt-12'>
              <div className='w-2/5'>
                <div className='flex items-start mb-4 w-full h-16'>
                  <Image width={90} height={70} src='/images/newLogo.svg'/>
                </div>
              </div>
              <Homesearch />
            </div>

          </div>

          <div className='flex flex-col items-center justify-center h-2/6 w-full justify-self-end'>
            <Link href="/#peopleData">
              <button className="py-2 px-4 text-gray-700 bg-gray-200 rounded hover:animate-bounce">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        <div id="peopleData" className="h-auto p-16 bg-gray-200">
          {loadingOrData}
        </div>

        <Footer />

      </div>
    )
}