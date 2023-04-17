# $1 - service name

yarn knex migrate:up --knexfile apps/$1/knexfile.ts --env main