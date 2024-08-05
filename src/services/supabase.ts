import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://winxgwbznakeweruqxyd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indpbnhnd2J6bmFrZXdlcnVxeHlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3NDQxNjAsImV4cCI6MjAyOTMyMDE2MH0.DifHRS0YwZB3gs2MToQPp4l-mk4ev3ymoIdGMRqEqo4';

const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;

