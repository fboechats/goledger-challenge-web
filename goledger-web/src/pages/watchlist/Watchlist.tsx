import toast from 'react-hot-toast';
import { useTvShows } from '../../features/tv-shows/hooks/useTvShows';
import { useUpdateWatchlist } from '../../features/watchlist/hooks/useUpdateWatchlist';
import { useWatchlists } from '../../features/watchlist/hooks/useWatchlists';
import { removeTvShowFromWatchlist } from '../../features/watchlist/utils';
import { Breadcrumb } from '../../shared/components/Breadcrumb';
import { QueryState } from '../../shared/components/QueryState';

export default function Watchlist() {
    const { data, isLoading } = useWatchlists();
    const { data: tvShows } = useTvShows();
    const { mutate: updateWatchlist } = useUpdateWatchlist();

    const watchlist = data?.[0];

    const tvShowMap = Object.fromEntries(
        tvShows?.map((tv) => [tv.id, tv]) || []
    )

    return (
        <QueryState
            isLoading={isLoading}
            emptyMessage="Your Watchlist is Empty"
            data={watchlist?.tvShows}
        >
            <div className="min-h-screen bg-gray-100">
                <div className="max-w-4xl mx-auto px-4 py-10">
                    <Breadcrumb
                        items={[
                            { label: 'TV Shows', to: '/' },
                            { label: 'Watchlist' },
                        ]}
                    />
                    <h1 className="text-2xl font-bold mb-6">
                        Watchlist
                    </h1>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {watchlist?.tvShows?.map((item) => {
                            const tvShow = tvShowMap[item.id]

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
                                            toast.success('Removed to watchlist!')
                                        },
                                    }
                                )
                            }

                            return (
                                <div
                                    key={item.id}
                                    className="bg-white p-4 rounded-xl shadow-sm"
                                >
                                    <h3 className="font-semibold">
                                        {tvShow?.title}
                                    </h3>
                                    {tvShow?.description && (
                                        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                                            {tvShow.description}
                                        </p>
                                    )}
                                    <span className="text-xs text-gray-500 mt-3 block">
                                        Age: {tvShow?.recommendedAge}+
                                    </span>
                                    <button
                                        onClick={handleRemoveFromWatchlist}
                                        className="text-red-600 text-sm hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </QueryState>
    )
}