#!/bin/bash

npm ci

npx prisma migrate dev

npx prisma generate

npm run start:dev