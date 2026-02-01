import { useQuery } from '@tanstack/react-query';
import type { Recipe } from '../types/recipe';
import { recipesMock } from '../utils/mock/recipesMock';

const API_KEY = import.meta.env.VITE_RECIPE_API_KEY;

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

// Mocked fetch using local JSON data
const fetchRecipes = async (query: string): Promise<Recipe[]> => {
  const normalized = query.trim().toLowerCase();

  // simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (!normalized) return recipesMock;

  return recipesMock.filter((recipe) =>
    recipe.title.toLowerCase().includes(normalized)
  );
};

export const useRecipes = (query: string) => {
  return useQuery({
    queryKey: ['recipes', query],
    queryFn: () => fetchRecipes(query),
  });
};
