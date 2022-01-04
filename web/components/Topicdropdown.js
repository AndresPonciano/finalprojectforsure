import { Menu } from '@headlessui/react'

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


const Topicdropdown = () => {
    return (
        <div className='bg-red-200 mt-6'>
            <Menu>
                <Menu.Button className={'bg-gray-100 rounded p-2 w-full flex'}>
                    <h2 className='flex w-4/5'>Topics</h2>
                    <div className='flex justify-end w-1/5'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </Menu.Button>
                <Menu.Items>
                    {topics.map((topic, index) => {
                        return (
                            <Menu.Item as="li" key={index}>
                                <a>{topic}</a>  
                            </Menu.Item>
                        )
                    })}
                </Menu.Items>
            </Menu>
        </div>
    )
}

export default Topicdropdown;