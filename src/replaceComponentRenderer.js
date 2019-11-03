import _ from 'lodash'
import { navigate } from 'gatsby'
import React from 'react'
import Modal from 'react-modal'
import ModalRoutingContext from './ModalRoutingContext'

const withoutPrefix = (path) => {
  const prefix = typeof __BASE_PATH__ !== `undefined`
    ? __BASE_PATH__
    : __PATH_PREFIX__

  return path.slice(prefix ? prefix.length : 0)
}

class ReplaceComponentRenderer extends React.Component {
  state = {
    prevProps: null,
    props: null,
    pathname: null,
  }

  modalContentRef = null

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

    return null
  }

  componentDidUpdate(prevProps) {
    if (_.get(prevProps, 'location.pathname') !== _.get(this.props, 'location.pathname')
      && _.get(this.props, 'location.state.modal')
      && this.modalContentRef
    ) {
      this.modalContentRef.scrollTop = 0
    }
  }


  handleRequestClose = () => {
    navigate(
      withoutPrefix(this.state.prevProps.location.pathname),
      {
        state: {
          noScroll: true
        }
      }
    )
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
          contentRef={node => this.modalContentRef = node}
          {...modalProps}
          isOpen={!!modalElement}
        >
          {modalElement ? (
            <React.Fragment
              key={this.props.location.key}
            >
              <ModalRoutingContext.Provider
                value={{ modal: isModal, closeTo: withoutPrefix(prevProps.location.pathname) }}
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
