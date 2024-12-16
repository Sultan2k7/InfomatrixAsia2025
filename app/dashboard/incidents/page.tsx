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
  ArrowLeft,
} from 'lucide-react';
import ReportCard from '@/components/shared/report-card';
import { request } from 'http';

interface Report {
  map(arg0: () => any): React.ReactNode;
  id: number;
  vehicle_id: number;
  driver_id: number;
  job_id: number;
  type: string;
  time: string; // ISO string format
  location: string;
  media: string; // URL to image or video
  status: string;
}

interface ReportCardProps {
  map(arg0: (item: any, index: any) => any): Report;
  report: Report;
}

export default function InvoicesPage() {
  const router = useRouter();
  const [reports, setReports] = useState<Report[]| null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateData = async () => {
      try {
        await fetchReports();
      } catch (error) {
        console.error('Error updating data:', error);
      }
    };
    updateData();
    const interval = setInterval(updateData, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch(`/api/reports/1/`); 
      if (!response.ok) {
        throw new Error('Failed to fetch Reports');
      }
      const data: Report[] = await response.json(); 
      setReports(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Reports:', error);
      setLoading(false);
    }
  };
  
  const renderBack = () => (
    <div className="button-group">
      <Button onClick={() => router.back()} className="mb-8" variant="outline">
        <ArrowLeft className="mr-2 h-4 w-4" /> Назад
      </Button>
    </div>
  );
  if (loading) {
    return (
      <div>
        {renderBack()}
        Loading...
      </div>
    );
  }
  if (!reports) {
    return (
      <div>
        {renderBack()}
        No reports found
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {renderBack()}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {reports.map((reportik) => (
              <ReportCard key ={reportik.id} report={reportik}/>
           ))
           }
        </div>
      </div>
    </div>
  );
}
