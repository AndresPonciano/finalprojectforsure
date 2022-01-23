import { useState, useEffect } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useRouter } from "next/router"
import PublicationList from "../components/PublicationList";
import Searchbar from "../components/Searchbar";
import Pagination from "../components/Pagination";

const SEARCH_PUBLICATIONS_QUERY = gql`
    query SearchPublications( $title: String, $offset: Int, $limit: Int ) {
        publications( title: $title, offset: $offset, limit: $limit ) {
            totalCount
            publications {
                id
                title
                abstract
                num_citations
            }
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
    const dataSet = dataSearch ? dataSearch.publications.publications : [];
    console.log('dataSet is: ', dataSearch)

    // const dataSet = dataSearch ?

    return (
        <div className="flex bg-gray-200 h-screen w-full">
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
                <div className="p-4 mr-8 mt-2 overflow-y-auto h-screen">
                    <form onSubmit={search}>
                        <Searchbar searchText={searchText} setSearchText={setSearchText}/>
                        {/* <button 
                            className="bg-blue-500 text-white px-4 rounded-md border-2 border-blue-200"
                            onClick={search}
                        >
                            Search
                        </button> */}
                    </form>

                    <div className="flex justify-end py-4 mt-4">
                        offset results go here
                    </div>
                    <div>
                        {dataSet.length === 0 ?
                            <div>we have no data</div>
                        :
                            <>
                                <PublicationList publications={dataSet} />
                                <button 
                                    onClick={() => fetchMore({
                                        variables: {
                                            offset: dataSet.length
                                        }
                                    })} 
                                    className="bg-blue-700 text-white"
                                >
                                    fetch more button
                                </button>
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