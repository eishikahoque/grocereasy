const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema({
    order_date: {
        type: Date,
        default: Date.now
    },
    delivery_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'Order Placed'
    },
    user_id: {
        type: Schema.Types.ObjectId, 
        ref: 'users'
    }
    // products: [
    //     {
    //         product_id: { type: String, required: true },
    //         product_title: { type: String, required: true },
    //         product_image: { type: String, required: true },
    //         product_price: { type: String, required: true },
    //         product_quantity: { type: String, required: true },

    //     }
    // ]
});

module.exports = mongoose.model('order', Order);