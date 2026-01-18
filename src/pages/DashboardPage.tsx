import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dashboard } from '../components/Dashboard/Dashboard';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Dashboard
      onViewContract={(contractId) => navigate(`/contracts/${contractId}`)}
      onCreateContract={() => navigate('/contracts/create')}
    />
  );
};
