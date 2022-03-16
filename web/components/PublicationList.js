import PublicationItem from "./PublicationItem";
import ScrollToTopButton from "./ScrollToTopButton";

const PublicationList = ({ publications }) => {
    return (
        <div>
            {publications.map((publication, index) => (
                <div key={index}>
                    <PublicationItem publication={publication} />
                </div>
            ))}
        </div>
    )
}

export default PublicationList;