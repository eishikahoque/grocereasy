import React from 'react'
import { PayPalButton } from 'react-paypal-button-v2'

class PayPalBtn extends React.Component {
    render(){
        const { amount, onSuccess } = this.props
        return(
            <PayPalButton
                amount = {amount}
                onSuccess = {(details, data) => onSuccess(details, data)}
                shippingPreference = "NO_SHIPPING"
                options={{
                    clientId: "AYrQuXWMuKYNRamhfN-1szhge0OvXZtefjae2-7BfMM5htDAYBUobsAnRPEjJEcUaaG8I9DDDkq3DgY4",
                    currency:"CAD",
                    disableFunding: "credit,card"
                }}
            />
        )
    }
}

export default PayPalBtn