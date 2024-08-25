import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'
// import Agents from '../models/agents.mjs';
// import Products from '../models/products.mjs';
// import Appointments from '../models/appointment.mjs';
// import Customers from '../models/customers.mjs';
// import TransactionDetails from '../models/transactionDetails.mjs';
// import TransactionFinals from '../models/transactionFinals.mjs';

dotenv.config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT
});

// //Function to load models
// const initializeModels = (sequelize) => {
//     Agents(sequelize);
//     Products(sequelize);
//     Appointments(sequelize);
//     Customers(sequelize);
//     TransactionDetails(sequelize);
//     TransactionFinals(sequelize)
// }



//initializeModels(db);

export default db