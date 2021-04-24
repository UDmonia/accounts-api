import jwt from 'jsonwebtoken';
import { ID } from '../core/entity';
import Config from '../config';

export class Token {

    private userId: ID;

    constructor (userId: ID) {
        this.userId = userId;
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
}