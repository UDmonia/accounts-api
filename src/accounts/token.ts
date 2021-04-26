import jwt, { VerifyErrors } from 'jsonwebtoken';
import { ID } from '../core/entity';
import Config from '../config';

export class Token {

    private userId: ID;

    constructor (userId: ID) {
        this.userId = userId;
    }

    getUserId () {
        return this.userId;
    }

    encode (): Promise<string> {
        return new Promise((resolve, reject) => {
            const cb = (err: Error | null, encoded: string | undefined): void => {
                if (err || !encoded) reject(err);
                else resolve(encoded as string)
            };

            const payload = {
                userId: this.userId
            };

            jwt.sign(payload, Config.jwt.secret, cb);
        });
    }

    static verify (accessToken: string): Promise<Token> {
        return new Promise((resolve, reject) => {
            const cb = (err: VerifyErrors | null, decoded: object | undefined): void => {
                if (err || !decoded) reject(err);
                else {
                    const payload = decoded as any;
                    resolve(new Token(payload.userId))
                }
            };

            jwt.verify(accessToken, Config.jwt.secret, cb);
        });
    }
}