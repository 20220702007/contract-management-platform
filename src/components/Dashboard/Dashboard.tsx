import React, { useState, useMemo } from 'react';
import { StatusFilter as StatusFilterType } from '../../types';
import { StatusFilter } from './StatusFilter';
import { ContractTable } from './ContractTable';
import { useContractsStore } from '../../store/contractsStore';
import { Button } from '../common/Button';
import { STATUS_GROUPS } from '../../constants/lifecycle';

interface DashboardProps {
  onViewContract: (contractId: string) => void;
  onCreateContract: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onViewContract,
  onCreateContract,
}) => {
  const contracts = useContractsStore((state) => state.contracts);
  const [filters, setFilters] = useState<StatusFilterType>({
    active: false,
    pending: false,
    signed: false,
  });

  const stats = useMemo(() => {
    const total = contracts.length;
    const active = contracts.filter(c => STATUS_GROUPS.active.includes(c.status)).length;
    const pending = contracts.filter(c => STATUS_GROUPS.pending.includes(c.status)).length;
    const signed = contracts.filter(c => STATUS_GROUPS.signed.includes(c.status)).length;
    
    return { total, active, pending, signed };
  }, [contracts]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Contract Dashboard</h1>
          <p className="text-gray-600">Manage and track all your contracts in one place</p>
        </div>
        <Button variant="primary" onClick={onCreateContract} className="shadow-lg hover:shadow-xl transition-all">
          <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Contract
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-professional shadow-professional-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">Total Contracts</p>
              <p className="text-3xl font-bold">{stats.total}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-professional shadow-professional-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium mb-1">Active</p>
              <p className="text-3xl font-bold">{stats.active}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl p-6 text-white shadow-professional shadow-professional-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium mb-1">Pending</p>
              <p className="text-3xl font-bold">{stats.pending}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-professional shadow-professional-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium mb-1">Signed</p>
              <p className="text-3xl font-bold">{stats.signed}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-professional border border-gray-100">
        <StatusFilter filters={filters} onChange={setFilters} />
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-professional border border-gray-100">
        <ContractTable
          contracts={contracts}
          filters={filters}
          onViewContract={onViewContract}
        />
      </div>
    </div>
  );
};
