import React from 'react';

interface MaintenanceItem {
  name: string; // Type of maintenance (e.g., oil change)
  currentKm: number; // Current kilometers since the last maintenance
  maxKm: number; // Recommended kilometers before maintenance
}

interface MaintenanceProgressProps {
  items: MaintenanceItem[]; // List of maintenance items
}

const MaintenanceProgress: React.FC<MaintenanceProgressProps> = ({ items }) => {
  // Function to calculate progress percentage
  const calculateProgress = (currentKm: number, maxKm: number) => {
    return Math.min((currentKm / maxKm) * 100, 100); // Cap at 100%
  };

  // Function to determine progress bar color based on progress percentage
  const getProgressBarColor = (progress: number) => {
    if (progress < 50) return 'bg-green-500'; // Safe zone
    if (progress < 80) return 'bg-yellow-500'; // Warning zone
    return 'bg-red-500'; // Critical zone
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const progress = calculateProgress(item.currentKm, item.maxKm);
        const progressBarColor = getProgressBarColor(progress);

        return (
          <div key={index} className="p-4 border rounded-lg shadow">
            <h3 className="text-sm font-medium mb-2">{item.name}</h3>
            <div className="relative w-full h-4 bg-gray-200 rounded">
              <div
                className={`absolute h-4 rounded ${progressBarColor}`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs mt-2">
              {item.currentKm} км из {item.maxKm} км
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default MaintenanceProgress;
