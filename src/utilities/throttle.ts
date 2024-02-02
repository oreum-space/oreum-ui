export default function throttle (callback: () => void, timeoutMs: number) {
  let timeoutId: number | void
  let previous = 0

  function later () {
    previous = Date.now()
    timeoutId = void 0
    callback()
  }

  return function () {
    const timeoutLeft = timeoutMs - (Date.now() - previous)

    if (timeoutLeft <= 0 || timeoutLeft > timeoutMs) {
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
      return later()
    }

    if (timeoutId === void 0) {
      timeoutId = window.setTimeout(later, timeoutLeft)
    }
  }
}