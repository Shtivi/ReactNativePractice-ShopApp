class CartItem {
  constructor(quantity, productPrice, productTitle, sum, pushToken) {
    this.quantity = quantity;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.sum = sum;
    this.ownerPushToken = pushToken;

    console.log(this.ownerPushToken)
  }
}

export default CartItem;
