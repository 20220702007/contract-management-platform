import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ContractViewer } from '../components/ContractViewer/ContractViewer';

export const ContractDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Contract ID is required</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <ContractViewer
          contractId={id}
          onBack={() => navigate('/')}
        />
      </div>
    </div>
  );
};
