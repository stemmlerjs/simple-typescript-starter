import dotenv, { DotenvConfigOutput } from 'dotenv';

const config: DotenvConfigOutput = dotenv.config({
  path: __dirname + '/../../.env',
});

const env = process.env;
export default env;
