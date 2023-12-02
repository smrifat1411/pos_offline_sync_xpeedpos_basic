import { Card, CardContent, Typography } from '@mui/material';

interface Props {
  title: string;
  value: any;
}

export default function SummaryCard ({ title, value }:Props) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1">{value}</Typography>
      </CardContent>
    </Card>
  );
};
