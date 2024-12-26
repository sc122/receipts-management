// src/pages/ReceiptsPage/ReceiptsPage.tsx
import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  IconButton, 
  TextField, 
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Typography
} from '@mui/material';
import { 
  Search as SearchIcon,
  GridView as GridViewIcon,
  ViewList as ViewListIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { ReceiptList } from './components/ReceiptList';
import { ReceiptGrid } from './components/ReceiptGrid';
import { AddReceiptDialog } from './components/AddReceiptDialog';
import { ReceiptFilters } from './components/ReceiptFilters';
import { useReceipts } from '../../hooks/useReceipts';
import { Receipt } from '../../types/receipt';

export const ReceiptsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    category: '',
    store: '',
    minAmount: '',
    maxAmount: ''
  });

  const { receipts, isLoading, error } = useReceipts(filters, searchQuery);

  const handleViewModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: 'list' | 'grid',
  ) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleAddReceipt = () => {
    setIsAddDialogOpen(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          קבלות
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddReceipt}
        >
          הוסף קבלה
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="חיפוש קבלות..."
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewModeChange}
          >
            <ToggleButton value="list" aria-label="list view">
              <ViewListIcon />
            </ToggleButton>
            <ToggleButton value="grid" aria-label="grid view">
              <GridViewIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <ReceiptFilters 
          filters={filters} 
          onFiltersChange={handleFiltersChange} 
        />
      </Paper>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          שגיאה בטעינת הקבלות: {error.message}
        </Typography>
      )}

      {viewMode === 'list' ? (
        <ReceiptList receipts={receipts} isLoading={isLoading} />
      ) : (
        <ReceiptGrid receipts={receipts} isLoading={isLoading} />
      )}

      <AddReceiptDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />
    </Box>
  );
};

export default ReceiptsPage;