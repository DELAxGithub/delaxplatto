import { useState } from 'react';
import { Program } from '@/types/program';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ProgramTableProps {
  programs: Program[];
  onEdit: (program: Program) => void;
  onDelete: (program: Program) => void;
}

export default function ProgramTable({ programs, onEdit, onDelete }: ProgramTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Program;
    direction: 'asc' | 'desc';
  }>({
    key: 'created_at',
    direction: 'desc',
  });

  const sortedPrograms = [...programs].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    // Handle null values in sorting
    if (aValue === null && bValue === null) return 0;
    if (aValue === null) return sortConfig.direction === 'asc' ? 1 : -1;
    if (bValue === null) return sortConfig.direction === 'asc' ? -1 : 1;

    // Compare non-null values
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: keyof Program) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="p-2 text-left">番組ID</th>
            <th className="p-2 text-left">
              <button
                onClick={() => handleSort('title')}
                className="font-semibold hover:text-primary"
              >
                タイトル
              </button>
            </th>
            <th className="p-2 text-left">
              <button
                onClick={() => handleSort('status')}
                className="font-semibold hover:text-primary"
              >
                ステータス
              </button>
            </th>
            <th className="p-2 text-left">
              <button
                onClick={() => handleSort('first_air_date')}
                className="font-semibold hover:text-primary"
              >
                放送日
              </button>
            </th>
            <th className="p-2 text-left">
              <button
                onClick={() => handleSort('filming_date')}
                className="font-semibold hover:text-primary"
              >
                収録日
              </button>
            </th>
            <th className="p-2 text-left">出演者</th>
            <th className="p-2 text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          {sortedPrograms.map((program) => (
            <tr
              key={program.id}
              className="border-b transition-colors hover:bg-muted/50"
            >
              <td className="p-2">{program.program_id}</td>
              <td className="p-2">{program.title}</td>
              <td className="p-2">{program.status}</td>
              <td className="p-2">{formatDate(program.first_air_date)}</td>
              <td className="p-2">{formatDate(program.filming_date)}</td>
              <td className="p-2">
                {[program.cast1, program.cast2].filter(Boolean).join(', ')}
              </td>
              <td className="p-2 text-center">
                <div className="flex justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(program)}
                  >
                    編集
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(program)}
                  >
                    削除
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
