import { useDroppable } from '@dnd-kit/core';
import { Program, ProgramStatus } from '@/types/program';
import KanbanCard from './KanbanCard';

interface KanbanColumnProps {
  status: ProgramStatus;
  programs: Program[];
}

export default function KanbanColumn({ status, programs }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div className="flex-shrink-0 w-80">
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="font-medium mb-4 text-sm flex items-center justify-between">
          <span>{status}</span>
          <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded">
            {programs.length}
          </span>
        </div>
        <div
          ref={setNodeRef}
          className="space-y-3 min-h-[200px]"
        >
          {programs.map((program) => (
            <KanbanCard key={program.id} program={program} />
          ))}
        </div>
      </div>
    </div>
  );
}
