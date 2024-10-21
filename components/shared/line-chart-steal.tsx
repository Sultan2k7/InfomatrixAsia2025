import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function LineChart() {
  // Simulated fuel usage data with a spike at 16:00
  const data = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`), // Every hour from 00:00 to 23:00
    datasets: [
      {
        label: 'Расход топлива (л/мин)',
        data: [
          0, 0, 0, 0, 0, 0, 0, 0, 10, 12, 15, 18, 20, 22, 23, 50, 123, null, null, null, null, null, null, null
        ], // Spike at 16:00
        borderColor: (context : any) => {
          const index = context.dataIndex;
          return index >= 15 ? '#FF0000' : '#6366F1'; // Red color for the last two points and spike
        },
        backgroundColor: '#6366F1',
        fill: false,
        pointBackgroundColor: (context : any) => {
          const index = context.dataIndex;
          return index >= 15 ? '#FF0000' : '#6366F1'; // Red color for the last two points
        },
        pointRadius: (context : any) => {
          const index = context.dataIndex;
          return index >= 15 ? 8 : 3; // Make the last two points larger
        },
        segment: {
          borderColor: (context : any) => {
            const { p1, p2 } = context;
            if (p1.index === 15 && p2.index === 16) {
              return '#FF0000'; // Red color for spike line segment
            }
            return '#6366F1';
          },
        },
      },
      {
        label: 'Средний расход топлива (л/мин)',
        data: Array(24).fill(15), // Horizontal line
        borderColor: '#FFB6C1', // Light pink color for average line
        backgroundColor: 'rgba(255, 182, 193, 0.2)', // Lighter fill for average
        borderDash: [4, 4], // Dotted line for average consumption
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 200, // Max to simulate 200L tank
      },
      x: {
        title: {
          display: true,
          text: 'Время суток',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem : any) {
            if (tooltipItem.dataIndex >= 15) {
              return `(!) Аномальный расход топлива: ${tooltipItem.raw} л/мин`; // Warning label
            }
            return `Расход топлива: ${tooltipItem.raw} л/мин`;
          },
        },
      },
      annotation: {
        annotations: [
          {
            type: 'label',
            xValue: '16:00',
            yValue: 150,
            backgroundColor: 'rgba(255,0,0,0.5)',
            content: ['(!)'], // Warning sign
            font: {
              size: 16,
            },
            borderRadius: 4,
            position: 'center',
          },
        ],
      },
    },
  };

  return <Line data={data} options={options} />;
}
