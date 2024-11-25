'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Plus,
  ExternalLink,
} from 'lucide-react';

interface Vehicle {
  id: string;
  driverId: string;
  phoneNumber: string;
  vehicleNumber: string;
  currentMission: string;
  location: string;
  speed: number;
  malfunctions: number;
  vehicleType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  driver: {
    id: string;
    name: string;
    email: string;
  };
}

export default function VehiclesPage() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();

  // Hardcoded vehicles
  const vehicles: Vehicle[] = [
    {
      id: '1',
      driverId: '101',
      phoneNumber: '555-1234',
      vehicleNumber: 'ABC123',
      currentMission: 'Delivery',
      location: 'Almaty',
      speed: 60,
      malfunctions: 1,
      vehicleType: 'Jeep',
      status: 'active',
      createdAt: '2023-10-01',
      updatedAt: '2023-10-10',
      driver: {
        id: '101',
        name: 'Михаил Абай',
        email: 'john@example.com',
      },
    },
  ];

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.driver.name.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.location.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.vehicleType.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.vehicleNumber.toLowerCase().includes(search.toLowerCase())
  );

  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    if (sortBy === 'newest')
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === 'oldest')
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sortBy === 'status') return a.status.localeCompare(b.status);
    return 0;
  });

  const totalPages = Math.ceil(sortedVehicles.length / itemsPerPage);
  const paginatedVehicles = sortedVehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Транспорт</h1>
        {/* <Button onClick={() => router.push('/dashboard/vehicles/create')}>
          <Plus className="mr-2 h-4 w-4" /> Зарегистрировать транспорт
        </Button> */}
      </div>
      <div className="flex justify-between mb-4">
        <Input
          className="max-w-sm"
          placeholder="Поиск"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Сортировать по" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Новые</SelectItem>
            <SelectItem value="oldest">Старые</SelectItem>
            <SelectItem value="status">Статус</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID транспорта</TableHead>
            <TableHead>Водитель</TableHead>
            <TableHead>Номер телефона</TableHead>
            <TableHead>Номер транспорта</TableHead>
            <TableHead>Текущая миссия</TableHead>
            <TableHead>Локация</TableHead>
            <TableHead>Скорость</TableHead>
            <TableHead>Кол-во ошибок</TableHead>
            <TableHead>Вид транспорта</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedVehicles.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell>{vehicle.id}</TableCell>
              <TableCell>{vehicle.driver.name}</TableCell>
              <TableCell>{vehicle.phoneNumber}</TableCell>
              <TableCell>{vehicle.vehicleNumber}</TableCell>
              <TableCell>{vehicle.currentMission || '-'}</TableCell>
              <TableCell>{vehicle.location || '-'}</TableCell>
              <TableCell>{vehicle.speed} km/h</TableCell>
              <TableCell>{vehicle.malfunctions}</TableCell>
              <TableCell>{vehicle.vehicleType}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    vehicle.status === 'active' ? 'default' : 'secondary'
                  }
                >
                  {vehicle.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Link href={`/dashboard/vehicles/${vehicle.id}`} passHref>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w4 mr-2" />
                    Подробнее
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium">
          Страница {currentPage} из {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}