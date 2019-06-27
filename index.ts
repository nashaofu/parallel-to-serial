/**
 * 把任务集合转换为串行任务
 * 串行执行时可指定每次同时(并发)可执行任务的条数
 * @param {Array} items 任务列表
 * @param {Number} length 每次并发任务的条数
 * @return {Promise<Array>} Promise对象按切片执行结果
 */
export = function (items: Array<() => Promise<any>>, length: number = 1): Promise<any[]> {
  let i: number = 0
  const res: any[] = []
  async function next () {
    const slice: any = items.slice(i, i + length)
    i += length
    // 如果数据执行完之后就直接返回
    if (slice.length) {
      // 执行处理逻辑
      res.push(...(await Promise.all(slice.map((item: () => Promise<any>) => item()))))
      // 循环下一个切片
      await next()
    }
    return res
  }
  return next()
}
