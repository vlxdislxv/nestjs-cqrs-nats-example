# $1 - service name

yarn knex migrate:down --knexfile apps/$1/knexfile.ts --env main
