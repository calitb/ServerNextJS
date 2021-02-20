![Deployment](https://github.com/calitb/ServerNextJS/workflows/Deployment/badge.svg)
![Test-Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/calitb/dc36939fa3358ff1c7e10fe0f91cb874/raw/calitbdev-test-coverage.json)

# calitb.dev

Personal site.

## Github Integration

In order to connect to Github and fetch content, the following environment variables must be declared/exported:

```bash
API_GITHUB_PERSONAL_ACCESS_TOKEN=
```

Copy the `.env.local.example` file provided in the codebase and rename as `.env.local`. The file contains the key of the required Github variables. Fill in the values used for local development.

## Contentful Integration

In order to connect to Contentful and fetch content, the following environment variables must be declared/exported:

```bash
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
CONTENTFUL_ENVIRONMENT=
```

## Scripts

To start the development server with hot reloading on `http://localhost:3000`:

```bash
yarn dev
```

Other scripts:

- `yarn build` creates a production optimized build
- `yarn start` starts the production build on port `3000`

### Linter

```bash
yarn lint
```

### Unit Test

```bash
yarn test
```

### e2e

```bash
yarn build:start
yarn cy
```

## Github GraphQL Commands

To generate `TypeScript` interface definitions based on the GraphQL types. The the following command:

```bash
yarn run apollo client:codegen [OPTIONS] './github/types'
```

here are the `OPTIONS` that must be passed:

```bash
# Authorization
-header "Authorization: Bearer <token>"

# url of Contentful GraphQL endpoint
--endpoint=<url>

# defines the target language as TypeScript
--target=typescript

# place your gql query in that folder, and types will be generated automatically
--includes='./github/queries/**.ts'

# exclude the typeName attribute from generated interfaces
--no-addTypename

# location of global types found in the gql schema
--globalTypesFile=./github/types/globals.ts

# place all types in one folder
--outputFlat
```

So to generate the types, execute:

```bash
export GITHUB_AUTHORIZATION="Authorization: Bearer YOUR_GITHUB_PERSONAL_TOKEN"
yarn run apollo client:codegen --header $GITHUB_AUTHORIZATION --endpoint='https://api.github.com/graphql' --target=typescript  --includes='./github/queries/**.ts' --no-addTypename --globalTypesFile=./github/types/globals.ts --outputFlat  './github/types'
```

## Contentful GraphQL Commands

To generate the types, execute:

```bash
yarn run apollo client:codegen --endpoint='https://graphql.contentful.com/content/v1/spaces/axvknqtceyib/environments/master?access_token=8BgW12lJ3DTiD0h5Tq5qq4rL7bOKPFiZlXX3Noci5Bo' --target=typescript  --includes='./contentful/queries/**.ts' --no-addTypename --globalTypesFile=./contentful/types/globals.ts --outputFlat  './contentful/types'
```
