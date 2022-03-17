import { useRouter } from "next/router"
import { useRef, useEffect } from 'react'

const SuggestedResults = ({ suggestedResults, onClickOutside }) => {
    console.log('in suggr: ', suggestedResults);
    const router = useRouter();
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(ref.current && !ref.current.contains(event.target)) {
                onClickOutside && onClickOutside();
            }
        };

        document.addEventListener('click', handleClickOutside, true);

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };

    }, [ onClickOutside ])

    if(suggestedResults === undefined) 
        return <></>

    if(suggestedResults && suggestedResults.peopleSuggestedSearch.length === 0)
        return <></>

    return (
        <div ref={ref} className="self-end mt-16 absolute bg-white w-11/12 z-10">
            <ul>
                {suggestedResults.peopleSuggestedSearch.map((element) => {
                    return (
                        <li key={element.name} className="py-2 pl-2 border border-bt"><button onClick={() => {router.push({ pathname: '/profiles', query: { homeSearchValue: element.name} })}} >{element.name}</button></li>
                    )
                })}
            </ul>
        </div>
    )
}

export default SuggestedResults;