class MyError extends Error {
  constructor(message: string) {
    super(message)
  }
}

console.log(new MyError("这是我的报错"))