const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Cart = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    unique: true
  },
  products: [{
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    customizations: { type: String, required: true, default: 'N/A'},
    total_price: {
      type: Schema.Types.Mixed, 
      default: function(){
          const prod_price = this.price * this.quantity
          const total_price = prod_price.toFixed(2)
          return (total_price)
      }
    }
  }],
  productTotal: {
    type: Number, 
    default: () => {
      let total = null
      if (this.products && this.products.length > 0) {
        total = this.products.map((p) => p.price * p.quantity).reduce((prev, next) => prev + next)
      }
      return total ? parseFloat(total.toFixed(2)) : 0
    }
  }
})

module.exports = mongoose.model("cart", Cart);
