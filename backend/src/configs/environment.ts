import { config } from "dotenv";

config();

const Environment = {
  PORT: process.env.PORT,
  DB: {
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DB_DATABASE,
  }
}

export { Environment };
