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


abstract vs interface

<desc>抽象类： // 不允许被实例化，只能被继承，可以包括属性和方法，子类继承必须全部实现 (功能)</desc>

<desc>接口类： // 不能包含属性（成员变量），无代码实现，类实现必须实现接口中的所有方法 （协议）</desc>

<desc>(当然这里typescipt 是有点区别的， abstract runtime, interface complier)</desc>


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



### 面向对象 vs 面向过程

<desc>面向过程和面向对象最基本的区别就是，代码的组织方式不同。面向过程风格的代码被组织成了一组方法集合及其数据结构，方法和数据结构的定义是分开的。面向对象风格的代码被组织成一组类，方法和数据结构被绑定一起，定义在类中</desc>


```javascript
// 传统的面向过程开发
function upCaseTxt(str) {
	return str.toUpperCase()
}
function trimTxt(str) {
	return str.trim()
}
function readFormatFile(filePath) {
	let res = fs.readFileSync(filePath, 'utf-8')
	res = upCaseTxt(res)
	res = trimTxt(res)
	return res
}
function main() {
	readFormatFile('./xxx.txt')
}
```


### 面向对象相比面向过程编程的优势

1. OOP 更加能够应对大规模复杂程序的开发
2. OOP 风格的代码更易复用、易扩展、易维护
3. OOP 语言更加人性化、更加高级、更加智能


### 虚假的面向对象编程 
1. 滥用getter, setter方法
```javascript
class ShoppintCart {
	private itemCount: number;
	private totolPrice: number;
	private items: Array<ShopingCartItem>

	public getItemsCount(): number {
		return this.itemsCount
	}
	public setItemsCount(itemCount: number) {
		this.itemCount = itemCount
	}
	public getTotalPrice(): number {
		return this.totolPrice
	}
	public setTotalPrice(totalPrice: number) {
		this.totolPrice = totalPrice
	}
	public getItems(): Array<ShopingCartItem> {
		return this.items
	}
	public addItem(item: ShopingCartItem): ShopingCartItem {
		// ...
		return item
	}
}
```
Note:1.而面向对象封装的定义是：通过访问权限控制，隐藏内部数据，外部仅能通过类提供的有限的接口访问、修改内部数据。所以，暴露不应该暴露的 setter 方法，明显违反了面向对象的封装特性。数据没有访问权限控制，任何代码都可以随意修改它，代码就退化成了面向过程编程风格的了 2. getItem 是的 外部代码依旧可以修改 items 的值 （返回一个数据的拷贝）（TODO, 看看能不能给个示例代码）


2. 滥用全局变量和全局方法

Constants 类： （ini, yaml文件，或者拆解）

Utils存在的意义：
Note: Utils 类的出现是基于这样一个问题背景：如果我们有两个类 A 和 B，它们要用到一块相同的功能逻辑，为了避免代码重复，我们不应该在两个类中，将这个相同的功能逻辑，重复地实现两遍。这个时候我们该怎么办呢？实际上，只包含静态方法不包含任何属性的 Utils 类，是彻彻底底的面向过程的编程风格。但这并不是说，我们就要杜绝使用 Utils 类了。实际上，从刚刚讲的 Utils 类存在的目的来看，它在软件开发中还是挺有用的，能解决代码复用问题。所以，这里并不是说完全不能用 Utils 类，而是说，要尽量避免滥用，不要不加思考地随意去定义 Utils 类。


3. 定义数据和方法分离的类

<desc>我们再来看最后一种面向对象编程过程中，常见的面向过程风格的代码。那就是，数据定义在一个类中，方法定义在另一个类中</desc>
Note: 后续领域模型的时候会讲


### 再谈面向对象

<font color="DeepSkyBlue">基于接口而非实现编程</font>

```javascript
class QiniuyunImageStore {
    public createBucketIfNotExisting(buckName: string):void {}
    public generateAccessToken():string {}
    public uploadToQiniu(image: Image, bucketName: string, accsssToken: string): string {}
    public downloadFromQiniu(url: string, accessToken: string): Image {}
}
```


