import { Request, Response } from 'express';

export default function middlewareHealthcheck(_req: Request, res: Response) {
	res.statusCode = 200;
	res.send('ok');
}
