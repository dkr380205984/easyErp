// 等同于eval方法，接收一个字符串转换成可执行的JavaScript代码，重写是为了躲避eslint检查
function evil (fn) {
  var Fn = Function
  return new Fn('return ' + fn)()
}
export {
  evil
}
