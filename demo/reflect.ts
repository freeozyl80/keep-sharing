import 'reflect-metadata';

function Prop() {
  return (target:any , key: string) => {
    const type = Reflect.getMetadata('design:type', target, key);
    console.log(`${key} type: ${type.name}`);
    // other...
  };
}

class SomeClass {
  @Prop()
  public Aprop!: string;
}
var sc = new SomeClass()
console.log(sc)
