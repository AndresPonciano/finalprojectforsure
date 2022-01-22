import Link from 'next/link'

const ProfileItem = ({ profile }) => {
    // console.log(profile);

    return (
        <div className="mt-6">
            <div className="flex w-full items-center bg-gray-100 p-2 rounded-md shadow">
                <div className="flex items-center">
                    {/* TODO: change to next/image */}
                    <img className="rounded-full w-24 h-24" src={profile.url_picture} alt="new" />
                    <div>
                        <Link 
                            href={{
                                pathname: "/profile/[id]",
                            }} 
                            as={`/profile/${profile.id}`}
                        >
                            <h2 className="pl-6 font-bold">{profile.name}</h2>
                        </Link>
                        <ul className="flex mt-2 pl-6">
                            {profile.topics.map((topic, index) => {
                                return (
                                    <li className="mr-2 text-blue-500 hover:underline" key={index}>{topic}</li>
                                )
                            })}
                            {/* <li className="mr-4 text-blue-500 hover:underline"><Link href="#">topic 4</Link></li> */}
                        </ul>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default ProfileItem;