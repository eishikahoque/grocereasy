const User = require('../models/user-model')

createUser = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user'
        })
    }

    const user = new User(body)

    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }

    user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'User created!'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'User not created!'
            })
        })
}

updateUser = (req, res) => {
    const body = req.body
    
    if(!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user to update'
        })
    }

    User.findOne({_id: req.params.id}, (err, user) => {
        if(err) {
            return res.status(404).json({
                err,
                message: 'user not found'
            })
        }
        if(body.name) {
            user.name = body.name
        }
        if(body.email){
            user.email = body.email
        }
        if(body.password){
            user.password = body.password
        }
        if(body.phone){
            user.phone = body.phone
        }
        if(body.shipping){
            user.shipping.street_num = body.shipping.street_num
            user.shipping.unit_num = body.shipping.unit_num
            user.shipping.street_name = body.shipping.street_name
            user.shipping.address = body.shipping.address
            user.shipping.city = body.shipping.city
            user.shipping.province = body.shipping.province
            user.shipping.country = body.shipping.country
        }
        
        user
            .save()
            .then( () => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'user updated'
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'user not updated'
                })
            })
    })
}

getUser = async (req, res) => {
    await User.findOne({ _id: req.params.id }, (err, user) => {
        if(err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        if(!user) {
            return res.status(404).json({
                success: false,
                error: 'user not found'
            })
        }
        return res.status(200).json({ 
            success: true, 
            data: user 
        })
    }).catch(err => console.log(err))
}

module.exports = {
    createUser,
    updateUser,
    getUser
}