import _ from 'lodash'
import { navigate } from 'gatsby'
import React from 'react'
import Modal from 'react-modal'
import ModalRoutingContext from './ModalRoutingContext'

class ReplaceComponentRenderer extends React.Component {
  state = {
    prevProps: null,
    props: null,
    pathname: null,
  }

  constructor(...args) {
    super(...args)
  }

  static getDerivedStateFromProps(props, state) {
    // TODO: handle history changes
    if (props.location.pathname !== state.pathname) {
      return {
        pathname: props.location.pathname,
        props: props,
        // only set as prev props if not a modal
        ...(!_.get(state, 'props.location.state.modal') && {
          prevProps: state.props
        })
      }
    }
  }

  handleRequestClose = () => {
    navigate(this.state.prevProps.location.pathname)
  }

  render() {
    // render modal if props location has modal
    const { pageResources, location, modalProps } = this.props
    const { prevProps } = this.state
    const isModal = prevProps && _.get(location, 'state.modal')

    const resources = isModal ?
      prevProps.pageResources : pageResources

    const pageElement = isModal ? (
      React.createElement(prevProps.pageResources.component, {
        ...prevProps,
        key: prevProps.pageResources.page.path,
      })
    ) : (
      React.createElement(pageResources.component, {
        ...this.props,
        key: pageResources.page.path,
      })
    )

    const modalElement = isModal ? React.createElement(pageResources.component, {
      ...this.props,
      key: pageResources.page.path,
    }) : null

    return (
      <>
        {pageElement}

        <Modal
          onRequestClose={this.handleRequestClose}
          {...modalProps}
          isOpen={!!modalElement}
        >
          {modalElement ? (
            <React.Fragment
              key={this.props.location.key}
            >
              <ModalRoutingContext.Provider
                value={{ modal: isModal, closeTo: prevProps.location.pathname }}
              >
                {modalElement}
              </ModalRoutingContext.Provider>
            </React.Fragment>
          ) : null}
        </Modal>
      </>
    )
  }
}

const replaceComponentRenderer = ({ props }, opts) => {
  const { modalProps } = opts
  return React.createElement(ReplaceComponentRenderer, { ...props, modalProps })
}

export default replaceComponentRenderer
