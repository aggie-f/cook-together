import { useNavigate, useParams } from 'react-router-dom'
import { getRecipeById, updateRecipe } from '../../services/recipeStorage'
import { RecipeForm } from '../../components/recipeForm/RecipeForm'
import type { RecipeFormValues } from '../../types/recipe'

export function EditRecipePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const recipe = id ? getRecipeById(id) : undefined

  if (!recipe) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-slate-700">Recipe not found.</p>
      </main>
    )
  }

  const handleUpdate = (values: RecipeFormValues) => {
    if (!id) return

    updateRecipe(id, {
      title: values.title,
      image: values.image?.trim() || undefined,
      ingredients: values.ingredients.map((i) => ({
        ...i,
        name: i.name.trim(),
      })),
      steps: values.steps,
    })

    navigate(`/recipes/${id}`)
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Edit Recipe
      </h1>

      <RecipeForm
        defaultValues={{
          title: recipe.title,
          image: recipe.image,
          ingredients: recipe.ingredients,
          steps: recipe.steps,
        }}
        submitLabel="Update recipe"
        onSubmit={handleUpdate}
      />
    </main>
  )
}
