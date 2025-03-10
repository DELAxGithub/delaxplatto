import { useMemo } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Program, ProgramStatus, PROGRAM_STATUSES } from '@/types/program';
import KanbanColumn from './KanbanColumn';
import KanbanCard from './KanbanCard';
import { useState } from 'react';

interface KanbanBoardProps {
  programs: Program[];
  onStatusChange: (programId: number, newStatus: ProgramStatus) => Promise<void>;
}

export default function KanbanBoard({ programs, onStatusChange }: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const programsByStatus = useMemo(() => {
    return PROGRAM_STATUSES.reduce((acc, status) => {
      acc[status] = programs.filter((program) => program.status === status);
      return acc;
    }, {} as Record<ProgramStatus, Program[]>);
  }, [programs]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(Number(active.id));
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const newStatus = over.id as ProgramStatus;
    const programId = Number(active.id);
    const program = programs.find((p) => p.id === programId);

    if (program && program.status !== newStatus) {
      await onStatusChange(programId, newStatus);
    }

    setActiveId(null);
  };

  const activeProgram = activeId ? programs.find((p) => p.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {PROGRAM_STATUSES.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            programs={programsByStatus[status]}
          />
        ))}
      </div>

      <DragOverlay>
        {activeId && activeProgram ? (
          <div className="w-[300px]">
            <KanbanCard program={activeProgram} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
