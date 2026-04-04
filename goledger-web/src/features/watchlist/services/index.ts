import { api } from '../../../shared/services/api'
import { createAsset, updateAsset } from '../../../shared/services/assets'

export type Watchlist = {
    '@key': string,
    '@assetType': 'watchlist',
    title: string,
    description: string,
    tvShows: { '@assetType': string, '@key': string }[]
}

export type WatchlistNormalized = Omit<Watchlist, '@key'> & {
    id: string
}

export const getWatchlists = async (): Promise<WatchlistNormalized[]> => {
    const response = await api.post('/api/query/search', {
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
    }))
}

export type CreateWatchlistInput = {
    title: string,
    description: string,
    tvShows: { '@assetType': string, '@key': string }[]
}

export const createWatchlist = async (data: CreateWatchlistInput) => {
    return createAsset({
        '@assetType': 'watchlist',
        ...data,
    })
}

export type UpdateWatchlistInput = {
    '@key': string,
    tvShows: { '@assetType': string, '@key': string }[]
}

export const updateWatchlist = async (data: UpdateWatchlistInput) => {
    return updateAsset({
        '@assetType': 'watchlist',
        ...data
    })
}