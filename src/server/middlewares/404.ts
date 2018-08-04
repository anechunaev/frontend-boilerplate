import * as fs from 'fs';
import { join } from 'path';
import * as Express from 'express';

export default (req: Express.Request, res: Express.Response) => {
	if (req.accepts('html')) {
		fs.readFile(join(__dirname, '../../static/404.html'), 'utf-8', (err, page) => {
			if (err) console.error(err);

			res.writeHead(404, {
				'Content-Type': 'text/html',
			});
			res.write(page);
			res.end();
		});
	} else if (req.accepts('json')) {
		res.status(404).json({ error: 'Not found' });
	} else {
		res.status(404).type('txt').send('Not found');
	}
}