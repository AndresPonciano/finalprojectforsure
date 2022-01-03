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
        <div className='w-2/5 h-32 flex flex-col'>
          <div className='w-2/5'>
            <Image src={"/images/logo.png"} width={1100} height={200} />
          </div>
          <Homesearch />
        </div>
      </div>
    </div>
  )
}