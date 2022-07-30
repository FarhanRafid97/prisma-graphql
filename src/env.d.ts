declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      COOKIE_NAME_SECRET: string;
      REDIS_URL: string;
    }
  }
}

export {}
