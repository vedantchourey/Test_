create policy allow_select_for_authenticated_user_to_avatar_folder
    on storage.objects for select
    using ((bucket_id = 'resources'::text) AND ((storage.foldername(name))[1] = 'avatars'::text) AND (role() = 'authenticated'::text));

create policy allow_insert_for_authenticated_user_to_avatar_folder
    on storage.objects for insert
    with check ((bucket_id = 'resources'::text) AND ((storage.foldername(name))[1] = 'avatars'::text) AND (role() = 'authenticated'::text));

create policy allow_update_for_authenticated_user_to_avatar_folder
    on storage.objects for update
    using ((bucket_id = 'resources'::text) AND ((storage.foldername(name))[1] = 'avatars'::text) AND (role() = 'authenticated'::text));

create policy allow_access_for_authenticated_user_for_posts_folder
    on storage.objects for select 
    using ((bucket_id = 'resources'::text) AND ((storage.foldername(name))[1] = 'posts'::text) AND (role() = 'authenticated'::text));

create policy allow_insert_for_authenticated_user_to_posts_folder
    on storage.objects for insert
    with check ((bucket_id = 'resources'::text) AND ((storage.foldername(name))[1] = 'posts'::text) AND (role() = 'authenticated'::text));

create policy allow_update_for_authenticated_user_to_posts_folder
    on storage.objects for update
    using ((bucket_id = 'resources'::text) AND ((storage.foldername(name))[1] = 'posts'::text) AND (role() = 'authenticated'::text));