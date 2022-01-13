import Head from "next/head"
import Image from "next/image"
import Homesearch from "../components/Homesearch";

export default function Home() {

  return (
    <div>
      <Head>
        <title>Google Scholar IO</title>
        <meta name='keywords' content='test meta tag' />
      </Head>
      <div className='h-screen bg-black text-white flex items-center justify-center'>
        {/* <Image className='z-0' src={"/images/homeBackground.png"} width={1100} height={800}/> */}
        <div className='w-2/5 h-32 flex flex-col'>
          <div className='w-2/5'>
            <div className='flex mb-4 w-full h-16'>
              <h2 className="flex items-center justify-center font-semibold text-2xl bg-yellow-400 p-2 w-3/4 rounded-l-md">CS Scholar .</h2>
              <h2 className="flex items-center justify-center font-semibold text-2xl text-gray-100 bg-green-400 p-2 w-1/4 rounded-r-md">IO</h2>
            </div>
            {/* <Image src={"/images/logo.png"} width={1100} height={200} /> */}
          </div>
          <Homesearch />
        </div>
      </div>
    </div>
  )
}