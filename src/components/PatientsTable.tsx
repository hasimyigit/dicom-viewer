
import { Patient } from '../types';
import { ScanEye } from 'lucide-react';
import Table from './common/Table';

type TableProps = {
    data: Patient[];
    onSelect?: (row: Patient) => void;
    handleViwer:(row:Patient) => void
  };

const PatientsTable = ({ data, handleViwer, onSelect }: TableProps) => {
    const columns = [
        {
          header: "Hasta ID",
          accessor: (row: Patient) => row.id,
        },
        {
          header: "Hasta Adı",
          accessor: (row: Patient) => row.name,
        },
        {
          header: "Tetkik Türü",
          accessor: (row: Patient) => row.examinationType,
        },
        {
          header: "Tetkik Tarihi",
          accessor: (row: Patient) => row.examinationDate,
        },
        {
          header: "Görüntü",
          accessor: (row: Patient) => (
            <button
              className="text-white bg-gray-800 hover:bg-gray-900"
              onClick={(e) => {
                e.stopPropagation();
                handleViwer(row);
              }}
            >
              <ScanEye />
            </button>
          ),
        },
      ];
  return (
    <Table data={data} columns={columns} onSelect={onSelect} />
  )
}

export default PatientsTable