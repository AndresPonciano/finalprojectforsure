import { useEffect } from "react"
import { gql, useQuery, useLazyQuery } from "@apollo/client"
import Link from "next/link"
import Image from 'next/image'
import client from "../../../apollo-client"
import { TagCloud } from "react-tagcloud"
import PublicationList from "../../../components/PublicationList";
import LoadingSpinner from "../../../components/LoadingSpinner"
import ScrollToTopButton from "../../../components/ScrollToTopButton"
 
const options = {
    luminosity: 'dark',
    hue: 'orange',
}

const GET_AUTHOR_PUBLICATIONS = gql`
    query AuthorPubs( $id: Int, $offset: Int ) {
        authorPublications( id: $id, offset: $offset ) {
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

const profile = ({ profile }) => {
    const [ getAuthorPublications, { loading: loadingPubs, error: errorPubs, data: dataPubs, fetchMore } ] = useLazyQuery(GET_AUTHOR_PUBLICATIONS, {
        variables: { id: parseInt(profile.id), offset: 0 }
    });

    useEffect(() => {
        getAuthorPublications({ variables: { id: parseInt(profile.id), offset: 0 } })
    }, [])

    if(loadingPubs)
        return <LoadingSpinner />

    return (
        <div className="bg-gray-200">
            <div className="bg-gray-100 flex-col">

                <div className="bg-gray-900 flex h-64 w-full">
                </div>

                <div className="-mt-32 mx-16 text-gray-200 flex">
                    <Image className="rounded-full" src={profile.url_picture} alt="profile picture" width={160} height={160} />
                    <h1 className="ml-8 font-bold text-4xl self-center">{profile.name}</h1>
                </div>
                
                <div className="my-8 mx-16">
                    <div className="flex justify-between w-full">
                        <div>
                            <h2 className="text-xl">
                                {profile.affiliation}
                            </h2>
                            <div className="flex mt-4 text-lg">
                                <h2 className='font-semibold text-blue-500 mr-2'>topics: </h2>
                                <ul className="flex flex-wrap">
                                    {profile.topics.map((topic, index) => {
                                        return (
                                            <li className="mr-6 text-blue-500" key={index}>{topic}</li>
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
                        <div className="w-1/2 p-8">
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
                        <div className="mt-8 mb-2">
                            <h2 className="text-gray-900 text-lg font-semibold">Author's Publications: </h2>
                            <h2>showing: 1 - {dataPubs.authorPublications.length}</h2>
                        </div>
                        <PublicationList publications={dataPubs.authorPublications} />
                        
                        <div className="flex flex-col items-center justify-center w-full mt-4">
                            <h2>showing: 1 - {dataPubs.authorPublications.length}</h2>
                            <button
                                onClick={() => fetchMore({
                                    variables: { offset: dataPubs.authorPublications.length }
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
            <ScrollToTopButton />

        </div>
    )
}

export async function getStaticPaths() {
    // TODO: change this to fetch all id's
    const { data } = await client.query({
        query: gql`
            query AllProfiles {
                authors(limit: 2274) {
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
        `
    })

    const paths = data.authors.authors.map((author) => ({
        params: { id: author.id  }
    }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    let id = parseInt(params.id)

    const GET_AUTHOR_INFO = gql`
        query($id: Int!) {
            author(id: $id) {
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

    const { loading, error, data } = await client.query({ query: GET_AUTHOR_INFO, variables: { id: id }})

    return {
        props: {
            profile: data.author,
            // publications: dataPubs.authorPublications.publications
        }
    }
}

export default profile;
