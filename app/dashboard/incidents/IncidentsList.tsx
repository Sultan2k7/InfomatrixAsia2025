import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface IncidentsListProps {
  reports: {
    id: number;
    location: string;
    vehicle_id: string;
    driver_id: string;
    type: string;
    time: string;
    status: string;
  }[];
}

export default function ReportsListPage({ reports }: IncidentsListProps) {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Reports List</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input className="flex-grow" placeholder="Search reports..." />
        <Select>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <CardTitle>{report.type}</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <dt className="font-medium">Location:</dt>
                  <dd>{report.location}</dd>
                </div>
                <div>
                  <dt className="font-medium">Vehicle ID:</dt>
                  <dd>{report.vehicle_id}</dd>
                </div>
                <div>
                  <dt className="font-medium">Driver ID:</dt>
                  <dd>{report.driver_id}</dd>
                </div>
                <div>
                  <dt className="font-medium">Time:</dt>
                  <dd>{report.time}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="font-medium">Status:</dt>
                  <dd
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      report.status
                    )}`}
                  >
                    {report.status}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'in progress':
      return 'bg-blue-100 text-blue-800';
    case 'resolved':
      return 'bg-green-100 text-green-800';
    case 'completed':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}
