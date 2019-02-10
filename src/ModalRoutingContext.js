import React from 'react'

export const defaultValue = {
  isModal: false,
  closeTo: null,
}
const ModalRoutingContext = React.createContext(defaultValue)

export default ModalRoutingContext
