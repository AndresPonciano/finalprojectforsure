import { useEffect, useState } from "react"
import { gql, useQuery } from "@apollo/client"
import Link from "next/link"
import Image from 'next/image'
import client from "../../../apollo-client"
import { TagCloud } from "react-tagcloud"
import PublicationList from "../../../components/PublicationList";
import LoadingSpinner from "../../../components/LoadingSpinner"
import Sortingdropdown from "../../../components/Sortingdropdown"
 
const options = {
    luminosity: 'dark',
    hue: 'orange',
}

const GET_PERSON_PUBLICATIONS = gql`
    query PersonPubs( $id: Int, $offset: Int, $sorted: String ) {
        personPublications( id: $id, offset: $offset, sorted: $sorted ) {
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

const sortingOptions = [
    {"value": "", "text": "None"},
    {"value": "num_citations_asc", "text": "Number of citations LOW-HI"},
    {"value": "num_citations_desc", "text": "Number of citations HI-LOW"},
    {"value": "title_asc", "text": "Titles A-Z"},
    {"value": "title_desc", "text": "Titles Z-A"},
]

const profile = ({ profile }) => {
    const [sortedBy, setSortedBy] = useState(sortingOptions[0]);

    const {loading: loadingPubs, error: errorPubs, data: dataPubs, fetchMore } = useQuery(GET_PERSON_PUBLICATIONS, {
        variables: { id: parseInt(profile.id), offset: 0, sorted: sortedBy.value }
    });
 
    if(errorPubs) 
        return <div>Error loading publications for author</div>

    if(loadingPubs)
        return <LoadingSpinner />

    return (
        <div className="bg-gray-200">
            <div className="bg-gray-100 flex-col">

                <div id="personHeader" className="bg-gray-700 flex h-64 w-full">
                </div>

                <div className="-mt-32 mx-16 text-gray-200 flex">
                    {/* <Image className="rounded-full" src={profile.url_picture} alt="profile picture" width={160} height={160} /> */}
                    <Image className="rounded-full bg-blue-200" src='/images/GSearch.svg' alt="profile picture" width={160} height={160} />
                    <h1 className="ml-8 font-bold text-4xl self-center">{profile.name}</h1>
                </div>
                
                <div className="my-8 mx-16">
                    <div className="flex justify-between w-full">
                        <div>
                            <h2 className="text-xl">
                                {profile.affiliation}
                            </h2>
                            <div className="flex mt-4 text-lg">
                                <h2 className='font-semibold text-gray-900 mr-2'>topics: </h2>
                                <ul className="flex flex-wrap text-gray-900">
                                    {profile.topics.map((topic, index) => {
                                        return (
                                            <li className="mr-6" key={index}>{topic}</li>
                                        )
                                    })}
                                </ul>

                                <ul className='flex'>
                                    {profile.other_topics.map((topic, index) => {
                                        return (
                                            <li className="mr-6 text-gray-400" key={index}>{topic}</li>
                                        )
                                    })} 
                                </ul>
                            </div>
                        </div>
                        <div className="bg-gray-200 p-4 rounded">
                            <h2>
                                total citations: <span className="font-bold">{profile.total_citations}</span>
                            </h2>
                            <h2>
                                h-index: <span className="font-bold">{profile.h_index}</span>
                            </h2>

                        </div>
                    </div>

                    <div className="w-full flex justify-center">
                        <div className="w-3/4 p-8">
                            <TagCloud
                                minSize={12}
                                maxSize={35}
                                tags={profile.tag_cloud.map((element, index) => ({value: element, count: 20-index}))}
                                colorOptions={options}
                                onClick={(tag) => alert(`'${tag.value}' was selected!`)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-16 mt-4">
                {
                    dataPubs &&
                    <>
                        <div className="mt-8 mb-2 flex justify-between w-full">
                            <div>
                                <h2 className="text-gray-900 text-lg font-semibold">Author's Publications: </h2>
                                <h2>showing: 1 - {dataPubs.personPublications.length}</h2>
                            </div>
                            <div className="w-64">
                                <Sortingdropdown sortedBy={sortedBy} setSortedBy={setSortedBy} sortingOptions={sortingOptions}/>  
                            </div>
                        </div>
                        <PublicationList publications={dataPubs.personPublications} />
                        
                        <div className="flex flex-col items-center justify-center w-full mt-4">
                            <h2>showing: 1 - {dataPubs.personPublications.length}</h2>
                            <button
                                onClick={() => fetchMore({
                                    variables: { offset: dataPubs.personPublications.length }
                                })}
                                className="hover:animate-bounce flex items-center justify-center m-4 w-12 h-8 rounded-md bg-gray-700 text-white"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </>
                }
            </div>

            <Link href={`/profile/${profile.id}/#personHeader`}>
                <div 
                    className='w-10 h-10 flex items-center justify-center fixed bg-sky-300 rounded bottom-16 right-8 text-gray-700 hover:bg-sky-800 hover:text-white'
                >
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </Link>

        </div>
    )
}

export async function getStaticPaths() {
    // TODO: change this to fetch all id's
    const { data } = await client.query({
        query: gql`
            query AllPeople {
                people(limit: 10000) {
                    totalCount
                    people {
                        id
                        name
                        url_picture
                        affiliation
                        topics
                        other_topics
                    }
                }
            }
        `
    })

    const paths = data.people.people.map((person) => ({
        params: { id: person.id  }
    }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    let id = parseInt(params.id)

    const GET_PERSON_INFO = gql`
        query($id: Int!) {
            person(id: $id) {
                id
                name
                url_picture
                affiliation
                topics
                other_topics
                h_index
                total_citations
                tag_cloud
            }
        }
    `;

    const { loading, error, data } = await client.query({ query: GET_PERSON_INFO, variables: { id: id }})

    return {
        props: {
            profile: data.person,
        }
    }
}

export default profile;
