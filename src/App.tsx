import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Dashboard from './pages/Dashboard';
import ReportDetails from './pages/ReportDetails';
import AddReport from './pages/AddReport';

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/reports/:id" element={<ReportDetails />} />
          <Route path="/reports/new" element={<AddReport />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
