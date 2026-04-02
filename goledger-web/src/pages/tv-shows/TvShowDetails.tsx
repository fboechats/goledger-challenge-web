import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCreateSeason } from '../../features/seasons/hooks/useCreateSeason';
import { useDeleteSeason } from '../../features/seasons/hooks/useDeleteSeason';
import { useSeasons } from '../../features/seasons/hooks/useSeasons';
import { useUpdateSeason } from '../../features/seasons/hooks/useUpdateSeason';
import { useTvShow } from '../../features/tv-shows/hooks/useTvShow';

export default function TvShowDetails() {
    const { id } = useParams();
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editedYear, setEditedYear] = useState('')
    const [seasonNumber, setSeasonNumber] = useState('');
    const [seasonYear, setSeasonYear] = useState('');
    const { mutate: createSeason, isPending } = useCreateSeason(id!);
    const { data, isLoading } = useTvShow(id);
    const { data: seasons, isLoading: loadingSeasons } = useSeasons(id);
    const { mutate: deleteSeason, isPending: isDeleting } = useDeleteSeason();
    const { mutate: updateSeason, isPending: isUpdating } = useUpdateSeason();

    const sortedSeasons = useMemo(() =>
        seasons
            ?.slice()
            .sort((a, b) => a.number - b.number), [seasons])

    const handleUpdate = () => {
        if (!editingId) return

        updateSeason(
            {
                '@key': editingId,
                year: Number(editedYear)
            },
            {
                onSuccess: () => {
                    setEditingId(null)
                },
            }
        )
    }

    if (isLoading) return <p className="p-8">Loading...</p>

    return (
        <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">
                Seasons
            </h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault()

                    if (!seasonNumber) return

                    createSeason({
                        number: Number(seasonNumber),
                        year: Number(seasonYear),
                        tvShow: {
                            "@key": id!,
                        }
                    })

                    setSeasonNumber('')
                    setSeasonYear('')
                }}
                className="mb-6 flex gap-2"
            >
                <input
                    type="number"
                    placeholder="Season number"
                    value={seasonNumber}
                    onChange={(e) => setSeasonNumber(e.target.value)}
                    className="border p-2 rounded"
                />
                <input
                    type="number"
                    placeholder="Season Year"
                    value={seasonYear}
                    onChange={(e) => setSeasonYear(e.target.value)}
                    className="border p-2 rounded"
                />

                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-blue-600 text-white px-3 py-2 rounded"
                >
                    Add
                </button>
            </form>

            {loadingSeasons ? (
                <p>Loading seasons...</p>
            ) : (
                <div className="space-y-3">
                    {sortedSeasons?.map((season) => (
                        <div className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center">
                            <div>
                                <p className="font-medium">
                                    Season {season.number}
                                </p>
                                {editingId === season.id ? (
                                    <input
                                        className='w-full border p-2 rounded mt-3'
                                        value={editedYear}
                                        onChange={(e) => setEditedYear(e.target.value)}
                                    />
                                ) : (
                                    <p className="text-sm text-gray-500">
                                        Year: {season.year}
                                    </p>
                                )}
                            </div>

                            <div className="flex gap-2">
                                {editingId === season.id ? (
                                    <>
                                        <button
                                            onClick={handleUpdate}
                                            disabled={isUpdating}
                                            className="text-blue-600 text-sm font-medium hover:underline"
                                        >
                                            Save
                                        </button>

                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="text-gray-500 text-sm font-medium hover:underline"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => {
                                                setEditingId(season.id);
                                                setEditedYear(`${season.year}`)
                                            }}
                                            className="text-blue-600 text-sm font-medium hover:underline"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => {
                                                if (confirm('Delete this Season?')) {
                                                    deleteSeason(season.id);
                                                }
                                            }}
                                            disabled={isDeleting}
                                            className="text-red-600 text-sm font-medium hover:underline disabled:opacity-50"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}