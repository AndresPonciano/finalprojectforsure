import { useState, useEffect} from "react"

const Pagination = ({totalCount, offset, handlePaginationChange}) => {
    const [hasNextPage, setHasNextPage] = useState(false)
    const [hasPrevPage, setHasPrevPage] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [pages, setPages] = useState([])

    // TODO: make sure pages list is okay always
    useEffect(() => {
        if(offset > 10) { setHasPrevPage(true); }
        if(offset < totalCount - 10) { setHasNextPage(true); }

        let currentPage = Math.floor(offset/10) + 1;
        setCurrentPage(currentPage);
        setPages([]);

        let tempSet = offset;
        for(let i = currentPage; i < currentPage+4; i++) {
            tempSet = tempSet + 10
            if(tempSet >= totalCount) {
                break;
            }

            setPages(pages => [...pages, i])
        }

    },[offset]);

    function PageNums(props) {
        const pageNums = props.pages;
        let prevElem = null;
        let nextElem = null;

        if(hasPrevPage) { prevElem = <div className="flex items-center h-8"><a className="px-2 py-1 flex items-center border border-black hover:bg-gray-300">prev</a></div>}
        if(hasNextPage) { nextElem = <div className="flex items-center h-8"><a className="px-2 py-1 flex items-center border border-black hover:bg-gray-300">next</a></div>}

        const pageList = pageNums.map((num) => <a key={num.toString()} onClick={() => handlePaginationChange(num)} className="h-full p-2 flex items-center border border-black hover:bg-gray-300">{num}</a>);

        return (
            <>
                <div className="flex items-center">
                    {prevElem}
                    <div className="flex items-center h-8">{pageList}</div>
                    {nextElem}
                </div>
            </>
        )
    }

    return (
        <div className="flex items-center justify-center m-2 h-12">
            <div className="flex items-center bg-gray-100 h-8">
                <PageNums pages={pages}/>
            </div>
        </div>
    )
}

export default Pagination;