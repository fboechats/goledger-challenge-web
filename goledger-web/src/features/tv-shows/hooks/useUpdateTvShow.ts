import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateTvShow } from "../services"

export const useUpdateTvShow = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateTvShow,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tvShows'] })
        },
    })
}