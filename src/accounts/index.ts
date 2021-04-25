import { ID } from '../core/entity';
import { PasswordCredential, Credential } from './credential';
import { CredentialRepository, UserRepository } from './repository';
import { Token } from './token';
import { NewUser, User } from './user';

const userRepository = new UserRepository();
const credentialRepository = new CredentialRepository();

export interface SignUpRequest extends NewUser {
    credential: PasswordCredential
}

export interface SignUpResponse {
    user: User
    token: string
}

export interface SignInRequest extends PasswordCredential {
}

export interface SignInResponse {
    user: User
    token: string
}

async function signUp (request: SignUpRequest): Promise<SignUpResponse> {
    const user = new User(request);
    const credential = await Credential.new(user, request.credential);

    await Promise.all([
        userRepository.save(user),
        credentialRepository.save(credential)
    ]);

    const token = new Token(user._id);
    return {
        user,
        token: await token.encode()
    }
}

async function signIn (request: SignInRequest): Promise<SignInResponse> {
    const credential = await credentialRepository.findByUsername(request.username);
    const isValid = credential && (await credential?.authenticate(request.password));
    if (!isValid) throw new Error('Invalid user credential');

    try {
        const user = await userRepository.findById(credential?.userId || '');
        const token = new Token(user._id);

        return {
            user,
            token: await token.encode()
        }
    } catch (err) {
        throw new Error('Invalid user credential');
    } 

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
