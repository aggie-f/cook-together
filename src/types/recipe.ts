export type RecipeId = string;

export type IngredientUnit =
  | 'g'
  | 'kg'
  | 'ml'
  | 'l'
  | 'tsp'
  | 'tbsp'
  | 'cup'
  | 'pcs'
  | ''; // allow blank while user is typing

export interface Ingredient {
  name: string; // "onion"
  quantity?: number; // 1, 200, 0.5
  unit?: IngredientUnit; // "g", "pcs", etc.
  notes?: string; // optional: "finely chopped"
}

export interface Recipe {
  id: RecipeId;
  title: string;
  image?: string;
  ingredients: Ingredient[];
  steps: string[];
  createdAt: string; // ISO string, good for localStorage/Firebase
  updatedAt: string; // ISO string
}

export type RecipeFormValues = Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>;
