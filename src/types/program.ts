export type ProgramStatus =
  | 'キャスティング中'
  | '日程調整中'
  | 'ロケハン前'
  | '収録準備中'
  | '編集中'
  | '試写中'
  | 'PR納品済み'
  | 'MA中'
  | '完パケ納品';

export interface Program {
  id: number;
  program_id: string;
  title: string;
  subtitle: string | null;
  status: ProgramStatus;
  first_air_date: string | null;
  filming_date: string | null;
  complete_date: string | null;
  re_air_date: string | null;
  cast1: string | null;
  cast2: string | null;
  notes: string | null;
  script_url: string | null;
  pr_80text: string | null;
  pr_200text: string | null;
  created_at: string;
  updated_at: string;
}

export type ProgramInput = {
  program_id: string;
  title: string;
  subtitle?: string | null;
  status: ProgramStatus;
  first_air_date?: string | null;
  filming_date?: string | null;
  complete_date?: string | null;
  re_air_date?: string | null;
  cast1?: string | null;
  cast2?: string | null;
  notes?: string | null;
  script_url?: string | null;
  pr_80text?: string | null;
  pr_200text?: string | null;
};

export type CreateProgramInput = ProgramInput;
export type UpdateProgramInput = Partial<ProgramInput> & { id: number };

export const PROGRAM_STATUSES: readonly ProgramStatus[] = [
  'キャスティング中',
  '日程調整中',
  'ロケハン前',
  '収録準備中',
  '編集中',
  '試写中',
  'PR納品済み',
  'MA中',
  '完パケ納品',
] as const;
