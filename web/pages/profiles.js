import { gql, useLazyQuery, useQuery } from "@apollo/client"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Pagination from "../components/Pagination"
import ProfileList from "../components/Profilelist"
import Searchbar from "../components/Searchbar"
import Topicdropdown from "../components/Topicdropdown"
import LoadingSpinner from "../components/LoadingSpinner"
import SuggestedResults from "../components/SuggestedResults"
import Sortingdropdown from "../components/Sortingdropdown"
import AutocompleteSearch from "../components/AutocompleteSearch"

const ALL_PROFILES_QUERY = gql`
  query AllProfiles( $offset: Int ) {
    authors(offset: $offset) {
        totalCount
        authors {
            id
            name
            url_picture
            affiliation
            topics
            other_topics
        }
    }
  }
`;

const SEARCH_PROFILES_QUERY = gql`
  query SearchProfiles( $name: String, $topic: String, $offset: Int, $sorted: String ) {
    authors( name: $name, topic: $topic, offset: $offset, sorted: $sorted ) {
      totalCount
      authors {
        id
        name
        url_picture
        affiliation
        topics
        other_topics
      }
    }
  }
`;

const SUGGESTED_PROFILES_QUERY = gql`
  query SuggestedPeople( $prefix: String ) {
    peopleSuggestedSearch( prefix: $prefix ) {
      name
    }
  }
`;

const sortingOptions = [
  {"value": "", "text": "None"},
  {"value": "name_asc", "text": "Names A-Z"},
  {"value": "name_desc", "text": "Names Z-A"}
]

const profiles = ({ homeSearchValue }) => {
    const router = useRouter();
    const [currentOffset, setCurrentOffset] = useState(0);
    const [searchTopic, setSearchTopic] = useState("None");
    const [searchText, setSearchText] = useState("");
    const [searchStatus, setSearchStatus] = useState(false);
    const [sortedBy, setSortedBy] = useState(sortingOptions[0])
    const [dataSet, setDataSet] = useState([]);

    useEffect(() => {
      if( searchText.length >= 0 ) {
        if(searchText.length % 2 === 0) {
          getSuggestedPeople({ variables: { prefix: searchText } });
        }
      }
    }, [searchText])

    useEffect(() => {
      if(homeSearchValue !== undefined || searchTopic !== "None" || sortedBy.text !== "None") {
        setSearchStatus(true);
      }

    }, [homeSearchValue, searchTopic, sortedBy])

    const { loading: loadingAll, error: errorAll, data: dataAll, refetch } = useQuery(ALL_PROFILES_QUERY, {
      variables: { offset: currentOffset }
    });

    const { loading: loadingTemp, error: errorTemp, data: dataTemp } = useQuery(SEARCH_PROFILES_QUERY, {
      variables: { name: homeSearchValue, topic: searchTopic, offset: currentOffset, sorted: sortedBy.value }
    });

    const [ getSuggestedPeople, { loading: loadingSugg, error: errorSugg, data: dataSugg } ] = useLazyQuery(SUGGESTED_PROFILES_QUERY, {
      variables: { prefix: searchText }
    });

    function search(event) {
      event.preventDefault();

      setSearchStatus(true);
      router.push(`/profiles?homeSearchValue=${searchText}`, undefined);
    }

    if(errorAll || errorTemp)
      return <div>Error loading all profiles</div>

    if(loadingAll || loadingTemp)
      return <LoadingSpinner />

    // function handleTopicChange(event) {
    //   setSearchTopic(event.target.value);
    // }

    function handleSortedByChange(event) {
      setSortedBy(event.target.value);
    }

    function handlePaginationChange(num) {
      let newOffset = (num-1)*10
      
      if(newOffset < 0) {
        newOffset = 0;
      }

      setCurrentOffset(newOffset);
    }

    // console.log('!!: ', dataTemp, searchStatus);
    // console.log('??: ', dataAll);
    const dataSet2 = searchStatus && dataTemp ? dataTemp.authors.authors : dataAll.authors.authors;
    const totalCount = searchStatus && dataTemp ? dataTemp.authors.totalCount : dataAll.authors.totalCount;

    return (
        <div className="flex bg-gray-200 h-screen w-full text-gray-900">
          <div className="flex flex-col ml-16 w-1/5">

            <div className="h-1/5">
              <h2 className="h-16 mt-4 mr-2 flex items-center text-xl font-bold border-b-2 border-gray-300">
                <span>Search options</span>
              </h2>
            </div>

            <div className="h-3/5">
              <div className="">
                <h2 className="font-semibold mb-2">Filter with topics:</h2>
                <Topicdropdown searchTopic={searchTopic} handleTopicChange={setSearchTopic} />
              </div>

              <div className="mt-2">
                <h2 className="font-semibold mb-2">Sort by:</h2>
                <Sortingdropdown sortedBy={sortedBy} setSortedBy={setSortedBy} sortingOptions={sortingOptions} />
              </div>
            </div>

            <div className="flex items-end">
              <button
                className="bg-blue-700 p-2 text-white rounded-md border border-2 border-blue-300 hover:bg-blue-300 hover:text-slate-800 hover:border-blue-600"
                onClick={search}
              >
                Refetch
              </button>
            </div>

          </div>
          
          <div className="w-4/5 mr-16 ml-3">

            <div className="h-1/5 flex flex-col justify-between pt-6">

              <div className="relative flex flex-col">
                <form onSubmit={search}>
                  {/* <Searchbar searchText={searchText} setSearchText={setSearchText} /> */}
                  <AutocompleteSearch searchText={searchText} setSearchText={setSearchText} suggestedResults={dataSugg}/>
                </form>
                {/* <SuggestedResults suggestedResults={dataSugg} onClickOutside={() => setSearchText("")}/> */}
              </div>

            </div>

            <div className="overflow-y-scroll h-4/5">
              
              <div className="flex justify-end text-gray-900 mb-2">
                <span className="font-semibold italic pr-1">{currentOffset}</span>
                - 
                <span className="font-semibold px-1">
                  {currentOffset+10 > totalCount ? 
                    totalCount
                  :
                    currentOffset+10
                  }
                </span>
                of <span className="font-semibold px-1">{totalCount}</span> results shown
              </div>

              <ProfileList profiles={dataSet2}/>
              <Pagination totalCount={totalCount} offset={currentOffset} handlePaginationChange={handlePaginationChange} />

            </div>
          </div>
        </div>
    )
}

export default profiles;

profiles.getInitialProps = ({ query: { homeSearchValue } }) => {
  return { homeSearchValue }
}