import { useState, useEffect } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useRouter } from "next/router"
import PublicationList from "../components/PublicationList";
import Searchbar from "../components/Searchbar";
import Pagination from "../components/Pagination";

// const SEARCH_PUBLICATIONS_QUERY = gql`
//     query SearchPublications( $title: String, $offset: Int, $limit: Int ) {
//         publications( title: $title, offset: $offset, limit: $limit ) {
//             totalCount
//             publications {
//                 id
//                 title
//                 abstract
//                 num_citations
//             }
//         }
//     }
// `;

const SEARCH_PUBLICATIONS_QUERY = gql`
query NewPubsPag( $title: String, $offset: Int, $limit: Int ) {
    publications( title: $title, offset: $offset, limit: $limit ) {
        id
        title
        abstract
        num_citations
    }
}
`;

const publications = ({ homeSearchValue }) => {
    console.log('homesearchval: ', homeSearchValue);
    const router = useRouter();
    const [searchText, setSearchText] = useState("");

    const [ getSearchPublications, { loading: loadingSearch, error: errorSearch, data: dataSearch, fetchMore } ] = useLazyQuery(SEARCH_PUBLICATIONS_QUERY, {
        variables: { title: searchText }
    });

    // const { loading: loadingSearch, error: errorSearch, data: dataSearch, fetchMore } = useQuery(SEARCH_PUBLICATIONS_QUERY, {
    //     variables: { title: searchText, offset: 0 }
    // })


    useEffect(() => {
        // if(homeSearchValue !== undefined) {
        //     setSearchStatus(true) 
        // }

        getSearchPublications({ variables: { title: homeSearchValue, offset: 0 } })
    }, [homeSearchValue])

    function search(event) {
        console.log('trying to search: ', searchText)
        event.preventDefault();

        router.push(`/publications?homeSearchValue=${searchText}`, undefined);
    }

    if(errorSearch)
      return <div>Error loading publications</div>

    if(loadingSearch)
      return <div>Loading publications</div>


    // console.log('we got results: ', dataSearch)
    // const dataSet = dataSearch ? dataSearch.publications.publications : [];
    const dataSet = dataSearch ? dataSearch.publications : [];
    console.log('dataSet is: ', dataSearch)

    // const dataSet = dataSearch ?

    return (
        <div className="flex bg-gray-200 w-full">
            <div className="ml-16 w-1/5 h-screen">
                <h2 className="h-16 mt-4 mr-2 flex items-center text-xl font-semibold border-b-2 border-gray-300"><span>Options</span></h2>
                side stuff
                <h3>search only by title or abstract?</h3>
                <h3>sorting</h3>
                <h3>picking range of citations</h3>
                <h3>by authors maybe?</h3>
                <h3>by affiliation if we have time</h3>
            </div>

            <div className="w-4/5">
                <form className="sticky p-4 mr-8" onSubmit={search}>
                    <Searchbar searchText={searchText} setSearchText={setSearchText}/>
                </form>

                <div className="p-4 mr-8 mt-2 overflow-y-auto h-screen">

                    <div className="flex justify-end py-4 mt-4">
                        <h2>showing 1 - {dataSet.length} results for: <span className="font-semibold italic">{homeSearchValue}</span></h2>
                    </div>
                    <div>
                        {dataSet.length === 0 ?
                            <div>we have no data</div>
                        :
                            <>
                                <PublicationList publications={dataSet} />
                                <div className="flex flex-col items-center justify-center w-full mt-4">
                                    <h2>showing: 1 - {dataSet.length}</h2>
                                    <button 
                                        onClick={() => fetchMore({
                                            variables: {
                                                offset: dataSet.length
                                            }
                                        })} 
                                        className="flex items-center justify-center m-4 w-12 h-8 rounded-md bg-gray-300 text-gray-900 hover:bg-gray-700 hover:text-gray-300"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default publications;

publications.getInitialProps = ({ query: { homeSearchValue } }) => {
    return { homeSearchValue }
}