# Movie Library

Movie Library is an example of GraphQL with case of data authors, movies, actors.

## Instalation
This App requires [NodeJS](https://nodejs.org/) v14+ and [postgreSQL](https://www.postgresql.org/) Database to run.

### Running on local machine

Make sure you create .env file that contain theese environment variables:
```
ACCESS_TOKEN_SECRET=supersecret
POSTGRES_PASSWORD=supersecret
POSTGRES_HOST=localhost
POSTGRES_USER=postgres
POSTGRES_DATABASE=postgres
```

After setting up all the environment variables, on command prompt, you can execute theese code to run the app
```
npm i
npm run start
```

Before head down to [Movie-Library](localhost:3000/graphiql) to write your query, you must authenticate first in order to access the app, I've provided a dummy data with details below:
`
username = anbiasenggagau
`
`
password = 123456
`

You also could access the example request using Postman. You can access the file in directory named "Postman Request" and import the files to your local Postman. I encourage you to use Postman to get better understanding.

### Running on docker container
While running on your local machine requires [NodeJS](https://nodejs.org/) and [postgreSQL](https://www.postgresql.org/) Database. Running on docker container only requires [Docker](https://www.docker.com/) to run.

Same as running on your local machine, make sure you create .env file that contain theese environment variables:
```
ACCESS_TOKEN_SECRET=supersecret
POSTGRES_PASSWORD=supersecret
POSTGRES_HOST=postgres
POSTGRES_USER=postgres
POSTGRES_DATABASE=postgres
```

> Note: `POSTGRES_HOST` value must be same as postgres container name.

After setting up all the environment variables, on command prompt, you can execute theese code to run the app
```
docker-compose -f docker-compose.yml up -d --build
```
Before head down to [Movie-Library](localhost:3000/graphiql) to write your query, you must authenticate first in order to access the app, I've provided a dummy data with details below:
`
username = anbiasenggagau
`
`
password = 123456
`

You also could access the example request using Postman. You can access the file in directory named "Postman Request" and import the files to your local Postman. I encourage you to use Postman to get better understanding.

Run this command if you want to terminate and delete the containers
```
docker-compose -f docker-compose.yml down -v
```

## Error/Bug Discoveries
Find some errors or bugs while running the app? You can contribute by telling me what the errors and bugs are, or you could straight up make a pull request on this repository.
