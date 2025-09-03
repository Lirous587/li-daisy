// ...existing code...
import { createApp, type App, type Directive, type DirectiveBinding } from 'vue'
import Loading from './main.vue'
import type { LoadingProps, LoadingType, LoadingColor, LoadingSize } from './types'
import { isLoadingType, isLoadingColor, isLoadingSize } from './types'
import { isServer } from '../../utils/ssr'

type LoadingEl = HTMLElement & {
  __loadingApp?: App
  __loadingOverlay?: HTMLElement
  __prevPosition?: string
  __loadingType?: LoadingType
  __loadingColor?: LoadingColor
  __loadingSize?: LoadingSize
  __isHydrated?: boolean
  __uniqueID: number
}

type BindVal = boolean | Partial<LoadingProps>

export const getLoadingClasses = (opts: {
  type?: LoadingType
  color?: LoadingColor
  size?: LoadingSize
}) => {
  const getTypeClass = (type?: LoadingType) => {
    switch (type) {
      case 'spinner':
        return 'loading-spinner'
      case 'dots':
        return 'loading-dots'
      case 'ring':
        return 'loading-ring'
      case 'ball':
        return 'loading-ball'
      case 'bars':
        return 'loading-bars'
      case 'infinity':
        return 'loading-infinity'
      default:
        return 'loading-spinner'
    }
  }

  const getColorClass = (color?: LoadingColor) => {
    switch (color) {
      case 'primary':
        return 'text-primary'
      case 'secondary':
        return 'text-secondary'
      case 'accent':
        return 'text-accent'
      case 'neutral':
        return 'text-neutral'
      case 'info':
        return 'text-info'
      case 'success':
        return 'text-success'
      case 'warning':
        return 'text-warning'
      case 'error':
        return 'text-error'
      default:
        return 'text-primary'
    }
  }

  const getSizeClass = (size?: LoadingSize) => {
    switch (size) {
      case 'xs':
        return 'loading-xs'
      case 'sm':
        return 'loading-sm'
      case 'md':
        return 'loading-md'
      case 'lg':
        return 'loading-lg'
      case 'xl':
        return 'loading-xl'
      default:
        return 'loading-md'
    }
  }

  return {
    type: getTypeClass(opts.type),
    color: getColorClass(opts.color),
    size: getSizeClass(opts.size),
  }
}

function resolveOptions(binding: DirectiveBinding<BindVal>): {
  visible: boolean
  type?: LoadingType
  color?: LoadingColor
  size?: LoadingSize
} {
  let visible = false
  let t: LoadingType | undefined
  let c: LoadingColor | undefined
  let s: LoadingSize | undefined

  // 1) from value
  const v = binding.value
  if (typeof v === 'boolean') {
    visible = v
  } else if (v && typeof v === 'object') {
    const vv = v as Partial<LoadingProps>
    visible = Boolean(vv.visible)
    if (vv.type && isLoadingType(vv.type)) t = vv.type
    if (vv.color && isLoadingColor(vv.color)) c = vv.color
    if (vv.size && isLoadingSize(vv.size)) s = vv.size
  }

  // 2) from arg
  if (binding.arg) {
    const arg = binding.arg
    if (isLoadingType(arg)) t = arg
    if (isLoadingColor(arg)) c = arg
    if (isLoadingSize(arg)) s = arg
  }

  // 3) from modifiers
  for (const m of Object.keys(binding.modifiers)) {
    if (isLoadingType(m)) t = m
    if (isLoadingColor(m)) c = m
    if (isLoadingSize(m)) s = m
  }

  return { visible, type: t, color: c, size: s }
}

let uniqueIdCounter = 0

