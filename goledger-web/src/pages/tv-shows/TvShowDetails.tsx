import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCreateEpisode } from '../../features/episodes/hooks/useCreateEpisode';
import { useEpisodes } from '../../features/episodes/hooks/useEpisodes';
import { useCreateSeason } from '../../features/seasons/hooks/useCreateSeason';
import { useDeleteSeason } from '../../features/seasons/hooks/useDeleteSeason';
import { useSeasons } from '../../features/seasons/hooks/useSeasons';
import { useUpdateSeason } from '../../features/seasons/hooks/useUpdateSeason';
import { useTvShow } from '../../features/tv-shows/hooks/useTvShow';
import { Breadcrumb } from '../../shared/components/Breadcrumb';
import { QueryState } from '../../shared/components/QueryState';
import { toRFC3339 } from '../../shared/utils/toRFC3339';

export default function TvShowDetails() {
    const { id } = useParams();

    const [selectedSeason, setSelectedSeason] = useState<string | null>(null)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editedYear, setEditedYear] = useState('')
    const [seasonNumber, setSeasonNumber] = useState('');
    const [seasonYear, setSeasonYear] = useState('');
    const [episodeTitle, setEpisodeTitle] = useState('');
    const [episodeNumber, setEpisodeNumber] = useState('')
    const [episodeDescription, setEpisodeDescription] = useState('')
    const [releaseDate, setReleaseDate] = useState('')

    const { mutate: createSeason, isPending } = useCreateSeason(id!);
    const { data: tvShow } = useTvShow(id);
    const { data: seasons, isLoading: loadingSeasons, error } = useSeasons(id);
    const { mutate: deleteSeason, isPending: isDeleting } = useDeleteSeason();
    const { mutate: updateSeason, isPending: isUpdating } = useUpdateSeason();
    const { data: episodes } = useEpisodes(selectedSeason || undefined);
    const { mutate: createEpisode } = useCreateEpisode(selectedSeason!);

    const sortedSeasons = useMemo(() =>
        seasons
            ?.slice()
            .sort((a, b) => a.number - b.number), [seasons])

    const sortedEpisodes = useMemo(() =>
        episodes
            ?.slice()
            .sort((a, b) => a.episodeNumber - b.episodeNumber), [episodes])

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

    return (
        <QueryState
            isLoading={loadingSeasons}
            emptyMessage='No Seasons Found'
            error={error}
            data={seasons}
        >
            <div className="max-w-4xl mx-auto px-4 py-10">
                <Breadcrumb
                    items={[
                        { label: 'TV Shows', to: '/' },
                        { label: 'Seasons' },
                    ]}
                />
                <h2 className="text-xl font-semibold mb-4">
                    {`Seasons of ${tvShow?.title}`}
                </h2>
                <form
                    className="mb-6 flex gap-2"
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


                <div className="space-y-3">
                    {sortedSeasons?.map((season) => (
                        <div key={season.id} className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center">
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
                            <button
                                onClick={() => setSelectedSeason(season.id)}
                                className="text-blue-600 text-sm font-medium hover:underline"
                            >
                                View Episodes
                            </button>
                        </div>
                    ))}
                    {selectedSeason && (
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold mb-3">
                                Episodes
                            </h3>

                            <form
                                className="flex gap-2 bg-white p-4 rounded-xl shadow-sm mb-6"
                                onSubmit={(e) => {
                                    e.preventDefault()

                                    createEpisode({
                                        season: { '@key': selectedSeason! },
                                        episodeNumber: Number(episodeNumber),
                                        title: episodeTitle,
                                        description: episodeDescription,
                                        releaseDate: toRFC3339(releaseDate),
                                    })

                                    setEpisodeNumber('')
                                    setEpisodeTitle('')
                                    setEpisodeDescription('')
                                    setReleaseDate('')
                                }}
                            >
                                <input
                                    placeholder="Episode Number"
                                    value={episodeNumber}
                                    onChange={(e) => setEpisodeNumber(e.target.value)}
                                    className="border p-2 rounded w-full"
                                />

                                <input
                                    placeholder="Title"
                                    value={episodeTitle}
                                    onChange={(e) => setEpisodeTitle(e.target.value)}
                                    className="border p-2 rounded w-full"
                                />

                                <input
                                    placeholder="Description"
                                    value={episodeDescription}
                                    onChange={(e) => setEpisodeDescription(e.target.value)}
                                    className="border p-2 rounded w-full"
                                />

                                <input
                                    type="date"
                                    value={releaseDate}
                                    onChange={(e) => setReleaseDate(e.target.value)}
                                    className="border p-2 rounded w-full"
                                />

                                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                                    Add Episode
                                </button>
                            </form>

                            <div className="space-y-2">
                                {sortedEpisodes?.map((ep) => (
                                    <div
                                        key={ep.id}
                                        className="bg-white p-3 rounded border"
                                    >
                                        <p className="font-medium">
                                            Ep {ep.episodeNumber} — {ep.title}
                                        </p>

                                        <p className="text-sm text-gray-600">
                                            {ep.description}
                                        </p>

                                        <span className="text-xs text-gray-400 mt-2">
                                            {new Date(ep.releaseDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </QueryState>
    )
}