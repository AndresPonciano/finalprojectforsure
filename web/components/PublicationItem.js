
const PublicationItem = ({ publication }) => {
    return (
        <div className="mt-6">
            <div className="flex w-full items-center bg-gray-100 p-2 rounded-md shadow">
                <div className="p-2">
                    <h2 className="text-blue-500 text-lg">{publication.title}</h2>
                    <h2>authors: TBD {publication.id}</h2>
                    <h2 className="text-gray-500 italic">
                        {publication.abstract.slice(0, 200)}...
                    </h2>
                    <h2 className="text-blue-400">cited by: <span>{publication.num_citations}</span></h2>
                </div>
            </div>
        </div>
    )
}

export default PublicationItem;