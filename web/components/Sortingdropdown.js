import { Listbox } from '@headlessui/react'

const Sortingdropdown = ({ sortedBy, setSortedBy, sortingOptions }) => {
    return (
        <div className='text-gray-900'>

            <Listbox value={sortedBy} onChange={setSortedBy}>

                <div className='flex flex-col items-start relative'>

                    <Listbox.Button className='flex bg-gray-700 text-white w-full justify-between p-2 rounded'>
                        {sortedBy.text}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </Listbox.Button>

                    <div className='absolute mt-12 rounded overflow-y-auto h-56 w-full z-10'>

                        <Listbox.Options>
                            {sortingOptions.map((option, index) => {
                                return (
                                    <Listbox.Option
                                        className={({active}) => `flex justify-between py-1 pl-2 bg-gray-700 ${active ? 'text-gray-900 bg-gray-100' : 'text-white'}`}
                                        key={index}
                                        value={option}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <span className={`${selected ? 'font-medium' : 'font-normal'}`}>                                           
                                                    {option.text}
                                                </span> 
                                                { selected ? (
                                                    <span className='pr-3 right-0 inset-y-0 flex items-center'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className='w-5 h-5'>
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                    </span>
                                                    )
                                                :
                                                    null
                                                }
                                            </>
                                        )}
                                    </Listbox.Option>
                                )
                            })}
                        </Listbox.Options>

                    </div>

                </div>

            </Listbox>

        </div>
    )
}

export default Sortingdropdown;