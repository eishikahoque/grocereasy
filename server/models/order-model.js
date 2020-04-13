const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema({
    products: [{
            id: { type: String, required: true },
            title: { type: String, required: true },
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
    order_summary: { 
        subtotal: {
            type: Number,
            required: true,
            default: function(){
                const pt_sum = this.products.reduce((a, {total_price}) => a + total_price, 0)
                const to_num = parseFloat(pt_sum)
                const subtotal = to_num.toFixed(2)
                return (subtotal)
            }
        },
        delivery: {
            type: Number,
            required: true,
            default: 5
        },
        tax: {
            type: Number,
            required: true,
            default: function(){
                const st_tax = this.order_summary.subtotal * 0.10
                const tax = st_tax.toFixed(2)

                return(tax)
            }
        },
        total: {
            type: Number,
            required: true,
            default: function(){
                const order_sum = this.order_summary.subtotal + this.order_summary.tax + this.order_summary.delivery
                const totalOrder = order_sum.toFixed(2)
                return(totalOrder)
            }        
        }
    },
    order_date: {
        type: Date,
        default: Date.now
    },
    delivery_date: {
        type: Date
    },
    status: {
        type: String,
        default: 'Processing'
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    payment_id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('order', Order);