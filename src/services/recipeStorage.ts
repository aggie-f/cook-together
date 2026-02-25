import type { Recipe, RecipeId } from '../types/recipe'

const STORAGE_KEY = 'cookTogheter.recipes'

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const generateUniqueSlug = (
  title: string,
  existingRecipes: Recipe[]
): string => {
  let slug = generateSlug(title)
  let counter = 1

  while (existingRecipes.some((recipe) => recipe.id === slug)) {
    slug = `${generateSlug(title)}-${counter}`
    counter++
  }

  return slug
}

export const getRecipes = (): Recipe[] => {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export const saveRecipes = (recipes: Recipe[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes))
  } catch (error) {
    console.error('Failed to save recipes to localStorage', error)
  }
}

export const getRecipeById = (id: RecipeId): Recipe | undefined => {
  return getRecipes().find((recipe) => recipe.id === id)
}

export const createRecipe = (
  values: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>
): Recipe => {
  const recipes = getRecipes()
  const now = new Date().toISOString()
  const recipe: Recipe = {
    id: generateUniqueSlug(values.title, recipes),
    createdAt: now,
    updatedAt: now,
    ...values,
  }

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
