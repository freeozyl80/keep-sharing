function f1(arg) {
   console.log('f1', arg)
   return arg
}
function f2(arg) {
   console.log('f2', arg)
   return arg
}
function compose(...funcs) {
   if(funcs.length == 0) return arg => arg;
   if(funcs.lenghh === 1) return funcs[0];
   return funcs.reduce(function(a,b) {
      return function(o) {
         return a(b(o))
      }
   })
}
console.log(compose(f1, f2)("hello"))