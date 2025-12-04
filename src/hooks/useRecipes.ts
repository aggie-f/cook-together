import { useQuery } from '@tanstack/react-query';

export interface Recipe {
  id: number;
  title: string;
  image: string;
}

const API_KEY = import.meta.env.VITE_RECIPE_API_KEY;

const fetchRecipes = async (query: string): Promise<Recipe[]> => {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed fetching recipes');
  }

  const data = await response.json();
  return data.results;
};

export const useRecipes = (query: string) => {
  return useQuery({
    queryKey: ['recipes', query],
    queryFn: () => fetchRecipes(query),
  });
};
