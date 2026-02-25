import { useNavigate } from 'react-router-dom'
import { createRecipe } from '../../services/recipeStorage'
import { RecipeForm } from '../../components/recipeForm/RecipeForm'
import type { RecipeFormValues } from '../../types/recipe'

export function NewRecipePage() {
  const navigate = useNavigate()

  const handleCreate = (values: RecipeFormValues) => {
    const recipe = createRecipe({
      title: values.title,
      image: values.image?.trim() || undefined,
      ingredients: values.ingredients.map((i) => ({
        ...i,
        name: i.name.trim(),
      })),
      steps: values.steps,
    })

    navigate(`/recipes/${recipe.id}`)
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        New Recipe
      </h1>

      <RecipeForm submitLabel="Create recipe" onSubmit={handleCreate} />
    </main>
  )
}
