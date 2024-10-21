'use client';

import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

const weeklyIdleCostData = [
  { day: 'Sunday', cost: 0.2 },
  { day: 'Monday', cost: 1.2 },
  { day: 'Tuesday', cost: 0.8 },
  { day: 'Wednesday', cost: 0.6 },
  { day: 'Thursday', cost: 0.4 },
  { day: 'Friday', cost: 0.3 },
  { day: 'Saturday', cost: 0.7 },
];

const milesVsFuelData = Array.from({ length: 100 }, (_, i) => ({
  miles: Math.random() * 150,
  fuel: Math.random() * 3,
}));

const fleetMileageData = [
  { day: 'Sat', miles: 1145 },
  { day: 'Fri', miles: 659 },
  { day: 'Thu', miles: 549 },
  { day: 'Wed', miles: 1031 },
  { day: 'Tue', miles: 624 },
  { day: 'Mon', miles: 786 },
  { day: 'Sun', miles: 881 },
];

const fuelUsageData = [
  { date: '11/21', used: 12, remaining: 5 },
  { date: '11/22', used: 10, remaining: 7 },
  { date: '11/23', used: 14, remaining: 3 },
  { date: '11/24', used: 8, remaining: 9 },
  { date: '11/25', used: 11, remaining: 6 },
  { date: '11/26', used: 13, remaining: 4 },
  { date: '11/27', used: 9, remaining: 8 },
];

export default function AnalyticsPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Аналитика 3GIS</h2>
        <Select defaultValue="week">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Выберите период" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">1 Неделя</SelectItem>
            <SelectItem value="twoWeeks">2 Недели</SelectItem>
            <SelectItem value="month">1 Месяц</SelectItem>
            <SelectItem value="threeMonths">3 Месяца</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-semibold">8.2 Km/L</div>
            <div className="text-sm text-muted-foreground">Средний Km/L</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-semibold">360k km</div>
            <div className="text-sm text-muted-foreground">Расстояние</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-semibold">40k L</div>
            <div className="text-sm text-muted-foreground">
              Использованное топливо
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-semibold">60%</div>
            <div className="text-sm text-muted-foreground">
              Утилизация транспорта
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-semibold">450k тонн</div>
            <div className="text-sm text-muted-foreground">
              Оценка выбросов CO2
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              Еженедельные затраты на простой - Ежедневная тенденция
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyIdleCostData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="cost" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Пройденные мили x Использованное топливо</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart>
                <CartesianGrid />
                <XAxis type="number" dataKey="miles" name="miles" unit="mi" />
                <YAxis type="number" dataKey="fuel" name="fuel" unit="L" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter
                  name="Miles vs Fuel"
                  data={milesVsFuelData}
                  fill="#8884d8"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Пробег автопарка (последняя неделя)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fleetMileageData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="day" type="category" />
                <Tooltip />
                <Bar dataKey="miles" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Отчет об использовании топлива</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fuelUsageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="used" stackId="a" fill="#8884d8" />
                <Bar dataKey="remaining" stackId="a" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
