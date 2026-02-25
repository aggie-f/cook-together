interface DeleteConfirmationModalProps {
  isOpen: boolean
  recipeTitle: string
  onConfirm: () => void
  onCancel: () => void
}

export const DeleteConfirmationModal = ({
  isOpen,
  recipeTitle,
  onConfirm,
  onCancel,
}: DeleteConfirmationModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-slate-900">Delete Recipe</h3>
        <p className="mt-3 text-sm text-slate-700">
          Are you sure you want to delete "{recipeTitle}"? This action cannot be
          undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
