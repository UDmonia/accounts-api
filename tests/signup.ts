import Accounts, { SignUpRequest } from '../src/accounts';
import { User } from '../src/accounts/user';

export default () => {

test('Valid user sign up', async () => {
    try {
        const resp = await Accounts.signUp({
            email: 'user@mail.com',
            name: 'User',
            birthDate: new Date(),
            credential: {
                username: 'user@mail.com',
                password: 'password123'
            }
        });
        expect(resp).not.toBeNull();
        expect(resp.user instanceof User).toBeTruthy();
        expect(resp.token).not.toBeNull();
    } catch (err) {
        expect(true).toBeFalsy();
    }
});

test('Incomplete user sign up', async () => {
    const input = {
        email: 'user@mail.com',
        name: 'User',
        birthDate: null,
        credential: {
            username: 'user@mail.com',
            password: 'password123'
        }
    };
    try {
        const resp = await Accounts.signUp(input as unknown as SignUpRequest);
        expect(true).toBeFalsy();
    } catch (err) {
        expect(err).not.toBeNull();
        expect(err.message.toLowerCase().indexOf('invalid'))
            .toBeGreaterThanOrEqual(0);
    }
});

}