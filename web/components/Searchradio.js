const Searchradio = ({ handleRadioChange }) => {
    return (
        <div className="flex items-center justify-end">
            <div onChange={handleRadioChange} className="flex bg-gray-700 rounded-b-md">
                <h1 className="flex items-center px-3 font-medium text-base bg-gray-800 rounded-bl-md">Search by:</h1>
                <label className="ml-2 p-2">
                    <input className="mr-2" type="radio" name="searchOption" value="People"/>
                    <span>People</span>
                </label>
                <label className="ml-2 p-2">
                    <input className="mr-2" type="radio" name="searchOption" value="Publications"/>
                    Publications
                </label>
            </div>
        </div>
    )
}

export default Searchradio;