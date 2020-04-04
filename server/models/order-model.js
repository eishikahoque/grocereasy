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
                type: Number, 
                required: true,
                default: function(){
                    const calculatePrice = this.price * this.quantity
                    const totalPrice = calculatePrice.toFixed(2)
                    return (totalPrice)
                }
            }
    }],
    order_summary: { 
        subtotal: {
            type: Number,
            required: true,
            default: function(){
                const sum = this.products.reduce((a, {total_price}) => a + total_price, 0);
                const total = sum.toFixed(2)
                return (total)
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
                const tax = this.order_summary.subtotal * 0.10
                return(tax)
            }
        },
        total: {
            type: Number,
            required: true,
            default: function(){
                const calculateTotal = this.order_summary.subtotal + this.order_summary.tax + this.order_summary.delivery
                const totalOrder = calculateTotal.toFixed(2)
                return(totalOrder)
            }        
        }
    },
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
    },
    payment: {
        credit_card: {
            fname: {type: String, required: true},
            lname: {type: String, required: true},
            card_number: {type: Number, required: true},
            cvv: {type: Number, required: true},
            expiration: {
                month: {type: Number, required: true},
                year: {type: Number, required: true}
            }
        },
        billing: {
            address: {type: String, required: true},
            city: {type: String, required: true},
            postal_code: {type: String, required: true},
            province: {type: String, required: true},
            country: {type: String, required: true}
        }
    }
});

module.exports = mongoose.model('order', Order);