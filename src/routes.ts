import { Application } from 'express';
import * as UserController from './controllers/users.controller';

export default function(app: Application) {
  /****
   * login route
   */
  app.get('/login', UserController.login);

  // app.post('/login', UserController.login);
  return;
}
