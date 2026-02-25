import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getRecipeById } from '../../services/recipeStorage'

const formatIngredientQuantity = (quantity?: number, unit?: string) => {
  if (quantity && unit) return `${quantity} ${unit} `
  if (quantity) return `${quantity} `
  if (unit) return `${unit} `
  return ''
}

export const RecipePage = () => {
  const { id } = useParams<{ id: string }>()
  const [imageError, setImageError] = useState(false)

  const recipe = id ? getRecipeById(id) : undefined

  if (!recipe) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-slate-700">Recipe not found.</p>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {recipe.title}
        </h1>

        <Link
          to={`/recipes/${id}/edit`}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Edit Recipe
        </Link>
      </div>

      {recipe.image && !imageError ? (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="mt-4 h-52 w-full rounded-lg object-cover sm:h-64"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="mt-4 h-52 w-full rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center sm:h-64">
          <span className="text-6xl">🍽️</span>
        </div>
      )}

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">Ingredients</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-800">
          {recipe.ingredients.map((ing, idx) => (
            <li key={idx}>
              {formatIngredientQuantity(ing.quantity, ing.unit)}
              {ing.name}
              {ing.notes ? ` (${ing.notes})` : ''}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">Steps</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-slate-800">
          {recipe.steps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </section>
    </main>
  )
}
