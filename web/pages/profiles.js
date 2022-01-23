import { gql, useLazyQuery, useQuery } from "@apollo/client"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Pagination from "../components/Pagination"
import ProfileList from "../components/Profilelist"
import Searchbar from "../components/Searchbar"
import Topicdropdown from "../components/Topicdropdown"

const ALL_PROFILES_QUERY = gql`
  query AllProfiles( $offset: Int ) {
    authors(offset: $offset) {
        totalCount
        authors {
            id
            name
            url_picture
            topics
        }
    }
  }
`;

const SEARCH_PROFILES_QUERY = gql`
  query SearchProfiles( $name: String, $topic: String, $offset: Int ) {
    authors( name: $name, topic: $topic, offset: $offset ) {
      totalCount
      authors {
        id
        name
        url_picture
        topics
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
    const [dataSet, setDataSet] = useState([]);

    useEffect(() => {
      console.log('we gotta set searchStatus', homeSearchValue);
      if(homeSearchValue !== undefined) {
        setSearchStatus(true);
      }

    }, [homeSearchValue])

    console.log('pain: ', currentOffset, searchText, homeSearchValue)

    const { loading: loadingAll, error: errorAll, data: dataAll, refetch } = useQuery(ALL_PROFILES_QUERY, {
      variables: { offset: currentOffset }
    });

    // const [ getSearchProfiles, { loading: loadingSearch, error: errorSearch, data: dataSearch } ] = useLazyQuery(SEARCH_PROFILES_QUERY, {
    //   variables: { name: searchText, topic: searchTopic }
    // });

    const { loading: loadingTemp, error: errorTemp, data: dataTemp } = useQuery(SEARCH_PROFILES_QUERY, {
      variables: { name: homeSearchValue, topic: searchTopic, offset: currentOffset }
    });

    function search(event) {
      event.preventDefault();

      setSearchStatus(true);
      router.push(`/profiles?homeSearchValue=${searchText}`, undefined);
    }

    if(errorAll || errorTemp)
      return <div>Error loading all profiles</div>

    if(loadingAll || loadingTemp)
      return <div>Loading</div>

    function handleTopicChange(event) {
      setSearchTopic(event.target.value);
    }

    function handlePaginationChange(num) {
      // console.log('num is: ', num);
      let newOffset = (num-1)*10
      
      if(newOffset < 0) {
        newOffset = 0;
      }

      setCurrentOffset(newOffset);
      // TODO: how to check if they have submitted a request with searchText or no????
      // USE THE OFFSET FOR THIS MAYBE???
    }

    console.log('!!: ', dataTemp, searchStatus);
    // console.log('??: ', dataAll);
    const dataSet2 = searchStatus && dataTemp ? dataTemp.authors.authors : dataAll.authors.authors;
    const totalCount = searchStatus && dataTemp ? dataTemp.authors.totalCount : dataAll.authors.totalCount;
    // searchStatus && dataSearch ? setCurrentOffset(dataSearch.authors.totalCount) : setCurrentOffset(dataAll);

    return (
        <div className="flex bg-gray-200 h-screen w-full">
          <div className="ml-16 w-1/5 h-screen overflow-y-auto">
            <h2 className="h-16 mt-4 mr-2 flex items-center text-xl font-bold border-b-2 border-gray-300"><span>Options</span></h2>
            <Topicdropdown searchTopic={searchTopic} handleTopicChange={handleTopicChange} />
            <button className="bg-green-200 rounded-md border-2 border-green-500" onClick={search}>execute search</button>
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