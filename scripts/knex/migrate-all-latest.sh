# Run migrations for all services.

for i in $(find apps/*/knexfile.ts); do
  yarn knex migrate:latest --knexfile $i --env main
done