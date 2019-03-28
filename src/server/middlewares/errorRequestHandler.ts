import { Request, Response, NextFunction } from 'express';

export default function errorRequestHandler(err: Error, _req: Request, _res: Response, _next: NextFunction) {
	console.error(err);
}