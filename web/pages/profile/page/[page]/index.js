import { gql } from "@apollo/client"
import Router from "next/router"
import { useState } from "react"
import client from "../../../../apollo-client"
import Pagination from "../../../../components/Pagination"
import ProfileList from "../../../../components/Profilelist"
import Searchbar from "../../../../components/Searchbar"
import Topicdropdown from "../../../../components/Topicdropdown"

const profiles = ({profiles, totalCount, offset}) => {
    const [currentOffset, setCurrentOffset] = useState(parseInt(offset));

    function handlePaginationChange(num) {
        const newOffset = (num-1)*10
        setCurrentOffset(newOffset)
        Router.push(`/profile/page/${newOffset}`)
    }

    return (
        <div className="flex bg-gray-200 h-screen w-full">
          <div className="ml-16 w-1/5 h-screen overflow-y-auto">
            <h2 className="h-16 mt-4 mr-2 flex items-center text-xl font-semibold border-b-2 border-gray-300"><span>Options</span></h2>
            <Topicdropdown />
          </div>
          <div className="w-4/5">
            <div className="p-4 mr-8 mt-2 overflow-y-auto h-screen">
              <Searchbar />

              <div className="flex justify-end pr-4 mt-4">
                <span className="font-semibold italic pr-1">{currentOffset}</span> - <span className="font-semibold px-1">{currentOffset+10}</span> of {totalCount} results shown
              </div>
              
              <ProfileList profiles={profiles}/>
              <Pagination totalCount={totalCount} offset={currentOffset} handlePaginationChange={handlePaginationChange} />
            </div>
          </div>
        </div>
    )
}

export default profiles;

export async function getServerSideProps(context) {
    const offset = context.query.page;
    const { data } = await client.query({
      query: gql`
        query Example {
          authors(offset: ${offset}) {
              totalCount
              authors {
                  id
                  name
                  url_picture
                  topics
              }
          }
        }
      `,
    });
  
    return {
      props: {
        totalCount: data.authors.totalCount,
        profiles: data.authors.authors,
        offset: offset,
      },
    };
  }