
import Link from 'next/link';
import Image from 'next/image';

const PublicationItem = ({ publication }) => {
    return (
        <div className="mb-6">
            <div className="flex w-full items-center bg-gray-100 p-2 rounded-md shadow">
                <div className="p-2">
                    <div className='flex justify-between items-center'>
                        <h2 className="text-blue-600 text-lg">{publication.title}</h2>
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
                                        <Link
                                            href={{
                                                pathname: "/profile/[id]",
                                            }}
                                            as={`profile/${author.id}`}
                                        >
                                            {author.name}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <h2 className="text-gray-500 italic">
                        {publication.abstract.slice(0, 200)}...
                    </h2>
                    <h2 className="text-blue-400">cited by: <span>{publication.num_citations}</span></h2>
                </div>
            </div>
        </div>
    )
}

export default PublicationItem;