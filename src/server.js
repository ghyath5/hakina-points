import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

import { json } from 'body-parser';
import session from 'express-session';
const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const redis = require('redis')

var RedisStore = require('connect-redis')(session)
var redisClient = redis.createClient ({
    host : 'ec2-54-160-158-53.compute-1.amazonaws.com',
    port : '30119',
    password: 'p3566bca7c3acedf60d62f9fa135d1a383c90b879044cf52eb8791f642da98de7'
});
export default polka() // You can also use Express
	.use(
		json(),
		session({
			secret: '3ZvFENu2wyexcREhDy6Qc3TGrvwzYubrbLervjv4',
			resave: false,
			saveUninitialized: true,
			cookie: {
				maxAge: 600000
			},
			store: new RedisStore({ client: redisClient })
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
