import { useState, useEffect} from "react"

const Pagination = ({totalCount, offset, handlePaginationChange}) => {
    const [hasNextPage, setHasNextPage] = useState(false)
    const [hasPrevPage, setHasPrevPage] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [pages, setPages] = useState([])

    // console.log('rerendering pag comp')
    // TODO: make sure pages list is okay always
    useEffect(() => {
        // console.log('how many times is this running')

        if(offset >= 10) { setHasPrevPage(true); }
        if(offset < totalCount - 10) { setHasNextPage(true); }

        let currentPage = Math.floor(offset/10) + 1;
        setCurrentPage(currentPage);
        setPages([]);

        let tempSet = offset;
        for(let i = currentPage; i < currentPage+4; i++) {
            tempSet = tempSet + 10

            setPages(pages => [...pages, i])

            if(tempSet >= totalCount) {
                break;
            }

            // setPages(pages => [...pages, i])
        }

    }, [offset]);

    function PageNums(props) {
        console.log('currentPage is: ', currentPage)
        const pageNums = props.pages;
        let prevElem = null;
        let nextElem = null;

        if(hasPrevPage) {
            const prevPage = currentPage-1
            prevElem = <div className="flex items-center h-8"><a onClick={() => handlePaginationChange(prevPage)} className="bg-gray-100 h-full px-2 py-1 flex items-center border border-indigo-800 rounded-l hover:bg-indigo-200">
                {/* prev */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </a></div>
        }
        
        if(hasNextPage) { 
            const nextPage = currentPage+1
            nextElem = <div className="flex items-center h-8"><a onClick={() => handlePaginationChange(nextPage)} className="bg-gray-100 h-full px-2 py-1 flex items-center border border-indigo-800 border-black rounded-r hover:bg-indigo-200">
                {/* next */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </a></div>
        }

        const pageList = pageNums.map((num) => 
        currentPage === num ?
            <a key={num.toString()} className="bg-indigo-300 h-full p-2 flex items-center border-2 border-indigo-500">{num}</a>
        :
            <a key={num.toString()} onClick={() => handlePaginationChange(num)} className="bg-gray-100 h-full p-2 flex items-center border border-indigo-800 hover:bg-indigo-200">{num}</a>
        );

        return (
            <>
                <div className="flex items-center space-x-2">
                    {prevElem}
                    <div className="flex items-center space-x-2 h-8">{pageList}</div>
                    {nextElem}
                </div>
            </>
        )
    }

    return (
        <div className="flex items-center justify-center m-2 h-12">
            <div className="flex items-center h-8">
                <PageNums pages={pages}/>
            </div>
        </div>
    )
}

export default Pagination;