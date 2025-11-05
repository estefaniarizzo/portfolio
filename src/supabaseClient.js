import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bdpxwfadcjcclrshshjx.supabase.co'; // <- Tu URL de Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkcHh3ZmFkY2pjY2xyc2hzaGp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwODU3MTMsImV4cCI6MjA3NDY2MTcxM30.5f5JkfHTsDEAV_1Uc8TjpGQe7L1t_mBgAfAqw3FR0OA'; // <- Tu Anon Key de Supabase

export const supabase = createClient(supabaseUrl, supabaseAnonKey);