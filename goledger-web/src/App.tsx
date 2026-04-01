import './App.css'
import { useTvShows } from './features/tv-shows/hooks/useTvShows'

function App() {
  const { data, isLoading, error } = useTvShows()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading data</p>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">
          TV Shows
        </h1>

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
