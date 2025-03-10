import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import { Program } from '@/types/program';
import { Button } from '@/components/ui/button';
import CalendarCard from './CalendarCard';

interface CalendarProps {
  programs: Program[];
  onDateSelect?: (date: Date) => void;
}

export default function Calendar({ programs, onDateSelect }: CalendarProps) {
  const [displayedDate, setDisplayedDate] = useState(new Date());

  const events = programs.flatMap((program) => {
    const events = [];

    if (program.filming_date) {
      events.push({
        id: `filming-${program.id}`,
        title: program.title,
        start: program.filming_date,
        program,
        type: 'filming' as const,
        display: 'background',
        backgroundColor: 'rgb(59 130 246 / 0.1)',
      });
    }

    if (program.first_air_date) {
      events.push({
        id: `air-${program.id}`,
        title: program.title,
        start: program.first_air_date,
        program,
        type: 'air' as const,
        display: 'background',
        backgroundColor: 'rgb(34 197 94 / 0.1)',
      });
    }

    return events;
  });

  const handleEventClick = (info: any) => {
    const eventDate = new Date(info.event.start);
    onDateSelect?.(eventDate);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale={jaLocale}
        events={events}
        eventClick={handleEventClick}
        headerToolbar={{
          start: 'prev today next',
          center: 'title',
          end: '',
        }}
        customButtons={{
          today: {
            text: '今月',
            click: () => {
              setDisplayedDate(new Date());
            },
          },
        }}
        eventContent={(eventInfo) => {
          const event = eventInfo.event;
          const program = event.extendedProps.program as Program;
          const type = event.extendedProps.type as 'filming' | 'air';

          return (
            <CalendarCard program={program} type={type} />
          );
        }}
        height="auto"
        dayCellClassNames="hover:bg-accent/50 transition-colors"
      />
    </div>
  );
}
