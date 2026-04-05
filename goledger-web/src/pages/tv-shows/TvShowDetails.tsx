import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCreateEpisode } from '../../features/episodes/hooks/useCreateEpisode'
import { useDeleteEpisode } from '../../features/episodes/hooks/useDeleteEpisode'
import { useEpisodes } from '../../features/episodes/hooks/useEpisodes'
import { useUpdateEpisode } from '../../features/episodes/hooks/useUpdateEpisode'
import { useCreateSeason } from '../../features/seasons/hooks/useCreateSeason'
import { useDeleteSeason } from '../../features/seasons/hooks/useDeleteSeason'
import { useSeasons } from '../../features/seasons/hooks/useSeasons'
import { useUpdateSeason } from '../../features/seasons/hooks/useUpdateSeason'
import { useTvShow } from '../../features/tv-shows/hooks/useTvShow'
import { Breadcrumb } from '../../shared/components/Breadcrumb'
import { QueryState } from '../../shared/components/QueryState'
import { toRFC3339 } from '../../shared/utils/toRFC3339'

export default function TvShowDetails() {
    const { id } = useParams()

    const [selectedSeason, setSelectedSeason] = useState<string | null>(null)

    const [editingSeasonId, setEditingSeasonId] = useState<string | null>(null)
    const [editedYear, setEditedYear] = useState('')

    const [seasonNumber, setSeasonNumber] = useState('')
    const [seasonYear, setSeasonYear] = useState('')

    const [editingEpisodeId, setEditingEpisodeId] = useState<string | null>(null)
    const [editedEpisodeDescription, setEditedEpisodeDescription] = useState('')

    const [episodeTitle, setEpisodeTitle] = useState('')
    const [episodeNumber, setEpisodeNumber] = useState('')
    const [episodeDescription, setEpisodeDescription] = useState('')
    const [releaseDate, setReleaseDate] = useState('')

    const { mutate: createSeason, isPending } = useCreateSeason(id!)
    const { data: tvShow } = useTvShow(id)
    const { data: seasons, isLoading, error } = useSeasons(id)
    const { mutate: deleteSeason } = useDeleteSeason()
    const { mutate: updateSeason } = useUpdateSeason()

    const { data: episodes } = useEpisodes(selectedSeason || undefined)
    const { mutate: createEpisode } = useCreateEpisode(selectedSeason!)
    const { mutate: deleteEpisode } = useDeleteEpisode()
    const { mutate: updateEpisode } = useUpdateEpisode()

    const sortedSeasons = useMemo(
        () => seasons?.slice().sort((a, b) => a.number - b.number),
        [seasons]
    )

    const sortedEpisodes = useMemo(
        () => episodes?.slice().sort((a, b) => a.episodeNumber - b.episodeNumber),
        [episodes]
    )

    return (
        <QueryState emptyMessage='' isLoading={isLoading} error={error} data={seasons}>
            <div className="max-w-4xl mx-auto px-4 py-10">
                <Breadcrumb
                    items={[
                        { label: 'TV Shows', to: '/' },
                        { label: tvShow?.title || 'TV Show' },
                    ]}
                />

                <h2 className="text-xl font-semibold mb-6">
                    Seasons of {tvShow?.title}
                </h2>

                <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
                    <h3 className="text-md font-semibold text-gray-600 mb-3">
                        Create Season
                    </h3>
                    <form
                        className="flex gap-3 items-end"
                        onSubmit={(e) => {
                            e.preventDefault()
                            if (!seasonNumber) return

                            createSeason({
                                number: Number(seasonNumber),
                                year: Number(seasonYear),
                                tvShow: { '@key': id! },
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
                            className="border p-2 rounded w-full"
                        />

                        <input
                            type="number"
                            placeholder="Year"
                            value={seasonYear}
                            onChange={(e) => setSeasonYear(e.target.value)}
                            className="border p-2 rounded w-full"
                        />

                        <button
                            disabled={!seasonNumber || isPending}
                            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 text-nowrap"
                        >
                            Add Season
                        </button>
                    </form>
                </div>

                <div className="space-y-3">
                    {sortedSeasons?.map((season) => {
                        const isSelected = selectedSeason === season.id

                        return (
                            <div
                                key={season.id}
                                className="bg-white p-4 rounded-xl shadow-sm"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">
                                            Season {season.number}
                                        </p>

                                        {editingSeasonId === season.id ? (
                                            <input
                                                value={editedYear}
                                                onChange={(e) => setEditedYear(e.target.value)}
                                                className="border p-1 rounded mt-1"
                                            />
                                        ) : (
                                            <p className="text-sm text-gray-500">
                                                Year: {season.year}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        {editingSeasonId === season.id ? (
                                            <>
                                                <button
                                                    onClick={() => {
                                                        updateSeason({
                                                            '@key': season.id,
                                                            year: Number(editedYear),
                                                        })
                                                        setEditingSeasonId(null)
                                                    }}
                                                    className="text-blue-600 text-sm"
                                                >
                                                    Save
                                                </button>

                                                <button
                                                    onClick={() => setEditingSeasonId(null)}
                                                    className="text-gray-500 text-sm"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => {
                                                        setEditingSeasonId(season.id)
                                                        setEditedYear(`${season.year}`)
                                                    }}
                                                    className="text-blue-600 text-sm"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        if (confirm('Delete season?')) {
                                                            deleteSeason(season.id)
                                                        }
                                                    }}
                                                    className="text-red-600 text-sm"
                                                >
                                                    Delete
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        setSelectedSeason(
                                                            isSelected ? null : season.id
                                                        )
                                                    }
                                                    className="text-blue-600 text-sm"
                                                >
                                                    {isSelected ? 'Hide Episodes' : 'View Episodes'}
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {isSelected && (
                                    <div className="mt-6 border-t pt-4">
                                        <h3 className="font-semibold mb-3">
                                            Episodes
                                        </h3>

                                        <div className="bg-gray-50 p-3 rounded-lg mb-4">
                                            <h4 className="text-md font-semibold text-gray-600 mb-2">
                                                Create Episode
                                            </h4>

                                            <form
                                                className="flex gap-2 items-end"
                                                onSubmit={(e) => {
                                                    e.preventDefault()

                                                    createEpisode({
                                                        season: { '@key': season.id },
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
                                                    placeholder="Ep"
                                                    value={episodeNumber}
                                                    onChange={(e) =>
                                                        setEpisodeNumber(e.target.value)
                                                    }
                                                    className="border p-2 rounded w-20"
                                                />

                                                <input
                                                    placeholder="Episode title"
                                                    value={episodeTitle}
                                                    onChange={(e) =>
                                                        setEpisodeTitle(e.target.value)
                                                    }
                                                    className="border p-2 rounded w-full"
                                                />

                                                <input
                                                    placeholder="Short description"
                                                    value={episodeDescription}
                                                    onChange={(e) =>
                                                        setEpisodeDescription(e.target.value)
                                                    }
                                                    className="border p-2 rounded w-full"
                                                />

                                                <input
                                                    type="date"
                                                    value={releaseDate}
                                                    onChange={(e) =>
                                                        setReleaseDate(e.target.value)
                                                    }
                                                    className="border p-2 rounded"
                                                />

                                                <button
                                                    disabled={!episodeNumber || !episodeTitle}
                                                    className="bg-blue-600 text-white px-3 py-2 rounded disabled:opacity-50 text-nowrap"
                                                >
                                                    Add Episode
                                                </button>
                                            </form>
                                        </div>

                                        <div className="space-y-2">
                                            {sortedEpisodes?.map((ep) => (
                                                <div
                                                    key={ep.id}
                                                    className="bg-gray-50 p-4 rounded-xl shadow-sm"
                                                >
                                                    <p className="font-medium">
                                                        Ep {ep.episodeNumber} — {ep.title}
                                                    </p>

                                                    {editingEpisodeId === ep.id ? (
                                                        <textarea
                                                            style={{ resize: "none" }}
                                                            value={editedEpisodeDescription}
                                                            onChange={(e) =>
                                                                setEditedEpisodeDescription(
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="border p-1 rounded w-full mt-1"
                                                        />
                                                    ) : (
                                                        <p className="text-sm text-gray-600 mt-1">
                                                            {ep.description}
                                                        </p>
                                                    )}

                                                    <div className="flex justify-between mt-2">
                                                        <span className="text-xs text-gray-400">
                                                            {new Date(
                                                                ep.releaseDate
                                                            ).toLocaleDateString()}
                                                        </span>

                                                        <div className="flex gap-2">
                                                            {editingEpisodeId === ep.id ? (
                                                                <>
                                                                    <button
                                                                        onClick={() => {
                                                                            updateEpisode({
                                                                                '@key': ep.id,
                                                                                description:
                                                                                    editedEpisodeDescription,
                                                                            })
                                                                            setEditingEpisodeId(null)
                                                                        }}
                                                                        className="text-blue-600 text-sm"
                                                                    >
                                                                        Save
                                                                    </button>

                                                                    <button
                                                                        onClick={() =>
                                                                            setEditingEpisodeId(null)
                                                                        }
                                                                        className="text-gray-500 text-sm"
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <button
                                                                        onClick={() => {
                                                                            setEditingEpisodeId(ep.id)
                                                                            setEditedEpisodeDescription(
                                                                                ep.description
                                                                            )
                                                                        }}
                                                                        className="text-blue-600 text-sm"
                                                                    >
                                                                        Edit
                                                                    </button>

                                                                    <button
                                                                        onClick={() => {
                                                                            if (
                                                                                confirm(
                                                                                    'Delete episode?'
                                                                                )
                                                                            ) {
                                                                                deleteEpisode(ep.id)
                                                                            }
                                                                        }}
                                                                        className="text-red-600 text-sm"
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </QueryState>
    )
}