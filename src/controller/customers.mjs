import * as customerService from "../services/customers.mjs";

export const getAllCustomers = async (req, res) => {
    try {
        const customers = await customerService.findAllCustomers();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCustomerById = async (req, res) => {
    try {
        const customer = await customerService.findCustomerById(req.params.id);
        res.json(customer);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getCustomerByName = async (req, res) => {
    try {
        const customer = await customerService.findCustomerByName(req.params.name);
        res.json(customer);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createCustomer = async (req, res) => {
    try {
        const customer = await customerService.saveCustomer(req.body);
        res.status(201).json(customer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateCustomer = async (req, res) => {
    try {
        const customer = await customerService.updateCustomer(req.params.id, req.body);
        res.json(customer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteCustomer = async (req, res) => {
    try {
        await customerService.deleteCustomer(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};