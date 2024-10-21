'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useSWR from 'swr';
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
import { Skeleton } from '@/components/ui/skeleton';

interface Driver {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  licenseNumber: string;
  status: string;
  vehicleAssigned: string;
  createdAt: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const UsersPage = () => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();

  const {
    data: drivers,
    error,
    isLoading,
  } = useSWR<Driver[]>('/api/user', fetcher);

  if (error) {
    console.error('Error fetching drivers:', error);
  }

  const filteredDrivers =
    drivers?.filter(
      (driver) =>
        driver.name.toLowerCase().includes(search.toLowerCase()) ||
        driver.email.toLowerCase().includes(search.toLowerCase()) ||
        driver.phoneNumber.includes(search)
    ) || [];

  const sortedDrivers = [...filteredDrivers].sort((a, b) => {
    if (sortBy === 'newest')
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === 'oldest')
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const totalPages = Math.ceil(sortedDrivers.length / itemsPerPage);
  const paginatedDrivers = sortedDrivers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Водители</h1>
        <Button onClick={() => router.push('/dashboard/users/create')}>
          <Plus className="mr-2 h-4 w-4" /> Добавить водителя
        </Button>
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
            <SelectItem value="name">Имя</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Имя</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Номер телефона</TableHead>
            <TableHead>Номер лицензии</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Назначенное ТС</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array(5)
                .fill(0)
                .map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-4 w-[250px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[250px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[150px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[150px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[100px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[150px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-8 w-[100px]" />
                    </TableCell>
                  </TableRow>
                ))
            : paginatedDrivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell className="font-medium">{driver.name}</TableCell>
                  <TableCell>{driver.email}</TableCell>
                  <TableCell>{driver.phoneNumber}</TableCell>
                  <TableCell>{driver.licenseNumber}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        driver.status === 'active' ? 'default' : 'secondary'
                      }
                    >
                      {driver.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{driver.vehicleAssigned || '-'}</TableCell>
                  <TableCell>
                    <Link href={`/dashboard/users/${driver.id}`} passHref>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
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
};

export default UsersPage;
