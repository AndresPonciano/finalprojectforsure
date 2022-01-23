import PublicationItem from "./PublicationItem";

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