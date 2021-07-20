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
