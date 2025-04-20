export interface ThemeControllerProps {
  themes?: string[]
  darkThemes?: string[]
  align?: 'left' | 'center' | 'right'
}

export interface ThemeControllerRef {
  change: () => string
}
