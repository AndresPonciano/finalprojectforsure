import { Combobox } from "@headlessui/react";
import { useState } from "react";
import { useRouter } from "next/router"

const AutocompleteSearch = ({ searchText, setSearchText, suggestedResults, search }) => {
    const [ selected, setSelected ] = useState("");
    const router = useRouter();
    
    function changingSelect(value) {
        setSelected(value);
        if(suggestedResults && suggestedResults.peopleSuggestedSearch) {
            router.push(`/profiles?homeSearchValue=${value}`, undefined);
        }
        else {
            console.log('other search')
            router.push(`/publications?homeSearchValue=${value}`, undefined);
        }
    }

    return (
        <div className="h-12 rounded-md">
            <Combobox as="div" className="flex flex-col" value={selected} onChange={changingSelect}>

                <div className="flex">

                    <button className="bg-gray-700 rounded-l">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mx-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>  
                    </button>

                    <Combobox.Input 
                        className='h-full w-full p-4 rounded-r focus:outline-1 focus:outline-blue-500' 
                        displayValue={selected} 
                        onChange={(event) => setSearchText(event.target.value)} 
                        placeholder="Enter search term: "
                    />
                </div>

                <div className="rounded-md z-10">
                    {suggestedResults && suggestedResults.peopleSuggestedSearch ?
                        <Combobox.Options className='w-full mt-2 rounded'>
                            {suggestedResults && suggestedResults.peopleSuggestedSearch.map((result, index) => {
                                return(
                                    <Combobox.Option 
                                        className={({ active }) => `relative py-2 pl-2 bg-gray-700 ${active ? 'text-gray-900 bg-gray-100' : 'text-white'}`}
                                        key={index}
                                        value={result.name}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <span>
                                                    {result.name}
                                                </span>
                                            </>
                                        )}
                                    </Combobox.Option>
                                )
                            })}
                        </Combobox.Options>
                     :
                        <Combobox.Options className='w-full mt-2 rounded'>
                            {suggestedResults && suggestedResults.pubSuggestedSearch.map((result, index) => {
                                return(
                                    <Combobox.Option 
                                        className={({ active }) => `relative py-2 pl-2 bg-gray-700 ${active ? 'text-gray-900 bg-gray-100' : 'text-white'}`}
                                        key={index}
                                        value={result.title}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <span>
                                                    {result.title}
                                                </span>
                                            </>
                                        )}
                                    </Combobox.Option>
                                )
                            })}
                        </Combobox.Options>
                    }

                    {/* <Combobox.Options className='w-full mt-2 rounded'>
                        {suggestedResults && suggestedResults.peopleSuggestedSearch.map((result, index) => {
                            return(
                                <Combobox.Option 
                                    className={({ active }) => `relative py-2 pl-2 bg-gray-700 ${active ? 'text-gray-900 bg-gray-100' : 'text-white'}`}
                                    key={index}
                                    value={result.name}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span>
                                                {result.name}
                                            </span>
                                        </>
                                    )}
                                </Combobox.Option>
                            )
                        })}
                    </Combobox.Options> */}
                </div>
            </Combobox>
        </div>
    )
}

export default AutocompleteSearch;