import { useState } from 'react'
import './App.css'
import { useCreateTvShow } from './features/tv-shows/hooks/useCreateTvShow'
import { useTvShows } from './features/tv-shows/hooks/useTvShows'

function App() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [recommendedAge, setRecommendedAge] = useState('')

  const { data, isLoading, error } = useTvShows();
  const { mutate: createTvShow, isPending } = useCreateTvShow();

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

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading data</p>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">
          TV Shows
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded-lg shadow-sm mb-6 space-y-3"
        >
          <h2 className="text-lg font-semibold">
            Add TV Show
          </h2>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Recommended Age"
            value={recommendedAge}
            onChange={(e) => setRecommendedAge(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            disabled={!title || isPending}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {isPending ? 'Creating...' : 'Add TV Show'}
          </button>
        </form>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((tvShow) => (
            <div
              key={tvShow.id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <h3 className="text-lg font-semibold">
                {tvShow.title}
              </h3>

              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {tvShow.description}
              </p>

              <span className="text-xs mt-3 block text-gray-500">
                Age: {tvShow.recommendedAge}+
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
