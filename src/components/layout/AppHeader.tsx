// src/components/layout/AppHeader.tsx
import React from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

interface AppHeaderProps {
  onMenuClick?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onMenuClick }) => {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - 240px)` },
        ml: { sm: `240px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          ניהול קבלות
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;