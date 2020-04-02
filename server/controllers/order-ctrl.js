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

    if (!order) {
        return res.status(400).json({ success: false, error: err })
    }

    order
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: order._id,
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

getOrder = async (req, res) => {
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
    .populate('user_id', 'name shipping billing').exec((err, user_id) => {
        console.log(user_id);
    })
    .catch(err => console.log(err))
}


module.exports = {
    createOrder,
    getOrder
}