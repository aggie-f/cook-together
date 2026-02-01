import type { Recipe } from '../../types/recipe';

const now = new Date().toISOString();

export const recipesMock: Recipe[] = [
  {
    id: '1',
    title: 'Creamy Garlic Pasta',
    image:
      'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
    ingredients: [
      { name: '250g pasta (spaghetti or fettuccine)' },
      { name: '3 cloves garlic, minced' },
      { name: '2 tbsp butter' },
      { name: '200ml cream' },
      { name: 'Parmesan, grated' },
      { name: 'Salt & pepper' },
    ],
    steps: [
      'Cook pasta in salted water until al dente.',
      'Melt butter and gently sauté garlic for 30–60 seconds.',
      'Add cream and simmer 2–3 minutes.',
      'Toss pasta with sauce and parmesan; season to taste.',
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '2',
    title: 'Roasted Veggie Bowl',
    image:
      'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=800',
    ingredients: [
      { name: '250g pasta (spaghetti or fettuccine)' },
      { name: '3 cloves garlic, minced' },
      { name: '2 tbsp butter' },
      { name: '200ml cream' },
      { name: 'Parmesan, grated' },
      { name: 'Salt & pepper' },
    ],
    steps: [
      'Heat oven to 220°C.',
      'Toss vegetables with oil and spices.',
      'Roast 20–25 minutes until tender.',
      'Serve over rice/quinoa with your favorite sauce.',
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '3',
    title: 'Classic Margherita Pizza',
    image:
      'https://images.pexels.com/photos/724216/pexels-photo-724216.jpeg?auto=compress&cs=tinysrgb&w=800',
    ingredients: [
      { name: '250g pasta (spaghetti or fettuccine)' },
      { name: '3 cloves garlic, minced' },
      { name: '2 tbsp butter' },
      { name: '200ml cream' },
      { name: 'Parmesan, grated' },
      { name: 'Salt & pepper' },
    ],
    steps: [
      'Preheat oven to the highest setting (and a pizza stone if you have one).',
      'Stretch dough and spread tomato sauce.',
      'Add mozzarella and bake until browned and bubbly.',
      'Top with basil and drizzle olive oil before serving.',
    ],
    createdAt: now,
    updatedAt: now,
  },
];
