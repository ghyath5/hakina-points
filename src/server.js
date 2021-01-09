import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

import { json } from 'body-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
const FileStore = new sessionFileStore(session);
const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
	.use(
		json(),
		session({
			secret: '3ZvFENu2wyexcREhDy6Qc3TGrvwzYubrbLervjv4',
			resave: true,
			saveUninitialized: true,
			cookie: {
				maxAge: 600000
			},
			store: new FileStore({
				path: `.sessions`
			})
		}),
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: (req, res) => {
				return ({
					step:req.session.step,
					token:req.session.token,
					googleToken: req.session.googleToken
				})
			}
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
