import Searchbar from "./Searchbar"
import { useState } from "react";
import Searchradio from "./Searchradio";
import { useRouter } from "next/router";

const Homesearch = () => {
    const router = useRouter();

    const [searchText, setSearchText] = useState("");
    const [searchOption, setSearchOption] = useState("Profiles");

    function handleSubmit(event) {
        event.preventDefault();
        if(searchOption === "Profiles") {
            router.push({
                pathname: '/profiles',
                query: { homeSearchValue: searchText }
            })   
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Searchbar searchText={searchText} setSearchText={setSearchText} />
                <Searchradio />
            </form>
        </div>
    )
}

export default Homesearch;