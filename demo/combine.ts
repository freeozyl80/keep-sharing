interface Flyable {
    fly(): void
}
interface Tweetable {
    tweet(): void
}
class rooster implements Flyable, Tweetable {
    fly():void{
      console.log('fly')
    }
    tweet():void{
      console.log('tweet')
    }
}
var xx = new rooster()
xx.fly()