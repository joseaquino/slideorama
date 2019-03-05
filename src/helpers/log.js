// log :: a -> a
const log = val => {
  val.inspect ? console.log(val.inspect()) : console.log(val)
  return val
}

export default log
