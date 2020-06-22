import _ from 'lodash'

const shouldUpdateScroll = ({
  routerProps: { location }
}) => {
  const isModal = _.get(location, 'state.modal')
  const preventUpdateScroll = _.get(location, 'state.noScroll')

  return !isModal && !preventUpdateScroll
}

export default shouldUpdateScroll
