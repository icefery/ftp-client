export function buildTree(data, key, separator) {
  const roots = []
  for (const item of data) {
    let curr = roots
    for (const path of item[key].split(separator)) {
      const temp = curr
      for (const node of curr) {
        if (node.label === path) {
          curr = node.children
          break
        }
      }
      if (curr === temp) {
        const root = { label: path, data: item, children: [] }
        curr.push(root)
        curr = root.children
      }
    }
  }
  return roots
}

export function formatSize(size) {
  const map = new Map([
    ['T', 2 ** 40],
    ['G', 2 ** 30],
    ['M', 2 ** 20],
    ['K', 2 ** 10],
    ['B', 0]
  ])
  for (const [unit, min] of map) {
    if (size >= min) {
      return Math.round(min === 0 ? 0 : (size / min) * 10) / 10 + unit
    }
  }
  return size
}
