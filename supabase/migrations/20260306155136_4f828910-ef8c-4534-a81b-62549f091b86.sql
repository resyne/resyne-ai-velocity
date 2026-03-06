
-- Projects table
CREATE TABLE public.erp_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  repository_url TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'on_hold', 'cancelled')),
  budget NUMERIC(12,2) DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Project expenses
CREATE TABLE public.erp_expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.erp_projects(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  description TEXT NOT NULL,
  amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  category TEXT DEFAULT 'general',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Project files metadata
CREATE TABLE public.erp_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.erp_projects(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT DEFAULT 0,
  mime_type TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.erp_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.erp_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.erp_files ENABLE ROW LEVEL SECURITY;

-- RLS policies - users can only access their own data
CREATE POLICY "Users manage own projects" ON public.erp_projects FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users manage own expenses" ON public.erp_expenses FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users manage own files" ON public.erp_files FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Storage bucket for project files
INSERT INTO storage.buckets (id, name, public) VALUES ('erp-files', 'erp-files', false);

-- Storage RLS: users can manage their own files
CREATE POLICY "Users upload own files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'erp-files' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Users view own files" ON storage.objects FOR SELECT USING (bucket_id = 'erp-files' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Users delete own files" ON storage.objects FOR DELETE USING (bucket_id = 'erp-files' AND (storage.foldername(name))[1] = auth.uid()::text);
