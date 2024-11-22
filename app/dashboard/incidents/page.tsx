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

interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  clientName: string;
  createdAt: string;
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await fetch('/api/invoices');
      if (!response.ok) {
        throw new Error('Failed to fetch invoices');
      }
      const data = await response.json();
      setInvoices(data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      invoice.clientName.toLowerCase().includes(search.toLowerCase()) ||
      invoice.status.toLowerCase().includes(search.toLowerCase())
  );

  const sortedInvoices = [...filteredInvoices].sort((a, b) => {
    if (sortBy === 'newest')
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === 'oldest')
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sortBy === 'amount') return b.amount - a.amount;
    if (sortBy === 'dueDate')
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    return 0;
  });

  const totalPages = Math.ceil(sortedInvoices.length / itemsPerPage);
  const paginatedInvoices = sortedInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadgeVariant = (status: Invoice['status']): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'paid':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'overdue':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Счета</h1>
        <Button onClick={() => router.push('/dashboard/invoices/create')}>
          <Plus className="mr-2 h-4 w-4" /> Создать счет
        </Button>
      </div>

      <div className="flex justify-between mb-4">
        <Input
          className="max-w-sm"
          placeholder="Поиск по номеру счета или клиенту"
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
            <SelectItem value="amount">По сумме</SelectItem>
            <SelectItem value="dueDate">По сроку оплаты</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Номер счета</TableHead>
            <TableHead>Клиент</TableHead>
            <TableHead>Сумма</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Срок оплаты</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedInvoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.invoiceNumber}</TableCell>
              <TableCell>{invoice.clientName}</TableCell>
              <TableCell>₽{invoice.amount.toLocaleString()}</TableCell>
              <TableCell>
                <Badge variant={getStatusBadgeVariant(invoice.status)}>
                  {invoice.status}
                </Badge>
              </TableCell>
              <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Link href={`/dashboard/invoices/${invoice.id}`} passHref>
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
}