import Searchbar from "./Searchbar"
import { useState } from "react";
import Searchradio from "./Searchradio";
import { useRouter } from "next/router";

const Homesearch = () => {
    const router = useRouter();

    const [searchText, setSearchText] = useState("");
    const [searchOption, setSearchOption] = useState("People");

    function handleSubmit(event) {
        event.preventDefault();
        if(searchOption === "People") {
            router.push({
                pathname: '/profiles',
                query: { homeSearchValue: searchText }
            })   
        } else if(searchOption === "Publications") {
            router.push({
                pathname: '/publications',
                query: { homeSearchValue: searchText }
            })
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Searchbar searchText={searchText} setSearchText={setSearchText} />
                <Searchradio radioValue={searchOption} handleRadioChange={setSearchOption} />
            </form>
        </div>
    )
}

export default Homesearch;