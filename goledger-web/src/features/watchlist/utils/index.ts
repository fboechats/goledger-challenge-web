import { mapToApiRefs } from "../../../shared/utils/mapToApiRefs";
import type { WatchlistTvShowNormalized } from "../types";

export const addTvShowToWatchlist = (
    watchlist: { id: string; tvShows: WatchlistTvShowNormalized[] },
    tvShowId: string
) => {
    const updated = [
        ...watchlist.tvShows,
        { id: tvShowId, '@assetType': 'tvShows' },
    ]

    return mapToApiRefs(updated)
}

export const removeTvShowFromWatchlist = (
    watchlist: { id: string; tvShows: WatchlistTvShowNormalized[] },
    tvShowId: string
) => {
    const updated = watchlist.tvShows.filter(
        (item) => item.id !== tvShowId
    )

    return mapToApiRefs(updated)
}