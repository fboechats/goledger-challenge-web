import type { AssetsCreation, AssetsDeletion } from "../types/assets"
import { api } from "./api"

export const createAsset = async <T extends AssetsCreation>(asset: T) => {
    return api.post('/api/invoke/createAsset', {
        asset: [asset],
    })
}

export const deleteAsset = async <T extends AssetsDeletion>(asset: T) => {
    return api.post('/api/invoke/deleteAsset', {
        key: asset,
    })
}