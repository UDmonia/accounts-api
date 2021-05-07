import Express, { RequestHandler, Request, Response } from 'express';
import Config from '../config';
import cors from 'cors';

import { AccountService } from './accounts';
import Accounts from '../accounts';

/*

POST /signup
POST /signin
GET /profile
PUT /profile
*/

const accountService = new AccountService();

function healthCheck (req: Request, resp: Response) {
    resp.status(200).send({
        ok: true,
        error: null
    });
}

function routes () {
    const endpoints = Express.Router();

    endpoints.get('/health', healthCheck);

    endpoints.post('/signup', accountService.signUp);
    endpoints.post('/signin', accountService.signIn);
    endpoints.get('/profile', accountService.profile);
    endpoints.put('/profile', accountService.changeProfile);
    endpoints.put('/password', accountService.changePassword);

    return endpoints;
}

const getAccessToken: RequestHandler = async (req, res, next) => {
    const accessToken = req?.headers?.authorization || req?.headers['x-access-token'];
    try {
        if (accessToken) {
            const ctx = req as any;
            ctx.token = await Accounts.verifyToken(accessToken as string);
        }
    } catch (error) { }
    next();
};

export async function startServer() {

    const express = Express();
    express.use(Express.json());
    express.use(cors());
    //express.use(Express.urlencoded({ extended: true }));

    express.use(getAccessToken)
    express.use(routes());

    const server = express.listen(Config.server.port, Config.server.host);

    return server;
}