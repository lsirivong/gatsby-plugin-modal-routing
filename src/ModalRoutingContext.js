import React from 'react'

export const defaultValue = {
  modal: false,
  closeTo: null,
}
const ModalRoutingContext = React.createContext(defaultValue)

export default ModalRoutingContext
