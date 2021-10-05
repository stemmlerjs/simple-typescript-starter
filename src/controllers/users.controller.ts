import { Request, Response } from 'express';
import { sendResp } from './../helpers';

function login(req: Request, res: Response) {
  const response = { id: 1, name: 'labeeb' };
  return sendResp(res, response);
}

export { login };
