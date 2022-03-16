import { Fragment, useEffect, useState } from 'react'
import { RadioGroup, Combobox, Menu, Listbox } from '@headlessui/react'

const people = [
    { id: 1, name: 'Durward Reynolds', unavailable: false },
    { id: 2, name: 'Kenton Towne', unavailable: false },
    { id: 3, name: 'Therese Wunsch', unavailable: false },
    { id: 4, name: 'Benedict Kessler', unavailable: true },
    { id: 5, name: 'Katelyn Rohan', unavailable: false },
]

const about = () => {
    const [plan, setPlan] = useState("startup")
    const [selectedPerson, setSelectedPerson] = useState(people[0])
    const [query, setQuery] = useState('')

    const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase())
    })

    console.log('plan is: ', plan)

    return (
        <div className='h-screen'>
            <h2>this is the about page. LOL</h2>
            <div className='w-full h-5/6 flex flex-wrap bg-yellow-200'>
                <div className='w-1/2 bg-red-200'>
                    <h2>radio</h2>

                    <RadioGroup value={plan} onChange={setPlan}>
                        <div className='flex bg-gray-900 text-white rounded-b-md'>
                            <RadioGroup.Label className='mx-4 self-center font-medium text-base'>Search by: </RadioGroup.Label>
                            <div className='flex items-center justify-center space-x-2'>
                                <RadioGroup.Option value="startup">
                                    {({ active, checked }) => (
                                        // <div className='w-24 flex'>
                                        <div className={`
                                            ${ checked ? 'bg-gray-700' : 'bg-gray-400' }
                                            ${ active ? 'ring-2 ring-blue-500' : '' }
                                            w-28 h-full flex rounded p-2 items-center justify-center
                                        `}>
                                            <p className=''>
                                            Startup
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
                                <RadioGroup.Option value="business">
                                    {({ active, checked }) => (
                                        // <div className='w-24 flex'>
                                        <div className={`
                                            ${ checked ? 'bg-gray-700' : 'bg-gray-400' }
                                            ${ active ? 'ring-2 ring-blue-500' : '' }
                                            w-28 h-full flex rounded p-2 items-center justify-center
                                        `}>
                                            <p className=''>
                                            Business
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
                    </RadioGroup>

                </div>
                <div className='w-1/2 bg-green-200'>
                    <h2>autocomplete search</h2>
                    
                    <div className='flex items-center h-16'>
                        <Combobox>
                            <Combobox.Input className='h-full rounded-l-md' onChange={(event) => setQuery(event.target.value)} />
                            <Combobox.Button className='bg-white h-full border-r-md'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 border-r-md" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z" />
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z" clipRule="evenodd" />
                                </svg>
                            </Combobox.Button>

                            <Combobox.Options>
                                <Combobox.Option>
                                    hi
                                </Combobox.Option>
                            </Combobox.Options>
                        </Combobox>
                    </div>
                </div>
                <div className='w-1/2 bg-blue-200'>
                    <h2>listbox</h2>
                    
                    <div className='w-72 bg-white rounded-md'>
                        <Listbox value={selectedPerson} onChange={setSelectedPerson}>
                            <Listbox.Button>
                                {selectedPerson.name}
                            </Listbox.Button>

                            <Listbox.Options>
                                {people.map((person) => (
                                    <Listbox.Option
                                        key={person.id}
                                        value={person}
                                    >
                                        {({ active, selected }) => {
                                            <li className={`
                                                ${ active ? 'bg-blue-500 text-white' : 'bg-white text-black'}
                                            `}
                                            >
                                                {selected && <CheckIcon />}
                                                {person.name}
                                            </li>
                                        }}

                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Listbox>
                    </div>
                    
                </div>
                <div className='w-1/2 bg-orange-200'>
                    <h2>menu</h2>

                    <div className='w-56 bg-white'>
                        <Menu>
                            <Menu.Button>Topics: </Menu.Button>
                            <Menu.Items>
                                <Menu.Item as="div">
                                    {({ active }) => {
                                        <button>item 1</button>
                                    }}
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    </div>

                </div>
            </div>
        </div>
    )
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

export default about;