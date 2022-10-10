## Lendsqr Backend Task
Lendsqr Backend Task

## E-R Diagram
![ER-Diagram](https://github.com/ScMofeoluwa/lendsqr-task/blob/master/public/diagram.png)

## Prerequisite
- Language: [Node.js](https://nodejs.org/en/download) 
- Database: [MySQL](https://dev.mysql.com/downloads/mysql/)
- Payment Gateway: [Paystack](https://dashboard.paystack.com/#/signup)

## Getting Started

- Clone the repository
- Install project dependencies by running `yarn install`
- Create a `.env` file in the project's root directory
- Copy the contents of the `.env.example` into `.env`
- Create two databases: `lendsqr_devdb` and `lendsqr_testdb` for dev and test
- Edit the variables in the `env` file

## Running the app

```bash
# migrate database
$ yarn run db:migrate

# run the app
$ yarn run dev
```

## Testing
- Change `NODE_ENV` variable in `.env` file from development to test

```bash
# migrate database
$ yarn run db:migrate

# generate seeds
$ yarn run db:seeds

# run the test
$ yarn run test
```

## Documentation

Check out the [Postman Documentation](https://documenter.getpostman.com/view/11863559/2s83zjqMxs)
