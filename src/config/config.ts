import dotenv from "dotenv";
import path from "path";
import { Data } from "../interface";

dotenv.config({
  path: path.normalize(path.join(path.dirname(__dirname) + "/../.env")),
});

const options: Data = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    app_port: process.env.PORT,
    baseUrl: process.env.BASE_URL,
    timeout: process.env.TIMEOUT,
    paystackSecret: process.env.PAYSTACK_TEST_SECRET,
    secret: process.env.REFRESH_SECRET,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    app_port: process.env.PORT,
    baseUrl: process.env.BASE_URL,
    timeout: process.env.TIMEOUT,
    paystackSecret: process.env.PAYSTACK_TEST_SECRET,
    secret: process.env.REFRESH_SECRET,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    app_port: process.env.PORT,
    baseUrl: process.env.BASE_URL,
    timeout: process.env.TIMEOUT,
    paystackSecret: process.env.PAYSTACK_LIVE_SECRET,
    secret: process.env.REFRESH_SECRET,
  },
};
const env = process.env.NODE_ENV as string;
const configuration = options[env];
export { configuration };
