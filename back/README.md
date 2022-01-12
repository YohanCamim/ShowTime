<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
$ npm run build
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Test dataBase MongoDB

```bash
# Vérifier l'état de MongoDB
$ sudo systemctl status mongod

# redémarrer le service mongo
$ sudo service mongod restart

# lancer le shell mongo
$ mongo

# Voir les tables
$ show dbs

# Voir table "users" (par exemple)
$ use users
$ db.getCollection('users').find({})

```

#### ROUTER START #### (http://127.0.0.1:3000/)
	the returns are in json
### AUTH
# /auth/register
		check: 	( not token )
		body:
		{
			"firstName":"yohan",
			"lastName":"yohan",
			"email":"yohan@epitech.eu",
			"password":"yohan"
		}
		return: user( object ), token( string )
# /auth/login
		check: 	( not token )
		body:
		{
			"email":"yohan@epitech.eu",
			"password":"yohan"
		}
		return: user( object ), token( string )

### POST
# /groups
		check: 	isAdmin
		body:
		{
			"name": string,
			"description": string
		}
		return: object
# /genres
		check: 	isAdmin
		body:
		{
			"name": string
		}
		return: object
# /concerts
		check: 	isAdmin
		body:
		{
			"name": string,
			"description": string,
			"date": string,
			"hour": string,
			"price": number,
			"location": string,
			"city": string,
			"capacity": number,
			"groups": number[],
			"genres": number[]
		}
		return: object

### GET
# /users
		check: 	( isAdmin )
		return: users( object )
# /users/id_user
		check: 	( isAdmin ) or ( id_user==user_connected )
		return: user( object )
# /users/favorites
# /users/reservations
# /users/wishlist
		check: 	( not token )
		return: object
# /concerts
		check: 	( not token )
		return: concerts( object )
# /concerts/id_concert
		check: 	( not token )
		return: concert( object ) and group( object )
# /groups
# /groups/id_group
# /genres
# /genres/id_genre
# /concerts/groups/id_concert
# /concerts/genres/id_concert
		check: 	( not token )
		return: object

### PUT
# /users/id_user
		check: 	( id_user==user_connected ) or ( isAdmin )
		return: user( object )
# /users/favorites
# /users/reservations
# /users/wishlist
		check: 	isAdmin
		body:
		{
			"id": number, ('id' is concert_id or group_id in db)
		}
		return: object
# /groups/id_group
		check: 	isAdmin
		body:
		{
			"name": string,
			"description": string
		}
		return: object
# /concerts/id_concert
		check: 	isAdmin
		body:
		{
			"name": string,
			"description": string,
			"date": string,
			"hour": string,
			"price": number,
			"location": string,
			"city": string,
			"capacity": number,
			"groups": number[],
			"genres": number[]
		}
		return: object
# /concerts/groups/id_concert
# /concerts/genres/id_concert
		check: 	isAdmin
		body:
		{
			"id": number, ('id' is group_id or genre_id in db)
		}
		return: object

### DELETE
# /users/id_user
		check: 	( id_user==user_connected ) or ( isAdmin )
		return:	user( object )
# /users/favorites
# /users/reservations
# /users/wishlist
# /groups/id_group
# /concerts/id_concert
# /concerts/groups/id_concert
# /concerts/genres/id_concert
		check: 	isAdmin
		return: object

#### ROUTER END ####

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
