# AdonisJS v4.0 REST API with MongoDB

## Requirements

Since AdonisJs is a Node.js framework, please make sure Node.js is installed on your operating system with npm. Below are the minimum required versions.

1. Node.js 8.0 or greater.
2. Npm 3.0 or greater.

## Install AdonisJS Framework

Once requirements to run AdonisJs Apps are met, the next step is to install the cli tool, which will help us in creating new AdonisJs applications.

The cli tool is installed globally using npm.

```
npm i -g @adonisjs/cli
```
Once the installation completes, make sure that you can run adonis from your command line.

```
adonis --help
```


## Creating new project

Let’s start by creating a new application using the cli tool new command. It accepts the project name/folder as a required parameter.

```
adonis new <project-name> --api-only
```

Output

```
    _       _             _         _
   / \   __| | ___  _ __ (_)___    | |___
  / _ \ / _` |/ _ \| '_ \| / __|_  | / __|
 / ___ \ (_| | (_) | | | | \__ \ |_| \__ \
/_/   \_\__,_|\___/|_| |_|_|___/\___/|___/

✔ Your current Node.js & npm version match the AdonisJs requirements!
✔ Cloned [adonisjs/adonis-api-app]
✔ npm: Dependencies installed
✔ Default environment variables copied
✔ generated unique APP_KEY
┌───────────────────────────────────┐
│        Application crafted        │
│                                   │
│        cd <project-name>          │
│        adonis serve --dev         │
└───────────────────────────────────┘
```

## Running application

Once the installation process is completed, you can cd into the directory and run the following command to start the HTTP server.

```
adonis serve --dev
```

Output

```
┌──────────────────────┐
│                      │
│    Started server    │
│    Watcher: On       │
│    Debugger: Off     │
│                      │
└──────────────────────┘
2017-11-17T09:50:31.794Z - info: serving app on http://127.0.0.1:3333
```

The serve command starts the HTTP server on port defined inside the .env file in the project root. If you open 127.0.0.1:3333 inside your browser, you will see the following welcome page.

Output

```
{
  "greeting": "Hello world in JSON"
}
```

## Install Lucid Mongo

Lucid Mongo is a mongo query builder and ORM. It also has support for database migrations, seeds and factories as @adonis/lucid.

Use with AdonisJS framework

```
adonis install lucid-mongo
```

Use with NPM

```
npm i --save lucid-mongo
```

Make sure to register the lucid provider to make use of Database and LucidMongo models. The providers are registered inside start/app.js

```
const providers = [
  // ...
  'lucid-mongo/providers/LucidMongoProvider'
]

const aceProviders = [
  // ...
  'lucid-mongo/providers/MigrationsProvider'
]
```

Make sure to register the database configuration to make a connection to MongoDB. The configurations are registered inside config/database.js

```
mongodb: {
  client: 'mongodb',
  connection: {
    host: Env.get('DB_HOST', 'localhost'),
    port: Env.get('DB_PORT', 27017),
    user: Env.get('DB_USER', 'root'),
    password: Env.get('DB_PASSWORD', ''),
    database: Env.get('DB_DATABASE', 'adonis'),
    auth: {
       source: Env.get('DB_AUTH_SOURCE', ''),
       mechanism: Env.get('DB_AUTH_MECHANISM', '')
    }
  }
}
```

And also make sure to set the database connection inside .env

```
HOST=127.0.0.1
PORT=3333
APP_URL=http://${HOST}:${PORT}
NODE_ENV=development
CACHE_VIEWS=false
APP_KEY=<secret-app-key>
DB_CONNECTION=mongodb
DB_HOST=127.0.0.1
DB_PORT=27017
DB_USER=root
DB_PASSWORD=<secret-password>
DB_DATABASE=db_demo_adonis
```

You can see the full documentation at https://www.npmjs.com/package/lucid-mongo

## Models

The reason behind using Models over writing plain database queries is the ease of use and the powerful API to drive the data flow.

The lucid models are stored as ES6 classes inside app/Models directory, where each model represents a database table.

Let’s see how to create and make use of a Model to read/write to the database. You can make use of the adonis command to generate a model.

```
adonis make:model User
```

Output

```
✔ create  app/Models/User.js
```

You can see the full documentation at http://adonisjs.com/docs/4.0/lucid

## Controllers

Defining closures as the route actions are not scalable, since writing all the code inside a single file is never desired and neither practical.

AdonisJs being an MVC framework offers a nice abstractions layer called Controllers to keep all the request handling logic inside custom ES6 classes.

Let’s create a controller using the make:controller command.

```
adonis make:controller Posts
```

Output

```
✔ create  app/Controllers/Http/PostController.js
```

You can see the full documentation at http://adonisjs.com/docs/4.0/routing#_binding_controllers

## Routes

If you like building web apps around REST conventions then route resources helps you in defining conventional routes by writing less code.

```
Route.group(() => {
  Route.get('/articles', 'ArticleController.index')
  Route.get('/articles/:page/:limit', 'ArticleController.paginate')
  Route.post('/articles', 'ArticleController.store')
  Route.get('/articles/:id', 'ArticleController.show')
  Route.put('/articles/:id', 'ArticleController.update')
  Route.delete('/articles/:id', 'ArticleController.destroy')
}).prefix('api/v1')
```

You can see the full documentation at http://adonisjs.com/docs/4.0/routing#_route_resources

## Query MongoDB in Controllers

```
const Article = use('App/Models/Article')

class ArticleController {
  index () {
    return Article.all()
  }

  store ({request}) {
    return Article.create(request.all())
  }

  show({params}){
    return Article.where({"_id" : params.id})
                  .fetch()
  }

  update({params, request}){
    return Article.where({"_id" : params.id})
                  .update(request.all())
  }

  destroy({params}){
    return Article.where({"_id" : params.id})
                  .delete()
  }

  paginate({params}){
    return Article.query()
                  .paginate(Number(params.page), Number(params.limit))
  }
}
```

You can see the full documentation at https://www.npmjs.com/package/lucid-mongo

## Authentication with JWT

### Registering middleware

```
const globalMiddleware = [
  'Adonis/Middleware/AuthInit'
]
```

### Config

Configuration for authentication is saved inside config/auth.js

```
authenticator: 'jwt',

jwt: {
  serializer: 'lucid',
  model: 'App/Models/User',
  scheme: 'jwt',
  uid: 'email',
  password: 'password',
  options: {
    secret: 'self::app.appKey'
  }
}
```

### Password

Password must be in hash with HashProvider to be matched by AuthProvider.

```
const Hash = use('Hash')
const safePassword = Hash.make(request.input('password'))
```

You can see the full documentation at http://adonisjs.com/docs/4.0/encryption-and-hashing#_hashing_values

### Login

```
class UserController {
  login ({ request, auth }) {
    const { email, password } = request.all()
    return auth.attempt(email, password)
  }
}
```

Output

```
{
  type: 'Bearer',
  token: <your-token>,
  refreshToken: null
}
```

You can see the full documentation at http://adonisjs.com/docs/4.0/authentication

### Get User

Set the Authorization = Bearer <your-token> header to authenticate the request.

```
class UserController {
  show({auth}){
    return auth.getUser()
  }
}
```

### Routes

```
Route.group(() => {
  Route.get('/user-detail', 'UserController.show').middleware('auth')
  Route.post('/user-login', 'UserController.login')
}).prefix('api/v1')
```

# Test Project

Click the button below to test this project via Postman

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/0589e4566e940a293bc6)
