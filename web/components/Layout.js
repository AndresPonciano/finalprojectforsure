import Navbar from './Navbar'

const Layout = ({ children }) => {
    return (
        <>
        <Navbar />
        <div>
            <main>
                {children}    
            </main>
        </div>
        </>
    )
}

export default Layout;