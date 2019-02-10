import _ from 'lodash'

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

export default shouldUpdateScroll
