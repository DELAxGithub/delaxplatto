export default function KanbanLoading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
        <div className="h-5 w-96 bg-muted animate-pulse rounded mt-2" />
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-80 bg-muted/50 rounded-lg p-4 animate-pulse"
          >
            <div className="h-6 w-32 bg-muted rounded mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, j) => (
                <div
                  key={j}
                  className="bg-background rounded-lg border p-3 space-y-2"
                >
                  <div className="h-4 w-16 bg-muted rounded" />
                  <div className="h-5 w-full bg-muted rounded" />
                  <div className="h-4 w-3/4 bg-muted rounded" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
