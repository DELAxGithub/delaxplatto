'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import KanbanBoard from '@/components/programs/KanbanBoard';
import { Program, ProgramStatus } from '@/types/program';
import { updateProgram } from '@/services/programs';

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

export default function KanbanPage() {
  const router = useRouter();
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    setPrograms(getInitialPrograms());
  }, []);

  const handleStatusChange = async (programId: number, newStatus: ProgramStatus) => {
    const program = programs.find((p) => p.id === programId);
    if (!program) return;

    try {
      const updatedProgram = await updateProgram({
        id: programId,
        status: newStatus,
      });

      setPrograms((prev) =>
        prev.map((p) => (p.id === updatedProgram.id ? updatedProgram : p))
      );
      
      router.refresh();
    } catch (error) {
      console.error('Failed to update program status:', error);
      alert('ステータスの更新に失敗しました。');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">カンバンボード</h1>
        <p className="text-muted-foreground">
          ドラッグ＆ドロップで番組のステータスを変更できます
        </p>
      </div>

      <div className="mt-6">
        <KanbanBoard
          programs={programs}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
}
