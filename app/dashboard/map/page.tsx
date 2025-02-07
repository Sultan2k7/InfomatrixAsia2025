// app/dashboard/map/page.tsx
import dynamic from 'next/dynamic'

const DynamicMapPage = dynamic(() => import('@/components/map/MapPageClient'), {
  ssr: false,
  loading: () => (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Карта транспорта</h2>
        <div className="aspect-video bg-muted relative flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </div>
    </div>
  )
})

export default function MapPage() {
  return <DynamicMapPage />
}