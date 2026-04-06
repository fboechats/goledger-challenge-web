import { api } from '../../../shared/services/api'
import { createAsset, updateAsset } from '../../../shared/services/assets'
import type { CreateWatchlistInput, UpdateWatchlistInput, Watchlist, WatchlistNormalized } from '../types'

export const getWatchlists = async (): Promise<WatchlistNormalized[]> => {
    const response = await api.post('/query/search', {
        query: {
            selector: {
                '@assetType': 'watchlist',
            },
        },
    })

    const result = response.data?.result ?? []

    return result.map((item: Watchlist) => ({
        ...item,
        id: item['@key'],
        tvShows: (item.tvShows || []).map((tvShow) => ({
            id: tvShow['@key'],
            '@assetType': tvShow['@assetType'],
        }))
    }))
}

export const createWatchlist = async (data: CreateWatchlistInput) => {
    return createAsset({
        '@assetType': 'watchlist',
        ...data,
    })
}

export const updateWatchlist = async (data: UpdateWatchlistInput) => {
    return updateAsset({
        '@assetType': 'watchlist',
        ...data
    })
}