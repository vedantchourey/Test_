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

## nextjs-frontend
This the nextjs frontend and apis 
- commands
    - `yarn run dev` runs the app at `http://localhost:3000`

## URLs
- [Vercel Environment](https://noobstorm-dev.vercel.app/)
 