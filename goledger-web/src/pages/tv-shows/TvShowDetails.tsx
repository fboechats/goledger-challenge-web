import { useParams } from 'react-router-dom'

export default function TvShowDetails() {
    const { id } = useParams()

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">
                TV Show Details
            </h1>

            <p className="mt-4 text-gray-600">
                ID: {id}
            </p>
        </div>
    )
}