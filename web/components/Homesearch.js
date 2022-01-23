import Searchbar from "./Searchbar"
import { useState } from "react";
import Searchradio from "./Searchradio";
import { useRouter } from "next/router";
import { route } from "next/dist/server/router";

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
        } else if(searchOption === "Publications") {
            router.push({
                pathname: '/publications2',
                query: { homeSearchValue: searchText }
            })
        }
    }

    function handleRadioChange(event) {
        setSearchOption(event.target.value)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Searchbar searchText={searchText} setSearchText={setSearchText} />
                <Searchradio handleRadioChange={handleRadioChange} />
            </form>
        </div>
    )
}

export default Homesearch;