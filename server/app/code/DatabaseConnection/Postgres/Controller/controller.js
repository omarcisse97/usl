import dotenv from 'dotenv';
import { PSQL } from '../Model/model.js';

dotenv.config();

const Controller = () => {
    const dbConn = new PSQL();
    dbConn.createConnection(
        process.env.DB_USER,
        process.env.DB_HOST,
        process.env.DB_DATABASE,
        process.env.DB_PASSWORD,
        process.env.DB_PORT,
    )
    return dbConn;
};
export default Controller;