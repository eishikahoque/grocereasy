const Cart = require("../models/cart-model");

createCart = (req, res) => {
  const body = req.body
  
  if(!body) {
    return res.status(400).json({
      success: false, 
      error: 'You must provide a userId'
    })
  }

  const cart = new Cart(body)
  cart.user_id = body.user_id

  if (!cart) {
    return res.status(400).json({success: false, error: err})
  }

  cart
    .save()
    .then( () => {
      return res.status(201).json({
        success: true,
          id: cart._id,
          user_id: body.user_id,
          products: cart.products,
          message: 'Cart created!'
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Cart not created'
      })
    })
}

updateCart = async (req, res) => {
  const body = req.body
  
  if(!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a cart item'
    })
  }

  await Cart.findOne({ user_id: body.user_id}, (err, cart) => {
    if(err) {
      return res.status(404).json({
        err, 
        message: 'cart not found'
      })
    }

    cart.products = body.products
    cart 
      .save()
      .then(() => {
        return res.status(200).json({
          success: true, 
          message: 'Cart updated'
        })
      })
      .catch(error => {
        return res.status(404).json({
          error, 
          message: 'cart not updated'
        })
      })
  })
}

getCart = async (req, res) => {
  
  if(!req.params.userId) {
    return res.status(400).json({
      success: false, 
      error: 'You must provide a user Id'
    })
  }

  await Cart.findOne({user_id: req.params.userId}, (err) => {
    if(err) {
      return res.status(400).json({
        success: false, 
        error: err
      })
    }
  }).then((cart) => {
    if(!cart) {
      return res.status(404).json({
        success: false, 
        error: 'Cart not found'
      })
    } else {
      return res.status(200).json({
        success: true,
        products: cart.products
      })
    }
  }).catch(err => console.log(err))
}

deleteCart = async (req, res) => {
  
  if(!req.params.userId) {
    return res.status(400).json({
      success: false, 
      error: 'You must provide a user Id'
    })
  }

  await Cart.remove({user_id: req.params.userId}, (err) => {
    if(err) {
      return res.status(400).json({
        success: false, 
        error: err
      })
    }
  }).then(() => {
    return res.status(200).json({
      success: true, 
      message: 'cart deleted',
    })
  })
  .catch((error) => {
    return res.status(404).json({
      error,
      success: false, 
      message: "cart was not deleted"
    })
  })
}


module.exports = {
  createCart,
  updateCart,
  getCart,
  deleteCart
}
