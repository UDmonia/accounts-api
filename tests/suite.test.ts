import Utils from './utils';
import SignInTest from './signin';
import SignUpTest from './signup';

beforeAll(Utils.beforeAll);
afterAll(Utils.afterAll);


describe('User sign in/up', () => {
    SignUpTest();
    SignInTest();
});
