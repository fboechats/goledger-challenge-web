import { api } from "../../../shared/services/api"
import { createAsset, deleteAsset, readAsset, updateAsset } from "../../../shared/services/assets"
import type { CreateTvShowInput, TvShow, UpdateTvShowInput } from "../types"

export type TvShowNormalized = Omit<TvShow, '@key'> & {
  id: string
}

export const getTvShows = async (): Promise<TvShowNormalized[]> => {
  const response = await api.post('/query/search', {
    query: {
      selector: {
        '@assetType': 'tvShows',
      },
    },
  })

  const result = response.data?.result ?? []

  return result.map((item: TvShow) => ({
    ...item,
    id: item['@key'],
  }))
}

export const createTvShow = async (data: CreateTvShowInput) => {
  return createAsset({
    '@assetType': 'tvShows',
    ...data,
  })
}

export const deleteTvShow = async (id: string) => {
  return deleteAsset({
    '@assetType': 'tvShows',
    '@key': id
  })
}

export const updateTvShow = async (data: UpdateTvShowInput) => {
  return updateAsset({
    '@assetType': 'tvShows',
    ...data,
  })
}

export const getTvShowById = async (id: string): Promise<TvShow> => {
  const response = await readAsset({
    '@assetType': 'tvShows',
    '@key': id,
  })

  return response.data
}