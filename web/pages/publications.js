import { useState, useEffect } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useRouter } from "next/router"
import PublicationList from "../components/PublicationList";
import Searchbar from "../components/Searchbar";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";
import AutocompleteSearch from "../components/AutocompleteSearch";
import Sortingdropdown from "../components/Sortingdropdown";

const SEARCH_PUBLICATIONS_QUERY = gql`
query NewPubsPag( $searchTerm: String, $offset: Int, $limit: Int, $sorted: String ) {
    publications( searchTerm: $searchTerm, offset: $offset, limit: $limit, sorted: $sorted ) {
        title
        abstract
        num_citations
        pub_authors {
            id
            name
        }
        highlight
    }
}
`;

const SUGGESTED_PUBLICATIONS_QUERY = gql`
  query SuggestedPubs( $prefix: String ) {
    pubSuggestedSearch( prefix: $prefix ) {
      title
    }
  }
`;

const sortingOptions = [
    {"value": "", "text": "None"},
    {"value": "num_citations_asc", "text": "Number of citations LOW-HI"},
    {"value": "num_citations_desc", "text": "Number of citations HI-LOW"},
    {"value": "title_asc", "text": "Titles A-Z"},
    {"value": "title_desc", "text": "Titles Z-A"},
]

const publications = ({ homeSearchValue }) => {
    const router = useRouter();
    const [searchText, setSearchText] = useState("");
    const [sortedBy, setSortedBy] = useState(sortingOptions[0]);
    const [searchStatus, setSearchStatus] = useState(false);

    const { loading: loadingSearch, error: errorSearch, data: dataSearch, fetchMore } = useQuery(SEARCH_PUBLICATIONS_QUERY, {
        variables: { searchTerm: homeSearchValue, sorted: sortedBy.value }
    });

    const [ getSuggestedPubs, { loading: loadingSugg, error: errorSugg, data: dataSugg } ] = useLazyQuery(SUGGESTED_PUBLICATIONS_QUERY, {
        variables: { prefix: searchText }
    });

    useEffect(() => {
        if(homeSearchValue !== undefined || sortedBy.text !== "None") {
            // console.log('pls search: ', sortedBy)
            setSearchStatus(true);
        }

    }, [homeSearchValue, sortedBy])

    useEffect(() => {
        if( searchText && searchText.length >= 0 ) {
          if(searchText.length % 2 === 0) {
            getSuggestedPubs({ variables: { prefix: searchText } });
          }
        }
    }, [searchText])

    function search(event) {
        event.preventDefault();

        setSearchStatus(true);
        router.push(`/publications?homeSearchValue=${searchText}`, undefined);
    }

    function handleSortedByChange(event) {
        setSortedBy(event.target.value);
    }

    if(errorSearch)
      return <div>Error loading publications</div>

    if(loadingSearch)
      return <LoadingSpinner />


    // console.log('we got results: ', dataSearch)
    // const dataSet = dataSearch ? dataSearch.publications.publications : [];
    const dataSet = dataSearch ? dataSearch.publications : [];
    // console.log('dataSet is: ', dataSearch)

    return (
        <div className="flex bg-gray-200 h-screen w-full">
            <div className="flex flex-col ml-16 w-1/5">
                <div className="h-1/5">
                    <h2 className="h-16 mt-4 mr-2 flex items-center text-xl font-bold border-b-2 border-gray-300">
                        <span>Search options</span>
                    </h2>
                </div>


                <div className="h-3/5">
                    <div className="">
                        <h2 className="font-semibold mb-2 text-gray-900">Sort by:</h2>
                        <Sortingdropdown sortedBy={sortedBy} setSortedBy={setSortedBy} sortingOptions={sortingOptions}/>
                    </div>

                    <div className="mt-2">
                        <h3>picking range of citations (pending)</h3>
                    </div>
                </div>

                <div className="flex items-end">
                    <button 
                        className="bg-blue-500 mb-8 p-2 text-white rounded-md border border-2 border-blue-300 hover:bg-blue-300 hover:border-blue-500"
                        onClick={search}
                    >
                        Refetch
                    </button>
                </div>

            </div>

            <div className="w-4/5 mr-16 ml-3">

                <div className="h-1/5 pt-6">
                    <div className="relative flex flex-col">
                        <form className="" onSubmit={search}>
                            <AutocompleteSearch searchText={searchText} setSearchText={setSearchText} suggestedResults={dataSugg} search={search}/>
                            {/* <Searchbar searchText={searchText} setSearchText={setSearchText}/> */}
                        </form>
                    </div>
                </div>

                <div className="h-4/5 overflow-y-scroll">

                    <div className="flex justify-end mb-2">
                        <h2>showing 1 - {dataSet.length} results for: <span className="font-semibold italic">{homeSearchValue}</span></h2>
                    </div>

                    <div>
                        {dataSet.length === 0 ?
                            <div>we have no data</div>
                        :
                            <>
                                <PublicationList publications={dataSet} />
                                <div className="flex flex-col items-center justify-center w-full">
                                    <h2>showing: 1 - {dataSet.length}</h2>
                                    <button 
                                        onClick={() => fetchMore({
                                            variables: {
                                                offset: dataSet.length
                                            }
                                        })} 
                                        className="hover:animate-bounce flex items-center justify-center m-4 w-12 h-8 rounded-md bg-gray-700 text-gray-200"
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