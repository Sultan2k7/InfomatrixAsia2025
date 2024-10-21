import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function BarChart() {
  const data = {
    labels: ['Грузовой', 'Спецтехника', 'Корпоративный транспорт'],
    datasets: [
      {
        label: 'Категории',
        data: [4000, 2500, 3500],
        backgroundColor: ['#6366F1', '#FB923C', '#34D399'], // Indigo, Orange, Green
        borderColor: ['#6366F1', '#FB923C', '#34D399'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
}
