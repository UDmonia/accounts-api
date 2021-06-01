import { prop } from '@typegoose/typegoose';
import { ID, Entity, ObjectId, ObjectIdType } from '../core/entity';

export interface NewUser {
    email: string;
    name?: string;
    birthDate: Date,
    coach?: string;
}

export interface ProfileChange {
    email?: string;
    name?: string;
    coach?: string;
}

export class User {
    @prop({ type: () => ObjectIdType })
    _id: ID;
    @prop({ type: () => String, required: true, unique: true })
    email: string;
    @prop({ type: () => String, required: false })
    name?: string;
    @prop({ type: () => Date, required: true })
    birthDate: Date

    @prop({ type: () => String })
    coach?: string;

    @prop({ type: () => Date })
    createdAt?: Date;
    @prop({ type: () => Date })
    updatedAt?: Date;

    constructor (args: NewUser) {
        if (!args.email || !args.name || !args.birthDate)
            throw new Error('Invalid user data provided');
        this._id = new ObjectId();
        this.email = args.email;
        this.name = args.name;
        this.birthDate = args.birthDate;
        this.coach = args.coach;
    }

    changeProfile (args: ProfileChange): void {
        if (args.name) this.name = args.name;
        if (args.email) this.email = args.email;
        if (args.coach) this.coach = args.coach;
    }
}

