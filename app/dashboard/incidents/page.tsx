'use client';

import React, { useState, useEffect } from 'react';
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

interface Incident {
  id: string;
  type: string;
  location: string;
  date: string;
  time: string;
  status: string;
  severity: string;
  reportedBy: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  className?: string;
}

const IncidentsPage: React.FC<Props> = ({ className }) => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const response = await fetch('/api/incidents');
      if (!response.ok) {
        throw new Error('Failed to fetch incidents');
      }
      const data = await response.json();
      setIncidents(data);
    } catch (error) {
      console.error('Error fetching incidents:', error);
    }
  };

  const filteredIncidents = incidents.filter(
    (incident) =>
      incident.type.toLowerCase().includes(search.toLowerCase()) ||
      incident.location.toLowerCase().includes(search.toLowerCase()) ||
      incident.status.toLowerCase().includes(search.toLowerCase()) ||
      incident.reportedBy.toLowerCase().includes(search.toLowerCase())
  );

  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    if (sortBy === 'newest')
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === 'oldest')
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sortBy === 'status') return a.status.localeCompare(b.status);
    return 0;
  });

  const totalPages = Math.ceil(sortedIncidents.length / itemsPerPage);
  const paginatedIncidents = sortedIncidents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={`p-6 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Дорожные инциденты</h1>
        <Button onClick={() => router.push('/dashboard/incidents/create')}>
          <Plus className="mr-2 h-4 w-4" /> Добавить инцидент
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
            <SelectItem value="status">Статус</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID инцидента</TableHead>
            <TableHead>Тип</TableHead>
            <TableHead>Местоположение</TableHead>
            <TableHead>Дата</TableHead>
            <TableHead>Время</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Серьезность</TableHead>
            <TableHead>Кем сообщено</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedIncidents.map((incident) => (
            <TableRow key={incident.id}>
              <TableCell>{incident.id}</TableCell>
              <TableCell>{incident.type}</TableCell>
              <TableCell>{incident.location}</TableCell>
              <TableCell>{incident.date}</TableCell>
              <TableCell>{incident.time}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    incident.status === 'active' ? 'default' : 'secondary'
                  }
                >
                  {incident.status}
                </Badge>
              </TableCell>
              <TableCell>{incident.severity}</TableCell>
              <TableCell>{incident.reportedBy}</TableCell>
              <TableCell>
                <Link href={`/dashboard/incidents/${incident.id}`} passHref>
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

export default IncidentsPage;
