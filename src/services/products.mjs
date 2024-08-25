import Products from "../models/products.mjs";

export const createProducts = async (data) => {
    try {
        const products = await Products.create(data);
        return products;
    } catch (error) {
        throw new Error('Failed to create new product: ' + error.message);
    }
}

export const updateProducts = async (id, data) => {
    try {
        const product = await Products.findByPk(id);
        if(!product) throw new Error('Product not found');

        await product.update({
            ...data
        })

        return product;
    } catch (error) {
        throw new Error('Failed to update product')
    }
}

export const deleteProduct = async (id) => {
    const products = await Products.findByPk(id);
    if(!products) throw new Error('Product not found');

    await products.destroy();
}

export const findAllProducts = async () =>{
    const products = await Products.findAll();
    return products.map(product => products.toJSON());
}

export const getDetailProducts = async (id) => {
    const products = await Products.findByPk(id);
    if(!products) throw new Error('Product not found');

    return products.map(product => product.toJSON())
}