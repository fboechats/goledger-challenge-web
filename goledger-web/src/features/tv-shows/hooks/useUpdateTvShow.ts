import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { updateTvShow } from "../services"

export const useUpdateTvShow = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateTvShow,
        onError: () => toast.error('Something went wrong'),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tvShows'] })
            toast.success('TV Show Updated!')
        },
    })
}