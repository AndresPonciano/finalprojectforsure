import { Listbox, Menu } from '@headlessui/react'

const topics = [
    "Verification", "Software tools", "Automated Software Engineering",
    "DevOps","Evidence-based software engineering","Software fault prediction",
    "Search-based software engineering","Software cost estimation","Defect prediction",
    "Software measurement","Mutation testing","Concept location",
    "Code search","Crowdsourcing","Program repair","Big Code",
    "Clone detection","Code clone search","Source Code Search",
    "Program comprehension","Patch generator","Bug fixing","Software reuse",
    "Program search","Agile Software development","Software traceability",
    "Safety assurance","Software process improvement","Social software engineering",
    "Concept Drift","Release Engineering","Build Systems","Software Quality",
    "Social Computing","Socio-technical systems","App Market Analytics","Software Metrics",
    "Log File Analysis","Software Quality Assurance","Experimental Software Engineering",
    "Evidence-based software engineering","Self-Adaptive Systems","Self-Adaptive Software Systems",
    "Technical Debt","Software Process Improvement","Verification and Validation","Requirements Engineering",
    "Software Safety","Adaptive Software Systems","Software Product Lines","Software Product Management",
    "Global Software Engineering","Formal Methods","Model Checking","Runtime Verification",
    "Program Synthesis","Program verification","Formal verification","Debugging","Software Security",
    "Software Process","Software Cost Estimation","Software Reliability Engineering",
    "Software Reliability","Fault Tolerance","SBSE","Model-driven software engineering",
    "Model driven development","Model-driven development","Software Architecture","Software environments",
    "Analysis and testing","Software Verification","Software Performance","Software Ecosystems",
    "Software Ecosystem","Refactoring","Code Clone","Code Clones","Data-driven Software Engineering",
    "Open source","Open source software","Software Visualization","Software Power Consumption",
    "Code Review","Software Maintenance and Evolution","Software Evolution and Maintenance","Testing",
    "Software Engineering","Software Maintenance","Software Evolution","Empirical Software Engineering",
    "Mining Software Repositories","Software Analytics","Program Analysis","Software Testing"
]


const Topicdropdown = ({ searchTopic, handleTopicChange }) => {
    return (
        <div className='text-gray-900'>
            <div className=''>
                <Listbox value={searchTopic} onChange={handleTopicChange}>

                    <div className='flex flex-col items-start relative'>

                        <Listbox.Button className='flex bg-white w-full justify-between rounded p-2'>
                            {searchTopic}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Listbox.Button>

                        <div className='absolute mt-12 rounded overflow-y-auto h-56'>

                            <Listbox.Options className="">
                                <Listbox.Option 
                                    className={({active}) => `py-1 pl-2 bg-white ${active ? 'text-gray-900 bg-gray-100' : 'text-gray-900'}`} 
                                    key="None" value="None"
                                >
                                    {({ selected }) => (
                                        <>
                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>                                           
                                                None
                                            </span>
                                            { selected ? (
                                                <span className='absolute pr-3 right-0 inset-y-0 flex items-center'>
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
                                {topics.sort().map((topic, index) => {
                                    return(
                                        <Listbox.Option 
                                            className={({active}) => `py-1 pl-2 bg-white ${active ? 'text-gray-900 bg-gray-100' : 'text-gray-900'}`} 
                                            key={index} value={topic}
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span className={`${selected ? 'font-medium' : 'font-normal'}`}>                                           
                                                        {topic}
                                                    </span>
                                                    { selected ? (
                                                        <span className='absolute pr-3 right-0 inset-y-0 flex items-center'>
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
        </div>
    )

    // return (
    //     <div className=''>
    //         <select className='w-full p-2 rounded-md' value={searchTopic} onChange={handleTopicChange}>
    //             <option value="None">None</option>
    //             {topics.sort().map((topic, index) => {
    //                 return (
    //                     <option key={index} value={topic}>{topic}</option>
    //                 )
    //             })}
    //         </select>
    //     </div>
    // )
}

export default Topicdropdown;