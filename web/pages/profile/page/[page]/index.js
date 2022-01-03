import { gql } from "@apollo/client"
import { useState } from "react"
import client from "../../../../apollo-client"
import Pagination from "../../../../components/Pagination"
import ProfileList from "../../../../components/Profilelist"
import Searchbar from "../../../../components/Searchbar"

const profiles = ({profiles, totalCount}) => {
    const [currentOffset, setCurrentOffset] = useState(0);
    console.log(currentOffset);
    function handlePaginationChange() {
        setCurrentOffset(40)
    }

    return (
        <div className="flex bg-gray-200 h-screen w-full">
          <div className="ml-16 w-1/5">
            <h2 className="h-16 bg-red-200 mt-4 mr-2 flex items-center text-xl font-semibold"><span>Options</span></h2>
            lol
          </div>
          <div className="w-4/5">
            <div className="mr-16 mt-4 overflow-y-auto h-screen">
              <Searchbar />

              <div className="flex justify-end pr-4 mt-4">
                {currentOffset} - {currentOffset+10} of {totalCount} results shown
              </div>
              
              <ProfileList profiles={profiles}/>
              <Pagination totalCount={totalCount} offset={currentOffset}/>
              {/* <button onClick={handlePaginationChange}>press me</button> */}
            </div>
          </div>
        </div>
    )
}

export default profiles;

export async function getServerSideProps(context) {
    console.log('in prof page: ', context.query.page);
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
      },
    };
  }