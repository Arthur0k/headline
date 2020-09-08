// 计算当前评论有多少楼层
export function getCount(num, comment) {
  if (comment.parent) {
    return getCount(num + 1, comment.parent)
  } else {
    return num
  }
}
