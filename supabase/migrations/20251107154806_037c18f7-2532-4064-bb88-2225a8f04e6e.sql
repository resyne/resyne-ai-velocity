-- 1️⃣ Abilita le estensioni se non ci sono già
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- 2️⃣ Rimuovi un eventuale job precedente con lo stesso nome
SELECT cron.unschedule('keep-alive-daily')
WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'keep-alive-daily');

-- 3️⃣ Crea un nuovo cron job che chiama la function ogni 30 minuti
SELECT cron.schedule(
  'keep-alive-daily',
  '*/30 * * * *',  -- ogni 30 minuti
  $$
  SELECT
    net.http_post(
      url     := 'https://bbtsdtodfliitvnkiakf.supabase.co/functions/v1/keep-alive',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJidHNkdG9kZmxpaXR2bmtpYWtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2MTY1MzQsImV4cCI6MjA3NDE5MjUzNH0.1g6BhFxFtU-aB-GqlCdLdRcCkjH32RLLgZBKcDrMpzE"}'::jsonb,
      body    := '{"scheduled": true}'::jsonb
    ) AS request_id;
  $$
);