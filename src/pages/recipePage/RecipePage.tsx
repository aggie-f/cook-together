import { useParams } from 'react-router-dom';
import { recipesMock } from '../../utils/mock/recipesMock';

export const RecipePage = () => {
  const { id } = useParams<{ id: string }>();

  const recipe = recipesMock.find((recipe) => recipe.id === id);

  if (!recipe) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-slate-700">Recipe not found.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        {recipe.title}
      </h1>

      {recipe.image ? (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="mt-4 h-52 w-full rounded-lg object-cover sm:h-64"
        />
      ) : null}

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">Ingredients</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-800">
          {recipe.ingredients.map((ing, idx) => (
            <li key={idx}>{ing.name}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">Steps</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-slate-800">
          {recipe.steps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </section>
    </main>
  );
};
