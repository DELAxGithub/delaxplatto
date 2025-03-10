import { useDraggable } from '@dnd-kit/core';
import { Program } from '@/types/program';
import { formatDate } from '@/lib/utils';

interface KanbanCardProps {
  program: Program;
}

export default function KanbanCard({ program }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: program.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-background rounded-lg border p-3 shadow-sm transition-shadow hover:shadow-md cursor-grab ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <span className="text-xs text-muted-foreground">
            {program.program_id}
          </span>
        </div>
        <h3 className="font-medium leading-tight">{program.title}</h3>
        {program.subtitle && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {program.subtitle}
          </p>
        )}
        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
          {program.first_air_date && (
            <div>放送日: {formatDate(program.first_air_date)}</div>
          )}
          {program.filming_date && (
            <div>収録日: {formatDate(program.filming_date)}</div>
          )}
          {(program.cast1 || program.cast2) && (
            <div>
              出演: {[program.cast1, program.cast2].filter(Boolean).join(', ')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
