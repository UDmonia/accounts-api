import { ID } from '../core/entity';
import { PasswordCredential, Credential } from './credential';
import { Token } from './token';
import { NewUser, User } from './user';

export interface SignUpRequest extends NewUser {
    credential: PasswordCredential
}

export interface SignUpResponse {
    user: User
    token: string
}

async function signUp (request: SignUpRequest): Promise<SignUpResponse> {
    const user = new User(request);
    const credential = Credential.new(user, request.credential);
    const token = new Token(user._id);
    return {
        user,
        token: await token.encode()
    }
}

async function signIn () {
}

async function profile () {
}

async function updateProfile () {
}

export default {
    signUp,
    signIn,
    profile,
    updateProfile
};
