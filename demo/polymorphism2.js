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