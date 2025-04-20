export interface ThemeControllerProps {
  themes?: string[]
  darkThemes?: string[]
}

export interface ThemeControllerRef {
  change: () => string
}
