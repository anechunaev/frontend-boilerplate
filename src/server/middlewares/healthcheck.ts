import { Request, Response } from 'express';

export default function healthcheck(_req: Request, res: Response) {
	res.statusCode = 200;
	res.send('ok');
}
