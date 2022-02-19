INSERT INTO storage.buckets (id, name) VALUES ('public', 'public') ON CONFLICT DO NOTHING;

DROP POLICY IF EXISTS "public_allow_select_to_all" ON storage.objects;
CREATE POLICY "public_allow_select_to_all" ON storage.objects FOR SELECT USING ( bucket_id = 'public');
