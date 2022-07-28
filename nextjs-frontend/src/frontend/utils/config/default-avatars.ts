import { frontendSupabase } from "../../services/supabase-frontend-service"

const avatarList = [
    {
        storage: "public-files",
        path: "default-avatars/1.png"
    },
    {
        storage: "public-files",
        path: "default-avatars/2.png"
    },
    {
        storage: "public-files",
        path: "default-avatars/3.png"
    },
    {
        storage: "public-files",
        path: "default-avatars/4.png"
    },
    {
        storage: "public-files",
        path: "default-avatars/5.png"
    },
    {
        storage: "public-files",
        path: "default-avatars/6.png"
    },
    {
        storage: "public-files",
        path: "default-avatars/7.png"
    },
    {
        storage: "public-files",
        path: "default-avatars/8.png"
    },
    {
        storage: "public-files",
        path: "default-avatars/9.png"
    },
    {
        storage: "public-files",
        path: "default-avatars/10.png"
    },
    {
        storage: "public-files",
        path: "default-avatars/11.png"
    },
    {
        storage: "public-files",
        path: "default-avatars/12.png"
    },
    {
        storage: "public-files",
        path: "default-avatars/13.png"
    },
    {
        storage: "public-files",
        path: "default-avatars/14.png"
    },
    {
        storage: "public-files",
        path: "default-avatars/15.png"
    },
    {
        storage: "public-files",
        path: "default-avatars/16.png"
    },
    {
        storage: "public-files",
        path: "default-avatars/17.png"
    },
    {
        storage: "public-files",
        path: "default-avatars/18.png"
    },
]

export const avatarListWithUrl = avatarList.map((i) => {
  const url = frontendSupabase.storage
    .from(i.storage)
    .getPublicUrl(i.path).publicURL;
  return { ...i, url };
});
