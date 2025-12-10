import { useLocation, useParams } from 'react-router-dom';

type RecipeLocationState = {
  title?: string;
  image?: string;
};

export const RecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const state = location.state as RecipeLocationState | null;

  const title = state?.title ?? `Recipe ${id}`;
  const image = state?.image;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        {title}
      </h1>
      <img
        src={image}
        alt={title}
        className="h-52 w-full object-cover sm:h-48"
      />
      <p className="mt-2 text-sm text-slate-500">
        This is the recipe details page. More content will go here later.
      </p>
    </main>
  );
};
