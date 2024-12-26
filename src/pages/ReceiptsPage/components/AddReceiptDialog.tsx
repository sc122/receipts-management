// src/pages/ReceiptsPage/components/AddReceiptDialog.tsx
import React from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface AddReceiptDialogProps {
  open: boolean;
  onClose: () => void;
}

export const AddReceiptDialog: React.FC<AddReceiptDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        הוספת קבלה חדשה
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          {/* כאן יבוא טופס העלאת קבלה */}
          {/* יתווסף בהמשך */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ביטול</Button>
        <Button variant="contained" onClick={onClose}>
          שמירה
        </Button>
      </DialogActions>
    </Dialog>
  );
};