#!/usr/bin/env bash
​yarn run db:unmigrate
yarn run db:migrate
yarn run seed
yarn start
