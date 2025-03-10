import { supabase } from '@/lib/supabase';
import type { CreateProgramInput, Program, UpdateProgramInput } from '@/types/program';

export async function getPrograms(): Promise<Program[]> {
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getProgramById(id: number): Promise<Program | null> {
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function getLatestProgramId(): Promise<number> {
  const { data, error } = await supabase
    .from('programs')
    .select('id')
    .order('id', { ascending: false })
    .limit(1)
    .single();

  if (error) throw error;
  return data?.id || 0;
}

export async function createProgram(program: CreateProgramInput): Promise<Program> {
  const { data, error } = await supabase
    .from('programs')
    .insert([program])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProgram(program: UpdateProgramInput): Promise<Program> {
  const { data, error } = await supabase
    .from('programs')
    .update(program)
    .eq('id', program.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProgram(id: number): Promise<void> {
  const { error } = await supabase
    .from('programs')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
