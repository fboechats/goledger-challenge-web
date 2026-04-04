import { useWatchlists } from '../../features/watchlist/hooks/useWatchlists'
import { QueryState } from '../../shared/components/QueryState'

export default function Watchlist() {
    const { data, isLoading } = useWatchlists()

    const watchlist = data?.[0]

    return (
        <QueryState
            isLoading={isLoading}
            emptyMessage="Your Watchlist is Empty"
            data={data}
        >
            <div className="min-h-screen bg-gray-100">
                <div className="max-w-4xl mx-auto px-4 py-10">

                    <h1 className="text-2xl font-bold mb-6">
                        Watchlist
                    </h1>

                    <div className="space-y-3">
                        {watchlist?.tvShows?.map((item) => (
                            <div
                                key={item['@key']}
                                className="bg-white p-4 rounded shadow-sm"
                            >
                                <p className="font-medium">
                                    {item['@key']}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </QueryState>
    )
}