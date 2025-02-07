'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { MapPin, Truck, AlertTriangle, Users, BarChart2, Activity, Calendar } from 'lucide-react';

const data = [
  { name: 'Пн', incidents: 4 },
  { name: 'Вт', incidents: 3 },
  { name: 'Ср', incidents: 2 },
  { name: 'Чт', incidents: 6 },
  { name: 'Пт', incidents: 5 },
  { name: 'Сб', incidents: 3 },
  { name: 'Вс', incidents: 1 },
];

export default function DashboardHome() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">Панель управления 3GIS</h1>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Всего транспортных средств
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">
              +5 за последний месяц
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Активные маршруты
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              +12% с прошлой недели
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Инциденты (сегодня)
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">
              -2 по сравнению со вчера
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Активные водители
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">182</div>
            <p className="text-xs text-muted-foreground">
              +3 за последнюю неделю
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Статистика инцидентов за неделю</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="incidents" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Состояние автопарка</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="w-full sm:w-40 mb-2 sm:mb-0 sm:mr-4">В эксплуатации</div>
                <Progress value={75} className="flex-1" />
                <div className="w-full sm:w-10 text-left sm:text-right mt-2 sm:mt-0">75%</div>
              </div>
              <div className="flex flex-col sm:flex-row items-center">
                <div className="w-full sm:w-40 mb-2 sm:mb-0 sm:mr-4">На техобслуживании</div>
                <Progress value={15} className="flex-1" />
                <div className="w-full sm:w-10 text-left sm:text-right mt-2 sm:mt-0">15%</div>
              </div>
              <div className="flex flex-col sm:flex-row items-center">
                <div className="w-full sm:w-40 mb-2 sm:mb-0 sm:mr-4">Не используется</div>
                <Progress value={10} className="flex-1" />
                <div className="w-full sm:w-10 text-left sm:text-right mt-2 sm:mt-0">10%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Быстрые действия</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Button className="w-full">
              <Truck className="mr-2 h-4 w-4" />
              Добавить ТС
            </Button>
            <Button className="w-full">
              <Users className="mr-2 h-4 w-4" />
              Управление водителями
            </Button>
            <Button className="w-full">
              <BarChart2 className="mr-2 h-4 w-4" />
              Просмотр отчетов
            </Button>
            <Button className="w-full">
              <Activity className="mr-2 h-4 w-4" />
              Мониторинг маршрутов
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Последние события</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="incidents" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="incidents">Инциденты</TabsTrigger>
              <TabsTrigger value="maintenance">Техобслуживание</TabsTrigger>
            </TabsList>
            <TabsContent value="incidents">
              <ul className="space-y-2">
                <li className="flex flex-col sm:flex-row sm:items-center">
                  <div className="flex items-center">
                    <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500 flex-shrink-0" />
                    <span>Превышение скорости на маршруте A-12</span>
                  </div>
                  <span className="mt-1 sm:mt-0 sm:ml-auto text-sm text-muted-foreground">
                    2 часа назад
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-center">
                  <div className="flex items-center">
                    <AlertTriangle className="mr-2 h-4 w-4 text-red-500 flex-shrink-0" />
                    <span>Отклонение от маршрута B-7</span>
                  </div>
                  <span className="mt-1 sm:mt-0 sm:ml-auto text-sm text-muted-foreground">
                    5 часов назад
                  </span>
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="maintenance">
              <ul className="space-y-2">
                <li className="flex flex-col sm:flex-row sm:items-center">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-blue-500 flex-shrink-0" />
                    <span>Плановое ТО для ТС #127</span>
                  </div>
                  <span className="mt-1 sm:mt-0 sm:ml-auto text-sm text-muted-foreground">
                    Завтра
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-center">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Завершено ТО для ТС #093</span>
                  </div>
                  <span className="mt-1 sm:mt-0 sm:ml-auto text-sm text-muted-foreground">
                    Вчера
                  </span>
                </li>
              </ul>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

