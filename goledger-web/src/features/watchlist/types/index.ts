export type WatchlistTvShow = {
    '@key': string,
    '@assetType': string
}

export type Watchlist = {
    '@key': string,
    '@assetType': 'watchlist',
    title: string,
    description: string,
    tvShows: WatchlistTvShow[]
}

export type WatchlistTvShowNormalized = {
    id: string,
    '@assetType': string
}

export type WatchlistNormalized = Omit<Watchlist, '@key' | 'tvShows'> & {
    id: string,
    tvShows: WatchlistTvShowNormalized[]
}

export type CreateWatchlistInput = {
    title: string,
    description: string,
    tvShows: WatchlistTvShow[]
}

export type UpdateWatchlistInput = {
    '@key': string,
    tvShows: WatchlistTvShow[]
}