-- Create programs table
CREATE TABLE programs (
  id BIGSERIAL PRIMARY KEY,
  program_id TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  status TEXT NOT NULL,
  first_air_date DATE,
  filming_date DATE,
  complete_date DATE,
  re_air_date DATE,
  cast1 TEXT,
  cast2 TEXT,
  notes TEXT,
  script_url TEXT,
  pr_80text TEXT,
  pr_200text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create index for program_id
CREATE UNIQUE INDEX programs_program_id_idx ON programs(program_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_programs_updated_at
    BEFORE UPDATE
    ON programs
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Create RLS policies
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for authenticated users" ON programs
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Enable insert access for authenticated users" ON programs
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users" ON programs
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Enable delete access for authenticated users" ON programs
    FOR DELETE
    TO authenticated
    USING (true);
