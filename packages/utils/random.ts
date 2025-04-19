// 生成唯一 ID
export const getUniqueID = (): string => {
  const uniqueID = Date.now().toString(36) + Math.random().toString(36).substring(2)
  return uniqueID
}
