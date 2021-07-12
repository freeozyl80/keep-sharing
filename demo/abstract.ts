// abstract
abstract class Animal{
  public name: string;
  constructor(name:string){
      this.name=name;
  }
  public abstract eat():any;
  run(){
      console.log('非抽象方法，不要子类实现、重写');
  }
}

class  Dog extends Animal{
  eat(): string {
     return this.name+"吃肉";
  }
}

var dog =new Dog("tom");
console.log(dog.eat());
// override

class SomeComponent {
  show() {
    console.log('Simple show')
  }
  hide() {
    // ...
  }
}
class SpecializedComponent extends SomeComponent {
  show() {
    super.show()
    console.log('Conflict show')
  }
  hide() {
    // ...
  }
}

const sc = new SpecializedComponent()
sc.show()
// 


interface Entity {
  title: string;
  log(): void;
}
 
// 实现这样一个接口
class Post implements Entity {
  title: string;
 
  constructor(title: string) {
    this.title = title;
  }
 
  log(): void {
    console.log(this.title);
  }

}

var p = new Post("test")
p.log()


const test : Array<number> = new Array<number>(1,2,3)
console.log(test)