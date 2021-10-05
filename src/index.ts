import express, { Application } from 'express';
import env from './config/dotenv';
import routes from './routes';
import database from './db/index';

const app: Application = express();

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
  routes(app);
  database();
});
