import Link from 'next/link'
import Image from 'next/image'

const ProfileItem = ({ profile }) => {
    console.log('in profile', profile.highlight)

    if(profile.highlight) {
        profile.highlight[0].split(' ').map((item) => {
            if(item.substr(0,4) === "<em>") {
                console.log('pee', item)
            } else {
                console.log('hey', item)
            }
        })
    }

    return (
        <div className="mb-6">
            <div className="flex w-full items-center bg-gray-100 p-4 rounded-md shadow">
                <div className="flex items-center w-full">
                    {/* <Image className="rounded-full" src={profile.url_picture} alt="profile picture" width={90} height={90} /> */}
                    <Image className="rounded-full w-1/4" src='/images/GSearch.svg' alt="profile picture" width={90} height={90} />
                    <div className='w-3/4'>
                        <Link 
                            href={{
                                pathname: "/profile/[id]",
                            }} 
                            as={`/profile/${profile.id}`}
                        >
                            <div className="font-semibold text-lg cursor-pointer text-blue-500 hover:text-blue-700">
                                {profile.highlight ? 
                                    profile.highlight[0].split(' '). map((item) => {
                                        return(
                                            <>
                                            { item.substr(0,4) === "<em>" ?
                                                <span className='bg-yellow-400 mr-2'>{item.substr(4, item.length-9)}</span>
                                            :
                                                <span className='mr-2'>{item}</span>
                                            }
                                            </>
                                        )
                                    })
                                    : 
                                    profile.name
                                }
                            </div>
                        </Link>
                        <div className="flex mt-2">
                            <h2 className='font-semibold mr-2'>topics: </h2>
                            <ul className="flex">
                                {profile.topics.map((topic, index) => {
                                    return (
                                        <li className="mr-2" key={index}>{topic}</li>
                                    )
                                })}
                            </ul>
                            <ul className='flex'>
                                {profile.other_topics.map((topic, index) => {
                                    return (
                                        <li className="mr-2 text-gray-400" key={index}>{topic}</li>
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