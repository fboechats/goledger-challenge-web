import { api } from "../../../shared/services/api"
import { createAsset, deleteAsset, updateAsset } from "../../../shared/services/assets"
import type { CreateTvShowDTO, TvShow, UpdateTvShowDTO } from "../types"

type TvShowNormalized = Omit<TvShow, '@key'> & {
  id: string
}

export const getTvShows = async (): Promise<TvShowNormalized[]> => {
  const response = await api.post('/api/query/search', {
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

export const createTvShow = async (data: CreateTvShowDTO) => {
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

export const updateTvShow = async (data: UpdateTvShowDTO) => {
  return updateAsset({
    "@assetType": 'tvShows',
    ...data,
  })
}