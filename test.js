const parallelToSerial = require('./lib/index')

function req(val) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(val * val)
    }, 1000)
  })
}
parallelToSerial(
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  val => parallelToSerial(val, val => req(val[0])),
  3
).then(val => {
  console.log(val)
})
