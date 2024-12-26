// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import AppLayout from './components/layout/AppLayout';
import './App.css';

// יצירת תמיכה ב-RTL
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// הגדרת ערכת נושא
const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Assistant, Roboto, sans-serif',
  },
});

// דפים זמניים
const ReceiptsPage = () => <div>דף קבלות</div>;
const NewReceiptPage = () => <div>הוספת קבלה חדשה</div>;
const AnalyticsPage = () => <div>ניתוח נתונים</div>;
const SettingsPage = () => <div>הגדרות</div>;

function App() {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;