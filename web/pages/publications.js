import { useState, useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import Searchbar from "../components/Searchbar";
import Pagination from "../components/Pagination";

const SEARCH_PUBLICATIONS_QUERY = gql`
    query SearchPublications( $title: String ) {
        publications( title: $title ) {
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
    const [searchText, setSearchText] = useState("");

    const [ getSearchPublications, { loading: loadingSearch, error: errorSearch, data: dataSearch } ] = useLazyQuery(SEARCH_PUBLICATIONS_QUERY, {
        variables: { title: searchText }
      });


    useEffect(() => {
        // if(homeSearchValue !== undefined) {
        //     setSearchStatus(true) 
        // }

        getSearchPublications({ variables: { title: homeSearchValue } })
    }, [])

    function search() {
        console.log('trying to search: ', searchText)

        if(searchText !== "") {
            getSearchPublications({ variables: { title: searchText } })
        }
    }

    if(errorSearch)
      return <div>Error loading publications</div>

    if(loadingSearch)
      return <div>Loading publications</div>


    // console.log('we got results: ', dataSearch)
    const dataSet = dataSearch ? dataSearch.publications.publications : [];
    console.log('dataSet is: ', dataSet)

    // const dataSet = dataSearch ?

    return (
        <div className="flex bg-gray-200 h-screen w-full">
            <div className="ml-16 w-1/5 h-screen">
                <h2 className="h-16 mt-4 mr-2 flex items-center text-xl font-semibold border-b-2 border-gray-300"><span>Options</span></h2>
                side stuff
            </div>

            <div className="w-4/5">
                <div className="p-4 mr-16 mt-2 overflow-y-auto h-screen">
                    <div className="flex-1 flex justify-between">
                        <div className="w-5/6">
                            <Searchbar searchText={searchText} setSearchText={setSearchText}/>
                        </div>
                        <button 
                            className="bg-blue-500 text-white px-4 rounded-md border-2 border-blue-200"
                            onClick={search}
                        >
                            Search
                        </button>
                    </div>

                    <div className="flex justify-end py-4 mt-4">
                        offset results go here
                    </div>
                    <div>
                        results go here
                        {dataSet.length === 0 ?
                            <div>we have no data</div>
                        :
                            <div>
                                {dataSet.map((dataItem) => {
                                    return (
                                        <h1>
                                            {dataItem.title}
                                        </h1>
                                    )
                                })}
                            </div>
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