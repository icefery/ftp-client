export function formatSize(size) {
  const [g, m, k] = [2 ** 30, 2 ** 20, 2 ** 10]
  if (size >= g) {
    return `${(size / g).toFixed(0)}GB`
  } else if (size >= m) {
    return `${(size / m).toFixed(0)}MB`
  } else if (size >= k) {
    return `${(size / k).toFixed(0)}KB`
  } else {
    return `${size.toFixed(0)}B`
  }
}
