const List = require('../models/list-model')

createList = (req, res) => {
    const body = req.body

    if(!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a list item'
        })
    }

    const list = new List(body)
    list.user_id = body.user_id

    if(!list){
        return res.status(400).json({success: false, error: err})
    }

    list
        .save()
        .then( () => {
            return res.status(201).json({
                success: true,
                id: list._id,
                user_id: body.user_id,
                products: list.products,
                message: 'List created!'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'List not created'
            })
        })
}

updateList = async (req, res) => {
    const body = req.body

    if(!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a list item'
        })
    }


    await List.findOne({user_id: body.user_id}, (err, list) => {
        if(err) {
            return res.status(404).json({
                err,
                message: 'list not found'
            })
        }

        list.products = body.products
        list
            .save()
            .then( () => {
                return res.status(200).json({
                    success: true,
                    message: 'list updated'
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'list not updated'
                })
            })
    })
}


getList = async (req, res) => {

    if(!req.params.userId) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user Id'
        })
    }

    await List.findOne({user_id: req.params.userId}, (err) => {
        if(err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }
    }).then((list) => {
        if(!list) {
            return res.status(404).json({
                success: false,
                error: 'list not found'
            })
        } else {
            return res.status(200).json({
                success: true,
                products: list.products
            })
        }

    }).catch(err => console.log(err))
}

module.exports = {
    createList,
    updateList,
    getList
}