const fs = require('fs').promises;
const path = require('path');

class CartManager {
  constructor() {
    this.filePath = path.join(__dirname, '../data/carts.json');
  }

  async getCarts() {
    const data = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    return carts.find((c) => c.id === id);
  }

  async createCart() {
    const carts = await this.getCarts();
    const newCart = { id: Date.now().toString(), products: [] };
    carts.push(newCart);
    await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2));
    return newCart;
  }

  async addProductToCart(cartId, productId) {
    const carts = await this.getCarts();
    const cart = carts.find((c) => c.id === cartId);
    if (!cart) return null;

    const product = cart.products.find((p) => p.product === productId);
    if (product) {
      product.quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2));
    return cart;
  }
}

module.exports = CartManager;