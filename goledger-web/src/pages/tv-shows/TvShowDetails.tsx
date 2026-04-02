import { useParams } from 'react-router-dom';
import { useSeasons } from '../../features/seasons/hooks/useSeaons';
import { useTvShow } from '../../features/tv-shows/hooks/useTvShow';

export default function TvShowDetails() {
    const { id } = useParams();
    const { data, isLoading } = useTvShow(id);
    const { data: seasons, isLoading: loadingSeasons } = useSeasons(id);

    if (isLoading) return <p className="p-8">Loading...</p>

    return (
        <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">
                Seasons
            </h2>

            {loadingSeasons ? (
                <p>Loading seasons...</p>
            ) : (
                <div className="space-y-3">
                    {seasons?.map((season) => (
                        <div
                            key={season.id}
                            className="bg-white p-4 rounded-lg shadow-sm border"
                        >
                            <p className="font-medium">
                                Season {season.number}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}