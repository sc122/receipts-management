// src/pages/ReceiptsPage/components/ReceiptList.tsx
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Paper,
  Skeleton
} from '@mui/material';
import { Receipt } from '../../../types/receipt';

interface ReceiptListProps {
  receipts: Receipt[];
  isLoading: boolean;
}

export const ReceiptList: React.FC<ReceiptListProps> = ({ receipts, isLoading }) => {
  if (isLoading) {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>תאריך</TableCell>
              <TableCell>חנות</TableCell>
              <TableCell>קטגוריה</TableCell>
              <TableCell align="right">סכום</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>תאריך</TableCell>
            <TableCell>חנות</TableCell>
            <TableCell>קטגוריה</TableCell>
            <TableCell align="right">סכום</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {receipts.map((receipt) => (
            <TableRow key={receipt.id}>
              <TableCell>{new Date(receipt.date).toLocaleDateString('he-IL')}</TableCell>
              <TableCell>{receipt.store}</TableCell>
              <TableCell>{receipt.category}</TableCell>
              <TableCell align="right">₪{receipt.total.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};