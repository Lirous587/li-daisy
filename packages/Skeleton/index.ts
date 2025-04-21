import type { App } from 'vue'
import type { InstallOptions } from '../types'
import Skeleton from './src/main.vue'
import SkeletonItem from './src/item.vue'

import type { SkeletonProps } from './src/types'

Skeleton.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}Skeleton`, Skeleton)
}

SkeletonItem.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}SkeletonItem`, SkeletonItem)
}

export { Skeleton, SkeletonItem }

export type { SkeletonProps }

export default Skeleton
