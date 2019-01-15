#! /bin/bash

rm -rf .tmp
yarn build
yarn ts scripts/publish.ts
cd .tmp && npm publish