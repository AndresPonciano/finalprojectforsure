
import { useRouter } from "next/router";

const Searchbar = ({ searchText, setSearchText }) => {
    const router = useRouter();

    const handleSubmit = (e) => {
      e.preventDefault();
      router.push(`/search/authors`);
    };

    return (
        <div className="bg-white">
            <div className="flex w-full p-4 shadow rounded-md">
                <form onSubmit={handleSubmit} className="flex flex-col w-full text-black">
                    <div className="w-full">
                        <div className="flex h-12 items-center w-full bg-blue-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        <input
                            className="w-full h-full pl-2 focus:outline-none border-black border-b-2"
                            type="text"
                            onChange={(e) => setSearchText(e.target.value)}
                            value={searchText}
                            placeholder="Enter search term:"
                        />
                        </div>
                    </div>
                    <div className="bg-red-200 flex items-center justify-end">
                        <div className="bg-red-400">
                            Search by:
                            <label>
                                <input type="radio" />
                                <span>Publications</span>
                            </label>
                            <label>
                                <input type="radio" />
                                <span>Profiles</span>
                            </label>
                        </div>
                    </div>
                </form>
            </div>       
        </div>
    )
}

export default Searchbar;