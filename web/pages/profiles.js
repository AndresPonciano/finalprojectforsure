import { gql, useLazyQuery, useQuery } from "@apollo/client"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Pagination from "../components/Pagination"
import ProfileList from "../components/Profilelist"
import Searchbar from "../components/Searchbar"
import Topicdropdown from "../components/Topicdropdown"
import LoadingSpinner from "../components/LoadingSpinner"

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

const profiles = ({ homeSearchValue }) => {
    const router = useRouter();
    const [currentOffset, setCurrentOffset] = useState(0);
    const [searchTopic, setSearchTopic] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [searchStatus, setSearchStatus] = useState(false);
    const [sortedBy, setSortedBy] = useState("")
    const [dataSet, setDataSet] = useState([]);

    useEffect(() => {
      if(homeSearchValue !== undefined) {
        setSearchStatus(true);
      }

    }, [homeSearchValue])

    const { loading: loadingAll, error: errorAll, data: dataAll, refetch } = useQuery(ALL_PROFILES_QUERY, {
      variables: { offset: currentOffset }
    });

    // const [ getSearchProfiles, { loading: loadingSearch, error: errorSearch, data: dataSearch } ] = useLazyQuery(SEARCH_PROFILES_QUERY, {
    //   variables: { name: searchText, topic: searchTopic }
    // });

    const { loading: loadingTemp, error: errorTemp, data: dataTemp } = useQuery(SEARCH_PROFILES_QUERY, {
      variables: { name: homeSearchValue, topic: searchTopic, offset: currentOffset, sorted: sortedBy }
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


    function handleTopicChange(event) {
      setSearchTopic(event.target.value);
    }

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

    console.log('!!: ', dataTemp, searchStatus);
    console.log('??: ', dataAll);
    const dataSet2 = searchStatus && dataTemp ? dataTemp.authors.authors : dataAll.authors.authors;
    const totalCount = searchStatus && dataTemp ? dataTemp.authors.totalCount : dataAll.authors.totalCount;

    return (
        <div className="flex bg-gray-200 h-screen w-full">
          <div className="ml-16 w-1/5">
            <div className="h-32">
              <h2 className="h-16 mt-4 mr-2 flex items-center text-xl font-bold border-b-2 border-gray-300"><span>Options</span></h2>
            </div>

            <div className="mt-2">
              <h2 className="font-semibold mb-2">Filter with topics:</h2>
              <Topicdropdown searchTopic={searchTopic} handleTopicChange={handleTopicChange} />
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Sorting</h3>
              <select className="w-full p-2 rounded-md" value={sortedBy} onChange={handleSortedByChange}>
                <option value="">None</option>
                <option value="name_asc">
                    Names A-Z
                </option>
                <option value="name_desc">
                    Names Z-A
                </option>
              </select>
            </div>

            <button
              className="bg-blue-700 mt-2 p-2 text-white rounded-md border border-3 border-blue-300 hover:bg-blue-300 hover:text-slate-800 hover:border-blue-600"
              onClick={search}
            >
              refetch search
            </button>
          </div>
          
          <div className="w-4/5">
            <div className="p-4 mr-8 mt-2 overflow-y-auto h-screen">

              <form onSubmit={search}>
                <Searchbar searchText={searchText} setSearchText={setSearchText}/>
              </form>

              <div className="flex justify-end pr-4 mt-4">
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