import Agents from './agents.mjs';
import Customers from './customers.mjs';
import Products from './products.mjs';
import TransactionDetails from './transactionDetails.mjs';
import Countries from './countries.mjs';

// Definisikan relasi setelah semua model diimpor

// Relasi antara Agents dan Customers
Agents.hasMany(Customers, { foreignKey: 'agentId' });
Customers.belongsTo(Agents, { foreignKey: 'agentId' });

// Relasi antara Customers dan TransactionDetails
Customers.hasMany(TransactionDetails, { foreignKey: 'customerId' });
TransactionDetails.belongsTo(Customers, { foreignKey: 'customerId' });

// Relasi antara Products dan TransactionDetails
Products.hasMany(TransactionDetails, { foreignKey: 'productId' });
TransactionDetails.belongsTo(Products, { foreignKey: 'productId' });

//Relasi antara Countries dan Customers
Countries.hasMany(Customers, { foreignKey: 'countryId', as: 'countryData' });
Customers.belongsTo(Countries, { foreignKey: 'countryId', as: 'countryData' });

Countries.hasMany(Customers, { foreignKey: 'emergencyContactCountryId', as: 'emergencyContactCountry' });
Customers.belongsTo(Countries, { foreignKey: 'emergencyContactCountryId', as: 'emergencyContactCountry' });

export { Agents, Customers, Products, TransactionDetails, Countries };