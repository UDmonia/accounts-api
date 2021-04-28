import bcrypt from 'bcrypt';
import { prop } from '@typegoose/typegoose';
import { ID, Entity, ObjectIdType } from '../core/entity';
import { User } from './user';

const saltRounds = 10;

export interface PasswordCredential {
    username: string; 
    password: string;
}

export class Credential implements Entity {
    _id?: ID;

    @prop({ type: () => ObjectIdType, required: true, index: true })
    userId: ID;
    @prop({ type: () => String, unique: true })
    username: string;
    @prop({ type: () => String, required: true })
    password: string;

    private constructor (user: User, newCredential: PasswordCredential) {
        this.userId = user._id;
        this.username = newCredential.username;
        this.password = newCredential.password;
    }

    static async new (user: User, passwordCredential: PasswordCredential) {
        passwordCredential.password = await bcrypt.hash(passwordCredential.password, saltRounds);
        const credential = new Credential(user, passwordCredential);
        return credential;
    }

    async authenticate (password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }

    async changePassword (newPassword: string) : Promise<boolean> {
        this.password = await bcrypt.hash(newPassword, saltRounds);
        return true;
    }
}