import type { AssetsCreate, AssetsDelete, AssetsRead, AssetsUpdate } from "../types/assets"
import { api } from "./api"

export const readAsset = async <T extends AssetsRead>(asset: T) => {
    return api.post('/api/query/readAsset', {
        key: asset,
    })
}

export const createAsset = async <T extends AssetsCreate>(asset: T) => {
    return api.post('/api/invoke/createAsset', {
        asset: [asset],
    })
}

export const deleteAsset = async <T extends AssetsDelete>(asset: T) => {
    return api.post('/api/invoke/deleteAsset', {
        key: asset,
    })
}

export const updateAsset = async <T extends AssetsUpdate>(asset: T) => {
    return api.post('/api/invoke/updateAsset', {
        update: asset,
    })
}