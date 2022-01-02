const Searchradio = () => {
    return (
        <div className="flex items-center justify-end">
            <div className="flex bg-gray-400">
                <h1 className="p-2 underline text-black">Search by:</h1>
                <label className="ml-2 p-2">
                    <input type="radio" checked="checked" name="searchOption"/>
                    Profiles
                </label>
                <label className="ml-2 p-2">
                    <input type="radio" name="searchOption"/>
                    Publications
                </label>
            </div>
        </div>
    )
}

export default Searchradio;