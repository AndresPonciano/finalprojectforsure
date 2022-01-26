import { gql } from "@apollo/client"
import Link from "next/link"
import client from "../../../apollo-client"
import { TagCloud } from "react-tagcloud"
import PublicationList from "../../../components/PublicationList";

const data = [
    { value: "JavaScript", count: 38 },
    { value: "React", count: 30 },
    { value: "Nodejs", count: 28 },
    { value: "Express.js", count: 25 },
    { value: "HTML5", count: 33 },
    { value: "MongoDB", count: 18 },
    { value: "CSS3", count: 23 },
    { value: "JAVA", count: 20 },
    { value: "C", count: 50 },
    { value: "Software Engineering", count: 24 },
    { value: "Agile", count: 35 },
    { value: "Words here", count: 5 },
    { value: "Some Topic", count: 23 },
    { value: "Nonono", count: 65 },
];
 
const options = {
    luminosity: 'dark',
    hue: 'blue',
}

const profile = ({ profile, publications }) => {
    return (
        <div className="pt-8 bg-gray-200">
            <div className="bg-gray-100 mx-16 flex-col">
                <div className="flex">
                    <div className="w-5/6">
                        <img 
                            className="rounded-md w-36 h-36 float-left"
                            src={profile.url_picture}
                        />
                        <h1 className="mt-6 font-bold text-2xl">{profile.name}</h1>

                        <p className="m-6">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                            ac eleifend enim. Praesent volutpat mi eu consectetur sagittis. In
                            vulputate aliquam velit maximus pulvinar. Mauris eget elementum
                            sapien. Aenean molestie ligula non sem auctor tristique. Sed et
                            magna arcu. Duis sit amet mattis velit. Integer purus nulla, blandit
                            sed sapien in, sodales volutpat ex. Mauris ut tortor eget enim
                            suscipit accumsan sed eu lacus. Vestibulum sed orci urna. Maecenas
                            porta ultrices libero, et convallis purus posuere ut. Pellentesque
                            ullamcorper varius nisl vitae lacinia. Nulla eget condimentum neque,
                            ac lobortis quam. Nulla sapien velit, volutpat ut hendrerit vel,
                            aliquam a nibh. Morbi in egestas libero. Suspendisse id mollis lacus
                        </p>
                    </div>

                    <div className="w-1/6 flex justify-end mt-6">
                        <Link href="#">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                            />
                            </svg>
                        </Link>
                    </div>
                </div>

                <div>
                    <div className="w-full">
                        <ul className="flex flex-wrap ml-6 mr-6 text-white">
                            {profile.topics.map((topic, index) => {
                                return (
                                    <li className="mr-2 text-blue-500 hover:underline" key={index}>{topic}</li>
                                )
                            })}
                        </ul>
                    </div>

                    <div className="w-full flex justify-center mt-6">
                        <div className="w-1/2">
                            <TagCloud
                                minSize={12}
                                maxSize={35}
                                tags={data}
                                colorOptions={options}
                                onClick={(tag) => alert(`'${tag.value}' was selected!`)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-16 mt-4">
                <h2>Publications are: </h2>
                <PublicationList publications={publications} />
                <button className="bg-orange-400">
                    fetch more
                </button>
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    // TODO: change this to fetch all id's
    const { data } = await client.query({
        query: gql`
            query AllProfiles {
                authors {
                    totalCount
                    authors {
                        id
                        name
                        url_picture
                        topics
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
                topics
            }
        }
    `;

    const GET_AUTHOR_PUBLICATIONS = gql`
        query($id: Int!) {
            authorPublications(id: $id) {
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

    const { loading, error, data } = await client.query({ query: GET_AUTHOR_INFO, variables: { id: id }})

    const { loading: loadingPubs, error: errorPubs, data: dataPubs } = await client.query({ query: GET_AUTHOR_PUBLICATIONS, variables: { id: 231 }})

    console.log('dataPubs: ', dataPubs);

    return {
        props: {
            profile: data.author,
            publications: dataPubs.authorPublications.publications
        }
    }
}

export default profile;