问题：
1. 函数命名不能暴露细节：uploadToQiniu
2. 封装具体的实现细节： 
3. 为实现类定义抽象的接口：

```javascript
interface ImageStore {
    upload(image: Image, bucketName: string): string
    download(url: string): Image
}
public class QiniuyunImageStore implents ImageStore {
    public upload(image: Image, bucketName: string): string {}
    public download(url: string): Image {}
    private createBucketIfNotExisting(bucketName: string) {}
    private generateAccessToken(): string {}
}
```


### 再谈面向对象

<font color="DeepSkyBlue">继承：是否必要</font>

```javascript
abstract class AbstractBird {
    abstract fly(): void
}

public class qq extends AbstractBird {
    public fly(): void {
        throw new Error("I can't fly")
    }
}
// 派生会飞的鸟的类？ 不会飞的鸟的类？
```


问题：
继承层次过深、继承关系过于复杂会影响到代码的可读性和可维护性
```javascript
interface Flyable {
    fly(): void
}
interface Tweetable {
    tweet(): void
}
class rooster implements Flyable, Tweetable {
    fly():void{}
    tweet():void{}
}
```


<desc>如果类之间的继承结构稳定（不会轻易改变），继承层次比较浅（比如，最多有两层继承关系），继承关系不复杂，我们就可以大胆地使用继承。反之，系统越不稳定，继承层次很深，继承关系复杂，我们就尽量使用组合来替代继承。除此之外，还有一些设计模式会固定使用继承或者组合。比如，装饰者模式（decorator pattern）、策略模式（strategy pattern）、组合模式（composite pattern）等都使用了组合关系，而模板模式（template pattern）使用了继承关系。</desc>


### 再谈面向对象

<font color="DeepSkyBlue">贫血模式(mvc架构) vs DDD领域模型</font>


传统的贫血模式MVC架构：（Repositry层，Service层，Controller层）

<desc>存在只包含数据，不包含业务逻辑的类，就叫做贫血模型</desc>
Note: 这里展示tech-doc项目的结构


DDD 领域模型

<desc>所谓DDD领域模型（即充血模型：数据和对应的业务逻辑呗封装在同一个类中）：领域驱动设计，即 DDD，主要是用来指导如何解耦业务系统，划分业务模块，定义业务领域模型及其交互</desc>

