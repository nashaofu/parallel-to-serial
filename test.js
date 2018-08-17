const parallelToSerial = require('./lib/index')

function req(val) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = val * val
      console.log(`${val} -> ${result}`)
      resolve(result)
    }, 1000)
  })
}

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
parallelToSerial(
  data,
  async val => {
    console.log('开始执行小任务：', val)
    const result = await parallelToSerial(val, val => req(val[0]))
    console.log('小任务执行完成：', val, '->', result, '\n')
    return result
  },
  3
).then(val => {
  console.log('整个任务执行完成：', data, '->', val)
})
