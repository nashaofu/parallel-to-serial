# parallel-to-serial

Parallel task based on Promise converted to serial task

## examples

```js
const parallelToSerial = require('parallel-to-serial')

function square(val) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = Math.pow(val, 2)
      console.log(`${val} -> ${result}`)
      resolve(result)
    }, 1000)
  })
}

let timer
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const task = data.map(val => () => {
  clearTimeout(timer)
  // 并发多条时不打印-----
  // 保证为下一次调用切片时，在切片中间打印-----
  timer = setTimeout(() => console.log('--------'))
  return square(val)
})

console.log('并发量为1')
parallelToSerial(task, 1)
  .then(val => {
    console.log('整个任务执行完成：', data, '->', val)
  })
  .then(() => {
    console.log('\n并发量为3')
    return parallelToSerial(task, 3)
  })
  .then(val => {
    console.log('整个任务执行完成：', data, '->', val)
  })
```

Output results：

```
并发量为1
--------
1 -> 1
--------
2 -> 4
--------
3 -> 9
--------
4 -> 16
--------
5 -> 25
--------
6 -> 36
--------
7 -> 49
--------
8 -> 64
--------
9 -> 81
--------
10 -> 100
整个任务执行完成： [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ] -> [ 1, 4, 9, 16, 25, 36, 49, 64, 81, 100 ]

并发量为3
--------
1 -> 1
2 -> 4
3 -> 9
--------
4 -> 16
5 -> 25
6 -> 36
--------
7 -> 49
8 -> 64
9 -> 81
--------
10 -> 100
整个任务执行完成： [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ] -> [ 1, 4, 9, 16, 25, 36, 49, 64, 81, 100 ]
```
