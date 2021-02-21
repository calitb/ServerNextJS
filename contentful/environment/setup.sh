#!/bin/bash

if [ "$CONTENTFUL_TARGET_ENVIRONMENT" = "master" ]; then
  echo "Master should't be set as the target environment"
  exit
fi

yarn run ts-node ./contentful/environment/create.ts

declare -a models=(
  "movies"
)

for model in ${models[@]}; do
  yarn run ts-node ./node_modules/.bin/contentful space migration \
        -s $CONTENTFUL_SPACE_ID \
        -e $CONTENTFUL_TARGET_ENVIRONMENT \
        --mt $MANAGEMENT_ACCESS_TOKEN \
        -y \
        ./contentful/migrations/${model}.ts
done

declare -a seedData=(
  "movies"
)

for seed in ${seedData[@]}; do
  yarn run ts-node ./contentful/seed/${seed}.ts
done
