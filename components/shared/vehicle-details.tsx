import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Vehicle } from '@/types/vehicles';
import Link from 'next/link';

export const VehicleDetails = ({
  vehicle,
  onClose,
}: {
  vehicle: Vehicle;
  onClose: () => void;
}) => (
  <Card className="w-full lg:w-1/3 absolute top-0 left-0 h-full z-[1000] overflow-y-auto">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
        Toyota Camry #{vehicle.id}
      </CardTitle>
      <Button variant="ghost" size="sm" onClick={onClose}>
        X
      </Button>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Статус</p>
            <p className="text-sm text-muted-foreground">
              {vehicle.status || 'Нет данных'}
            </p>
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Скорость</p>
            <p className="text-sm text-muted-foreground">
              {vehicle.speed !== undefined ? `${vehicle.speed} км/ч` : 'Нет данных'}
            </p>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">Локация</p>
          <p className="text-sm text-muted-foreground">
            {vehicle.location || 'Нет данных'}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">Водитель</p>
          <p className="text-sm text-muted-foreground">
            {vehicle.driver || 'Нет данных'}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">Погода</p>
          <p className="text-sm text-muted-foreground">
            {vehicle.weather
              ? `Температура ${vehicle.weather.temperature || 'Нет данных'}°C, Влажность ${vehicle.weather.humidity || 'Нет данных'}%, Осадки ${vehicle.weather.precipitation || 'Нет данных'} мм`
              : 'Нет данных'}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Топливо</p>
            <p className="text-2xl font-bold">
              {vehicle.fuelAmount !== undefined ? `${vehicle.fuelAmount}%` : 'Нет данных'}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              Загрузка двигателя
            </p>
            <p className="text-2xl font-bold">
              {vehicle.engineLoad !== undefined ? `${vehicle.engineLoad}%` : 'Нет данных'}
            </p>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">Камеры</p>
          <div className="aspect-video bg-muted">
            <video 
              className="w-full h-full" 
              src="/vids/edet.mp4" 
              autoPlay 
              loop 
              muted 
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <Link href={`/dashboard/vehicles/1`} passHref>
            <Button className="w-full mt-2" variant="outline">
              Посмотреть в реальном времени
            </Button>
          </Link>
        </div> 
      </div>
    </CardContent>
  </Card>
);
