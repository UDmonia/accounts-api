import Accounts, { SignInRequest } from '../src/accounts';

export default () => {

    test('Valid user sign in', async () => {
        try {
            const resp = await Accounts.signIn({
                    username: 'user@mail.com',
                    password: 'password123'
            });
            expect(resp).not.toBeNull();
            expect(resp.token).not.toBeNull();
        } catch (err) {
            console.log(err);
            expect(true).toBeFalsy();
        }
    });
}
