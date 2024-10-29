// pages/dashboard/vehicles/[id]/[label].tsx
'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


interface OBDCheckData {
    engineRpm: number;
    fuelLevel: number;
    engineLoad: number;
    vehicle_id: string;
    massAirFlow: number;
    fuelPressure: number;
    vehicleSpeed: number;
    batteryVoltage: number;
    oilTemperature: number;
    distanceTraveled: number;
    throttlePosition: number;
    catalystTemperature: number;
    fuelConsumptionRate: number;
    oxygenSensorReading: number;
    intakeAirTemperature: number;
    diagnosticTroubleCode: string;
    acceleratorPedalPosition: number;
    engineCoolantTemperature: number;
    evapEmissionControlPressure: number;
}

const translationMap = {
    vehicle_id: { en: 'vehicle_id', ru: 'ID автомобиля' },
    engineRpm: { en: 'engineRpm', ru: 'Обороты двигателя' },
    fuelLevel: { en: 'fuelLevel', ru: 'Уровень топлива' },
    engineLoad: { en: 'engineLoad', ru: 'Нагрузка двигателя' },
    vehicleSpeed: { en: 'vehicleSpeed', ru: 'Скорость автомобиля' },
    massAirFlow: { en: 'massAirFlow', ru: 'Массовый расход воздуха' },
    fuelPressure: { en: 'fuelPressure', ru: 'Давление топлива' },
    batteryVoltage: { en: 'batteryVoltage', ru: 'Напряжение батареи' },
    oilTemperature: { en: 'oilTemperature', ru: 'Температура масла' },
    distanceTraveled: { en: 'distanceTraveled', ru: 'Пройденное расстояние' },
    throttlePosition: { en: 'throttlePosition', ru: 'Положение дросселя' },
    catalystTemperature: { en: 'catalystTemperature', ru: 'Температура катализатора' },
    fuelConsumptionRate: { en: 'fuelConsumptionRate', ru: 'Расход топлива' },
    oxygenSensorReading: { en: 'oxygenSensorReading', ru: 'Показания датчика кислорода' },
    intakeAirTemperature: { en: 'intakeAirTemperature', ru: 'Температура всасываемого воздуха' },
    diagnosticTroubleCode: { en: 'diagnosticTroubleCode', ru: 'Коды неисправностей' },
    acceleratorPedalPosition: { en: 'acceleratorPedalPosition', ru: 'Положение педали акселератора' },
    engineCoolantTemperature: { en: 'engineCoolantTemperature', ru: 'Температура охлаждающей жидкости' },
    evapEmissionControlPressure: { en: 'evapEmissionControlPressure', ru: 'Давление в системе контроля испарений' },
    transmissionFluidTemperature: { en: 'transmissionFluidTemperature', ru: 'Температура трансмиссионной жидкости' },
    oilPressure: { en: 'oilPressure', ru: 'Давление масла' },
    brakePedalPosition: { en: 'brakePedalPosition', ru: 'Положение педали тормоза' },
    steeringAngle: { en: 'steeringAngle', ru: 'Угол поворота руля' },
    absStatus: { en: 'absStatus', ru: 'Статус ABS' },
    airbagDeploymentStatus: { en: 'airbagDeploymentStatus', ru: 'Статус подушек безопасности' },
    tirePressure: { en: 'tirePressure', ru: 'Давление в шинах' },
    gpsCoordinates: { en: 'gpsCoordinates', ru: 'GPS координаты' },
    altitude: { en: 'altitude', ru: 'Высота' },
    heading: { en: 'heading', ru: 'Курс' }
};
  


const LabelPage = () => {
    const router = useRouter();
    const label = useSearchParams();
    const labeel = usePathname().split('/')[4];
    const id = usePathname().split('/')[3];

    const [obdCheckData, setObdCheckData] = useState<OBDCheckData | null>(null); // Single object
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //fetchObdCheckData();
        return;
    },);

    const fetchObdCheckData = async () => {
        try {
          const response = await fetch(`/api/vehiclestest/`); // Fetch the single object
          if (!response.ok) {
            throw new Error('Failed to fetch OBD check data');
          }
          const data: OBDCheckData = await response.json(); // Single object
          setObdCheckData(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching OBD check data:', error);
          setLoading(false);
        }
    };
    
    /*
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (!obdCheckData) {
        return <div>No OBD check data found</div>;
    }
    

    const translatedObdData = Object.entries(obdCheckData).map(([key, value]) => {
        const label = translationMap[key as keyof typeof translationMap]?.ru || key;
        const enkey = translationMap[key as keyof typeof translationMap]?.en || key;
        return { label, enkey, value: Array.isArray(value) ? value.join(', ') : value };
    });
    */


    // Жёстко закодированные данные для графика
    const chartData = {
        labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        datasets: [
            {
                label: `${labeel}`,
                data: [12, 14, 0, 0, 9, 6, 10, 15],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    
    return (
        <div style={{ width: '80%', margin: '0 auto' }}>
            <h1>График для метки: {labeel}</h1>
            <Line 
                data={chartData} 
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: `График для ${label} (ID: ${id})`,
                        },
                    },
                }} 
            />
        </div>
    );
};

export default LabelPage;
