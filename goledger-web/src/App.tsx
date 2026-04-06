import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { TvShowCard } from './features/tv-shows/components/TvShowCard'
import { useCreateTvShow } from './features/tv-shows/hooks/useCreateTvShow'
import { useDeleteTvShow } from './features/tv-shows/hooks/useDeleteTvShow'
import { useTvShows } from './features/tv-shows/hooks/useTvShows'
import { useUpdateTvShow } from './features/tv-shows/hooks/useUpdateTvShow'
import { useUpdateWatchlist } from './features/watchlist/hooks/useUpdateWatchlist'
import { useWatchlists } from './features/watchlist/hooks/useWatchlists'
import { addTvShowToWatchlist, removeTvShowFromWatchlist } from './features/watchlist/utils'
import { QueryState } from './shared/components/QueryState'

function App() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedDescription, setEditedDescription] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [recommendedAge, setRecommendedAge] = useState('');

  const { data, isLoading, error } = useTvShows();
  const { data: watchlists } = useWatchlists()
  const { mutate: createTvShow, isPending } = useCreateTvShow();
  const { mutate: updateTvShow, isPending: isUpdating } = useUpdateTvShow();
  const { mutate: deleteTvShow, isPending: isDeleting } = useDeleteTvShow();
  const { mutate: updateWatchlist, isPending: isWatchlisting } = useUpdateWatchlist();

  const watchlist = watchlists?.[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title) return

    createTvShow(
      {
        title,
        description,
        recommendedAge: Number(recommendedAge),
      },
      {
        onSuccess: () => {
          setTitle('')
          setDescription('')
          setRecommendedAge('')
        },
      }
    )
  }

  const handleUpdate = () => {
    if (!editingId) return

    updateTvShow(
      {
        '@key': editingId,
        description: editedDescription,
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
      isLoading={isLoading}
      data={data}
      error={error}
      emptyMessage="No Tv Shows found"
    >
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-10">

          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">TV Shows</h1>
            <span className="text-sm text-gray-500">
              {data?.length ?? 0} items
            </span>
            <Link
              to="/watchlist"
              className="text-sm text-blue-600 hover:underline"
            >
              Watchlist
            </Link>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-10"
          >
            <h2 className="text-lg font-semibold mb-4">
              Add New TV Show
            </h2>

            <div className="grid gap-3 md:grid-cols-3">
              <input
                type="text"
                placeholder="Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                placeholder="Age"
                value={recommendedAge}
                onChange={(e) => setRecommendedAge(e.target.value)}
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={!title || isPending}
                className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg disabled:opacity-50"
              >
                {isPending ? 'Creating...' : 'Add TV Show'}
              </button>
            </div>
          </form>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data?.map((tvShow) => {
              const alreadyAdded = watchlist?.tvShows?.some(
                (item) => item.id === tvShow.id
              ) ?? false;

              const handleAddToWatchlist = () => {
                if (!watchlist) return

                const refs = addTvShowToWatchlist(watchlist, tvShow.id)

                if (!refs) return

                updateWatchlist(
                  {
                    '@key': watchlist.id,
                    tvShows: refs,
                  },
                  {
                    onSuccess: () => {
                      toast.success('Added to watchlist!')
                    },
                  }
                )
              }

              const handleRemoveFromWatchlist = () => {
                if (!watchlist) return

                const refs = removeTvShowFromWatchlist(watchlist, tvShow.id)

                if (!refs) return

                updateWatchlist(
                  {
                    '@key': watchlist.id,
                    tvShows: refs,
                  },
                  {
                    onSuccess: () => {
                      toast.success('Removed from watchlist!')
                    },
                  }
                )
              }

              return <TvShowCard
                key={tvShow.id}
                tvShow={tvShow}
                isEditing={editingId === tvShow.id}
                isDeleting={isDeleting}
                isUpdating={isUpdating}
                isWatchlisting={isWatchlisting}
                editedDescription={editedDescription}
                onCancel={() => setEditingId(null)}
                onChangeDescription={setEditedDescription}
                onSave={handleUpdate}
                onDelete={() => deleteTvShow(tvShow.id)}
                alreadyWatchlisted={alreadyAdded}
                onRemoveFromWatchlist={handleRemoveFromWatchlist}
                onAddToWatchlist={handleAddToWatchlist}
                onEdit={() => {
                  setEditingId(tvShow.id)
                  setEditedDescription(tvShow.description)
                }}
              />
            })}
          </div>
        </div>
      </div>
    </QueryState>
  )
}

export default App