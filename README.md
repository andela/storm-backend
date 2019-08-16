[![Reviewed by Hound](http://img.shields.io/badge/Reviewed%20By-Hound-%23a874d1)](https://houndci.com) [![Maintainability](https://api.codeclimate.com/v1/badges/b9d017718c7824fa2fc0/maintainability)](https://codeclimate.com/github/andela/storm-backend/maintainability) [![Build Status](https://travis-ci.com/andela/storm-backend.svg?branch=develop)](https://travis-ci.com/andela/storm-backend)

Barefoot Nomad - Making company travel and accomodation easy and convinient.
=======

## Vision
Make company global travel and accommodation easy and convenient for the strong workforce of savvy members of staff, by leveraging the modern web.

---
## Docker Development Setup

- Install Docker
- Change to application root directory
- Build a docker image with the following command `docker build -t storm-backend .`
- Run `docker-compose up`

## How To Run The App
- Clone the app and cd into it
```
git clone https://github.com/andela/storm-backend.git
cd storm-backend
```

- Install all dependencies
```
npm install
```

- Install PostgreSQL (if you don't have)
- Create a .env file using .env-sample as a guide
- Run migration to create required database tables
```
npm run db:migrate
```

- Start the app
```
npm run start:dev
```

---
