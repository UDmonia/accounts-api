import { ID } from '../core/entity';
import { MongoRepository, CrudRepository } from '../core/repository';
import { User } from './user';
import { Credential } from './credential';

export class UserRepository extends MongoRepository<User> implements CrudRepository<User> {
    constructor () {
        super(User, { schemaOptions: { timestamps: true } });
    }

    async findByEmail (email: string) {
        let user = await this.findOne({ filter: { email: email } });
        return user;
    }
}

export class CredentialRepository extends MongoRepository<Credential> implements CrudRepository<Credential> {
    constructor () {
        super(Credential, { schemaOptions: { timestamps: true } });
    }

    async findByUsername (username: string) {
        let credential = await this.findOne({ filter: { username: username } });
        return credential;
    }

    async findByUserId (userId: ID) {
        let credential = await this.findOne({ filter: { userId: userId } });
        return credential;
    }
}
