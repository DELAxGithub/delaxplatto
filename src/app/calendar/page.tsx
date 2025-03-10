'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Calendar from '@/components/programs/Calendar';
import ProgramForm from '@/components/programs/ProgramForm';
import { Program, ProgramInput } from '@/types/program';
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

export default function CalendarPage() {
  const router = useRouter();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<Program | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    setPrograms(getInitialPrograms());
  }, []);

  const handleDateSelect = (date: Date) => {
    // 選択された日付の番組を探す
    const programsOnDate = programs.filter(
      (program) =>
        program.first_air_date === date.toISOString().split('T')[0] ||
        program.filming_date === date.toISOString().split('T')[0]
    );

    if (programsOnDate.length === 1) {
      setSelectedProgram(programsOnDate[0]);
      setIsFormOpen(true);
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">カレンダー</h1>
        <p className="text-muted-foreground">
          放送日は緑色、収録日は青色で表示されます
        </p>
      </div>

      <div className="bg-background rounded-lg border p-4">
        <Calendar programs={programs} onDateSelect={handleDateSelect} />
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>番組を編集</DialogTitle>
          </DialogHeader>
          {selectedProgram && (
            <ProgramForm
              program={selectedProgram}
              onSubmit={handleUpdate}
              onCancel={() => {
                setIsFormOpen(false);
                setSelectedProgram(undefined);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
