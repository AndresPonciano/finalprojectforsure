
import { RadioGroup } from "@headlessui/react";

const Searchradio = ({ radioValue, handleRadioChange }) => {
    return (
        <RadioGroup value={radioValue} onChange={handleRadioChange}>
            <div className="flex items-center justify-end text-gray-900">
                <div className="flex bg-gray-400 rounded-b-md">
                    <RadioGroup.Label className='mx-4 self-center font-medium text-base'>Search by: </RadioGroup.Label>

                    <div className="flex items-center justify-center space-x-2 text-white">
                        <RadioGroup.Option value="People">
                            {({ active, checked }) => (
                                // <div className='w-24 flex'>
                                <div className={`
                                    ${ checked ? 'bg-gray-900' : 'bg-gray-700' }
                                    ${ active ? 'ring-2 ring-blue-500' : '' }
                                    h-full flex rounded py-2 px-3 items-center justify-center
                                `}>
                                    <p className=''>
                                    People
                                    </p>
                                    { checked ? (
                                        <div>
                                            <CheckIcon className='w-6 h-6 ml-2' />
                                        </div>
                                    )
                                    :
                                        (
                                            <div>
                                                <XIcon className='w-6 h-6 ml-2' />
                                            </div>
                                        )
                                    }
                                </div>
                            )}
                        </RadioGroup.Option>
                        <RadioGroup.Option value="Publications">
                            {({ active, checked }) => (
                                // <div className='w-24 flex'>
                                <div className={`
                                    ${ checked ? 'bg-gray-900' : 'bg-gray-700' }
                                    ${ active ? 'ring-2 ring-blue-500' : '' }
                                    h-full flex rounded py-2 px-3 items-center justify-center
                                `}>
                                    <p className=''>
                                    Publications
                                    </p>
                                    { checked ? (
                                        <div>
                                            <CheckIcon className='w-6 h-6 ml-2' />
                                        </div>
                                    )
                                    :
                                        (
                                            <div>
                                                <XIcon className='w-6 h-6 ml-2' />
                                            </div>
                                        )
                                    }
                                </div>
                            )}
                        </RadioGroup.Option>
                    </div>
                </div>
            </div>
        </RadioGroup>
    )


    // return (
    //     <div className="flex items-center justify-end">
    //         <div onChange={handleRadioChange} className="flex bg-gray-700 rounded-b-md">
    //             <h1 className="flex items-center px-3 font-medium text-base bg-gray-800 rounded-bl-md">Search by:</h1>
    //             <label className="ml-2 p-2">
    //                 <input className="mr-2" type="radio" name="searchOption" value="People"/>
    //                 <span>People</span>
    //             </label>
    //             <label className="ml-2 p-2">
    //                 <input className="mr-2" type="radio" name="searchOption" value="Publications"/>
    //                 Publications
    //             </label>
    //         </div>
    //     </div>
    // )
}

function CheckIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
    )
}

function XIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
    )
}

export default Searchradio;