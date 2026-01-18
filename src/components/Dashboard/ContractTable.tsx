import React from 'react';
import { Contract } from '../../types';
import { Table } from '../common/Table';
import { StatusBadge } from '../common/StatusBadge';
import { formatDate } from '../../utils/dateHelpers';
import { ContractActions } from './ContractActions';
import { STATUS_GROUPS } from '../../constants/lifecycle';

interface ContractTableProps {
  contracts: Contract[];
  filters: {
    active: boolean;
    pending: boolean;
    signed: boolean;
  };
  onViewContract: (contractId: string) => void;
}

export const ContractTable: React.FC<ContractTableProps> = ({
  contracts,
  filters,
  onViewContract,
}) => {
  const filteredContracts = contracts.filter((contract) => {
    if (!filters.active && !filters.pending && !filters.signed) {
      return true;
    }

    const isActive = STATUS_GROUPS.active.includes(contract.status);
    const isPending = STATUS_GROUPS.pending.includes(contract.status);
    const isSigned = STATUS_GROUPS.signed.includes(contract.status);

    return (
      (filters.active && isActive) ||
      (filters.pending && isPending) ||
      (filters.signed && isSigned)
    );
  });

  const columns = [
    {
      key: 'name',
      header: 'Contract Name',
      render: (contract: Contract) => (
        <span className="font-medium">{contract.name}</span>
      ),
    },
    {
      key: 'party',
      header: 'Party',
      render: (contract: Contract) => (
        <span>{contract.party || <span className="text-gray-400">—</span>}</span>
      ),
    },
    {
      key: 'blueprintName',
      header: 'Blueprint Name',
    },
    {
      key: 'startingDate',
      header: 'Starting Date',
      render: (contract: Contract) => (
        <span>{contract.startingDate ? formatDate(contract.startingDate) : <span className="text-gray-400">—</span>}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (contract: Contract) => <StatusBadge status={contract.status} />,
    },
    {
      key: 'createdAt',
      header: 'Created Date',
      render: (contract: Contract) => formatDate(contract.createdAt),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (contract: Contract) => (
        <ContractActions
          contract={contract}
          onView={() => onViewContract(contract.id)}
        />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={filteredContracts}
      emptyMessage="No contracts found. Create a contract to get started."
    />
  );
};
