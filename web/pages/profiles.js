import { gql } from "@apollo/client"
import { useState } from "react"
import Searchbar from "../components/Searchbar"
import client from "../apollo-client"
import Pagination from "../components/Pagination"

const profiles = ({profiles, totalCount}) => {
    const [currentOffset, setCurrentOffset] = useState(0);
    console.log(currentOffset);
    function handlePaginationChange() {
        setCurrentOffset(40)
    }

    return (
        <div className="bg-gray-200 h-screen">
            <div>idk here <Searchbar /> </div>
            <h2>all profiles go here</h2>
            <Pagination totalCount={totalCount} offset={10}/>
            <button onClick={handlePaginationChange}>press me</button>
        </div>
    )
}

export default profiles;

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Example {
        authors {
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