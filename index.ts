/**
 * 把一个长的并发一步任务转换为
 * 一个切片形式的串行任务
 * @param {Array} items 任务数据
 * @param {Function} handle 任务处理函数
 * @param {Number} length 切片长度
 * @return {Array} 按切片执行结果
 */
export = function(
  items: any[],
  handle: (arg: any) => any,
  length: number = 1
): Promise<any[]> {
  let i: number = 0
  const reslut: any = []
  async function next() {
    const slice: any = items.slice(i, i + length)
    i += length
    // 如果数据执行完之后就直接返回
    if (!slice.length) return reslut
    // 执行处理逻辑
    reslut.push(await handle(slice))
    // 循环下一个切片
    await next()
    return reslut
  }
  return next()
}
