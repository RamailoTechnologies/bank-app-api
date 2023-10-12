import * as dotenv from 'dotenv';
dotenv.config({
  path: '.env',
});
export const NODE_ENV = 'development';

export const DB = {
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
};

// for server
// export const DB = {
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'postgres',
//   database: 'ifsc',
// };
