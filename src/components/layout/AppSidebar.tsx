// src/components/layout/AppSidebar.tsx
import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import {
  Receipt as ReceiptIcon,
  Add as AddIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const AppSidebar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const menuItems = [
    { text: 'קבלות', icon: <ReceiptIcon />, path: '/receipts' },
    { text: 'הוספת קבלה', icon: <AddIcon />, path: '/receipts/new' },
    { text: 'ניתוח', icon: <AnalyticsIcon />, path: '/analytics' },
    { text: 'הגדרות', icon: <SettingsIcon />, path: '/settings' },
  ];

  const drawer = (
    <div>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default AppSidebar;