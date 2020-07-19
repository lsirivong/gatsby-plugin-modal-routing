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

// Creates the page element using the appropriate component type/props based on whether
// we're in "modal mode" or not
const buildPageElement = (isModal, prevProps, pageResources, props) => {
  const { component, page } = isModal ? prevProps.pageResources : pageResources;
  const pageElementProps = { ...(isModal ? prevProps : props), key: page.path };
  return React.createElement(component, pageElementProps)
}

const buildModalElement = (isModal, lastModalProps, pageResources, props) => {
  if (!isModal && !lastModalProps) return null

  // isModal = rendering the current page as a modal (create an element with the page contents)
  // !isModal = not rendering as a modal, but we may be in the process of animating  the old
  // modal content to close, so render the last modal content we have cached
  const { component } = isModal ? pageResources : _.get(lastModalProps, 'pageResources')
  const modalElementProps = isModal ? props : lastModalProps
  const { path } = isModal ? pageResources.page : _.get(lastModalProps, 'pageResources.page')
  return React.createElement(component, { ...modalElementProps, key: path })
}

class ReplaceComponentRenderer extends React.Component {
  state = {
    prevProps: null,
    lastModalProps: null,
    props: null,
    pathname: null
  }

  modalContentRef = null

  constructor(props) {
    super(props)
    if (!props.modalComponentPath) this.state.ModalComponent = Modal;
  }

  static getDerivedStateFromProps(newProps, state) {
    // TODO: handle history changes
    // Only update the (old) props in state if the location changed
    if (newProps.location.pathname === state.pathname) return null

    const oldProps = state.props
    const oldPageWasModal = _.get(state, 'props.location.state.modal')
    return {
      // ...state,
      pathname: newProps.location.pathname,
      props: newProps,
      // if old page was a modal, keep track so we can render the contents while closing
      // (otherwise keep track so we can render the contents under modals)
      [oldPageWasModal ? 'lastModalProps' : 'prevProps']: oldProps
    }
  }

  componentDidMount() {
    if (!this.props.modalComponentPath) return;

    // Access the component we loaded in gatsby-node.js
    const ModalComponent = require(___MODAL_COMPONENT___).default
    this.setState({ ModalComponent })
  }

  componentDidUpdate(prevProps) {
    const oldPath = _.get(prevProps, 'location.pathname')
    const newPath = _.get(this.props, 'location.pathname')
    const isModal = _.get(this.props, 'location.state.modal') && this.modalContentRef;
    if (oldPath === newPath || !isModal) return;

    this.modalContentRef.scrollTop = 0
  }

  /** Returns the path of the previous page we were on, with the prefix removed */
  getPreviousPathWithoutPrefix() {
    return withoutPrefix(this.state.prevProps.location.pathname)
  }

  handleRequestClose = () => {
    const state = { noScroll: true }
    navigate(this.getPreviousPathWithoutPrefix(), { state })
  }

  render() {
    // render modal if props location has modal
    const { pageResources, location, modalProps } = this.props
    const { ModalComponent, prevProps, lastModalProps } = this.state
    if (!ModalComponent) return null // we're waiting for the modal component to load

    const isModal = prevProps && _.get(location, 'state.modal')

    // const resources = isModal ? prevProps.pageResources : pageResources

    // the page is the previous path if this is a modal, otherwise it's the current path
    const pageElement = buildPageElement(isModal, prevProps, pageResources, this.props)
    const modalElement = buildModalElement(isModal, lastModalProps, pageResources, this.props)
    return (
      <>
        {pageElement}
        <ModalComponent
          onRequestClose={this.handleRequestClose}
          contentRef={node => this.modalContentRef = node}
          {...modalProps}
          isOpen={!!isModal}
        >
          {modalElement ? (
            <React.Fragment
              key={this.props.location.key}
            >
              <ModalRoutingContext.Provider
                value={{
                  modal: true,
                  closeTo: prevProps ? this.getPreviousPathWithoutPrefix() : '/'
                }}
              >
                {modalElement}
              </ModalRoutingContext.Provider>
            </React.Fragment>
          ) : null}
        </ModalComponent>
      </>
    )
  }
}

const replaceComponentRenderer = ({ props }, pluginOptions) => {
  const { modalComponentPath, modalProps } = pluginOptions
  const mergedProps = { ...props, modalComponentPath, modalProps }
  return React.createElement(ReplaceComponentRenderer, mergedProps)
}

export default replaceComponentRenderer
