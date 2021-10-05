import { Response } from 'express';

function sendResp(res: Response, data: any) {
  const resp = JSON.stringify(data);
  return res.status(200).send(resp);
}

export { sendResp };
