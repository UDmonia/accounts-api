import Config from '../src/config';
import { connect, disconnect } from '../src/db';

let db: any;

const beforeAll = async (done: jest.DoneCallback) => {
    db = await connect(Config.db);
    //console.log('worker# ', process.env.JEST_WORKER_ID, Config.db);
    for (const name of ['users', 'credentials']) {
        //try { await db.connection.db.dropCollection(name); }
        try { await db.connection.db.collection(name).deleteMany({}); }
        catch (err) { }
    }
    done();
}

const afterAll = async (done: jest.DoneCallback) => {
    await disconnect();
    done();
}

export default {
    beforeAll, afterAll
}