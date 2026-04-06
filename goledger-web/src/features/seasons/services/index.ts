import { api } from '../../../shared/services/api'
import { createAsset, deleteAsset, updateAsset } from '../../../shared/services/assets'

export type Season = {
    '@assetType': 'seasons',
    '@key': string,
    number: number,
    year: number,
    tvShow: {
        '@key': string
    }
}

export type SeasonNormalized = Omit<Season, '@key'> & {
    id: string
}

export const getSeasons = async (tvShowId: string): Promise<SeasonNormalized[]> => {
    const response = await api.post('/query/search', {
        query: {
            selector: {
                '@assetType': 'seasons',
                tvShow: {
                    "@key": tvShowId,
                },
            },
        },
    })

    const result = response.data?.result ?? []

    return result.map((item: Season) => ({
        ...item,
        id: item['@key'],
    }))
}

type CreateSeasonInput = {
    number: number
    year: number
    tvShow: {
        "@key": string,
    }
}

export const createSeason = async (data: CreateSeasonInput) => {
    const response = await createAsset({
        '@assetType': 'seasons',
        ...data,
    })

    return response.data
}

export const deleteSeason = async (id: string) => {
    return deleteAsset({
        '@assetType': 'seasons',
        '@key': id
    })
}

type UpdateSeasonInput = {
    '@key': string,
    year: number
}

export const updateSeason = async (data: UpdateSeasonInput) => {
    return updateAsset({
        '@assetType': 'seasons',
        ...data,
    })
}