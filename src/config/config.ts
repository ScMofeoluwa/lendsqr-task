import dotenv from "dotenv";
import path from "path";
import { Data } from "../interface";

dotenv.config({
  path: path.normalize(path.join(path.dirname(__dirname) + "/../.env")),
});

const options: Data = {
  development: {
    connection: {
      database: process.env.DEV_DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
    },
    app_port: process.env.PORT,
    baseUrl: process.env.BASE_URL,
    timeout: process.env.TIMEOUT,
    paystackSecret: process.env.PAYSTACK_TEST_SECRET,
    secret: process.env.REFRESH_SECRET,
  },
  test: {
    connection: {
      database: process.env.TEST_DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
    },
    app_port: process.env.PORT,
    baseUrl: process.env.BASE_URL,
    timeout: process.env.TIMEOUT,
    paystackSecret: process.env.PAYSTACK_TEST_SECRET,
    secret: process.env.REFRESH_SECRET,
  },
  production: {
    connection: process.env.CLEARDB_DATABASE_URL,
    app_port: process.env.PORT,
    baseUrl: process.env.BASE_URL,
    timeout: process.env.TIMEOUT,
    paystackSecret: process.env.PAYSTACK_TEST_SECRET,
    secret: process.env.REFRESH_SECRET,
  },
};
const env = process.env.NODE_ENV as string;
const configuration = options[env];
export { configuration };
