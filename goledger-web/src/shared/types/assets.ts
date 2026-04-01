import type { TvShow } from "../../features/tv-shows/types";

export type AssetsCreate = Omit<TvShow, "@key">;

export type AssetsDelete = Pick<TvShow, "@key" | "@assetType">;

export type AssetsUpdate = Pick<TvShow, "@key" | "description">;