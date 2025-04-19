import type { App } from 'vue'
import type { InstallOptions } from '../types'
import Modal from './src/main.vue'

import type { ModalRef, ModalProps } from './src/types'

Modal.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}Modal`, Modal)
}

export { Modal }

export type { ModalProps, ModalRef }

export default Modal
