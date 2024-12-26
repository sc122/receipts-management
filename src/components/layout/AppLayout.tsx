// src/components/layout/AppLayout.tsx
import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';

const AppLayout: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <AppHeader />
        <AppSidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - 240px)` },
            marginTop: '64px', // להוסיף מרווח מתחת לכותרת העליונה
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default AppLayout;