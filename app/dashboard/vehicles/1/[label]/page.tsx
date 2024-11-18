'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Line } from 'react-chartjs-2';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
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
import zoomPlugin from 'chartjs-plugin-zoom';
import { color } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin  // Registering the zoom plugin
);

const translations = {
    vehicle_id: 'ID автомобиля',
    engineRpm: 'Обороты двигателя',
    fuelLevel: 'Уровень топлива',
    engineLoad: 'Нагрузка двигателя',
    vehicleSpeed: 'Скорость автомобиля',
    massAirFlow: 'Массовый расход воздуха',
    fuelPressure: 'Давление топлива',
    batteryVoltage: 'Напряжение батареи',
    oilTemperature: 'Температура масла',
    distanceTraveled: 'Пройденное расстояние',
    throttlePosition: 'Положение дросселя',
    catalystTemperature: 'Температура катализатора',
    fuelConsumptionRate: 'Расход топлива',
    oxygenSensorReading: 'Показания датчика кислорода',
    intakeAirTemperature: 'Температура всасываемого воздуха',
    diagnosticTroubleCode: 'Коды неисправностей',
    acceleratorPedalPosition: 'Положение педали акселератора',
    engineCoolantTemperature: 'Температура охлаждающей жидкости',
    evapEmissionControlPressure: 'Давление в системе контроля испарений',
    transmissionFluidTemperature: 'Температура трансмиссионной жидкости',
    oilPressure: 'Давление масла',
    brakePedalPosition: 'Положение педали тормоза',
    steeringAngle: 'Угол поворота руля',
    absStatus: 'Статус ABS',
    airbagDeploymentStatus: 'Статус подушек безопасности',
    tirePressure: 'Давление в шинах',
    gpsCoordinates: 'GPS координаты',
    altitude: 'Высота',
    heading: 'Курс',
    timestamp: 'Дата/Время',
  };
  

interface OBDCheckData {
  id: number;
  all: {
    engineRpm: number;
    fuelLevel: number;
    engineLoad: number;
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
    acceleratorPedalPosition: number;
    engineCoolantTemperature: number;
    evapEmissionControlPressure: number; 
    timestamp: string; 
    [key: string]: number | string;  // Adding index signature here
  };
  createdAt: string;
}

