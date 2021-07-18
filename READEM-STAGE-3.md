# 程序设计模式 && 架构设计初探

## 设计原则：
 
### KISS原则
尽量保持简单

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

性能？
过度优化？

本身就复杂的问题，用复杂的方法解决，并不违背 KISS 原则。
比如KMP 算法

如何写出满足KISS原则的代码：
* 不要使用同时可能不懂的技术实现代码，以及编程语言的一些高级用法
* 不要重复造轮子，善于使用工具库
* 不要过度优化（位运算等）

### YAGNI 原则
You Ain't Gonna Need it
### DRY ？ 重复代码？
Don't repeat yourself

功能语义重复
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
违反了单一职责原则 和 接口隔离原则

反而 实现逻辑不重复，但是语义重复

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
```
上面的代码其实违反的DRY原则： email 校验了2次


代码复用性：

* 代码复用表示一种行为：我们在开发新功能的时候，尽量复用已经存在的代码。
* 代码的可复用性表示一段代码可被复用的特性或能力：我们在编写代码的时候，让代码尽量可复用。
* DRY 原则是一条原则：不要写重复的代码。从定义描述上，它们好像有点类似，但深究起来，三者的区别还是蛮大的。

“不重复” 并不代表“可复用”

“复用” 和 “可复用性”

如何提高可复用性：

1. 减少代码耦合
2. 满足单一职责原则
3. 模块化
4. 业务和非业务逻辑分离
5. 通用代码下层
6. 继承，多态，抽象，封装
7. 应用模板等设计模式

注意： 除非有非常明确的复用需求，否则，为了暂时用不到的复用需求，花费太多的时间、精力，投入太多的开发成本，并不是一个值得推荐的做法。这也违反我们之前讲到的 YAGNI 原则。

### LOD迪米特法则： 每个模块（unit）只应该了解那些与它关系密切的模块（units: only units “closely” related to the current unit）的有限知识（knowledge）。或者说，每个模块只和自己的朋友“说话”（talk），不和陌生人“说话”（talk）。

“高内聚、松耦合”是一个非常重要的设计思想，能够有效地提高代码的可读性和可维护性，缩小功能改动导致的代码改动范围。

“高内聚”用来指导类本身的设计，“松耦合”用来指导类与类之间依赖关系的设计

所谓高内聚，就是指相近的功能应该放到同一个类中，不相近的功能不要放到同一个类中。

所谓松耦合是说，在代码中，类与类之间的依赖关系简单清晰。即使两个类有依赖关系，一个类的代码改动不会或者很少导致依赖类的代码改动。


```javascript
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
```


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



// 1. 构造函数 中 downloadHTml 逻辑复杂，不应放在构造函数中，影响代码可读性
// 2。HtmlDownloader 对象在构造函数中通过new来创建，违反了基于接口而非实现编程的设计思想
// 3. 从业务上 Document 网页文档没必要毅力啊HtmlDownloader，违背了迪米特法则



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

一个序列化和反序列化的例子： 高内聚 ？ 迪米特法则

通过implents 有限接口

controller  -> VO (View Object) 
service  -> BO (Business Object)
repository -> Entity






















































