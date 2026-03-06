-- Update erp_projects status options and add client_id reference
ALTER TABLE public.erp_projects ADD COLUMN IF NOT EXISTS client_id uuid;
ALTER TABLE public.erp_projects ADD COLUMN IF NOT EXISTS deadline date;
ALTER TABLE public.erp_projects ADD COLUMN IF NOT EXISTS priority text DEFAULT 'medium';

-- Clients table
CREATE TABLE IF NOT EXISTS public.erp_clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  email text DEFAULT '',
  phone text DEFAULT '',
  company text DEFAULT '',
  vat_number text DEFAULT '',
  address text DEFAULT '',
  notes text DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.erp_clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own clients" ON public.erp_clients FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Invoices table
CREATE TABLE IF NOT EXISTS public.erp_invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  project_id uuid REFERENCES public.erp_projects(id) ON DELETE SET NULL,
  client_id uuid REFERENCES public.erp_clients(id) ON DELETE SET NULL,
  invoice_number text NOT NULL,
  amount numeric NOT NULL DEFAULT 0,
  vat_rate numeric DEFAULT 22,
  status text NOT NULL DEFAULT 'draft',
  issue_date date NOT NULL DEFAULT CURRENT_DATE,
  due_date date,
  paid_date date,
  notes text DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.erp_invoices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own invoices" ON public.erp_invoices FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Deadlines / calendar events
CREATE TABLE IF NOT EXISTS public.erp_deadlines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  project_id uuid REFERENCES public.erp_projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text DEFAULT '',
  due_date date NOT NULL,
  completed boolean DEFAULT false,
  priority text DEFAULT 'medium',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.erp_deadlines ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own deadlines" ON public.erp_deadlines FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Add foreign key from projects to clients
ALTER TABLE public.erp_projects ADD CONSTRAINT erp_projects_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.erp_clients(id) ON DELETE SET NULL;