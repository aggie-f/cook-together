import { useRecipes } from '../../hooks/useRecipes';

const query = 'cheese';

export const Home = () => {
  const { data: recipes = [], isLoading, error } = useRecipes(query);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 py-10 shadow-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              🍳 Recipe Browser
            </h1>
            <p className="mt-2 text-base text-amber-50 sm:text-lg">
              Discover delicious recipes
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {isLoading && (
          <div className="flex justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-400 border-t-transparent" />
          </div>
        )}

        {error && (
          <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700 shadow-sm">
            Failed to fetch recipes
          </div>
        )}

        {!isLoading && !error && recipes.length === 0 && (
          <div className="rounded-2xl bg-white p-6 text-center text-slate-600 shadow-md">
            <p>No recipes found</p>
          </div>
        )}

        {!isLoading && recipes.length > 0 && (
          <>
            <h2 className="mb-4 text-xl font-semibold text-slate-800">
              Results for "{query}" ({recipes.length})
            </h2>

            <div className="space-y-5 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
              {recipes.map((recipe) => (
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

                    <button className="mt-auto inline-flex items-center justify-center gap-2 self-start rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition group-hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2">
                      <span>View details</span>
                      <span className="text-xs transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