const LabelPage = () => {
  const router = useRouter();
  const label = useSearchParams();
  const labeel = usePathname().split('/')[4];
  const id = usePathname().split('/')[3];
  const neededVal = labeel.toString();
  const labeelru = translations[labeel as keyof typeof translations] || labeel;

  const [obdCheckDataArray, setObdCheckDataArray] = useState<OBDCheckData[]>([]);
  const [chartValues, setChartValues] = useState<number[]>([]);
  const [timedump, setTimedump] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [timePeriod, setTimePeriod] = useState<'day' | 'week' | 'month' | '3month'>('day'); 


  const [selectedTimeframe, setSelectedTimeframe] = useState('Day');

  const renderBack = () => (
    <div className="button-group">
      <Button
        onClick={() => router.back()}
        className="mb-8"
        variant="outline">
        <ArrowLeft className="mr-2 h-4 w-4" /> Назад
      </Button>      
    </div>
  );
  const renderButtons = () => (
    <div className="mb-4">
        <Button
          onClick={() => setTimePeriod('day')}
          variant={timePeriod === 'day' ? 'default' : 'outline'}
          className="mr-2">
          Day
        </Button>
        <Button
          onClick={() => setTimePeriod('week')}
          variant={timePeriod === 'week' ? 'default' : 'outline'}
          className="mr-2">
          Week
        </Button>
        <Button
          onClick={() => setTimePeriod('month')}
          variant={timePeriod === 'month' ? 'default' : 'outline'}
          className="mr-2">
          Month
        </Button>
        <Button
          onClick={() => setTimePeriod('3month')}
          variant={timePeriod === '3month' ? 'default' : 'outline'}
          className="mr-2">
          3 Month
        </Button> 
        <p style={{color: "gray"}}>Wait a bit after choosing...</p>

      </div>
  )

  useEffect(() => {
    fetchObdCheckData();
  }, [timePeriod]);

  const filterDataByTimePeriod = (data: OBDCheckData[], period: 'day' | 'week' | 'month' | '3month') => {
    const now = new Date(); // Current date
    let filteredData = data;
  
    switch (period) {
      case 'day':
        const oneDayAgo = new Date();
        oneDayAgo.setDate(now.getDay());
        filteredData = data.filter(item => {
          const timestamp = new Date(item.all.timestamp || item.createdAt); // Convert createdAt string to Date
          return timestamp >= oneDayAgo && timestamp <= now;
        });
        break;
      case 'week':
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 6);
        filteredData = data.filter(item => {
          const timestamp = new Date(item.all.timestamp || item.createdAt); // Convert createdAt string to Date
          const dayOfWeek = timestamp.getDate(); // Get day of the month
          return timestamp >= oneWeekAgo && timestamp <= now;
        });
        break;
      case 'month':
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(now.getMonth() - 1);
        filteredData = data.filter(item => {
          const timestamp = new Date(item.all.timestamp || item.createdAt); // Convert createdAt string to Date
          return timestamp >= oneMonthAgo && timestamp <= now;
        });
        break;
      case '3month':
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(now.getMonth() - 3); // Set the date to 3 months ago
        filteredData = data.filter(item => {
          const timestamp = new Date(item.all.timestamp || item.createdAt); // Convert createdAt string to Date
          return timestamp >= threeMonthsAgo && timestamp <= now;  // Include data from the last 3 months
        });
        break;
      default:
        break;
    }
  
    return filteredData;
  };
  
  

  const convertToUserTimeZone = (item: OBDCheckData) => {
    // Check if 'timestamp' exists in 'item.all', otherwise use 'item.createdAt'
    const timestamp = item.all.timestamp || item.createdAt;
  
    // Parse the chosen timestamp (either 'timestamp' or 'createdAt')
    const date = new Date(timestamp);
    
    // Get the timezone offset in minutes
    const timeZoneOffset = new Date().getTimezoneOffset() * 60000;
    
    // Convert the timestamp to UTC, then adjust it by the local timezone offset
    const userDate = new Date(date.getTime() - timeZoneOffset);
    
    // Return the formatted date as a string in the user's local timezone
    return userDate.toLocaleString();
  };
  
  

  const fetchObdCheckData = async () => {
    try {
      const response = await fetch('/api/vehicletest2/');
      if (!response.ok) {
        throw new Error('Failed to fetch OBD check data');
      }
      const data: OBDCheckData[] = await response.json();

      //  filter out existing ones and get rid of nulls or undefined ones
      const filteredData = data.filter(item => item.all[labeel] !== null && item.all[labeel] !== undefined );

      //  filter by date
      const filteredData1 = filterDataByTimePeriod(filteredData, timePeriod);


      // output exactly the labeeled ones
      const values = filteredData1.map(item => item.all[labeel]);
      const timestamps = filteredData1.map(item =>  convertToUserTimeZone(item));

      setObdCheckDataArray(filteredData);
      setChartValues(values as number[]);
      setTimedump(timestamps);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching OBD check data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (obdCheckDataArray.length === 0) {
    return <div>No OBD check data found</div>;
  }

  // Prepare chart data for Line chart
  const chartData = {
    labels: timedump,  // X-axis is the timestamps
    datasets: [
      {
        label: `${labeelru} (ID: ${id})`,
        data: chartValues,  // Y-axis is the corresponding values (e.g., engineRpm)
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      },
    ],
  };

  const hasData = (chartValues.length === 0);


  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      {renderBack()}
      {renderButtons()}
        
      {hasData ? (
        <div className="no-data">
          <p>No Data Found</p>
        </div>) : (
          <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top' as const,
              },
              title: {
                display: false,
                text: `График для ${labeelru} (ID: ${id})`,
              },
              zoom: {
                pan: {
                  enabled: true,
                  mode: 'x',
                },
                zoom: {
                  wheel: {
                    enabled: true,
                  },
                  pinch: {
                    enabled: true,
                  },
                  mode: 'x',
                  scaleMode: 'x',
                },
              },
            },
            scales: {
              y: {
                min: 0,
              }
            }
          }}
        />
        )
      }
      
    </div>
  );
};

export default LabelPage;
