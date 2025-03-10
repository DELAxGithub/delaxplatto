declare module '@fullcalendar/react' {
  import { FC } from 'react';
  import { CalendarOptions } from '@fullcalendar/core';

  interface FullCalendarProps extends CalendarOptions {}

  const FullCalendar: FC<FullCalendarProps>;
  export default FullCalendar;
}

declare module '@fullcalendar/daygrid' {
  const Plugin: any;
  export default Plugin;
}

declare module '@fullcalendar/core/locales/ja' {
  const locale: {
    code: string;
    buttonText: {
      prev: string;
      next: string;
      today: string;
      month: string;
      week: string;
      day: string;
      list: string;
    };
    weekText: string;
    allDayText: string;
    moreLinkText: (n: number) => string;
    noEventsText: string;
  };
  export default locale;
}
