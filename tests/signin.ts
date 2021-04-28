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

    test('Get Profile of signed in user', async () => {
        try {
            const userData = {
                email: 'user@mail.com',
                name: 'User',
                birthDate: new Date(),
                credential: {
                    username: 'user@mail.com',
                    password: 'password123'
                }
            };

            const resp = await Accounts.signIn(userData.credential);
            expect(resp).not.toBeNull();
            expect(resp.token).not.toBeNull();

            const token = await Accounts.verifyToken(resp.token);
            expect(token).not.toBeNull();

            const profile = await Accounts.profile(token);
            expect(profile.name).toBe(userData.name);
            expect(profile.email).toBe(userData.email);
            
        } catch (err) {
            console.log(err);
            expect(true).toBeFalsy();
        }
    });

    test('Change Profile of signed in user', async () => {
        try {
            const userData = {
                email: 'user@mail.com',
                name: 'User',
                birthDate: new Date(),
                credential: {
                    username: 'user@mail.com',
                    password: 'password123'
                }
            };

            const resp = await Accounts.signIn(userData.credential);
            expect(resp).not.toBeNull();
            expect(resp.token).not.toBeNull();

            const token = await Accounts.verifyToken(resp.token);
            expect(token).not.toBeNull();

            const newProfile = {
                email: 'user-update@mail.com',
                name: 'User updated',
                coach: 'Aurora'
            };

            const profileUpdated = await Accounts.changeProfile({
                token,
                email: newProfile.email,
                name: newProfile.name,
                coach: newProfile.coach
            });

            expect(profileUpdated.user.name).toBe(newProfile.name);
            expect(profileUpdated.user.email).toBe(newProfile.email);
            expect(profileUpdated.user.coach).toBe(newProfile.coach);
            
        } catch (err) {
            console.log(err);
            expect(true).toBeFalsy();
        }
    });
}
