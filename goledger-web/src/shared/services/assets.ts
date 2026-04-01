import type { AssetsCreation } from "../types/assets"
import { api } from "./api"

export const createAsset = async <T extends AssetsCreation>(asset: T) => {
    return api.post('/api/invoke/createAsset', {
        asset: [asset],
    })
}