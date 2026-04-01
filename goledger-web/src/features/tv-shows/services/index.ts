import { api } from "../../../shared/services/api"
import { createAsset } from "../../../shared/services/assets"
import type { CreateTvShowDTO, TvShow } from "../types"

type TvShowNormalized = Omit<TvShow, '@key'> & {
  id: string
}

export const createTvShow = async (data: CreateTvShowDTO) => {
  return createAsset({
    '@assetType': 'tvShows',
    ...data,
  })
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