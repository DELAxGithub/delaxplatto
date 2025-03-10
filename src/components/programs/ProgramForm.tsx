import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Program, ProgramStatus, PROGRAM_STATUSES, ProgramInput } from '@/types/program';

const STATUS_ENUM = z.enum(PROGRAM_STATUSES as [ProgramStatus, ...ProgramStatus[]]);

const programSchema = z.object({
  program_id: z.string().min(1, '番組IDは必須です'),
  title: z.string().min(1, 'タイトルは必須です'),
  subtitle: z.string().nullable(),
  status: STATUS_ENUM,
  first_air_date: z.string().nullable(),
  filming_date: z.string().nullable(),
  complete_date: z.string().nullable(),
  re_air_date: z.string().nullable(),
  cast1: z.string().nullable(),
  cast2: z.string().nullable(),
  notes: z.string().nullable(),
  script_url: z.string().nullable(),
  pr_80text: z.string().nullable(),
  pr_200text: z.string().nullable(),
});

type FormData = z.infer<typeof programSchema>;

interface ProgramFormProps {
  program?: Program;
  onSubmit: (data: ProgramInput) => void;
  onCancel: () => void;
}

export default function ProgramForm({ program, onSubmit, onCancel }: ProgramFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(programSchema),
    defaultValues: {
      program_id: '',
      title: '',
      subtitle: null,
      status: 'キャスティング中' as ProgramStatus,
      first_air_date: null,
      filming_date: null,
      complete_date: null,
      re_air_date: null,
      cast1: null,
      cast2: null,
      notes: null,
      script_url: null,
      pr_80text: null,
      pr_200text: null,
    },
  });

  useEffect(() => {
    if (program) {
      reset({
        program_id: program.program_id,
        title: program.title,
        subtitle: program.subtitle,
        status: program.status,
        first_air_date: program.first_air_date,
        filming_date: program.filming_date,
        complete_date: program.complete_date,
        re_air_date: program.re_air_date,
        cast1: program.cast1,
        cast2: program.cast2,
        notes: program.notes,
        script_url: program.script_url,
        pr_80text: program.pr_80text,
        pr_200text: program.pr_200text,
      });
    }
  }, [program, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">番組ID</label>
          <Input {...register('program_id')} />
          {errors.program_id && (
            <p className="text-sm text-destructive">
              {errors.program_id.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">タイトル</label>
          <Input {...register('title')} />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">サブタイトル</label>
          <Input {...register('subtitle')} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">ステータス</label>
          <select
            {...register('status')}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {PROGRAM_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">放送日</label>
          <Input type="date" {...register('first_air_date')} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">収録日</label>
          <Input type="date" {...register('filming_date')} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">出演者1</label>
          <Input {...register('cast1')} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">出演者2</label>
          <Input {...register('cast2')} />
        </div>

        <div className="col-span-2 space-y-2">
          <label className="text-sm font-medium">備考</label>
          <textarea
            {...register('notes')}
            rows={3}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          キャンセル
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {program ? '更新' : '作成'}
        </Button>
      </div>
    </form>
  );
}
