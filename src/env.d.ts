declare namespace NodeJS {
  export interface ProcessEnv {
    DB_HOST: string;
    DB_PORT: string;
    DB_DATABASE: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    JWT_SECRET: string;
    PORT: string;
    APP_VERSION: string;
    APP_URI: string;
    BCRYPT_SALT_ROUNDS: string;
  }
}
