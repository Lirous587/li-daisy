export const formatUrl = (url: string): string => {
  if (!url) {
    return ''
  }
  if (url.endsWith('/')) {
    return url
  } else {
    return url + '/'
  }
}
