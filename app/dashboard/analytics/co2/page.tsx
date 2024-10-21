'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Line,
    LineChart,
    Legend,
  } from 'recharts';

  import {
    MapPin,
    Truck,
    AlertTriangle,
    Users,
    BarChart2,
    Activity,
    Calendar,
  } from 'lucide-react';
  
  
  const weeklyIdleCostData = [
    { date: '11/14', used: 120 },
    { date: '11/15', used: 145 },
    { date: '11/16', used: 130 },
    { date: '11/17', used: 127 },
    { date: '11/18', used: 136 },
    { date: '11/19', used: 133 },
    { date: '11/20', used: 125 },
  ];

 
    const weeklyIdleCostData1 = [
    { day: 'Sunday', cost: 243 },
    { day: 'Monday', cost: 198 },
    { day: 'Tuesday', cost: 269 },
    { day: 'Wednesday', cost: 185 },
    { day: 'Thursday', cost: 204 },
    { day: 'Friday', cost: 220 },
    { day: 'Saturday', cost: 230 },
  ];
  const fleetMileageData = [
    { day: 'Lada', miles: 1145 },
    { day: 'Hyundai', miles: 659 },
    { day: 'Nexia', miles: 549 },
    { day: 'Mercedes', miles: 1031 },
    { day: 'Toyota', miles: 624 },
    { day: 'Mazda', miles: 786 },
    { day: 'Honda', miles: 881 },
  ];
  

  const fuelUsageData1 = [
    { date: 'Lada', used: 12},
    { date: 'Hyundai', used: 9},
    { date: 'Nexia', used: 15},
    { date: 'Mercedes', used: 14},
    { date: 'Toyota', used: 15},
    { date: 'Mazda', used: 8},
    { date: 'Honda', used: 13},
  ]
  const fuelUsageData2 = [
    { date: '12/14', used: 9},
    { date: '12/15', used: 11},
    { date: '12/16', used: 8},
    { date: '12/17', used: 11},
    { date: '12/18', used: 13},
    { date: '12/19', used: 7},
    { date: '12/20', used: 11},
  ]

  export default function co2Home() {
    return (    
        <div className='abc'>
            <div className="flex justify-between items-center">
                <h1 className='text-3xl font-bold mb-6'>Экология</h1>
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
            
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <Card>
                    <CardHeader>
                        <CardTitle>Общее количество выбросов CO2 на холостом ходу </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={weeklyIdleCostData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="used" stackId="a" fill="#32CD32" />
                        </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>
                        Сэкономленное количество выбросов с оптимизированных маршрутов 
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={weeklyIdleCostData1}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="cost" stroke="#98FF98" />
                        </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Выбросы СО2 с разных машин</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={fleetMileageData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis dataKey="day" type="category" />
                            <Tooltip />
                            <Bar dataKey="miles" fill="#7FFF00" />
                        </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Прогноз будущих выбросов СО2</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={fuelUsageData2}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="used" stackId="a" fill="#50C878" />
                        </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
  }