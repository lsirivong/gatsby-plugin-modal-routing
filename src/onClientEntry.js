import Modal from 'react-modal'

const onClientEntry = (_args, opts = {}) => {
  const { appElement = `#___gatsby` } = opts
  Modal.setAppElement(appElement)
}

export default onClientEntry