// 创建 SSR 占位元素
function createSSRPlaceholder(el: LoadingEl, opts: ReturnType<typeof resolveOptions>) {
  if (!opts.visible) return

  // 为当前元素分配唯一ID
  if (!el.__uniqueID) {
    el.__uniqueID = ++uniqueIdCounter
  }

  // 创建完全匹配的占位结构
  const placeholder = document.createElement('div')
  placeholder.setAttribute('data-ssr-loading', el.__uniqueID.toString())
  placeholder.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: ${opts.visible ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
    opacity: ${opts.visible ? '1' : '0'};
    pointer-events: ${opts.visible ? 'auto' : 'none'};
    z-index: 1;
    touch-action: none;
    user-select: none;
    transition: opacity 200ms ease;
  `

  // 背景层
  const backdrop = document.createElement('div')
  backdrop.style.cssText = `
    position: absolute;
    inset: 0;
    background: var(--color-base-200);
    opacity: 0.6;
  `

  // Loading 内容容器
  const content = document.createElement('div')
  content.style.cssText = `position: relative; z-index: 1;`

  // Loading 元素，使用计算出的真实 class
  const loading = document.createElement('div')
  const classes = getLoadingClasses(opts)
  loading.className = `loading ${classes.type} ${classes.color} ${classes.size}`

  content.appendChild(loading)
  placeholder.appendChild(backdrop)
  placeholder.appendChild(content)
  el.appendChild(placeholder)
  return placeholder
}

// 创建真实的 Loading 覆盖层
function createLoadingOverlay(el: LoadingEl, opts: ReturnType<typeof resolveOptions>) {
  const cs = window.getComputedStyle(el)

  // 保证定位
  el.__prevPosition = cs.position === 'static' ? '' : undefined
  if (cs.position === 'static') el.style.position = 'relative'

  // 查找并移除对应的 SSR 占位符（使用唯一ID精确匹配）
  if (el.__uniqueID) {
    const placeholder = el.querySelector(`[data-ssr-loading="${el.__uniqueID}"]`)
    if (placeholder) {
      placeholder.remove()
    }
  }

  // overlay（容器）
  const overlay = document.createElement('div')
  overlay.style.position = 'absolute'
  overlay.style.top = '0'
  overlay.style.left = '0'
  overlay.style.width = '100%'
  overlay.style.height = '100%'
  const parentZ = Number(cs.zIndex)
  overlay.style.zIndex = Number.isFinite(parentZ) ? String(parentZ + 1) : '1'
  overlay.style.display = 'flex'
  overlay.style.alignItems = 'center'
  overlay.style.justifyContent = 'center'
  overlay.style.borderRadius = cs.borderRadius
  overlay.style.overflow = 'hidden'
  overlay.style.transition = 'opacity 200ms ease'

  // 使用 CSS 属性替代 JavaScript 事件阻止
  overlay.style.touchAction = 'none' // 阻止所有触摸手势
  overlay.style.userSelect = 'none' // 阻止文本选择
  overlay.style.pointerEvents = 'auto' // 确保接收指针事件

  // 半透明背景层
  const backdrop = document.createElement('div')
  backdrop.style.position = 'absolute'
  backdrop.style.inset = '0'
  backdrop.style.background = 'var(--color-base-200)'
  backdrop.style.opacity = '0.6'
  backdrop.style.borderRadius = cs.borderRadius
  overlay.appendChild(backdrop)

  // loading 内容挂载点
  const content = document.createElement('div')
  content.style.position = 'relative'
  overlay.appendChild(content)

  // 保存 overlay
  el.__loadingOverlay = overlay
  el.appendChild(overlay)

  // 创建 Loading 应用
  const app = createApp(Loading, {
    visible: true,
    type: opts.type,
    color: opts.color,
    size: opts.size,
  })
  app.mount(content)
  el.__loadingApp = app

  // 初始化状态
  overlay.style.opacity = opts.visible ? '1' : '0'
  overlay.style.pointerEvents = opts.visible ? 'auto' : 'none'

  // 阻止点击冒泡，使用 passive 处理触摸
  overlay.addEventListener(
    'click',
    (e) => {
      e.stopPropagation()
      e.preventDefault()
    },
    { capture: true },
  )

  // 触摸事件使用 passive 模式
  ;['touchstart', 'touchend', 'touchmove'].forEach((evt) => {
    overlay.addEventListener(
      evt,
      (e) => {
        e.stopPropagation()
        // 不调用 preventDefault()，依靠 CSS touch-action: none
      },
      { capture: true, passive: true },
    )
  })

  return overlay
}

const loadingDirective: Directive<LoadingEl, BindVal> = {
  mounted(el, binding) {
    const opts = resolveOptions(binding)

    if (isServer()) {
      // 服务端：创建占位符确保DOM结构一致
      createSSRPlaceholder(el, opts)
      return
    }

    // 客户端：分配唯一ID（如果还没有的话）
    if (!el.__uniqueID) {
      el.__uniqueID = ++uniqueIdCounter
    }

    // 客户端：创建真实的Loading覆盖层
    createLoadingOverlay(el, opts)

    // 保存当前状态
    el.__loadingType = opts.type
    el.__loadingColor = opts.color
    el.__loadingSize = opts.size
    el.__isHydrated = true
  },

  updated(el, binding) {
    const opts = resolveOptions(binding)

    // 服务端不处理更新
    if (isServer()) return

    // 如果还没有水合完成，先创建覆盖层
    if (!el.__isHydrated || !el.__loadingOverlay) {
      createLoadingOverlay(el, opts)
      el.__loadingType = opts.type
      el.__loadingColor = opts.color
      el.__loadingSize = opts.size
      el.__isHydrated = true
      return
    }

    const overlay = el.__loadingOverlay as HTMLElement

    // 控制可见性
    overlay.style.opacity = opts.visible ? '1' : '0'
    overlay.style.pointerEvents = opts.visible ? 'auto' : 'none'

    // 检查是否需要重新创建Loading组件
    if (
      opts.type !== el.__loadingType ||
      opts.color !== el.__loadingColor ||
      opts.size !== el.__loadingSize
    ) {
      // 卸载旧应用
      el.__loadingApp?.unmount()

      // 重新创建
      const content = overlay.querySelector('div:last-child') as HTMLElement
      if (content) {
        const app = createApp(Loading, {
          visible: true,
          type: opts.type,
          color: opts.color,
          size: opts.size,
        })
        app.mount(content)
        el.__loadingApp = app
      }

      // 更新状态
      el.__loadingType = opts.type
      el.__loadingColor = opts.color
      el.__loadingSize = opts.size
    }
  },

  unmounted(el) {
    el.__loadingApp?.unmount()

    if (el.__loadingOverlay && el.contains(el.__loadingOverlay)) {
      el.removeChild(el.__loadingOverlay)
    }
    if (el.__prevPosition !== null) {
      el.style.position = el.__prevPosition!
    }

    delete el.__loadingApp
    delete el.__loadingOverlay
    delete el.__prevPosition
    delete el.__loadingType
    delete el.__loadingColor
  },
}

export default loadingDirective
