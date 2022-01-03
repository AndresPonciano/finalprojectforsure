import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className='border-b-2 bg-black flex text-white w-full h-16'>
            <div className='w-1/2 h-full flex items-center justify-between'>
                <ul className='h-full flex items-center'>
                    <li className='ml-16'><Link href='/'>GS.io</Link></li>
                    <li className='ml-8'><Link href='/'>Home</Link></li>                  
                    <li className='ml-8'><Link href='/profile/page/0'>All Profiles</Link></li>                  
                    <li className='ml-8'><Link href='/about'>About</Link></li>
                </ul>                
            </div>
            <div className='w-1/2 flex items-center justify-end'>
                <h2 className='mr-16'>GitHB</h2>
            </div>

        </nav>
    )
}

export default Navbar;