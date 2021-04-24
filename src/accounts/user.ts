import { prop } from '@typegoose/typegoose';
import { ID, Entity, ObjectId, ObjectIdType } from '../core/entity';

export interface NewUser {
    email: string;
    name: string;
    birthDate: Date
}

export class User {
    @prop({ type: () => ObjectIdType })
    _id: ID;
    @prop({ type: () => String, required: true, unique: true })
    email: string;
    @prop({ type: () => String })
    name: string;
    @prop({ type: () => Date })
    birthDate: Date
    @prop({ type: () => Date })
    createdAt?: Date;
    @prop({ type: () => Date })
    updatedAt?: Date;

    constructor (args: NewUser) {
        this._id = new ObjectId();
        this.email = args.email;
        this.name = args.name;
        this.birthDate = args.birthDate;
    }
    
}

