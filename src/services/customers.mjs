import Customers from "../models/customers.mjs";
import Agents from "../models/agents.mjs";
import Countries from "../models/countries.mjs";
import { Op } from "sequelize";
import db from "../config/database.mjs";

export const findAllCustomers = async () => {
    const customers = await Customers.findAll({
        include: [
            { model: Agents },
            { model: Countries, as: 'countryData' },  // Include relasi country
            { model: Countries, as: 'emergencyContactCountry' }  // Include relasi emergencyContactCountry
        ]
    });
    return customers.map(customers => customers.toJSON());
}

export const findCustomerById = async (id) => {
    const customers = await Customers.findByPk(id, {
        include: [
            { model: Agents },
            { model: Countries, as: 'countryData' },
            { model: Countries, as: 'emergencyContactCountry' }
        ]
    });
    if(!customers) throw new Error('Data not found')
    return customers.toJSON();
}

export const findCustomerByName = async (name) => {
    const customers = await Customers.findOne({
        where: {
            fullName: {
                [Op.like]: `%${name}%`  // Pencarian parsial, bisa di awal, tengah, atau akhir
            }
        },
        include: [
            { model: Agents },
            { model: Countries, as: 'countryData' },
            { model: Countries, as: 'emergencyContactCountry' }
        ]
    });
    if(!customers) throw new Error('Data Not Found');
    return customers.toJSON();
}

export const saveCustomer = async (input) => {
    const agent = await Agents.findByPk(input.agentId);
    if (!agent) {
        throw new Error(`Agent not found with ID ${input.agentId}`);
    }

    const newCustomer = await Customers.create(input);
    return newCustomer.toJSON();
}

export const updateCustomer = async (id, customerInput) => {
    // Mulai transaction
    const transaction = await db.transaction();

    try {
        const customer = await Customers.findByPk(id, { transaction });
        if (!customer) {
            throw new Error(`Customer not found with ID ${id}`);
        }

        const agent = await Agents.findByPk(customerInput.agentId, { transaction });
        if (!agent) {
            throw new Error(`Agent not found with ID ${customerInput.agentId}`);
        }

        await customer.update(
            {
                ...customerInput,
                agentId: agent.id,
            },
            { transaction }
        );

        await transaction.commit(); // Selesaikan transaction jika berhasil

        return customer.toJSON();
    } catch (error) {
        await transaction.rollback(); // Batalkan transaction jika terjadi error
        throw error; // Lempar kembali error
    }
}

export const deleteCustomer = async (id) => {
    const customers = await Customers.findByPk(id);
    if(!customers) throw new Error('Customer not found');

    await customers.destroy();
}
