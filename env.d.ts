declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string;
      DB_USERNAME: string;
      DEV_DB_NAME: string;
      TEST_DB_NAME: string;
      PROD_DB_NAME: string;
      DB_PASSWORD: string;
      DB_PORT: string;
      NODE_ENV: string;
      BASE_URL: string;
      TIMEOUT: string;
      PAYSTACK_TEST_SECRET: string;
      PAYSTACK_LIVE_SECRET: string;
      REFRESH_SECRET: string;
    }
  }
}

export {};
