import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../config/config.env') });

//  Declare both interfaces to use them only in this file
interface ENV {
  NODE_ENV: string | undefined;
  PORT: number | undefined;
}

interface Config {
  NODE_ENV: string;
  PORT: number;
}

//  Get config only can return data of ENV (interface) type
const getConfig = (): ENV => ({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
});

/*
    If some variable is not defined in the .env file, this file is
    going to show an error in the application
    this ensure that all the env variables are declared
*/
const getSanitzedConfig = (config: ENV): Config => {
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
