import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart() {
  const data = {
    labels: ['Топливо', 'Обслуживание', 'Другие'],
    datasets: [
      {
        label: 'Расходы',
        data: [80, 15, 5], // Percentage for each category
        backgroundColor: ['#6366F1', '#34D399', '#FB923C'], // Indigo, Green, Orange
        borderColor: ['#6366F1', '#34D399', '#FB923C'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  // @ts-ignore
  return <Doughnut data={data} options={options} />;
}
