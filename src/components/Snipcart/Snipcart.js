import React from 'react'
import './Snipcart.css'

const Snipcart = () => {
  return (
    <div
     id="snipcart"
     data-config-modal-style="side"
     data-api-key={process.env.NEXT_PUBLIC_SNIPCART_API_KEY}
     hidden
    >
        <address-fields section="top">
        <div className="snipcart-form__field">
            <snipcart-label for="phone">Phone number</snipcart-label>
            <snipcart-input name="phone"></snipcart-input>
        </div>
        </address-fields>
    </div>
  )
}

export default Snipcart