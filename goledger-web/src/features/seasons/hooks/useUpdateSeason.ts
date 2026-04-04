import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { updateSeason } from "../services"

export const useUpdateSeason = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateSeason,
        onError: () => toast.error('Something went wrong'),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['seasons'] })
            toast.success('Season Updated!')
        },
    })
}