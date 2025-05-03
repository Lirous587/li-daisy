export interface ThemeControllerProps {
  themes?: string[]
  darkThemes?: string[]
  align?: 'left' | 'center' | 'right'
}

export interface ThemeControllerRef {
  /**
   * 设置当前主题。
   * @param theme 要设置的主题名称。
   * @returns 返回一个布尔值，表示新主题是否为暗黑主题 (ifDark)。
   */
  setTheme: (theme: string) => boolean
}
