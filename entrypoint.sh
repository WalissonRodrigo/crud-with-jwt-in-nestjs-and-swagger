#!/bin/bash

npm ci

npx prisma migrate dev <<< create_team_member_table

npx prisma generate

npm run start