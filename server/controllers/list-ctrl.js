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
    list.user_id = req.params.user_id

    if(!list){
        return res.status(400).json({success: false, error: err})
    }

    list
        .save()
        .then( () => {
            return res.status(201).json({
                success: true,
                id: list._id,
                user_id: req.params.user_id,
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

insertListItem = async (req, res) => {
    const body = req.body

    if(!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a product to add'
        })
    }

    await List.findOne({user_id: req.params.user_id}, (err, list) => {
        if(err){
            return res.status(404).json({
                err,
                message: 'list not found'
            })
        }

        const newProduct = body
        const productsList = list.products
        productsList.push(newProduct)

        list
            .save()
            .then( () => {
                return res.status(200).json({
                    success: true,
                    message: 'item added'
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'item not added'
                })
            })
    })
}

updateListItem = async (req, res) => {
    await List.findOne({user_id: req.params.user_id}, (err, list) => {
        const body = req.body

        if(!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide an item to update'
            })
        }

        if(err){
            return res.status(404).json({
                err,
                message: 'list not found'
            })
        }

        const productsList = list.products
        const obj = productsList.find(product => product._id == req.params._id);

        const index = productsList.indexOf(obj)
        
        productsList[index].quantity = body.quantity

        list
            .save()
            .then( () => {
                return res.status(200).json({
                    success: true,
                    message: 'item updated'
                })  
            })
    })
    .catch(error => {
        return res.status(404).json({
            error,
            message: 'item not updated'
        })
    })  
}

deleteListItem = async (req, res) => {

    await List.findOne({user_id: req.params.user_id}, (err, list) => {
        if(err){
            return res.status(404).json({
                err,
                message: 'list not found'
            })
        }

        const productsList = list.products
        const obj = productsList.find(product => product._id == req.params._id);

        const index = productsList.indexOf(obj)
        if (index > -1) {
            productsList.splice(index, 1);
        }
        
        list
            .save()
            .then( () => {
                return res.status(200).json({
                    success: true,
                    message: 'item deleted'
                })  
            })
    })
    .catch(error => {
        return res.status(404).json({
            error,
            message: 'item not deleted'
        })
    })

}

module.exports = {
    createList,
    insertListItem,
    updateListItem,
    deleteListItem
}