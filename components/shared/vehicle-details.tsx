import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Vehicle } from '@/types/vehicles';

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
        Ford F-150 #{vehicle.id}
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
            <p className="text-sm text-muted-foreground">{vehicle.status}</p>
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Скорость</p>
            <p className="text-sm text-muted-foreground">
              {vehicle.speed} км/ч
            </p>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">Локация</p>
          <p className="text-sm text-muted-foreground">{vehicle.location}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">Водитель</p>
          <p className="text-sm text-muted-foreground">{vehicle.driver}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">Погода</p>
          <p className="text-sm text-muted-foreground">
            Температура {vehicle.weather.temperature}°C, Влажность{' '}
            {vehicle.weather.humidity}%, Осадки {vehicle.weather.precipitation}{' '}
            мм
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Топливо</p>
            <p className="text-2xl font-bold">{vehicle.fuelAmount}%</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              Загрузка двигателя
            </p>
            <p className="text-2xl font-bold">{vehicle.engineLoad}%</p>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">Камеры</p>
          <div className="aspect-video bg-muted">
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-muted-foreground">Camera Feed</span>
            </div>
          </div>
          <Button className="w-full mt-2" variant="outline">
            Посмотреть в реальном времени
          </Button>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">Прибытие</p>
          <p className="text-2xl font-bold">{vehicle.arrivalTime}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);
