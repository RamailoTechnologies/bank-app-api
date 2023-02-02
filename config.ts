import * as dotenv from 'dotenv';
dotenv.config({
  path: '.env',
});
export const NODE_ENV = 'development';

export const DB = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

// for server
// export const DB = {
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'postgres',
//   database: 'ifsc',
// };
