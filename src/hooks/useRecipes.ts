import { useQuery } from '@tanstack/react-query'
import type { Recipe } from '../types/recipe'
import { getRecipes } from '../services/recipeStorage'

const API_KEY = import.meta.env.VITE_RECIPE_API_KEY

// const fetchRecipes = async (query: string): Promise<Recipe[]> => {
//   const response = await fetch(
//     `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}`
//   );

//   if (!response.ok) {
//     throw new Error('Failed fetching recipes');
//   }

//   const data = await response.json();
//   return data.results;
// };

// export const useRecipes = (query: string) => {
//   return useQuery({
//     queryKey: ['recipes', query],
//     queryFn: () => fetchRecipes(query),
//   });
// };

// Fetch from localStorage
const fetchRecipes = async (query: string): Promise<Recipe[]> => {
  const searchQuery = query.trim().toLowerCase()

  const allRecipes = getRecipes()

  if (!searchQuery) return allRecipes

  return allRecipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery)
  )
}

export const useRecipes = (query: string) => {
  return useQuery({
    queryKey: ['recipes', query],
    queryFn: () => fetchRecipes(query),
  })
}
