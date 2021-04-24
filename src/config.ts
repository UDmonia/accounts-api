import dotenv from 'dotenv';

dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

function mandatory (envName: string): string {
    const value = process.env[envName];
    if (typeof value !== 'string') throw new Error(`ENV ${envName} is mandatory`);
    return value;
}

const Config = {
    server: {
        host: process.env.SERVER_HOST || '0.0.0.0',
        port: process.env.PORT || 5000
    },
    jwt: {
        secret: mandatory('SECRET')
    },
    db: {
        url: mandatory('DB_URL'),
        options: mandatory('DB_OPTIONS')
    }
};

export default Config;
