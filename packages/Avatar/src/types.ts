export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface AvatarProps {
  url: string
  text?: string
  size?: AvatarSize
}
