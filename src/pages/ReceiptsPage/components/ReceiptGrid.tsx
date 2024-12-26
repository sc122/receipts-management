// src/pages/ReceiptsPage/components/ReceiptGrid.tsx
import React from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Skeleton,
  Box
} from '@mui/material';
import { Receipt } from '../../../types/receipt';

interface ReceiptGridProps {
  receipts: Receipt[];
  isLoading: boolean;
}

export const ReceiptGrid: React.FC<ReceiptGridProps> = ({ receipts, isLoading }) => {
  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {[...Array(6)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Skeleton height={24} width="60%" />
                <Skeleton height={20} width="40%" />
                <Skeleton height={20} width="80%" />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      {receipts.map((receipt) => (
        <Grid item xs={12} sm={6} md={4} key={receipt.id}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {receipt.store}
              </Typography>
              <Typography color="textSecondary">
                {new Date(receipt.date).toLocaleDateString('he-IL')}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Typography variant="body2">
                  {receipt.category}
                </Typography>
                <Typography variant="h6">
                  ₪{receipt.total.toFixed(2)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};