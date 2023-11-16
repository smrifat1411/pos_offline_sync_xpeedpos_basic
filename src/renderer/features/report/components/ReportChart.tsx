import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card } from '@mui/material';

type Props = {
  title?: string;
  labels?: any[];
  labelsData?: any[];
  chartLineTitle?: string;
  borderColor?: string;
  backgroundColor?: string;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ReportChart = ({ title, labels, labelsData, chartLineTitle, borderColor, backgroundColor }: Props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: chartLineTitle,
        data: labelsData,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
      },
    ],
  };

  return (
    <Card sx={{minWidth:"100%", m: 2}}>
      <Line options={options} data={data} className='max-h-60' />
    </Card>
  )
}

export default ReportChart;