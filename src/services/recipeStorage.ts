import type { Recipe, RecipeId } from '../types/recipe'

const STORAGE_KEY = 'cookTogheter.recipes'

export const getRecipes = (): Recipe[] => {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export const saveRecipes = (recipes: Recipe[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes))
}

export const getRecipeById = (id: RecipeId): Recipe | undefined => {
  return getRecipes().find((recipe) => recipe.id === id)
}

export const createRecipe = (
  values: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>
): Recipe => {
  const now = new Date().toISOString()
  const recipe: Recipe = {
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    ...values,
  }

  const recipes = getRecipes()
  saveRecipes([recipe, ...recipes])

  return recipe
}

export const updateRecipe = (
  id: RecipeId,
  values: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>
): Recipe | undefined => {
  const recipes = getRecipes()
  const existingRecipe = recipes.find((recipe) => recipe.id === id)

  if (!existingRecipe) return undefined

  const updatedRecipe: Recipe = {
    ...existingRecipe,
    ...values,
    updatedAt: new Date().toISOString(),
  }

  const updatedRecipes = recipes.map((recipe) =>
    recipe.id === id ? updatedRecipe : recipe
  )

  saveRecipes(updatedRecipes)
  return updatedRecipe
}
