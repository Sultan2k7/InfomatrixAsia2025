'use client';

import React, { useState, useEffect } from 'react';

interface Counter {
  id: string;
  title: string;
  description: string | null;
  currentDistance: number;
  needDistance: number;
}

interface MaintenanceProgressProps {
  vehicleId: string;
}

const MaintenanceProgress: React.FC<MaintenanceProgressProps> = ({ vehicleId }) => {
  const [counters, setCounters] = useState<Counter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounters = async () => {
      try {
        const response = await fetch(`/api/counters?vehicleId=${vehicleId}`);
        if (!response.ok) throw new Error('Failed to fetch counters');
        const data = await response.json();
        setCounters(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching counters:', error);
        setLoading(false);
      }
    };

    fetchCounters();
  }, [vehicleId]);

  // Function to calculate progress percentage
  const calculateProgress = (currentDistance: number, needDistance: number) => {
    return Math.min((currentDistance / needDistance) * 100, 100); // Cap at 100%
  };

  // Function to determine progress bar color based on progress percentage
  const getProgressBarColor = (progress: number) => {
    if (progress < 50) return 'bg-green-500'; // Safe zone
    if (progress < 80) return 'bg-yellow-500'; // Warning zone
    return 'bg-red-500'; // Critical zone
  };

  if (loading) {
    return <div>Loading maintenance data...</div>;
  }

  if (counters.length === 0) {
    return <div>No maintenance items found</div>;
  }

  return (
    <div className="space-y-4">
      {counters.map((counter) => {
        const progress = calculateProgress(counter.currentDistance, counter.needDistance);
        const progressBarColor = getProgressBarColor(progress);

        return (
          <div key={counter.id} className="p-4 border rounded-lg shadow">
            <h3 className="text-sm font-medium mb-2">{counter.title}</h3>
            {counter.description && (
              <p className="text-xs text-gray-500 mb-2">{counter.description}</p>
            )}
            <div className="relative w-full h-4 bg-gray-200 rounded">
              <div
                className={`absolute h-4 rounded ${progressBarColor}`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs mt-2">
              {counter.currentDistance} км из {counter.needDistance} км
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default MaintenanceProgress;
