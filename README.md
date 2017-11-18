# AdonisJS v4.0 REST API with MongoDB

# Requirements

Since AdonisJs is a Node.js framework, please make sure Node.js is installed on your operating system with npm. Below are the minimum required versions.

1. Node.js 8.0 or greater.
2. Npm 3.0 or greater.

# Install AdonisJS Framework

Once requirements to run AdonisJs Apps are met, the next step is to install the cli tool, which will help us in creating new AdonisJs applications.

The cli tool is installed globally using npm.

```
npm i -g @adonisjs/cli
```
Once the installation completes, make sure that you can run adonis from your command line.

```
adonis --help
```


# Creating new project

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

# Running application

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

# Install Lucid Mongo

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
