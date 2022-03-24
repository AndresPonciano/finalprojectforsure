
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from "next/router"

const PublicationItem = ({ publication }) => {
    const router = useRouter();
    const [readMore, setReadMore] = useState(false);

    return (
        <div className="mb-6">
            <div className="flex w-full items-center bg-white p-2 rounded-md shadow">
                <div className="p-2 w-full">
                    <div className='flex justify-between items-center'>
                        <h2 className="text-gray-900 text-lg">{publication.title}</h2>
                        <a 
                            className='hover:animate-pulse cusor-pointer' 
                            target="_blank" 
                            href={`https://scholar.google.com/scholar?&q=${publication.title.split(' ').join('+')}`}>
                            <Image width={25} height={25} src='/images/GSearch.svg'/>
                        </a>
                    </div>
                    <div className="flex">
                        <h2>author(s):</h2>
                        <ul className="flex ml-2">
                            {publication.pub_authors.map((author) => {
                                return (
                                    <li className="mr-2 text-blue-500 hover:underline" key={author.id}>
                                        <button onClick={() => router.push(`/profile/${author.id}`, undefined)}>
                                            {author.name}
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <h2 className="text-gray-500 italic">
                        {readMore ? 
                            <>
                                {publication.abstract}
                                <button className="text-blue-500 px-2 hover:underline" onClick={() => setReadMore(false)}>
                                    hide
                                </button>
                            </>
                        :
                            <>
                                {publication.abstract.slice(0, 200)}...
                                <button className="text-blue-500 px-2 hover:underline" onClick={() => setReadMore(true)}>
                                    show                              
                                </button>
                            </>
                        }
                    </h2>

                    <h2 className="text-blue-400">cited by: <span>{publication.num_citations}</span></h2>
                </div>
            </div>
        </div>
    )
}

export default PublicationItem;