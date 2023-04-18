## Description

NestJS Monorepo: HTTP API gateway + NATS CQRS microservice.

## Installation

```bash
$ yarn # install dependencies.
$ yarn docker:start # install/start configured NATS + PG images.
$ yarn knex:migrate:latest:all # apply all unapplied knex migrations.
```

## Usage

```bash
$ yarn start:dev api # start api service.
$ yarn start:dev data-structure # start data-structure service.
```

http://localhost:3000/api - Swagger (Turned On by Default).

```bash
$ yarn test:watch # run tests.
```
