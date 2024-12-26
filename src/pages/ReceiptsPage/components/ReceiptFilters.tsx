// src/pages/ReceiptsPage/components/ReceiptFilters.tsx
import React from 'react';
import { 
  Box,
  TextField,
  MenuItem,
  IconButton,
  Collapse,
  Grid
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FilterList as FilterListIcon } from '@mui/icons-material';
import { useCategories } from '../../../hooks/useCategories';
import { useStores } from '../../../hooks/useStores';

interface ReceiptFiltersProps {
  filters: {
    startDate: Date | null;
    endDate: Date | null;
    category: string;
    store: string;
    minAmount: string;
    maxAmount: string;
  };
  onFiltersChange: (filters: ReceiptFiltersProps['filters']) => void;
}

export const ReceiptFilters: React.FC<ReceiptFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const { categories } = useCategories();
  const { stores } = useStores();

  const handleChange = (field: keyof typeof filters) => (
    event: React.ChangeEvent<HTMLInputElement> | null,
    value?: any
  ) => {
    const newValue = value ?? event?.target?.value;
    onFiltersChange({
      ...filters,
      [field]: newValue,
    });
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <IconButton 
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{ mr: 1 }}
        >
          <FilterListIcon />
        </IconButton>
      </Box>

      <Collapse in={isExpanded}>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6} md={3}>
            <DatePicker
              label="מתאריך"
              value={filters.startDate}
              onChange={handleChange('startDate')}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DatePicker
              label="עד תאריך"
              value={filters.endDate}
              onChange={handleChange('endDate')}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              fullWidth
              label="קטגוריה"
              value={filters.category}
              onChange={handleChange('category')}
            >
              <MenuItem value="">הכל</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              fullWidth
              label="חנות"
              value={filters.store}
              onChange={handleChange('store')}
            >
              <MenuItem value="">הכל</MenuItem>
              {stores.map((store) => (
                <MenuItem key={store.id} value={store.id}>
                  {store.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="סכום מינימלי"
              type="number"
              value={filters.minAmount}
              onChange={handleChange('minAmount')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="סכום מקסימלי"
              type="number"
              value={filters.maxAmount}
              onChange={handleChange('maxAmount')}
            />
          </Grid>
        </Grid>
      </Collapse>
    </Box>
  );
};