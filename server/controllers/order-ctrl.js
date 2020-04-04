const Order = require('../models/order-model')

createOrder = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an order'
        })
    }

    const order = new Order(body)
    order.user_id = req.params.user_id

    if (!order) {
        return res.status(400).json({ success: false, error: err })
    }

    order
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: order._id,
                user_id: req.params.user_id,
                message: 'Order created!'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Order not created!'
            })
        })
}

getOrderById = async (req, res) => {
    await Order
        .findOne({ _id: req.params.id }, (err, order) => {
        if(err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        if(!order) {
            return res.status(404).json({
                success: false,
                error: 'order not found'
            })
        }
        return res.status(200).json({ 
            success: true, 
            data: order
        })
    })
    .populate('user_id', 'name shipping').exec((err, user_id) => {
        console.log(user_id);
    })
    .catch(err => console.log(err))
}

updateOrder = (req, res) => {
    const body = req.body
    
    if(!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an order to update'
        })
    }

    Order.findOne({_id: req.params.id}, (err, order) => {
        if(err) {
            return res.status(404).json({
                err,
                message: 'order not found'
            })
        }

        if(body.delivery_date){
            order.delivery_date = body.delivery_date
        }
        if(body.status){
            order.status = body.status
        }
        order
            .save()
            .then( () => {
                return res.status(200).json({
                    success: true,
                    id: order._id,
                    message: 'order updated'
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'order not updated'
                })
            })
    })
}

module.exports = {
    createOrder,
    getOrderById,
    updateOrder
}