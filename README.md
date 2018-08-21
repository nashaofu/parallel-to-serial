# parallel-to-serial
Parallel task based on Promise converted to serial task

## examples
```js
const parallelToSerial = require('parallel-to-serial')

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
```
执行结果：
```
开始执行小任务： [ 1, 2, 3 ]
1 -> 1
2 -> 4
3 -> 9
小任务执行完成： [ 1, 2, 3 ] -> [ 1, 4, 9 ]

开始执行小任务： [ 4, 5, 6 ]
4 -> 16
5 -> 25
6 -> 36
小任务执行完成： [ 4, 5, 6 ] -> [ 16, 25, 36 ]

开始执行小任务： [ 7, 8, 9 ]
7 -> 49
8 -> 64
9 -> 81
小任务执行完成： [ 7, 8, 9 ] -> [ 49, 64, 81 ]

开始执行小任务： [ 10 ]
10 -> 100
小任务执行完成： [ 10 ] -> [ 100 ]

整个任务执行完成： [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ] -> [ [ 1, 4, 9 ], [ 16, 25, 36 ], [ 49, 64, 81 ], [ 100 ] ]
```
