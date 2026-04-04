type Props = {
    message: string
}

export function EmptyState({ message }: Props) {
    return (
        <div className="flex justify-center items-center py-6 h-full">
            <p className="text-sm text-gray-500">
                {message}
            </p>
        </div>
    )
}