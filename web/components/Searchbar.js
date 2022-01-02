
const Searchbar = ({ searchText, setSearchText }) => {

    return (
        <div className="bg-white text-black rounded-lg">
            <div className="flex w-full p-4">
                    <div className="w-full">
                        <div className="flex items-center w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        <input
                            className="w-full h-full pl-2 pb-2 focus:outline-none border-black border-b-2"
                            type="text"
                            onChange={(e) => setSearchText(e.target.value)}
                            value={searchText}
                            placeholder="Enter search term:"
                        />
                        </div>
                    </div>
            </div>       
        </div>
    )
}

export default Searchbar;