[DDD(java)](https://tech.meituan.com/2017/12/22/ddd-in-practice.html)

[DDD(react)](https://blog.codeminer42.com/scalable-frontend-1-architecture-9b80a16b8ec7/)
Note: 后面的一些模式将会对这些有更深的理解




### 函数编程

1. 与面向对象编程 和 面向过程编程并列；
2. 特征：函数是第一等公民；强调将计算分解成可服用的函数；只有纯的，没有副作用的函数


函数合成 && 函数柯里化
```javascript
// 函数的合成（如果一个值要经过多个函数才能编程另一个值，那么我们可以把中间的步骤合并成一个函数，这个叫做函数的合成）

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

// 函数柯里化
function addX(y) {
    return function() {
        return x + y
    }
}
addX(2)(1) //3
```


响应式 && 函数式 编程集大成者 - rxjs

```javascript
import { fromEvent } from 'rxjs';
import { throttleTime, map, scan } from 'rxjs/operators';

fromEvent(document, 'click')
  .pipe(
    throttleTime(1000),
    map(event => event.clientX),
    scan((count, clientX) => count + clientX, 0)
  )
  .subscribe(count => console.log(count));
```



## 设计原则


### 单一职责原则
一个类负责一个完成一个职责（功能）

```javascript
class UserInfo {
   private userId: number;
   private userName: string;
   private email: string;
   private phone: string;
   private access: Array<string>
}
```
<desc>1. 类中代码行数,函数，属性； 2. 依赖的类过多； 3. 私有方法过多；4.比较难起合适的名字</desc>
Note: 我们可以先写一个粗粒度的类，满足业务需求。随着业务的发展，如果粗粒度的类越来越庞大，代码越来越多，这个时候，我们就可以将这个粗粒度的类，拆分成几个更细粒度的类。这就是所谓的持续重构


### 开闭原则
对拓展开放，对修改关闭

<desc>添加一个新的功能应该是，在已有代码基础上扩展代码（新增模块、类、方法等），而非修改已有代码（修改模块、类、方法等）; 在 23 种经典设计模式中，大部分设计模式都是为了解决代码的扩展性问题而存在的，主要遵从的设计原则就是开闭原则</desc>


Bad Case:
```javascript 
// 如何增加一个新的告警类型：每秒钟接口数超过多少的告警
class Alert {
   private rule: AlertRule; 
   private notification: Notification;

   constructor() {
      // ...
   }
   public Alert(rule: AlertRule, notification: Notification): void { 
      this.rule = rule; 
      this.notification = notification; 
   }
   public check(api: string, requestCount: number , errorCount: number, durationOfSeconds:number): void { 
      var tps = requestCount / durationOfSeconds;
      if (tps > rule.getMatchedRule(api).getMaxTps()) { 
          notification.notify(NotificationEmergencyLevel.URGENCY, "...");
      } 
      if (errorCount > rule.getMatchedRule(api).getMaxErrorCount()) { 
          notification.notify(NotificationEmergencyLevel.SEVERE, "...");
      } 
   }
 }
``` 


Good Case:
```javascript
class Alert {
   private alertHandlers = new Array<AlertHandler>();
   public addAlertHandler(alertHandler: AlertHandler): void { 
      this.alertHandlers.add(alertHandler); 
   }
   public check(apiStatInfo: ApiStatInfo): void{ 
      for (AlertHandler handler : alertHandlers) { 
         handler.check(apiStatInfo); 
      } 
   }
}

class ApiStatInfo {
   private api: string;
   private requestCount: number;
   private errorCount: number;
   private durationOfSeconds: number;
}

abstract class AlertHandler {
   protected rule: AlertRule
   protected notification: Notification
   public AlertHandler(rule: AlertRule, notification: Notification) { 
      this.rule = rule
      this.notification = notification
   } 
   public abstract check(ApiStatInfo apiStatInfo) : void;
}

public class TpsAlertHandler extends AlertHandler { 
   public TpsAlertHandler(rule: AlertRule, notification: Notification) { 
      super(rule, notification); 
   }
   public check(ApiStatInfo apiStatInfo): void { 
      long tps = apiStatInfo.getRequestCount()/ apiStatInfo.getDurationOfSeconds(); 
      if (tps > rule.getMatchedRule(apiStatInfo.getApi()).getMaxTps()) { 
         notification.notify(NotificationEmergencyLevel.URGENCY, "..."); 
      } 
   }
}

// 调用方：
class ApplicationContext { 
   private alertRule: AlertRule
   private notification: Notification
   private alert: Alert
   public initializeBeans(): void { 
      alertRule = new AlertRule(/*.省略参数.*/) //省略一些初始化代码 
      notification = new Notification(/*.省略参数.*/); //省略一些初始化代码 
      alert = new Alert(); 
      alert.addAlertHandler(new TpsAlertHandler(alertRule, notification)); 
      alert.addAlertHandler(new ErrorAlertHandler(alertRule, notification)); 
   }
   public Alert getAlert(): Alert { return alert; } 
   // 饿汉式单例 
   private static readonly instance: ApplicationContext = new ApplicationContext();
   private ApplicationContext() { initializeBeans(); } 
   public static ApplicationContext getInstance() { return instance; }
}

// 使用
const apiStatInfo: ApiStatInfo = new ApiStatInfo();
ApplicationContext.getInstance().getAlert().check(apiStatInfo);

```


### LSP (里氏替换规则)
对拓展开放，对修改关闭


Case
```javascript
class Transporter {
   private httpClient: HttpClient; 
   public Transporter(httpClient: HttpClient) { 
      this.httpClient = httpClient; 
   } 
   public Response sendRequest(request: Request) { 
      // ...use httpClient to send request
   }
}
public class SecurityTransporter extends Transporter { 
   private appId: string
   private appToken: string
   public SecurityTransporter(httpClient: HttpClient , appId: string, appToken:string) { 
      super(httpClient)
      this.appId = appId
      this.appToken = appToken
   }  
   public sendRequest(request: Request): Response { 
      if (StringUtils.isNotBlank(appId) && StringUtils.isNotBlank(appToken)) {      
         request.addPayload("app-id", appId)
         request.addPayload("app-token", appToken)
      } 
      // 这里如果抛出一场就不符合   里氏替换 原则了 
      return super.sendRequest(request)
   }
}

function demoFunction(transporter : Transporter): void {
   request: Reuqest = new Request();
   response: Response = transporter.sendRequest(request);
}
// 里氏替换
demoFunction(new SecurityTransporter(/*省略参数*/))
//在上面的代码中，子类 SecurityTransporter 的设计完全符合里式替换原则，可以替换父类出现的任何位置，并且原来代码的逻辑行为不变且正确性也没有被破坏。
```


常见不符合里氏替换规则方式：
1. 子类违背父类声明要实现的功能
2. 子类违背父类对输入、输出、异常的约定
3. 子类违背父类注释中所罗列的任何特殊说明


### 接口隔离原则
直译成中文的话就是：客户端不应该被强迫依赖它不需要的接口。其中的“客户端”，可以理解为接口的调用者或者使用者。 

<desc>所谓接口</desc>
<desc>1. 一组api接口结合 2. 单个Api 接口或函数 3. OOP中的接口概念</desc>


Case1
```javascript
interface UserService { 
   register(String cellphone, String password): boolean;
   login(String cellphone, String password): boolean ;
   getUserInfoById(long id): UserInfo;
   getUserInfoByCellphone(String cellphone): UserInfo;
}

public class UserServiceImpl implements UserService { 
//...
}
// 这里思考我们如果需要删除用户的接口呢 ？ 

interface RestrictedUserService { 
   deleteUserByCellphone(String cellphone): boolean; 
   deleteUserById(long id): boolean;
}
public class UserServiceImpl implements UserService, RestrictedUserService {
 // ...省略实现代码...
}
```

<desc>在设计微服务或者类库接口的时候，如果部分接口只被部分调用者使用，那我们就需要将这部分接口隔离出来，单独给对应的调用者使用，而不是强迫其他调用者也依赖这部分不会被用到的接口。</desc>


Case2:

```javascript
class KeepLodapConfig {
   private userName: string;
   private userZhName: string;
   constructor() {
      //..
   } 
   public getAddress(): string {
      //..
   } 
}
class KeepODConfig {}
class KeepUserConfig {}

//需求1: 需要RecordUser记录当前用户，但是KeepUserConfig 是不需要

interface Recorder {
   record(): void
}
public class KeepLodapConfig implements Recorder {
   public record(): void {

   }
}
public class KeepODConfig implements Recorder {
   public record(): void {
      
   }
}
public class KeepUserConfig {

}
public class ScheduleRecorder {
   private readonly executor: ScheduleRecorderService = Executors.newSingleThreadScheduledExecutor();
   private initialDelayInSeconds: number;
   private periodInSeconds: number;
   private recorder : Recorder;

   constructor(recorder: Recorder, periodInSeconds: number, initialDelayInSeconds: number) {
      this.recorder = recorder;
      this.periodInSeconds = periodInSeconds;
      this.initialDelayInSeconds = initialDelayInSeconds;
   }
   public run(): void {
      executor.scheduleAtFixedRate(new Runnable() {
         public run():void {
            recorder.record()
         }
      }, this.periodInSeconds, this.initialDelayInSeconds, TimeUnit.SECONDS)
   }
}

keepUserConfig: KeepUserConfig = new KeepUserConfig()
keepOdConfig: KeepODConfig = new KeepODConfig()
keepLdapConfig: KeepLodapConfig = new KeepLodapConfig()

keepOdScheduleRecorder: ScheduleRecorder = new ScheduleRecorder(keepOdConfig, 30, 30)
keepLodapScheduleRecorder: ScheduleRecorder = new ScheduleRecorder(keepLdapConfig, 300, 300)

```


### 依赖反转 / 控制反转 / 依赖注入 原则


### 控制反转case (被调用方)
```javascript
class KeepSomeService {
   // 各种逻辑
   public static doTest (): boolean {

   }
}
// ...
const kss: KeepSomeService = new KeepSomeService()
if(kss.doTest) {
   console.log('Test Success')
} else {
   console.log('Test failed')
}
```


### 控制反转case (使用方)
```javascript
abstract class TestCase {
   public run(): void {
      if(doTest()) {
         console.log('Test Success')
      } else {
         console.log('Test failed')
      }
   }
   public abstract doTest(): boolean
}

class JunitApplication {
   private static readonly testCases: Array<Testcase> = new Array<Testcase>();
   public static register(testcase: Testcase):void {
      testCases.add(testcase)
   }
   public static main(): void {
      for (case in this.testCases) { case.run(); }
   }
}
// 这里可以想下 vuessr 的 asyncData 的设计逻辑（主要是思想）
```
<desc>框架提供了一个可扩展的代码骨架，用来组装对象、管理整个执行流程。程序员利用框架进行开发的时候，只需要往预留的扩展点上，添加跟自己业务相关的代码，就可以利用框架来驱动整个程序流程的执行</desc>


### 依赖注入
<desc>不通过 new() 的方式在类内部创建依赖类对象，而是将依赖的类对象在外部创建好之后，通过构造函数、函数参数等方式传递（或注入）给类使用</desc>


Case
```javascript
// 非依赖注入实现方式
class MessageSender { 
   public void send(cellphone: string, message: string) {
    //.... 
   }
}

class Notification { 
   private messageSender: MessageSender;
   public Notification() { 
   this.messageSender = new MessageSender();
 } 
 public void sendMessage(cellphone: string, message: string) { 
   //...省略校验逻辑等... 
   this.messageSender.send(cellphone, message);
 }
}

notification: Notification = new Notification();

// 依赖注入的方式

public class Notification {
   private messageSender: MessageSender; 
   // 通过构造函数将messageSender传递进来 
   public Notification(messageSender: MessageSender) {
      this.messageSender = messageSender; 
   } 
   public void sendMessage(cellphone: string, message: string) {
      //...省略校验逻辑等... 
      this.messageSender.send(cellphone, message); 
   }
}
//使用Notification
messageSender: MessageSender = new MessageSender();
notification: Notification = new Notification(messageSender);
```

<desc>通过依赖注入的方式来将依赖的类对象传递进来，这样就提高了代码的扩展性，我们可以灵活地替换依赖的类。</desc>


### 依赖注入框架

<font size="5">简单配置一下所有需要创建的类对象、类与类之间的依赖关系，就可以实现由框架来自动创建对象、管理对象的生命周期、依赖注入等原本需要程序员来做的事情</font>


Q: 被依赖模块已经被其他管理器初始化了，那么依赖模块要怎么获取这个模块呢？

A: 1. 自己去问 ; 2. 别人主动给你;


Case
```javascript
// 父级组件提供 'theme'
var Provider = {
  provide: {
    theme: 'dark'
  },
  // ...
}

// 子组件注入 'theme'
var Child = {
  inject: ['theme'],
  created () {
    console.log(this.theme) // => "dark"
  }
  // ...
}
```

<font size="5">文档链接：</font>

[angular 相关 ](https://angular.cn/guide/architecture-services)
[vue 相关 ](https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5)
[react 相关 ](https://reactjs.org/docs/context.html)


### 依赖反转原则

<font size="5">高层模块（high-level modules）不要依赖低层模块（low-level）。高层模块和低层模块应该通过抽象（abstractions）来互相依赖。除此之外，抽象（abstractions）不要依赖具体实现细节（details），具体实现细节（details）依赖抽象（abstractions）</font>


### KISS原则 
尽量保持简单


case
```javascript 
// 判断输入的字符串IpAddress 是否为合法的IP地址
// 方法一
function isValidIpAddressV1(ipAddress: string) {
   if(ipAddress.length = 0) {
      return false
   }
   const regex = new RegExp("^(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|[1-9])\\." + "(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\." + "(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\." + "(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)$");

   return regex.test(ipAddress)
}
// 方法二
function isValidIpAddressV2(ipAddress: string) {
   // 通过split 截取，然后对每一段进行处理判断（相对于使用了一些常规的js方法）
}
// 方法三
function isValidIpAddressV3(ipAddress: string) {
   // 逐字符串读取，判断是否合法（这里是用原生的方法）(charCodeAt)
}
```
<desc>性能？过度优化？ </desc>
<desc>本身就复杂的问题，用复杂的方法解决，并不违背 KISS 原则。</desc>


KISS 原则 建议：

* <font size="5">不要使用同时可能不懂的技术实现代码，以及编程语言的一些高级用法</font>
* <font size="5">不要重复造轮子，善于使用工具库</font>
* <font size="5">要过度优化（位运算等</font>


### YAGNI 原则 && DRY 原则
<font size="5">（You Ain't Gonna Need it）&& （Don't repeat yourself）</font>


Case
```javascript
function isValideUsername(username: string) boolean {
   if(username.length <= 0) {
      return false
   }
   if(username.length < 4 || user.name.length > 64) {
      return false
   }
   if(username.toLowerCase() !== username) {
      return false
   }
   for (let i =0; i < username.length; i++) {
      let c = username.charAt(i)
      if(!(c >= 'a' && c <= 'z') || (c >= '0' || c <= '9') || c ==".") {
         return false
      }
   }
   return true
}
function isValidPassword(pwd: string) boolean {
   if(pwd.length <= 0) {
      return false
   }
   if(pwd.length < 4 || user.name.length > 64) {
      return false
   }
   if(pwd.toLowerCase() !== pwd) {
      return false
   }
   for (let i =0; i < pwd.length; i++) {
      let c = pwd.charAt(i)
      if(!(c >= 'a' && c <= 'z') || (c >= '0' || c <= '9') || c ==".") {
         return false
      }
   }
   return true
}
// isValidUsernameOrPassword
```
<desc>大量的代码逻辑重复？</desc>

<desc>isValidUsernameOrPassword: 违反了单一职责原则 和 接口隔离原则</desc>
Note: 实现逻辑不重复? 语义重复? 代码逻辑重复


Bad Case:
```javascript
class UserService {
   private userRepo: userRepo;
   public login(email: string, password: string) User {
      let existed = userRepo.checkIfUserExisted(email, password);
      if (!existed) {
        // ... throw AuthenticationFailureException... 
      }
      user: User = userRepo.getUserByEmail(email); 
      return user;
   }
}

class UserRepo {
   public  checkIfUserExisted(email: string, password: string) boolean { 
      if (!EmailValidation.validate(email)) { 
         // ... throw InvalidEmailException... 
      } 
      if (!PasswordValidation.validate(password)) { 
      // ... throw InvalidPasswordException... 
      } 
      //...query db to check if email&password exists... 
   } 
   public getUserByEmail(email: string) User {
    if (!EmailValidation.validate(email)) { 
    // ... throw InvalidEmailException... 
      } 
      //...query db to get user by email... 
  }
}
// 上面的代码其实违反的DRY原则： email 校验了2次
```


### DRY原则注意：

* <font size="5">“不重复” 并不代表“可复用”</font>
* <font size="5">除非有非常明确的复用需求，否则，为了暂时用不到的复用需求，花费太多的时间、精力，投入太多的开发成本，并不是一个值得推荐的做法。这也违反我们之前讲到的 YAGNI 原则</font>


### LOD迪米特法则 (实现高内聚，松耦合)

<font size="5"> 每个模块（unit）只应该了解那些与它关系密切的模块（units: only units “closely” related to the current unit）的有限知识（knowledge）。或者说，每个模块只和自己的朋友“说话”（talk），不和陌生人“说话”（talk）</font>


### 高内聚，松耦合

* <font size="5">“高内聚、松耦合”是一个非常重要的设计思想，能够有效地提高代码的可读性和可维护性，缩小功能改动导致的代码改动范围。</font>
* <font size="5">“高内聚”用来指导类本身的设计，“松耦合”用来指导类与类之间依赖关系的设计</font>
* <font size="5">所谓高内聚，就是指相近的功能应该放到同一个类中，不相近的功能不要放到同一个类中。</font>
* <font size="5">所谓松耦合是说，在代码中，类与类之间的依赖关系简单清晰。即使两个类有依赖关系，一个类的代码改动不会或者很少导致依赖类的代码改动。</font>


Case

```javascript
// 一个爬虫需求
class NetwrokTransporter {
   public send(htmlRequest: HtmlRequest) {

   }
}

class HtmlDownloader {
   private transporter: NetwrokTransporter
   public downloadHtml(url: string) {
      rawHtm = transporter.send(new HtmlRequest(url))
      return new Html(rawHtml)
   }
}

class Document {
   private html: Html;
   private url: string

   construnctor(url: string) {
      this.url = url;
      downloader: HtmlDownloader = new HtmlDownloader();
      this.html = downloader.downloadHtml(url)
   }
}
// NetworkTransporter 底层网路通信，参数确是HtmlRequest, 不能仅服务于html
// Document构造函数 中 downloadHTml 逻辑复杂，不应放在构造函数中，影响代码可读性
// HtmlDownloader 对象在构造函数中通过new来创建，违反了基于接口而非实现编程的设计思想
// 从业务上 Document 网页文档没必要依赖HtmlDownloader，违背了迪米特法则

```


Good Case

```javascript
class NetworkTransporter { 
// 省略属性和其他方法... 
   public send(address: string, data) { 
   //... 
   }
}
class HtmlDownloader { 
   private transporter: NetworkTransporter;
   //通过构造函数或IOC注入 
   // HtmlDownloader这里也要有相应的修改 
   public Html downloadHtml(url: string) { 
      htmlRequest: HtmlRequest = new HtmlRequest(url);
      rawHtml = transporter.send( 
         htmlRequest.getAddress(), 
         htmlRequest.getContent().getBytes()
      );
     return new Html(rawHtml); 
   }
}
class Document {
   private html: Html;
   private url: string;

   construnctor(url: string, html: string) {
      this.html = html;
      this.url = url
   }
}
class DocumentFactory {
   private downloader: HtmlDownloader;
   construnctor(downloader: HtmlDownloader) {
      this.downloader = downloader
   }
   public createDocument(url: string) {
      html: Html = downloader.downloadHtml(url)
      return new Document(url, html)
   }
}

```



### 谈谈前端语言于设计模式


浅谈三大语言框架（封装单位）：
* <font size="5">Angular: 封装单位为class, 具有天生自解性，所以代码可读性，可维护性比其他封装结构高的多 </font>
*  <font size="5">React: 封装单位为function, 函数的封装性保证其返回结果只由输入决定，运行过程中不会产生其他变化，即React 的 不变性和副作用（直接在函数中运行其他函数会有副作用）</font>
*  <font size="5">Vue: proxy Object 对象进行封装</font>


### 换个角度看我们的 Vue 代码（函数式 / 响应式）


#### 事件的监听取消 与 组件销毁

```javascript
// v-if 和 tool.vue的逻辑 举了3个例子，推荐vue api 的 watchEffect
```
<desc>为了防止多余的执行（性能），我们需要在组件销毁的时候 中断后续操作</desc>


##### 依赖生命周期的开发模式？
```
// tool.vue HiCompositon.vue 关于author 的例子
```
<desc>并不是说 生命周期不好，而是生命周期对应响应式开发是没有联系的，这点react就很好，useLayoutEffect / useEffect，vue 的 watch / watchEffect 绕过生命周期</desc>


### 如何在 js及框架中 控制反转/依赖注入

1. Provide && Inject (Vue, React)

```javascript
// 这里这看 react-demo 的 AppPrivide的code
```


2. 通过装饰器实现 依赖注入


#### 实现依赖注入

decorator
```javascript
// HelloKeep.vue demo
```


reflect-metadata
```javascript
@Reflect.metadata('inClass', 'A')
class Test {
  @Reflect.metadata('inMethod', 'B')
  public hello(): string {
    return 'hello world';
  }
}

console.log(Reflect.getMetadata('inClass', Test)); // 'A'
console.log(Reflect.getMetadata('inMethod', new Test(), 'hello')); // 'B'

// 使用demo 里面 relfect 的例子
```

<desc>我们可以看到 reflect-metadata 可以对类的属性，类，方法进行反射分析，利用这个特性我们可以实现对 类 依赖的第三方类收集以及实例化</desc>


#### 实现依赖注入

```javascript
import 'reflect-metadata'
type Constructor<T = any> = new (...args: any[]) => T;

const Injectable = (): ClassDecorator => target => { 
  console.log(target)
};
class AuthService {
  token = 'LDAPTOKEN';
}
@Injectable()
class RouterService {
  constructor(public readonly authService: AuthService) {}

  testMethod() {
    console.log(this.authService.token);
  }
}
const Factory = <T>(target: Constructor<T>): T => {
  // 获取所有注入的服务
  const providers = Reflect.getMetadata('design:paramtypes', target); // [AuthService]
  const args = providers.map((provider: Constructor) => new provider());
  return new target(...args);
};

Factory(RouterService).testMethod();
```
<desc>这里是通过 Factory 做 loc 的控制器，但是观察 @injectable()的也是可以可以获得构造函数的，所以可以利用这个作依赖验证</desc>


高阶版本：
```javascript
// 详见代码
```

Vue版本：
```javascript
// 详见代码(HelloKeep.vue)
```


### SOA面向服务架构 到 DDD 领域模型


#### SOA
<font size="5">SOA： 面向服务架构：把系统按照实际业务，拆分成刚刚好大小的、合适的、独立部署的模块，每个模块之间相互独立。</font>

<font size="5">针对前端项目而言，就是对功能单元的拆分，区别于传统组件值拆分 视图 和 内部逻辑，结合之前的 LOC / DI</font>

[文章推荐](https://juejin.cn/post/6968666544914038820)  

<desc>但是Vue 相较 React 的好处是不用担心组件重绘</desc>


#### 数据聚合
```javascript
// about.vue 的 案例：
```
<desc>往往我们上层组件获得数据的时候往往需要组装扔给下层数据</desc>
<desc>1. 我们需要组装数据；2.我们如何保证数据的可被监听性</desc>


#### 所谓LIFT文件结构

<font size="5"> LIFT文件划分：力求：快速定位 (Locate) 代码、一眼识别 (Identify) 代码、 尽量保持扁平结构 (Flattest) 和尝试 (Try) 遵循 DRY (Do Not Repeat Yourself, 不重复自己) 原则 </font>


#### DDD

[DDD(react)](https://blog.codeminer42.com/scalable-frontend-1-architecture-9b80a16b8ec7/)


#### 题外话 Keepfe 支持的 tsx + @compostion/api 的写法
<desc>展示</desc>



### 设计模式
[git推荐,23种设计模式](https://github.com/FantZero/Design-Pattern.git)



### 终章
程序设计思想，原则都是相通的，都是为了架构设计铺垫

<desc>其实这里推荐看看nest.js的代码</desc>
