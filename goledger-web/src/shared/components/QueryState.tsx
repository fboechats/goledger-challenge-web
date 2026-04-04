import type { ReactNode } from 'react'
import { EmptyState } from './EmptyState'
import { Loading } from './LoadingState'

type Props<T> = {
    isLoading: boolean
    data?: T[]
    error?: unknown
    emptyMessage: string
    children: ReactNode
}

export function QueryState<T>({
    isLoading,
    data,
    error,
    emptyMessage,
    children,
}: Props<T>) {
    if (isLoading) return <Loading />

    if (error) {
        return (
            <p className="text-sm text-red-500 text-center py-6">
                Something went wrong
            </p>
        )
    }

    if (!data || data.length === 0) {
        return <EmptyState message={emptyMessage} />
    }

    return <>{children}</>
}