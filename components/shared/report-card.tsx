import React from 'react';

interface Report {
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
  report: Report;
}

export default function ReportCard({ report }: ReportCardProps) {
  return (
    <div className="rounded-lg border shadow-md bg-white p-4 max-w-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Отчет: {report.type}
      </h2>
      <p className="text-sm text-gray-600 mb-1">
        <strong>ID ТС:</strong> {report.vehicle_id}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <strong>ID Водителя:</strong> {report.driver_id}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <strong>ID Задания:</strong> {report.job_id}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Статус:</strong> {report.status}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Местоположение:</strong> {report.location}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Время:</strong> {new Date(report.time).toLocaleString()}
      </p>
      {report.media && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-1">
            <strong>Медиа:</strong>
          </p>
          <img
            src={report.media}
            alt="Media related to the report"
            className="rounded-md shadow-sm max-w-full"
          />
        </div>
      )}
      <button
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        onClick={() => alert(`Подробнее об отчете ID: ${report.id}`)}
      >
        Подробнее
      </button>
    </div>
  );
}
