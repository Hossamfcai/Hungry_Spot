export default function UsersTableSkeleton() {
  return (
    <div className="users-table-section p-5 animate-pulse bg-surface-container-lowest border border-outline-variant rounded-radius-lg shadow-candlelight">
      {/* 1. Header & Controls Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-space-md mb-space-xl">
        {/* Title & Subtitle Skeletons */}
        <div className="flex flex-col gap-space-2xs w-full sm:w-auto">
          <div className="h-6 w-56 bg-surface-container-high rounded-radius-sm" />
          <div className="h-4 w-80 max-w-full bg-surface-container rounded-radius-sm" />
        </div>

        {/* Action Controls Skeleton (Select Filter + Add Button) */}
        <div className="flex items-center gap-space-sm w-full sm:w-auto">
          <div className="h-10 w-32 bg-surface-container-high rounded-radius-DEFAULT border border-outline-variant/50" />
          <div className="h-10 w-28 bg-surface-container-high rounded-radius-DEFAULT border border-outline-variant/50" />
        </div>
      </div>

      {/* 2. Responsive Table Wrapper */}
      <div className="w-full overflow-x-auto scrollbar-none">
        <table className="w-full min-w-[700px] border-collapse text-left">
          {/* Table Header Column Skeletons */}
          <thead>
            <tr className="border-b border-outline-variant/60 bg-surface-container-low">
              <th className="pb-space-md px-space-xs">
                <div className="h-3 w-12 bg-surface-container-highest rounded-radius-sm" />
              </th>
              <th className="pb-space-md px-space-xs">
                <div className="h-3 w-10 bg-surface-container-highest rounded-radius-sm" />
              </th>
              <th className="pb-space-md px-space-xs">
                <div className="h-3 w-24 bg-surface-container-highest rounded-radius-sm" />
              </th>
              <th className="pb-space-md px-space-xs">
                <div className="h-3 w-20 bg-surface-container-highest rounded-radius-sm" />
              </th>
              <th className="pb-space-md px-space-xs text-right">
                <div className="h-3 w-14 bg-surface-container-highest rounded-radius-sm ml-auto" />
              </th>
            </tr>
          </thead>

          {/* Table Body Row Skeletons */}
          <tbody className="divide-y divide-outline-variant/30">
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={`table-skeleton-row-${index}`}>
                {/* User Column: Avatar + Name & Email */}
                <td className="py-space-md px-space-xs">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-radius-full bg-surface-container-high shrink-0" />
                    <div className="flex flex-col gap-space-2xs w-full">
                      <div className="h-3.5 w-36 bg-surface-container-high rounded-radius-sm" />
                      <div className="h-3 w-48 bg-surface-container rounded-radius-sm" />
                    </div>
                  </div>
                </td>

                {/* Role Column (Badge shape) */}
                <td className="py-space-md px-space-xs">
                  <div className="h-6 w-16 bg-surface-container-high rounded-radius-full" />
                </td>

                {/* Status Column (Dot Badge shape) */}
                <td className="py-space-md px-space-xs">
                  <div className="h-6 w-20 bg-surface-container-high rounded-radius-full" />
                </td>

                {/* Last Activity Column */}
                <td className="py-space-md px-space-xs">
                  <div className="h-3.5 w-28 bg-surface-container-low rounded-radius-sm" />
                </td>

                {/* Actions Column (3 Action Buttons) */}
                <td className="py-space-md px-space-xs">
                  <div className="flex items-center justify-end gap-space-xs">
                    <div className="w-7 h-7 bg-surface-container-high rounded-radius-md" />
                    <div className="w-7 h-7 bg-surface-container-high rounded-radius-md" />
                    <div className="w-7 h-7 bg-surface-container-high rounded-radius-md" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3. Footer Counter Skeleton */}
      <div className="pt-space-md mt-space-xs border-t border-outline-variant/40 flex items-center">
        <div className="h-3.5 w-44 bg-surface-container rounded-radius-sm" />
      </div>
    </div>
  );
}
