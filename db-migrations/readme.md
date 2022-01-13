# First steps

we are using [db-migrate](https://db-migrate.readthedocs.io/en/latest/) to manage db migrations.

For creating a migration and running locally you will need to [run supabase locally](https://supabase.com/docs/guides/local-development).

# Commands
To create a new migration
```bash
yarn create-migration <migration name> --sql-file
```

To apply migrations to your supabase instance
```bash
 DB_USER='postgres' DB_PASSWORD=<Your db password> DB_HOST=<your db host> DB_DATABASE='postgres' yarn up -e cloud
```

To down migrate by one migration on your supabase instance
```bash
 DB_USER='postgres' DB_PASSWORD=<Your db password> DB_HOST=<your db host> DB_DATABASE='postgres' yarn down -e cloud
```

To run migrations locally 
```bash
yarn up
yarn down
```


