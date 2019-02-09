import _ from 'lodash'
import React from 'react'
import Modal from 'react-modal'

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

class ReplaceComponentRenderer extends React.Component {
  state = {
    prevPageResources: null
  }

  // TODO: track location prop change
  constructor(...args) {
    super(...args)
    console.log('CONSTRUCTOR')
  }

  componentDidMount() {
    console.log('COMPONENT DID MOUNT')
  }

  componentDidUpdate(prevProps) {
    const paths = ['pathname', 'state']
    console.log(
      'COMPONENT DID Update',
      JSON.stringify({
        prevLocation: _.pick(prevProps.location, paths),
        currentLocation: _.pick(this.props.location, paths),
      }, null, 2)
    )

    // TODO: handle history changes
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ prevPageResources: prevProps.pageResources })
    }
  }

  render() {
    // render modal if props location has modal
    const { pageResources, location, loader } = this.props
    const { prevPageResources } = this.state
    const isModal = _.get(location, 'state.modal')

    const resources = prevPageResources && isModal ?
      prevPageResources : pageResources

    const pageElement = React.createElement(resources.component, {
      ...this.props,
      key: resources.page.path,
    })

    const modalElement = isModal ? React.createElement(pageResources.component, {
      ...this.props,
      modal: true,
      key: pageResources.page.path,
    }) : null

    return (
      <div>
        <h1>ReplaceComponentRenderer</h1>
        {pageElement}
        <Modal
          isOpen={modalElement}
        >
          {modalElement ? modalElement : null}
        </Modal>
      </div>
    )
  }
}

// You can delete this file if you're not using it
//
const replaceComponentRenderer = ({ props, loader }) => {
  return React.createElement(ReplaceComponentRenderer, { ...props, loader })
}

const shouldUpdateScroll = ({
  prevRouterProps: { location: prevLocation },
  routerProps: { location }
}) => {
  // TODO: handle history changes
  const isModal = _.get(location, 'state.modal')
  const wasModal = _.get(prevLocation, 'state.modal')
  // const closingModal = location.pathname === root pathname of the modal...
  return !isModal && !wasModal
}

export {
  replaceComponentRenderer,
  shouldUpdateScroll
}
