# Docs
- [project plan](https://1drv.ms/x/s!AveM2ZCbaKGx-ijLGWNKtSFHqkKk?e=eihTcW)
- [feature wall](https://trello.com/b/BBFBafxc/features)
- [miro](https://miro.com/app/board/uXjVOdIgIrw=/)
- [business strategy](https://platform.strategyzer.com/projects/p/526f6e75-my-strategyzer-trial-8bce5dca-8a93-4027-be41-14d74ee08934/canvases/927119)


# Dev setup 
- [nodejs](https://nodejs.org/en/)
- [supabse](https://supabase.com/docs/guides/local-development)
- [docker](https://www.docker.com/get-started)


# Project structure
## db-migrations
This projects is used to create and apply migrations to the db. 
- it depends on the supabase local development
- commands
    - `yarn create-migration <migation name>  --sql-file` this will create a new migration. 
    - `yarn up` this will apply the up migrations
    - `yarn down` this will apply the down migrations

## .env.local file

```
NOOB_DATA_BASE_NAME='postgres'
NOOB_DATA_BASE_HOST=<get form supabase>
NOOB_DATA_BASE_PORT='5432'
NOOB_DATA_BASE_USER='postgres'
NOOB_DATA_BASE_PASSWORD=<supabase password>
NEXT_PUBLIC_NOOB_SUPABASE_URL=<supabase url>
NEXT_PUBLIC_NOOB_SUPABASE_ANON_KEY=<supabase url>
NEXT_PUBLIC_NOOB_BASE_APP_URL=<hosted app link>
NEXT_PUBLIC_NOOB_BASE_API_URL=<hosted app link>
NEXT_PUBLIC_NOOB_SUPABASE_PRIVATE_KEY=<supabase url>
CMS_API_ENDPOINT=<CMS API endpoint - NOT NEEDED FOR NOW.> 
CMS_API_TOKEN=<Auth token for cms apis - NOT NEEDED FOR NOW.>
CREDIT_SERVICE_PERCENTAGE=15
CREDIT_GST_PERCENTAGE=18
PRICE_PER_CREDIT=100
SHIPPING_SERVICE_PERCENTAGE=5
SANDBOX_SECRET=<Not in use>
SANDBOX_API_KEY=<Not in use>
NEXT_PUBLIC_VERIFY_CLIENT_CODE=<VERI5 CLIENT KEY>
NEXT_PUBLIC_VERIFY_AADHAAR_KYC_URL=https://prod.veri5digital.com/video-id-kyc
NEXT_PUBLIC_VERIFY_AADHAAR_API_KYC=<VERI5 AADHAR API KEY>
NEXT_PUBLIC_VERIFY_AADHAAR_SALT=<VERI5 AADHAR API SALT>
```

Note: Razer pay api key and secret key set in DB

## nextjs-frontend
This the nextjs frontend and apis 
- commands
    - `yarn run dev` runs the app at `http://localhost:3000`

## URLs
- [Vercel Environment](https://noobstorm.vercel.app/)
