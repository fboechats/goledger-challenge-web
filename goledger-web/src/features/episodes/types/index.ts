export type Episode = {
    '@key': string,
    '@assetType': string,
    season: { '@key': string },
    episodeNumber: number,
    title: string,
    description: string,
    releaseDate: string
}

export type EpisodeNormalized = Omit<Episode, '@key'> & {
    id: string
}

export type CreateEpisodeInput = {
    season: { '@key': string },
    episodeNumber: number,
    title: string,
    description: string,
    releaseDate: string,
}

export type UpdateEpisodeInput = {
    '@key': string,
    description: string,
}