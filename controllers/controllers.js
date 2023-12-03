const Cart = require('../models/models');

const addToCart = async (req, res) => {
    const cartItem = req.body;
    try {
        const result = await Cart.addToCart(cartItem);
        res.status(200).json({ message: 'Items agregados exitosamente', result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addToCart
};