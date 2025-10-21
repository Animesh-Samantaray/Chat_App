import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  // Create 6 skeleton items
  const skeletonContacts = Array(6).fill(null);

  return (
    <aside className="w-full md:w-20 lg:w-72 bg-zinc-900">
      {/* Mobile compact row */}
      <div className="flex md:hidden items-center gap-2 px-2 py-2 overflow-x-auto">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-10 h-10 bg-zinc-800 rounded-full animate-pulse flex-shrink-0" />
        ))}
      </div>

      {/* md+ vertical skeletons */}
      <div className="hidden md:block overflow-y-auto w-full py-3 px-2 space-y-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-2 flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-800 rounded-full animate-pulse" />
            <div className="flex-1">
              <div className="h-3 bg-zinc-800 rounded mb-2 w-3/5 animate-pulse" />
              <div className="h-2 bg-zinc-800 rounded w-2/5 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;