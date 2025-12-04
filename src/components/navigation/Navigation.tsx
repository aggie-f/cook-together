type NavigationProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

export const Navigation = ({
  searchQuery,
  onSearchChange,
}: NavigationProps) => {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: logo / brand */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-400 via-orange-400 to-rose-400 text-sm font-semibold text-white shadow-sm">
            CT
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-slate-900">
              Cook Together
            </span>
            <span className="text-xs text-slate-500">
              Discover recipes together
            </span>
          </div>
        </div>

        {/* Center: simple links (hidden on very small screens) */}
        <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 sm:flex">
          <button className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800">
            Home
          </button>
          <button className="text-xs transition hover:text-slate-900">
            Favourites
          </button>
          <button className="text-xs transition hover:text-slate-900">
            About
          </button>
        </div>

        {/* Right: search + avatar */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-500 shadow-sm sm:flex">
            <span className="inline-flex h-4 w-4 items-center justify-center text-[10px]">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search recipes"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-32 border-none bg-transparent text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-0 md:w-48"
            />
          </div>

          {/* Avatar */}
          <button className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100 text-xs font-medium text-slate-700 shadow-sm">
            AK
          </button>
        </div>
      </nav>
    </header>
  );
};
