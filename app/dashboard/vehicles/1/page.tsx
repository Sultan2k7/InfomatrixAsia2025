import dynamic from 'next/dynamic';

const VehiclePage = dynamic(() => import('./VehiclePage'), { ssr: false });

export default VehiclePage;
