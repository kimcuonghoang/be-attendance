import dotenv from "dotenv";
dotenv.config({
  path: ".env",
  debug: true,
  encoding: "utf8",
  silent: true,
  defaults: true,
  igmoreProcessEnv: true,
  expand: true,
  assignToProcessEnv: true,
  overrideProcessEnv: true,
});

export const { DB_URI, HOST, PORT, JWT_SECRET_KEY, JWT_EXPIRES_IN } =
  process.env;
