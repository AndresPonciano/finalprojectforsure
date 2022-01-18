import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { Disclosure } from '@headlessui/react';

const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'Profiles', href: '/profiles', current: false },
    { name: 'Publications', href: '/publications', current: false },
    { name: 'About', href: '/about', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}  

const Navbar = () => {
    const router = useRouter();

    return (
        <Disclosure as="nav" className="bg-gray-700 border-b-3 border-gray-900">
            {({open}) => (
                <>
                    <div className='mx-16'>
                        <div className='relative flex items-center justify-between h-16'>
                            {/* hidden stuff for mobile */}
                            <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                                {/* Menu button for mobile */}
                                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                                    { open ? ( 
                                        <div>open is true</div>
                                    ) : (
                                        <div>
                                            open is false
                                        </div>
                                    )}
                                </Disclosure.Button>
                            </div>
                            
                            {/* full screen left navbar */}
                            <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                                <div className='hidden lg:block h-8 w-auto'>
                                    <div className='flex space-x-4'>
                                        {navigation.map((item) => (
                                            <Link key={item.name} href={item.href}>
                                                <a className={classNames(
                                                    router.pathname == item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white',
                                                    'px-3 py-2 rounded-md text-sm font-medium'
                                                )}
                                                >
                                                    {item.name}
                                                </a>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* end of full screen left navbar */}

                            {/* right navbar */}
                            <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                                <Link href="https://github.com/AndresPonciano/finalprojectforsure">
                                    {/* source for icon is Font Awesome */}
                                    <Image className="bg-gray-300 rounded-full" src={"/images/github-brands.svg"} width={30} height={30}/>
                                </Link>
                            </div>
                            {/* end of right navbar */}

                            <Disclosure.Panel className='sm-hidden'>
                                <div className='px-2 pt-2 pb-3 space-y-1'>
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            className={classNames(
                                                router.pathname == item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white',
                                                'block px-3 py-2 rounded-md text-base font-medium'
                                            )}                             
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </div>
                    </div>
                </>
            )}
        </Disclosure>

        // <nav className='border-b-2 bg-black flex text-white w-full h-16'>
        //     <div className='w-1/2 h-full flex items-center justify-between'>
        //         <ul className='h-full flex items-center'>
        //             <li className='ml-16 p-2'><Link href='/'>GS.io</Link></li>
        //             <li className='ml-6 p-2 rounded-md hover:bg-gray-500'><Link href='/'>Home</Link></li>                  
        //             <li className='ml-6 p-2 rounded-md hover:bg-gray-500'><Link href='/profile/page/0'>All Profiles</Link></li>                  
        //             <li className='ml-6 p-2 rounded-md hover:bg-gray-500'><Link href='/about'>About</Link></li>
        //         </ul>                
        //     </div>
        //     <div className='w-1/2 flex items-center justify-end'>
        //         <div className='mr-16'>
                    // <Link href="https://github.com/AndresPonciano/finalprojectforsure">
                    //     <Image className="fill-white bg-white rounded-full" src={"/images/github-brands.svg"} width={30} height={30}/>
                    // </Link>
        //         </div>
        //     </div>
        // </nav>
    )
}

export default Navbar;