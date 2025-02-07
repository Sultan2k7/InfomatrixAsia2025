import dynamic from 'next/dynamic';

interface PageProps {
  params: {
    id: string;
  }
}

const VehiclePage = dynamic(() => import('./VehiclePage'), { ssr: false });

export default function Page({ params }: PageProps) {
  return <VehiclePage vehicleId={params.id} />;
}
