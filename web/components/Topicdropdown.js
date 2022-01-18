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


const Topicdropdown = ({ searchTopic, handleTopicChange }) => {
    return (
        <div className='mt-16'>
            <h3 className='font-semibold'>Topics</h3>
            <select className='w-full mt-2 p-2 rounded-md' value={searchTopic} onChange={handleTopicChange}>
                <option value="None">None</option>
                {topics.map((topic, index) => {
                    return (
                        <option key={index} value={topic}>{topic}</option>
                    )
                })}
            </select>
        </div>
    )
}

export default Topicdropdown;