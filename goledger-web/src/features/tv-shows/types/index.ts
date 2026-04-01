export type TvShow = {
    '@assetType': 'tvShows'
    '@key': string
    title: string
    description: string
    recommendedAge: number
}

export type CreateTvShowDTO = Omit<
    TvShow,
    '@key' | '@assetType'
>

export type UpdateTvShowDTO = Omit<
    TvShow,
    '@assetType' | 'title' | 'recommendedAge'
>