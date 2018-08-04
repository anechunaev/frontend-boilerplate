import { readFileSync } from 'fs';
import { join } from 'path';
import * as Express from 'express';

const manifest = JSON.parse(readFileSync(join(__dirname, '../../dist/public/manifest.json'), 'utf-8'));

export default (_req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
	res.locals = {
		script: {
			client: manifest['client.js'],
			vendor: manifest['vendor.js'],
			chunks: [],
		},
	};

	next();
};