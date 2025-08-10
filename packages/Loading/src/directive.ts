// ...existing code...
import { createApp, type App, type Directive, type DirectiveBinding } from 'vue'
import Loading from './main.vue'
import type { LoadingProps, LoadingType, LoadingColor, LoadingSize } from './types'
import { isLoadingType, isLoadingColor, isLoadingSize } from './types'

type LoadingEl = HTMLElement & {
  __loadingApp?: App
  __loadingOverlay?: HTMLElement
  __prevPosition?: string
  __loadingType?: LoadingType
  __loadingColor?: LoadingColor
  __loadingSize?: LoadingSize
}

type BindVal = boolean | Partial<LoadingProps>

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

const loadingDirective: Directive<LoadingEl, BindVal> = {
  mounted(el, binding) {
    const cs = window.getComputedStyle(el)
    // 保证定位
    el.__prevPosition = cs.position === 'static' ? '' : undefined
    if (cs.position === 'static') el.style.position = 'relative'

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

    // 第一次渲染
    const opts = resolveOptions(binding)
    el.__loadingType = opts.type
    el.__loadingColor = opts.color
    el.__loadingSize = opts.size

    const app = createApp(Loading, {
      visible: true,
      type: opts.type,
      color: opts.color,
      size: opts.size,
    })
    app.mount(content)
    el.__loadingApp = app

    // 初始化透明度
    overlay.style.opacity = opts.visible ? '1' : '0'
    overlay.style.pointerEvents = opts.visible ? 'auto' : 'none'
    // 对于鼠标等事件 捕获阶段一网打尽，防止冒泡到宿主 el
    ;[
      'click',
      'mousedown',
      'mouseup',
      'mousemove',
      'pointerdown',
      'pointerup',
      'touchstart',
      'touchend',
    ].forEach((evt) => {
      overlay.addEventListener(
        evt,
        (e) => {
          e.stopPropagation()
          e.preventDefault()
        },
        { capture: true },
      )
    })
  },

  updated(el, binding) {
    const overlay = el.__loadingOverlay as HTMLElement
    const opts = resolveOptions(binding)

    // 1. 控制透明度 & 事件拦截
    overlay.style.opacity = opts.visible ? '1' : '0'
    overlay.style.pointerEvents = opts.visible ? 'auto' : 'none'

    if (
      opts.type !== el.__loadingType ||
      opts.color !== el.__loadingColor ||
      opts.size !== el.__loadingSize
    ) {
      // 卸载旧 app
      el.__loadingApp?.unmount()
      // 新建
      const content = overlay?.querySelector('div:last-child') as HTMLElement
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
      el.__loadingType = opts.type
      el.__loadingColor = opts.color
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
