# 从程序设计看前端
本次分享将从编程范式到程序设计原则到案例实现@zhangyunlu



## 面向对象编程，面向函数编程，函数编程


## 面向对象

面向对象编程编程： <font color="DeepSkyBlue">类（class） 对象（object）</font>


### 四大特征
* 封装
* 抽象
* 继承
* 多态

Note: 面向对象编程是一种编程范式或编程风格。它以类或对象作为组织代码的基本单元，并将封装、抽象、继承、多态四个特性，作为代码设计和实现的基石


### 什么是封装

<desc>类通过暴露有限的访问接口，授权外部仅能通过类提供的方式（或者叫函数）来访问内部信息或者数据</desc>

``` javascript
class Wallet {
  private id: string;
  private balance: number;
  constructor() {
  	this.id = IdGenerator.getInstance().genterate()
  	this.balance = 0
  }
  public getId() string {
  	return this.id;
  }
  public increaseBlance() void {

  }
  public decreaseBlance() void {

  }
}
```
<desc>对于封装这个特性，我们需要编程语言本身提供一定的语法机制来支持。这个语法机制就是访问权限控制： private, public</desc>
Note: 解释：如果我们对类中属性的访问不做限制，那任何代码都可以访问、修改类中的属性，虽然这样看起来更加灵活，但从另一方面来说，过度灵活也意味着不可控，属性可以随意被以各种奇葩的方式修改，而且修改逻辑可能散落在代码中的各个角落，势必影响代码的可读性、可维护性


### 什么是抽象

<desc>抽象讲的是如何隐藏方法的具体实现，让调用者只需要关心方法提供了哪些功能，并不需要知道这些功能是如何实现的</desc>


Interface
```javascript
type Picture = string

interface IPictureStore {
	savePicture(picture: Picture): void
	getPicture(id: string): Picture
}
class IPictureStore implements IPictureStore {
	public savePicture(picture: Picture) {
		console.log('保存了图片', picture)
	}
	public getPicture(id: string):Picture {
		console.log('获取了图片', id)
		const resPic:Picture = '获取的图片'
		return resPic
	}
}

const testPicStore = new IPictureStore()
const picture: Picture = '一张图片'

testPicStore.savePicture(picture)
testPicStore.getPicture('id')
```


abstract

```javascript
abstract class PictureStoreConfig {
	abstract savePicture(picture: Picture): void
	abstract getPicture(id: string): Picture
}

class PictureStore2 extends PictureStoreConfig {
	public savePicture(picture: Picture) {
		console.log('保存了图片', picture)
	}
	public getPicture(id: string):Picture {
		console.log('获取了图片', id)
		const resPic:Picture = '获取的图片'
		return resPic
	}
}

const testPicStore2 = new PictureStore2()
const picture2: Picture = '一张图片'

testPicStore2.savePicture(picture2)
testPicStore2.getPicture('id')

```