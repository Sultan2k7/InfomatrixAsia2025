// app/dashboard/map/loading.tsx
export default function Loading() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Карта транспорта</h2>
        <div className="aspect-video bg-muted relative flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </div>
    </div>
  );
}