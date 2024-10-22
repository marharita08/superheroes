import { config } from "dotenv";

config();

const Environment = {
  PORT: process.env.PORT
}

export { Environment };
