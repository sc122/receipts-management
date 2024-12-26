// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AppLayout from './components/layout/AppLayout';
import ReceiptsPage from './pages/ReceiptsPage/ReceiptsPage';
import './App.css';

// RTL cache configuration
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// Theme configuration
const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Assistant, Roboto, sans-serif',
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiButton: {
      defaultProps: {
        size: 'medium',
      },
    },
  },
});

// Temporary pages - will be moved to separate files later
const NewReceiptPage = () => <div>הוספת קבלה חדשה</div>;
const AnalyticsPage = () => <div>ניתוח נתונים</div>;
const SettingsPage = () => <div>הגדרות</div>;

function App() {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Router>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<ReceiptsPage />} />
                <Route path="receipts" element={<ReceiptsPage />} />
                <Route path="receipts/new" element={<NewReceiptPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
            </Routes>
          </Router>
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;