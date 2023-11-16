import { faBangladeshiTakaSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

type Props = {
    title?: string;
    revenue?: string;
    totalOrders?: string | number;
}

const ReportCard = ({
    title,
    revenue,
    totalOrders,
}: Props) => {
  return (
    <Card sx={{ minWidth: '100%', backgroundColor: '#fffd8d' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div" className='flex items-center'>
           <FontAwesomeIcon icon={faBangladeshiTakaSign} className='w-5 h-5 inline-block' /> {(parseFloat(revenue)).toFixed(2)}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {totalOrders} Orders
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ReportCard;