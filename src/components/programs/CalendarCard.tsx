import { Program } from '@/types/program';

interface CalendarCardProps {
  program: Program;
  type: 'filming' | 'air';
}

export default function CalendarCard({ program, type }: CalendarCardProps) {
  const colorMap = {
    filming: 'bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20',
    air: 'bg-green-500/10 border-green-500/20 hover:bg-green-500/20',
  };

  return (
    <div
      className={`rounded-md border p-2 text-sm transition-colors ${colorMap[type]}`}
    >
      <div className="font-medium line-clamp-1">{program.title}</div>
      <div className="text-xs text-muted-foreground space-y-1">
        <div>{program.program_id}</div>
        {program.cast1 && <div>出演: {program.cast1}</div>}
      </div>
    </div>
  );
}
