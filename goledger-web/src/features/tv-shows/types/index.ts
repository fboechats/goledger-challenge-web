export type TvShow = {
    '@assetType': 'tvShows'
    '@key': string
    title: string
    description: string
    recommendedAge: number
}

export type CreateTvShowInput = Omit<
    TvShow,
    '@key' | '@assetType'
>

export type UpdateTvShowInput = Omit<
    TvShow,
    '@assetType' | 'title' | 'recommendedAge'
>