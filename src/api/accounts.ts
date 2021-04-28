import { Request, Response } from 'express';
import Service from '../core/service';
import Accounts from '../accounts';

function getToken (req: Request): any {
    if ('token' in req) { 
        return (req as any).token; 
    }
    return null;
}

export class AccountService extends Service {

    async signUp (req: Request, resp: Response) {
        try {
            const result = await Accounts.signUp(req.body);
            super.responseOk(resp, result);
        } catch (error) {
            super.responseInputError(resp, error);
        }
    }

    async signIn (req: Request, resp: Response) {
        try {
            const result = await Accounts.signIn(req.body);
            super.responseOk(resp, result);
        } catch (error) {
            console.log(error);
            super.responseInputError(resp, error);
        }
    }

    async profile (req: Request, resp: Response) {
        const token = getToken(req);
        if (token) {
            const result = await Accounts.profile(token);
            super.responseOk(resp, result);
        } else {
            super.responseUnauthorizedError(resp);
        }
    }

    async changeProfile (req: Request, resp: Response) {
        const token = getToken(req);
        if (token) {
            const result = await Accounts.changeProfile({
                token,
                ...req.body
            });
            super.responseOk(resp, result);
        } else {
            super.responseUnauthorizedError(resp);
        }
    }

    async changePassword (req: Request, resp: Response) {
        const token = getToken(req);
        if (token) {
            const result = await Accounts.changePassword({
                token,
                ...req.body
            });
            super.responseOk(resp, result);
        } else {
            super.responseUnauthorizedError(resp);
        }
    }
}
