'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ProgramTable from '@/components/programs/ProgramTable';
import ProgramForm from '@/components/programs/ProgramForm';
import { Program, ProgramInput } from '@/types/program';
import { getLatestProgramId, createProgram, updateProgram, deleteProgram } from '@/services/programs';
import { generateProgramId } from '@/lib/utils';

function getInitialPrograms(): Program[] {
  if (typeof window === 'undefined') return [];
  
  const scriptElement = document.getElementById('programs-data');
  if (!scriptElement) return [];

  try {
    const data = JSON.parse(scriptElement.textContent || '{}');
    return data.programs || [];
  } catch (error) {
    console.error('Failed to parse initial programs data:', error);
    return [];
  }
}

export default function ProgramsPage() {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | undefined>();
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    setPrograms(getInitialPrograms());
  }, []);

  const handleCreate = async (data: ProgramInput) => {
    try {
      const latestId = await getLatestProgramId();
      const program_id = generateProgramId(latestId);
      const newProgram = await createProgram({ ...data, program_id });
      setPrograms((prev) => [newProgram, ...prev]);
      setIsFormOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Failed to create program:', error);
      alert('番組の作成に失敗しました。');
    }
  };

  const handleUpdate = async (data: ProgramInput) => {
    if (!selectedProgram) return;

    try {
      const updatedProgram = await updateProgram({
        id: selectedProgram.id,
        ...data,
      });
      setPrograms((prev) =>
        prev.map((p) => (p.id === updatedProgram.id ? updatedProgram : p))
      );
      setSelectedProgram(undefined);
      setIsFormOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Failed to update program:', error);
      alert('番組の更新に失敗しました。');
    }
  };

  const handleDelete = async (program: Program) => {
    if (!confirm('この番組を削除してもよろしいですか？')) return;

    try {
      await deleteProgram(program.id);
      setPrograms((prev) => prev.filter((p) => p.id !== program.id));
      router.refresh();
    } catch (error) {
      console.error('Failed to delete program:', error);
      alert('番組の削除に失敗しました。');
    }
  };

  const handleCloseDialog = () => {
    setIsFormOpen(false);
    setSelectedProgram(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">番組一覧</h1>
        <Button onClick={() => setIsFormOpen(true)}>新規番組</Button>
      </div>

      <ProgramTable
        programs={programs}
        onEdit={(program) => {
          setSelectedProgram(program);
          setIsFormOpen(true);
        }}
        onDelete={handleDelete}
      />

      <Dialog open={isFormOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedProgram ? '番組を編集' : '新規番組'}
            </DialogTitle>
          </DialogHeader>
          <ProgramForm
            program={selectedProgram}
            onSubmit={selectedProgram ? handleUpdate : handleCreate}
            onCancel={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
