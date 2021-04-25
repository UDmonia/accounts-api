import Accounts, { SignInRequest } from '../src/accounts';
import { User } from '../src/accounts/user';

test('Valid user sign ip', async () => {
    try {
        const resp = await Accounts.signIn({
                username: 'user@mail.com',
                password: 'password123'
        });
        expect(resp).not.toBeNull();
        expect(resp.user instanceof User).toBeTruthy();
        expect(resp.token).not.toBeNull();
    } catch (err) {
        expect(true).toBeFalsy();
    }
});