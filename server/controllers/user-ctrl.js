const User = require('../models/user-model')
const bcrypt = require('bcrypt')

createUser = async (req, res) => {
    let body = req.body

    const auth = req.headers['authorization']

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user'
        })
    }

    // extract email and password from Authorization header
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [email, password] = Buffer.from(b64auth, 'base64').toString().split(':')
    
    body = {
        ...body,
        email,
        password
    }


    
    const hashedPassword = await bcrypt.hash(body.password, 10)
    const user = new User(body)

    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }

    user.password = hashedPassword

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

    User.findOne({ _id: req.params.id}, async (err, user) => {
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
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            body.password = hashedPassword
            user.password = body.password
        }
        if(body.phone){
            user.phone = body.phone
        }
        if(body.location){
            user.location.street_num = body.location.street_num
            user.location.unit_num = body.location.unit_num
            user.location.street_name = body.location.street_name
            user.location.address = body.location.address
            user.location.city = body.location.city
            user.location.province = body.location.province
            user.location.country = body.location.country
        }
        if(body.dietary_restrictions){
            user.dietary_restrictions = body.dietary_restrictions
        }
        if(body.allergies){
            user.allergies = body.allergies
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

loginUser = async (req, res) => {
    // extract email and password from Authorization header
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [email, password] = Buffer.from(b64auth, 'base64').toString().split(':')

    await User.findOne({ email }, (err) => {
        if(err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }
    })
    .then( (user) => {
        if(!user) {
            return res.status(404).json({
                success: false,
                error: 'invalid email or password'
            })
        } else {
            bcrypt.compare(password, user.password, (err, result) => {
                if(result) {
                    return res.status(200).json({
                        success: true,
                        data: user
                    })
                } else {
                    return res.status(400).json({
                        success: false,
                        error: err,
                        message: 'no match'
                    })
                }
            })
        }
    }).catch(err => console.log(err))
}

module.exports = {
    createUser,
    updateUser,
    loginUser
}