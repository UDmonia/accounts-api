import { Request, Response } from 'express';
import Service from '../core/service';
import Accounts from '../accounts';

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
        if ('token' in req) {
            const token = (req as any).token;
            const result = await Accounts.profile(token);
            super.responseOk(resp, result);
        } else {
            super.responseUnauthorizedError(resp);
        }
    }
}
