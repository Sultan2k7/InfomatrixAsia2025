'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

import ReportCard from '@/components/shared/report-card';
import { ArrowLeft } from 'lucide-react';
import IncidentsList from './IncidentsList';

interface Report {
  id: number;
  vehicle_id: string; // Add vehicle_id
  driver_id: string; // Add driver_id
  job_id: number;
  type: string;
  time: string;
  location: string;
  media: string;
  status: string;
}

export default function InvoicesPage() {
  const router = useRouter();
  const [reports, setReports] = useState<Report[] | null>(null);
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
      const response = await fetch('/api/reports/1/');
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
        No OBD check data found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {renderBack()}
        <IncidentsList reports={reports} />
      </div>
    </div>
  );
}
