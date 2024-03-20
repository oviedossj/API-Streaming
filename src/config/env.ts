import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV !== 'production') {
  const envFound = dotenv.config({ override: true });
  if (envFound.error) {
    throw new Error("Couldn't find .env file");
  }
}

export const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: Number(process.env.PORT || 8080),
  DIR_ERRORS: './src/config/errors/error.yml',
  DB_CONNECTION: process.env.DB_CONNECTION || 'mongodb://rootuser:rootpass@localhost:27017/',
};
