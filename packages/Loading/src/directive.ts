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
    overlay.style.pointerEvents = 'none'
    overlay.style.borderRadius = cs.borderRadius
    overlay.style.overflow = 'hidden'

    // 背景层
    const backdrop = document.createElement('div')
    backdrop.style.position = 'absolute'
    backdrop.style.inset = '0'
    backdrop.style.background = 'var(--color-base-200)'
    backdrop.style.opacity = '0.8'
    backdrop.style.pointerEvents = 'none'
    backdrop.style.borderRadius = cs.borderRadius
    overlay.appendChild(backdrop)

    // 内容层
    const content = document.createElement('div')
    overlay.appendChild(content)

    const opts = resolveOptions(binding)
    const app = createApp(Loading, {
      visible: opts.visible,
      type: opts.type,
      color: opts.color,
      size: opts.size,
    })
    app.mount(content)

    if (opts.visible) {
      el.style.pointerEvents = 'none'
    }
    el.appendChild(overlay)

    el.__loadingApp = app
    el.__loadingOverlay = overlay
    el.__loadingType = opts.type
    el.__loadingColor = opts.color
  },

  updated(el, binding) {
    const overlay = el.__loadingOverlay
    const opts = resolveOptions(binding)
    el.style.pointerEvents = opts.visible ? 'none' : 'auto'

    if (overlay) overlay.style.display = opts.visible ? 'flex' : 'none'

    if (opts.type !== el.__loadingType || opts.color !== el.__loadingColor) {
      const content = overlay?.lastElementChild as HTMLElement | undefined
      el.__loadingApp?.unmount()
      if (content) {
        const app = createApp(Loading, {
          visible: opts.visible,
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
    if (el.__loadingOverlay?.parentNode === el) el.removeChild(el.__loadingOverlay)
    if (el.__prevPosition !== null) el.style.position = el.__prevPosition ?? ''

    delete el.__loadingApp
    delete el.__loadingOverlay
    delete el.__prevPosition
    delete el.__loadingType
    delete el.__loadingColor
  },
}

export default loadingDirective
