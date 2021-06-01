import { ID } from '../core/entity';
import { MongoRepository, CrudRepository } from '../core/repository';
import { User } from './user';
import { Credential } from './credential';

export class UserRepository extends MongoRepository<User> implements CrudRepository<User> {
    constructor () {
        super(User, { schemaOptions: { timestamps: true } });
    }

    async findByEmail (email: string): Promise<User | undefined> {
        const user = await this.findOne({ email: email });
        return user;
    }
}

export class CredentialRepository extends MongoRepository<Credential> implements CrudRepository<Credential> {
    constructor () {
        super(Credential, { schemaOptions: { timestamps: true } });
    }

    async findByUsername (username: string) {
        const credential = await this.findOne({ username: username });
        return credential;
    }

    async findByUserId (userId: ID) {
        const credential = await this.findOne({userId: userId });
        return credential;
    }
}
