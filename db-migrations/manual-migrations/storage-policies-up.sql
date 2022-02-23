INSERT INTO storage.buckets (id, name) VALUES ('public-files', 'public-files') ON CONFLICT DO NOTHING;

DROP POLICY IF EXISTS "public_allow_select_to_all_on_public_files" ON storage.objects;
CREATE POLICY "public_allow_select_to_all_on_public_files" ON storage.objects FOR SELECT USING ( bucket_id = 'public-files');
