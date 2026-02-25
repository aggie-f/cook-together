import { Link } from 'react-router-dom'
import { useRecipes } from '../../hooks/useRecipes'
import { RecipeCard } from '../../components/recipeCard/RecipeCard'

interface HomeProps {
  query: string
}

export const Home = ({ query }: HomeProps) => {
  const { data: recipes = [], isLoading, error } = useRecipes(query)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 py-10 shadow-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              🍳 Recipe Browser
            </h1>
            <p className="mt-2 text-base text-amber-50 sm:text-lg">
              Discover delicious recipes
            </p>
          </div>

          <Link
            to="/recipes/new"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-amber-50 hover:shadow-xl"
          >
            + New Recipe
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {isLoading && (
          <div className="flex justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-400 border-t-transparent" />
          </div>
        )}

        {error && (
          <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700 shadow-sm">
            Failed to fetch recipes
          </div>
        )}

        {!isLoading && !error && recipes.length === 0 && (
          <div className="rounded-2xl bg-white p-6 text-center text-slate-600 shadow-md">
            <p>No recipes found for "{query}"</p>
          </div>
        )}

        {!isLoading && recipes.length > 0 && (
          <>
            <h2 className="mb-4 text-xl font-semibold text-slate-800">
              {query
                ? `Results for "${query}" (${recipes.length})`
                : `All Recipes (${recipes.length})`}
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
