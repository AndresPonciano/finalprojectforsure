import Searchbar from "../components/Searchbar";
import Pagination from "../components/Pagination";

const publications2 = () => {
    console

    return (
        <div>
            publications2
        </div>
    )
}

export async function getStaticProps(context) {
    console.log('hello???', context.query)

    return {
        props: {
            hello: "hi"
        }
    }
}

// publications2.getInitialProps = () => {

// }

export default publications2;