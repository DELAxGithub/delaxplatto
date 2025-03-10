import { getPrograms } from '@/services/programs';
import { Program } from '@/types/program';

interface KanbanLayoutProps {
  children: React.ReactNode;
}

async function getInitialData(): Promise<{ programs: Program[] }> {
  try {
    const programs = await getPrograms();
    return { programs };
  } catch (error) {
    console.error('Failed to fetch programs:', error);
    return { programs: [] };
  }
}

export default async function KanbanLayout({
  children,
}: KanbanLayoutProps) {
  const { programs } = await getInitialData();

  return (
    <>
      <script
        id="programs-data"
        type="application/json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ programs }),
        }}
      />
      {children}
    </>
  );
}

export const dynamic = 'force-dynamic';
