import { gql, useLazyQuery, useQuery } from "@apollo/client"
import { useRouter } from 'next/router'
import { useState, useEffect } from "react"
import client from "../apollo-client"
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
  query SearchProfiles( $name: String, $topic: String ) {
    authors( name: $name, topic: $topic ) {
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

const profiles = ({ id }) => {
    const router = useRouter();

    // console.log('HOME SEARCH PARAM: ', id);
    useEffect(() => {
      console.log('this runs once on com  ponent mount basically')

      if(id !== undefined) { setSearchStatus(true) }

      getSearchProfiles({ variables: { name: id, topic: null } })
    }, [])

    // console.log('offset: ', propsOffset)
    const [currentOffset, setCurrentOffset] = useState(0);
    const [searchTopic, setSearchTopic] = useState("");
    const [searchText, setSearchText] = useState("");
    const [searchStatus, setSearchStatus] = useState("");
    const [dataSet, setDataSet] = useState([]);

    const { loading: loadingAll, error: errorAll, data: dataAll, refetch } = useQuery(ALL_PROFILES_QUERY, {
      variables: { offset: currentOffset }
    });

    const [ getSearchProfiles, { loading: loadingSearch, error: errorSearch, data: dataSearch } ] = useLazyQuery(SEARCH_PROFILES_QUERY, {
      variables: { name: searchText, topic: searchTopic }
    });

    function search() {
      console.log('trying to search')
      setSearchStatus(true)

      if(searchTopic === "") console.log('we have no topic')
      if(searchText === "") console.log('we have no text')

      if( searchTopic !== "" && searchText !== "" ) {
        setCurrentOffset(0);
        getSearchProfiles({ variables: { name: searchText, topic: searchTopic } })
      } else {
        console.log('lets not do anything yet')
        setSearchStatus(false)
      }
    }

    if(errorAll || errorSearch)
      return <div>Error loading all profiles</div>

    if(loadingAll || loadingSearch)
      return <div>Loading</div>

    function handleTopicChange(event) {
      console.log('trying to change topic: ', event.target.value);
      setSearchTopic(event.target.value);
    }

    function handlePaginationChange(num) {
      console.log('num is: ', num);
      let newOffset = (num-1)*10
      
      if(newOffset < 0) {
        console.log('we had a negative: ', newOffset)
        newOffset = 0;
      } else {
        console.log('newOff: ', newOffset)
      }

      setCurrentOffset(newOffset)

      // refetch(newOffset)

      // TODO do refetch according to setSearchStatus as well
      console.log('in handle pagchange: ', currentOffset)
      console.log('+++++++++++++++++++')

    }

    // console.log('!!: ', dataSearch);
    console.log('??: ', dataAll);
    const dataSet2 = searchStatus && dataSearch ? dataSearch.authors.authors : dataAll.authors.authors;
    const totalCount = searchStatus && dataSearch ? dataSearch.authors.totalCount : dataAll.authors.totalCount;
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
              <Searchbar searchText={searchText} setSearchText={setSearchText}/>

              <div className="flex justify-end pr-4 mt-4">
                <span className="font-semibold italic pr-1">{currentOffset}</span> - <span className="font-semibold px-1">{currentOffset+10}</span> of {totalCount} results shown
              </div>
              
              <ProfileList profiles={dataSet2}/>
              <Pagination totalCount={totalCount} offset={currentOffset} handlePaginationChange={handlePaginationChange} />
            </div>
          </div>
        </div>
    )
}

export default profiles;

profiles.getInitialProps = ({ query: { id } }) => {
  return { id }
}