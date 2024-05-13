class CartItem {
  constructor(id, heading, image, price, quantity) {
    this.id = id;
    this.heading = heading;
    this.image = image;
    this.price = price;
    this.quantity = quantity;
    this.totalPrice = price * quantity;
  }
}

export default CartItem;
