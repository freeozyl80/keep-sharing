# 程序设计模式 && 架构设计初探

## 设计原则：

### 单一原则:  一个类负责一个完成一个职责（功能）
### 开闭原则： 对拓展开放，对修改关闭
       添加一个新的功能应该是，在已有代码基础上扩展代码（新增模块、类、方法等），而非修改已有代码（修改模块、类、方法等）
   		 在 23 种经典设计模式中，大部分设计模式都是为了解决代码的扩展性问题而存在的，主要遵从的设计原则就是开闭原则。

   
```javascript 
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
   // 增加一个每秒钟接口超时请求个数 超过 预先值 的告警


   改进：

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

### 里氏替换法则

子类对象（object of subtype/derived class）能够替换程序（program）中父类对象（object of base/parent class）出现的任何地方，并且保证原来程序的逻辑行为（behavior）不变及正确性不被破坏。
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
		return super.sendRequest(request)
	}
}

function demoFunction(transporter : Transporter): void {
	request: Reuqest = new Request();
	response: Response = transporter.sendRequest(request);
}
demoFunction(new SecurityTransporter(/*省略参数*/))
```

哪些代码违背了 LSP (按照协议来设定)
1. 子类违背父亲类 声明的实现的功能
2. 子类违背父类 对输入，输出，异常的约定
3. 子类违背父类注释中所罗列的任何特殊说明

### 接口隔离原则

直译成中文的话就是：客户端不应该被强迫依赖它不需要的接口。其中的“客户端”，可以理解为接口的调用者或者使用者。 

所谓接口： 1. 一组api接口结合 2. 单个Api 接口或函数 3. OOP中的接口概念

1.
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

interface RestrictedUserService { 
	deleteUserByCellphone(String cellphone): boolean; 
	deleteUserById(long id): boolean;
}
public class UserServiceImpl implements UserService, RestrictedUserService {
 // ...省略实现代码...
}
```
在设计微服务或者类库接口的时候，如果部分接口只被部分调用者使用，那我们就需要将这部分接口隔离出来，单独给对应的调用者使用，而不是强迫其他调用者也依赖这部分不会被用到的接口。

2. 把“接口”理解为单个 API 接口或函数
计数器：

不过，你应该已经发现，接口隔离原则跟单一职责原则有点类似，不过稍微还是有点区别。单一职责原则针对的是模块、类、接口的设计。而接口隔离原则相对于单一职责原则，一方面它更侧重于接口的设计，另一方面它的思考的角度不同。它提供了一种判断接口是否职责单一的标准：通过调用者如何使用接口来间接地判定。如果调用者只使用部分接口或接口的部分功能，那接口的设计就不够职责单一。

3. OOP中的接口概念


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

// RecordUser

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
//


// 假设我们又个需求
```

### 依赖反转原则

控制反转 / 依赖注入

* 控制反转 loc

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
```
1. 注册
2. 添加调用中心

框架提供了一个可扩展的代码骨架，用来组装对象、管理整个执行流程。程序员利用框架进行开发的时候，只需要往预留的扩展点上，添加跟自己业务相关的代码，就可以利用框架来驱动整个程序流程的执行。

这里的“控制”指的是对程序执行流程的控制，而“反转”指的是在没有使用框架之前，程序员自己控制整个程序的执行。在使用框架之后，整个程序的执行流程可以通过框架来控制。流程的控制权从程序员“反转”到了框架。

* 依赖注入（DI）
那到底什么是依赖注入呢？我们用一句话来概括就是：不通过 new() 的方式在类内部创建依赖类对象，而是将依赖的类对象在外部创建好之后，通过构造函数、函数参数等方式传递（或注入）给类使用。

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

通过依赖注入的方式来将依赖的类对象传递进来，这样就提高了代码的扩展性，我们可以灵活地替换依赖的类。这一点在我们之前讲“开闭原则”的时候也提到过

> 依赖注入框架：

简单配置一下所有需要创建的类对象、类与类之间的依赖关系，就可以实现由框架来自动创建对象、管理对象的生命周期、依赖注入等原本需要程序员来做的事情

注入到依赖模块中

被依赖模块已经被其他管理器初始化了，那么依赖模块要怎么获取这个模块呢？

有两种方式：

1. 自己去问
2. 别人主动给你

Provide / inject   // theme

```javascript
// 父级组件提供 'foo'
var Provider = {
  provide: {
    foo: 'bar'
  },
  // ...
}

// 子组件注入 'foo'
var Child = {
  inject: ['foo'],
  created () {
    console.log(this.foo) // => "bar"
  }
  // ...
}
```
[angular 相关](https://angular.cn/guide/architecture-services)
[vue 相关](https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5)
[react 相关](https://reactjs.org/docs/context.html)

* 依赖反转

高层模块（high-level modules）不要依赖低层模块（low-level）。高层模块和低层模块应该通过抽象（abstractions）来互相依赖。除此之外，抽象（abstractions）不要依赖具体实现细节（details），具体实现细节（details）依赖抽象（abstractions）。

* 再谈前端框架的应用






