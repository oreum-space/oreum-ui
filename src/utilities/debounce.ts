export default function debounce (callback: () => void, timeoutMs: number) {
  let timeoutId: number | void;

  return function () {
    if (timeoutId !== void 0) {
      window.clearTimeout(timeoutId)
      timeoutId = void 0
    }
    timeoutId = window.setTimeout(callback, timeoutMs)
  }
}
