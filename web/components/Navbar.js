import { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { Disclosure } from '@headlessui/react';
import Topicdropdown from "./Topicdropdown";

const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'People', href: '/profiles', current: false },
    { name: 'Publications', href: '/publications', current: false },
    { name: 'About', href: '/about', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}  

const Navbar = () => {
    const router = useRouter();

    return (
        <Disclosure as="nav" className="bg-gray-700 border-b border-gray-200">
            {({open}) => (
                <>
                    <div className="mx-16">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    {  open ? (
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                            </svg>
                                        </div>
                                        ) : (
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                            </svg>
                                        </div>
                                        )
                                    }
                                </Disclosure.Button>
                            </div>

                            {/* full-screen left navbar */}
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">                                
                                <div className="hidden lg:block h-8 w-auto">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <Link key={item.name} href={item.href}>
                                                <a className={classNames(
                                                    router.pathname == item.href ? 'bg-gray-200 text-gray-700' : 'text-gray-300 hover:text-blue-500',
                                                    'px-3 py-2 rounded-md text-sm font-medium'   
                                                )}>
                                                    {item.name}
                                                </a>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* right navbar */}
                             <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                                 <Link href="https://github.com/AndresPonciano/finalprojectforsure">
                                     {/* source for icon is Font Awesome */}
                                     <svg aria-hidden="true"
                                         focusable="false"
                                         data-prefix="fab"
                                         data-icon="github"
                                         className="w-6 text-white cursor-pointer hover:text-gray-400 h-full mx-auto"
                                         role="img"
                                         xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 496 512"
                                         >
                                         <path
                                             fill="currentColor"
                                             d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                                         ></path>
                                     </svg>
                                 </Link>
                             </div>

                            <Disclosure.Panel className="sm:hidden fixed top-10 z-10">
                                <div className='mt-6 px-2 pt-2 pb-3 space-y-1 bg-gray-700'>
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            className={classNames(
                                                router.pathname == item.href ? 'bg-gray-200 text-gray-700' : 'text-gray-300 hover:text-blue-500',
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
        // <Disclosure as="nav" className="bg-gray-700 border-b border-gray-200">
        //     {({open}) => (
        //         <>
        //             <div className='mx-16'>
        //                 <div className='relative flex items-center justify-between h-16'>
        //                     {/* hidden stuff for mobile */}
        //                     <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
        //                         {/* Menu button for mobile */}
        //                         <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
        //                             { open ? ( 
        //                                 <div>open is true</div>
        //                             ) : (
        //                                 <div>
        //                                     open is false
        //                                 </div>
        //                             )}
        //                         </Disclosure.Button>
        //                     </div>
                            
        //                     {/* full screen left navbar */}
        //                     <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
        //                         <div className='hidden lg:block h-8 w-auto'>
        //                             <div className='flex space-x-4'>
        //                                 {navigation.map((item) => (
        //                                     <Link key={item.name} href={item.href}>
        //                                         <a className={classNames(
        //                                             router.pathname == item.href ? 'bg-gray-200 text-gray-700' : 'text-gray-300 hover:text-blue-500',
        //                                             'px-3 py-2 rounded-md text-sm font-medium'
        //                                         )}
        //                                         >
        //                                             {item.name}
        //                                         </a>
        //                                     </Link>
        //                                 ))}
        //                             </div>
        //                         </div>
        //                     </div>
        //                     {/* end of full screen left navbar */}

        //                     {/* right navbar */}
        //                     <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
        //                         <Link href="https://github.com/AndresPonciano/finalprojectforsure">
        //                             {/* source for icon is Font Awesome */}
        //                             <svg aria-hidden="true"
        //                                 focusable="false"
        //                                 data-prefix="fab"
        //                                 data-icon="github"
        //                                 className="w-6 text-white cursor-pointer hover:text-gray-400 h-full mx-auto"
        //                                 role="img"
        //                                 xmlns="http://www.w3.org/2000/svg"
        //                                 viewBox="0 0 496 512"
        //                                 >
        //                                 <path
        //                                     fill="currentColor"
        //                                     d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
        //                                 ></path>
        //                             </svg>
        //                         </Link>
        //                     </div>
        //                     {/* end of right navbar */}

        //                     <Disclosure.Panel className='sm-hidden relative'>
        //                         <div className='absolute px-2 pt-2 pb-3 space-y-1 bg-gray-700'>
        //                             {navigation.map((item) => (
        //                                 <Disclosure.Button
        //                                     key={item.name}
        //                                     className={classNames(
        //                                         router.pathname == item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white',
        //                                         'block px-3 py-2 rounded-md text-base font-medium'
        //                                     )}                             
        //                                 >
        //                                     {item.name}
        //                                 </Disclosure.Button>
        //                             ))}
        //                         </div>
        //                     </Disclosure.Panel>
        //                 </div>
        //             </div>
        //         </>
        //     )}
        // </Disclosure>

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