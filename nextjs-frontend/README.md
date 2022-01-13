This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Use [Env files](https://nextjs.org/docs/basic-features/environment-variables) to pass variable to nextjs.

Create an env file `.env.local` in the root folder.
```
NOOB_DATA_BASE_NAME='postgres'
NOOB_DATA_BASE_HOST=<Your supabase db host>
NOOB_DATA_BASE_PORT='5432'
NOOB_DATA_BASE_USER='postgres'
NOOB_DATA_BASE_PASSWORD=<Your supabase db password>
NEXT_PUBLIC_NOOB_SUPABASE_URL=<Your supabase api url>
NEXT_PUBLIC_NOOB_SUPABASE_ANON_KEY=<Your supabase anonymous key>
NEXT_PUBLIC_NOOB_BASE_APP_URL='http://localhost:3000'
NEXT_PUBLIC_NOOB_BASE_API_URL='http://localhost:3000'
```


First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
