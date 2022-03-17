import { useState, useEffect } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useRouter } from "next/router"
import PublicationList from "../components/PublicationList";
import Searchbar from "../components/Searchbar";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";
import AutocompleteSearch from "../components/AutocompleteSearch";

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

const publications = ({ homeSearchValue }) => {
    const router = useRouter();
    const [searchText, setSearchText] = useState("");
    const [sortedBy, setSortedBy] = useState("");
    const [searchStatus, setSearchStatus] = useState(false);


    // const [ getSearchPublications, { loading: loadingSearch, error: errorSearch, data: dataSearch, fetchMore } ] = useLazyQuery(SEARCH_PUBLICATIONS_QUERY, {
    //     variables: { searchTerm: searchText }
    // });

    console.log('homesearval: ', homeSearchValue)

    const { loading: loadingSearch, error: errorSearch, data: dataSearch, fetchMore } = useQuery(SEARCH_PUBLICATIONS_QUERY, {
        variables: { searchTerm: homeSearchValue }
    });

    const [ getSuggestedPubs, { loading: loadingSugg, error: errorSugg, data: dataSugg } ] = useLazyQuery(SUGGESTED_PUBLICATIONS_QUERY, {
        variables: { prefix: searchText }
    });

    useEffect(() => {
        // getSearchPublications({ variables: { searchTerm: homeSearchValue, offset: 0 } })
        console.log('here what', homeSearchValue)

        if(homeSearchValue !== undefined) {
            setSearchStatus(true);
        }

    }, [homeSearchValue])

    useEffect(() => {
        // console.log('printing when searchtext changes: ', searchText);
        if( searchText && searchText.length >= 0 ) {
          if(searchText.length % 2 === 0) {
            getSuggestedPubs({ variables: { prefix: searchText } });
          }
        }
    }, [searchText])

    function search(event) {
        console.log('trying to search: ', searchText)
        event.preventDefault();

        // setSearchStatus(true);
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
        <div className="flex bg-gray-200 w-full">
            <div className="ml-16 w-1/5 h-screen">
                <h2 className="h-16 mt-4 mr-2 flex items-center text-xl font-semibold border-b-2 border-gray-300"><span>Options</span></h2>
            
                <h3 className="mt-2 font-semibold">by title or abstract? (not yet)</h3>
                <div>
                    <label>
                        <input className="mr-2" type="radio" name="searchPubsOption" value="title" />
                        <span>Title</span>
                    </label>
                    <label className="ml-2">
                        <input className="mr-2" type="radio" name="searchPubsOption" value="abstract" />
                        <span>Abstract</span>
                    </label>
                </div>


                <h3 className="mt-2 font-semibold">sorting</h3>
                <div>
                    <select className="w-full p-2 rounded-md" value={sortedBy} onChange={handleSortedByChange}>
                        <option value="">None</option>
                        <option value="num_citations_asc">
                            Number of citations low-hi
                        </option>
                        <option value="num_citations_desc">
                            Number of citations hi-low
                        </option>
                        <option value="title_asc">
                            Number of citations A-Z
                        </option>
                        <option value="title_desc">
                            Number of citations Z-A
                        </option>
                    </select>
                </div>

                <h3>picking range of citations</h3>

                <button 
                    className="bg-blue-700 mt-2 p-2 text-white rounded-md border border-3 border-blue-300 hover:bg-blue-300 hover:text-slate-800 hover:border-blue-600"
                    // onClick={() => getSearchPublications({ variables: { searchTerm: homeSearchValue, offset: 0, sorted: sortedBy } })}
                >
                    CHECK THIS BUTTON FUNCTION LOL
                    refetch search
                </button>
            </div>

            <div className="w-4/5">
                <form className="sticky p-4 mr-8" onSubmit={search}>
                    {/* <AutocompleteSearch searchText={searchText} setSearchText={setSearchText} suggestedResults={dataSugg} search={search}/> */}
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
                                        className="hover:animate-bounce flex items-center justify-center m-4 w-12 h-8 rounded-md bg-gray-300 text-gray-900 hover:bg-gray-700 hover:text-gray-300"
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