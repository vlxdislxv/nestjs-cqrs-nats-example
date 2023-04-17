# $1 - service name

yarn knex migrate:latest --knexfile apps/$1/knexfile.ts --env main