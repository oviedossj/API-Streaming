import MongoConnection from './mongo/connection';

import { config } from '@/config';

const connection = new MongoConnection(config.DB_CONNECTION).getConnection();

export { connection };
