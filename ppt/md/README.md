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


再谈抽象

<desc>抽象这个概念是一个非常通用的设计思想，并不单单用在面向对象编程中，也可以用来指导架构设计等。而且这个特性也并不需要编程语言提供特殊的语法机制来支持，只需要提供“函数”这一非常基础的语法机制，就可以实现抽象特性、所以，它没有很强的“特异性”，有时候并不被看作面向对象编程的特性之一。</desc>

 <font color="DeepSkyBlue" size="4">基于接口而非实现编程、开闭原则（对扩展开放、对修改关闭）、代码解耦（降低代码的耦合性)</font>
Note:类的方法是通过编程语言中的“函数”这一语法机制来实现的。通过函数包裹具体的实现逻辑，这本身就是一种抽象。即：通过函数包裹的具体的实现逻辑，这本身就是一种抽象。而抽象作为一种只关注功能点不关注实现的设计思路，正好帮我们的大脑过滤掉许多非必要的信息</desc>


### 什么是继承

<desc>假如两个类有一些相同的属性和方法，我们就可以将这些相同的部分，抽取到父类中，让两个子类继承父类。这样，两个子类就可以重用父类中的代码，避免代码重复写多遍</desc>

```javascript
class MyError extends Error {
  constructor(message: string) {
    super(message)
  }
}
console.log(new MyError("这是我的报错"))
```
Note: 继承的概念很好理解，也很容易使用。不过，过度使用继承，继承层次过深过复杂，就会导致代码可读性、可维护性变差。为了了解一个类的功能，我们不仅需要查看这个类的代码，还需要按照继承关系一层一层地往上查看“父类、父类的父类……”的代码。还有，子类和父类高度耦合，修改父类的代码，会直接影响到子类。


### 什么是多态
```javascript
// 继承加方法重写
abstract class Animal{
  public name:string;
  constructor(name:string){
    this.name=name;
  }
  abstract eat():any;
  run(){
    console.log('非抽象方法，不要子类实现、重写');
  }
}
 
class  Dog extends Animal{
  eat(){
    return this.name + "吃肉";
  }
}
 
class Cat extends Animal{
  eat(){
    return this.name + "吃鱼";
  }
}
 
var dog = new Dog("tom");
var cat = new Cat("kitty");
console.log(dog.eat());
console.log(cat.eat());
// 接口类实现多态（略）
```


ducking-type
```javascript
var dog = {
    name: 'tom',
    eat: function() {
    return this.name + "吃肉";
    }
};

var cat = {
    name: 'kitty',
    eat: function() {
    return this.name + "吃鱼";
    }
}

var EatFactory = function(animal) {
    if(animal && typeof animal.eat === 'function') {
        console.log(animal.eat())
    }
}

EatFactory(dog);
EatFactory(cat); 
```


再谈多态

<desc>多态是指子类可以替换父类，在实际的代码运行过程中，调用子类的方法实现。多态这种特性也需要编程语言提供特殊的语法机制来实现，比如继承、接口类、duck-typing。多态可以提高代码的扩展性和复用性，是很多设计模式、设计原则、编程技巧的代码实现基础。</desc>
