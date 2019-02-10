import React from 'react'
import { Link } from 'gatsby'
import ModalRoutingContext from './ModalRoutingContext'

const ModalRoutingLink = ({ to, asModal, state, ...rest }) => (
  <ModalRoutingContext.Consumer>
    {({ modal, closeTo }) => (
      <Link
        to={to}
        state={{
          ...state,
          modal: asModal,
          noScroll: to === closeTo
        }}
        {...rest}
      />
    )}
    </ModalRoutingContext.Consumer>
)

export default ModalRoutingLink
