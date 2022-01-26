import Link from 'next/link'
import Image from 'next/image'

const ProfileItem = ({ profile }) => {

    return (
        <div className="mt-6">
            <div className="flex w-full items-center bg-gray-100 p-2 rounded-md shadow">
                <div className="flex items-center">
                    {/* TODO: change to next/image */}
                    <Image className="rounded-full" src={profile.url_picture} alt="profile picture" width={90} height={90} />
                    <div>
                        <Link 
                            href={{
                                pathname: "/profile/[id]",
                            }} 
                            as={`/profile/${profile.id}`}
                        >
                            <h2 className="pl-6 font-semibold text-lg cursor-pointer">{profile.name}</h2>
                        </Link>
                        <div className="flex items-center justify-center mt-2 pl-6">
                            <h2 className='font-semibold text-blue-500 mr-2'>topics: </h2>
                            <ul className="flex">
                                {profile.topics.map((topic, index) => {
                                    return (
                                        <li className="mr-2 text-blue-500 hover:underline" key={index}>{topic}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default ProfileItem;