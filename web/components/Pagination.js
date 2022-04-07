import { useState, useEffect} from "react"

const Pagination = ({totalCount, offset, handlePaginationChange}) => {
    const [hasNextPage, setHasNextPage] = useState(false)
    const [hasPrevPage, setHasPrevPage] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [pages, setPages] = useState([])

    useEffect(() => {
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
        }

    }, [offset]);

    function PageNums(props) {
        const pageNums = props.pages;
        let prevElem = null;
        let nextElem = null;

        if(hasPrevPage) {
            const prevPage = currentPage-1
            prevElem = <div className="flex items-center h-8"><a onClick={() => handlePaginationChange(prevPage)} className="bg-gray-100 h-full px-2 py-1 flex items-center border border-blue-500 rounded-l hover:bg-blue-200">
                {/* prev */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </a></div>
        }
        
        if(hasNextPage) { 
            const nextPage = currentPage+1
            nextElem = <div className="flex items-center h-8"><a onClick={() => handlePaginationChange(nextPage)} className="bg-gray-100 h-full px-2 py-1 flex items-center border border-blue-500 rounded-r hover:bg-blue-200">
                {/* next */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </a></div>
        }

        const pageList = pageNums.map((num) => 
        currentPage === num ?
            <a key={num.toString()} className="bg-blue-300 h-full p-2 flex items-center border-2 border-blue-500">{num}</a>
        :
            <a key={num.toString()} onClick={() => handlePaginationChange(num)} className="bg-gray-100 h-full p-2 flex items-center border border-blue-500 hover:bg-blue-200">{num}</a>
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