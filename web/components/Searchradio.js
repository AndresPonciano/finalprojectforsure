const Searchradio = () => {
    return (
        <div className="flex items-center justify-end">
            <div className="flex bg-gray-700 rounded-b-md">
                <h1 className="flex items-center px-3 font-medium text-base bg-gray-800 rounded-bl-md">Search by:</h1>
                <label className="ml-2 p-2">
                    <input className="mr-2" type="radio" name="searchOption"/>
                    <span>Profiles</span>
                </label>
                <label className="ml-2 p-2">
                    <input className="mr-2" type="radio" name="searchOption"/>
                    Publications
                </label>
            </div>
        </div>
    )
}

export default Searchradio;