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
--header "Authorization: Bearer <token>"

# url of Contentful GraphQL endpoint
--endpoint=<url>

# defines the target language as TypeScript
--target=typescript

# place your gql query in that folder, and types will be generated automatically
--includes='./github/queries/**.ts'

# exclude the typeName attribute from generated interfaces
--no-addTypename

# location of global types found in the gql schema
--globalTypesFile=./github/types/globals.d.ts

# place all types in one folder
--outputFlat
```

So to generate the types, execute:

```bash
export GITHUB_AUTHORIZATION="Authorization: Bearer YOUR_GITHUB_PERSONAL_TOKEN"
yarn run apollo client:codegen --header $GITHUB_AUTHORIZATION --endpoint='https://api.github.com/graphql' --target=typescript  --includes='./github/queries/**.ts' --no-addTypename --globalTypesFile=./github/types/globals.d.ts --outputFlat  './github/types'
```

## Contentful GraphQL Commands

To generate the types, execute:

```bash
yarn run apollo client:codegen --endpoint='https://graphql.contentful.com/content/v1/spaces/YOUR_SPACE_ID/environments/YOUR_ENVIRONMENT?access_token=YOUR_TOKEN' --target=typescript  --includes='./contentful/queries/**.ts' --no-addTypename --globalTypesFile=./contentful/types/globals.d.ts --outputFlat  './contentful/types'
```

### Contentful Migrations and Environment Setup

In order to run predictable and repeatable e2e UI tests, we must have an environment with predetermined seed data.

Every content model that is created in a production environment **must have** a code-first counterpart.

Content types are created using contentful management API, script that are placed in `./contentful/migrations` and each new migration file **must be added into the `setup.sh` file**

Seed data files are place in `./contentful/seed` and must also be individually referenced inside `setup.sh`

There is no strict convention for naming the files, but generally they should map to individual page.

To fully initialize a contentful environment, simply run the following from the root of the source code directory:

```bash
./contentful/environment/setup.sh
```

The following three environment variables must be **exported**:

```bash
export CONTENTFUL_SPACE_ID=<target space id>
export CONTENTFUL_TARGET_ENVIRONMENT=e2e
export MANAGEMENT_ACCESS_TOKEN=<management api token>
```

## Raspberry Setup

Chromium is needed for some of the APIs

```
sudo apt install chromium-browser chromium-codecs-ffmpeg
```

### Continuous Deployment

The file `./update_fe.sh` is required in the deployment machine as specified in the `./github/workflows/deployment.yml` file

```
echo "Started"

echo "Starting downloading image"
docker pull ghcr.io/calitb/site:latest
echo "Finished downloading image"

echo "Starting deleting old images"
docker image prune -f
echo "Finished deleting old images"

echo "Stopping container"
docker stop calitb_fe

echo "Removing container"
docker rm calitb_fe

echo "Launching container"
docker-compose up -d

echo "Finished"
```

The following environment variables must be added when starting the docker container:

```bash
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
CONTENTFUL_ENVIRONMENT=
CHROMIUM_PATH=/usr/bin/chromium-browser
```
