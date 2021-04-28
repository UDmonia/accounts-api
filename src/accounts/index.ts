import { ID } from '../core/entity';
import { PasswordCredential, Credential } from './credential';
import { CredentialRepository, UserRepository } from './repository';
import { Token } from './token';
import { NewUser, ProfileChange, User } from './user';

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

export interface ChangeProfileRequest extends ProfileChange {
    token: Token
}

export interface ChangeProfileResponse {
    user: User
} 

export interface ChangePasswordRequest {
    password: string
    token: Token
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

async function profile (token: Token) {
    return userRepository.findById(token.getUserId());
}

async function changeProfile (request: ChangeProfileRequest): Promise<ChangeProfileResponse> {
    const user = await userRepository.findById(request.token.getUserId());
    user.changeProfile(request);
    await userRepository.save(user);
    return {
        user
    };
}

async function changePassword (request: ChangePasswordRequest): Promise<boolean> {
    const user = await userRepository.findById(request.token.getUserId());
    const credential = await credentialRepository.findByUserId(user._id);
    if (credential) {
        const success:boolean = await credential.changePassword(request.password);
        await credentialRepository.save(credential);
        return success;
    }
    throw new Error('Invalid user credential');
}

export default {
    signUp,
    signIn,
    profile,
    changeProfile,
    changePassword,
    verifyToken: Token.verify,
    Token
};
