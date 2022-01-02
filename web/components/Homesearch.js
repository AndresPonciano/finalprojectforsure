import Searchbar from "./Searchbar"
import { useState } from "react";
import Searchradio from "./Searchradio";

const Homesearch = () => {
    const [searchText, setSearchText] = useState("");

    function handleSubmit() {
        console.log('submitting homesearch')
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