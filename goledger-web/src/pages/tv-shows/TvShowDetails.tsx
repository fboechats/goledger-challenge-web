import { useParams } from 'react-router-dom';
import { useTvShow } from '../../features/tv-shows/hooks/useTvShow';

export default function TvShowDetails() {
    const { id } = useParams();
    const { data, isLoading } = useTvShow(id);

    if (isLoading) return <p className="p-8">Loading...</p>

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-4xl mx-auto px-4 py-10">

                <h1 className="text-3xl font-bold">
                    {data?.title}
                </h1>

                <p className="mt-4 text-gray-700">
                    {data?.description}
                </p>

                <span className="mt-4 block text-sm text-gray-500">
                    Age: {data?.recommendedAge}+
                </span>

            </div>
        </div>
    )
}