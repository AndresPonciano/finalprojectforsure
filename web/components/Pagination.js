import { useState, useEffect} from "react"

const Pagination = ({totalCount, offset}) => {
    const [hasNextPage, setHasNextPage] = useState(false)
    const [hasPrevPage, setHasPrevPage] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [pages, setPages] = useState([])

    console.log('in pagination: ', hasNextPage, hasPrevPage, pages)

    // TODO: make sure pages list is okay always
    useEffect(() => {
        if(offset > 10) { setHasPrevPage(true); }
        if(offset < totalCount - 10) { setHasNextPage(true); }

        let currentPage = Math.floor(offset/10) + 1;
        setCurrentPage(currentPage);
        setPages([]);

        let tempSet = offset;
        for(let i = currentPage; i < currentPage+4; i++) {
            tempSet += 10
            if(tempSet >= totalCount) {break;}

            setPages(pages => [...pages, i])
        }

    },[offset]);

    function PageNums(props) {
        const pageNums = props.pages;
        console.log('pages', pageNums)
        let prevElem = null;
        let nextElem = null;

        if(hasPrevPage) { prevElem = <><h2>prev</h2></>}
        if(hasNextPage) { nextElem = <><h2>next</h2></>}

        const pageList = pageNums.map((num) => <a className="px-2 border border-gray-300">{num}</a>);

        return (
            <>
                <div className="flex">
                {prevElem}
                <div>{pageList}</div>
                {nextElem}
                </div>
            </>
        )
    }

    return (
        <div className="bg-gray-500">
            <PageNums pages={pages}/>
        </div>
    )
}

export default Pagination;