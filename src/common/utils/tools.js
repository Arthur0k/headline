// 计算当前评论有多少楼层
export function getCount(num, comment) {
  if (comment.parent) {
    return getCount(num + 1, comment.parent)
  } else {
    return num
  }
}

export function deBounce(fn, delay, immediate = false) {
  let timeout
  return function(...args) {
    const context = this
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      const callnow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, delay)
      if (callnow) fn.apply(context, args)
    } else {
      timeout = setTimeout(() => {
        fn.apply(context, args)
      }, delay)
    }
  }
}
