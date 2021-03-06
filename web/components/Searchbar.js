
const Searchbar = ({ searchText, setSearchText }) => {

    return (
        <div className="flex items-center h-16 rounded-md">
            <div className="flex items-center h-full text-blue-500 rounded-l-md bg-gray-200 hover:bg-gray-300 hover:text-blue-500 border-2 border-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input
                className="w-full h-full pl-4 text-gray-900 bg-gray-200 text-lg focus:outline-none focus:border-2 focus:border-blue-500 rounded-r-md"
                type="text"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                placeholder="Enter search term:"
            />
        </div>
    )
}

export default Searchbar;