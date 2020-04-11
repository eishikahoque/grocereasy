const mongoose = require('mongoose')
const Schema = mongoose.Schema

const List = new Schema({
    products: [{
            _id: { type: String, required: true },
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
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        unique: true
    }
});

module.exports = mongoose.model('list', List);