# $1 - service name
# $2 - migration name
# example 1: sh scripts/knex/migrate-make.sh data-structure schema
# example 2: yarn knex:migrate:make data-structure schema

yarn knex migrate:make $2 --knexfile apps/$1/knexfile.ts