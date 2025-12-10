import { Link } from 'react-router-dom';
import type { Recipe } from '../../hooks/useRecipes';

type RecipeCardProps = {
  recipe: Recipe;
  query: string;
};

export const RecipeCard = ({ recipe, query }: RecipeCardProps) => {
  return (
    <article
      key={recipe.id}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)] ring-1 ring-slate-100 transition-transform hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
    >
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-52 w-full object-cover sm:h-48"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-black/0" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-slate-900">
          {recipe.title}
        </h3>

        <p className="mb-4 text-sm text-slate-500">
          A delicious option from your "{query}" search.
        </p>

        <Link
          to={`/recipes/${recipe.id}`}
          state={{ title: recipe.title, image: recipe.image }}
          className="mt-auto inline-flex items-center justify-center gap-2 self-start rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
        >
          <span>View details</span>
          <span className="text-xs transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </article>
  );
};
