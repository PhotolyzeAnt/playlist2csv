export function camelize(s) {
  return s
    .replace("_", " ")
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, "")
}

export function removeHash() {
  window.history.pushState(
    "",
    document.title,
    window.location.pathname + window.location.search
  )
}
