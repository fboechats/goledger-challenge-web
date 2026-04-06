import { useNavigate } from 'react-router-dom'
import type { TvShowNormalized } from "../services"

type Props = {
    tvShow: TvShowNormalized,
    isEditing: boolean,
    isUpdating: boolean,
    isDeleting: boolean,
    isWatchlisting: boolean,
    editedDescription: string,
    onEdit: () => void,
    onCancel: () => void,
    onChangeDescription: (value: string) => void
    onSave: () => void,
    onDelete: () => void,
    alreadyWatchlisted: boolean,
    onAddToWatchlist: () => void,
    onRemoveFromWatchlist: () => void
}

export const TvShowCard = ({
    tvShow,
    isEditing,
    isUpdating,
    isDeleting,
    isWatchlisting,
    editedDescription,
    onEdit,
    onCancel,
    onChangeDescription,
    onDelete,
    onSave,
    alreadyWatchlisted,
    onAddToWatchlist,
    onRemoveFromWatchlist
}: Props) => {
    const navigate = useNavigate();

    return (
        <div
            className="cursor-pointer bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between hover:shadow-md transition"
            onClick={() => navigate(`/tv-shows/${tvShow.id}`)}
        >
            <div className="flex items-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {tvShow.title}
                </h3>
                <div className="flex gap-3 ml-auto">
                    {isEditing ? (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onSave();
                                }}
                                disabled={isUpdating}
                                className="text-blue-600 text-sm font-medium hover:underline"
                            >
                                Save
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onCancel();
                                }}
                                className="text-gray-500 text-sm font-medium hover:underline"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit();
                                }}
                                className="text-blue-600 text-sm font-medium hover:underline"
                            >
                                Edit
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();

                                    if (confirm('Delete this TV Show?')) {
                                        onDelete();
                                    }
                                }}
                                disabled={isDeleting}
                                className="text-red-600 text-sm font-medium hover:underline disabled:opacity-50"
                            >
                                Delete
                            </button>
                        </>
                    )}
                </div>
            </div>

            {isEditing ? (
                <textarea
                    style={{ resize: "none" }}
                    value={editedDescription}
                    onChange={(e) => onChangeDescription(e.target.value)}
                    className="w-full border p-2 rounded mt-3"
                />
            ) : (
                <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                    {tvShow.description}
                </p>
            )}

            <div className="border-t border-gray-100 mt-4 pt-3 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                    Age: {tvShow.recommendedAge}+
                </span>

                <div className="flex gap-3">

                    {alreadyWatchlisted ? (
                        <button
                            className="text-red-600 text-sm hover:underline"
                            disabled={isWatchlisting}
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemoveFromWatchlist()
                            }}
                        >
                            Remove
                        </button>
                    ) : (
                        <button
                            className="text-green-600 text-sm hover:underline"
                            disabled={isWatchlisting}
                            onClick={(e) => {
                                e.stopPropagation();
                                onAddToWatchlist()
                            }}
                        >
                            Add to Watchlist
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}