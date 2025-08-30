export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface AvatarProps {
  url: string | undefined
  text?: string
  size?: AvatarSize
}
