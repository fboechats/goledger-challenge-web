import { useWatchlists } from '../../features/watchlist/hooks/useWatchlists'

export default function Watchlist() {
    const { data, isLoading } = useWatchlists()

    if (isLoading) return <p className="p-4">Loading...</p>

    const watchlist = data?.[0]

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-4xl mx-auto px-4 py-8">

                <h1 className="text-2xl font-bold mb-6">
                    Watchlist
                </h1>

                {!watchlist?.tvShows?.length && (
                    <p className="text-gray-500">
                        No items in watchlist
                    </p>
                )}

                <div className="space-y-3">
                    {watchlist?.tvShows?.map((item) => (
                        <div
                            key={item['@key']}
                            className="bg-white p-4 rounded shadow-sm"
                        >
                            <p className="font-medium">
                                {item.title || item['@key']}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}