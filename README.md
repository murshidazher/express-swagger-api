# [express-swagger-api](https://github.com/murshidazher/express-swagger-api.git)

> An express application with swagger, swagger-jsdoc and express-swagger-ui. The step-by-step walkthrough can be found [here](https://www.youtube.com/watch?v=S8kmHtQeflo).

- an `expressjs` CRUD application and document it using Swagger.
- `swagger-jsdoc` to write the specs
- `express-swagger-ui` to show the Swagger interface.

## Table of Contents

## Getting Started

```sh
> npm init
> npm i express lowdb@1.0.0 morgan nanoid cors swagger-jsdoc@6.0.1 swagger-ui-express
```

## Up and Running

> To see the swagger documentation go to [http://localhost:4000/api-docs/](http://localhost:4000/api-docs/).

```sh
> git clone https://github.com/murshidazher/express-swagger-api.git
> cd express-swagger-api
> npm install
> npm start
```

## Swagger Doc Comments

- We need to create a multi-line comment with `@swagger`.
- In `components` section we define the schema which could be re-used with the `ref` keyword.
- We define `tags` to group our requests.

## License

[MIT](LICENSE) © 2021 Murshid Azher.
