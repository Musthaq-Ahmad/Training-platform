> [](#p-YG3CSlP9V6)An abstract data type is realized by writing a special kind of program \[…\] which defines the type in terms of the operations which can be performed on it.

![Illustration of a rabbit next to its prototype, a schematic representation of a rabbit](https://eloquentjavascript.net/img/chapter_picture_6.jpg)

[](#p-Fhc38BpV1K)[Chapter 4](https://eloquentjavascript.net/04_data.html) introduced JavaScript’s objects as containers that hold other data. In programming culture, _object-oriented programming_ is a set of techniques that use objects as the central principle of program organization. Though no one really agrees on its precise definition, object-oriented programming has shaped the design of many programming languages, including JavaScript. This chapter describes the way these ideas can be applied in JavaScript.

## [](#h-3RxBerAxmw)Abstract Data Types

[](#p-eNejU48PIs)The main idea in object-oriented programming is to use objects, or rather _types_ of objects, as the unit of program organization. Setting up a program as a number of strictly separated object types provides a way to think about its structure and thus to enforce some kind of discipline, preventing everything from becoming entangled.

[](#p-yhX9plqp8k)The way to do this is to think of objects somewhat like you’d think of an electric mixer or other consumer appliance. The people who design and assemble a mixer have to do specialized work requiring material science and understanding of electricity. They cover all that up in a smooth plastic shell so that the people who only want to mix pancake batter don’t have to worry about all that—they have to understand only the few knobs that the mixer can be operated with.

[](#p-DCKe4JumwB)Similarly, an _abstract data type_, or _object class_, is a subprogram that may contain arbitrarily complicated code but exposes a limited set of methods and properties that people working with it are supposed to use. This allows large programs to be built up out of a number of appliance types, limiting the degree to which these different parts are entangled by requiring them to only interact with each other in specific ways.

[](#p-mYO5GEpl2m)If a problem is found in one such object class, it can often be repaired or even completely rewritten without impacting the rest of the program. Even better, it may be possible to use object classes in multiple different programs, avoiding the need to recreate their functionality from scratch. You can think of JavaScript’s built-in data structures, such as arrays and strings, as such reusable abstract data types.

[](#p-tyK5Q1Zja4)Each abstract data type has an _interface_, the collection of operations that external code can perform on it. Any details beyond that interface are _encapsulated_, treated as internal to the type and of no concern to the rest of the program.

[](#p-JdDMZDr/nS)Even basic things like numbers can be thought of as an abstract data type whose interface allows us to add them, multiply them, compare them, and so on. In fact, the fixation on single _objects_ as the main unit of organization in classical object-oriented programming is somewhat unfortunate since useful pieces of functionality often involve a group of different object classes working closely together.

## [](#h-fkrGgDyRWc)Methods

[](#p-Pu7Fh3a5uT)In JavaScript, methods are nothing more than properties that hold function values. This is a simple method:

[](#c-gpJkdAdyIu)function speak(line) {
console.log(\`The ${this.type} rabbit says '${line}'\`);
}
let whiteRabbit = {type: "white", speak};
let hungryRabbit = {type: "hungry", speak};

whiteRabbit.speak("Oh my fur and whiskers");

hungryRabbit.speak("Got any carrots?");

[](#p-mV9fNbDP5i)Typically a method needs to do something with the object on which it was called. When a function is called as a method—looked up as a property and immediately called, as in `object.method()`—the binding called `this` in its body automatically points at the object on which it was called.

[](#p-llBwR5t6LB)You can think of `this` as an extra parameter that is passed to the function in a different way than regular parameters. If you want to provide it explicitly, you can use a function’s `call` method, which takes the `this` value as its first argument and treats further arguments as normal parameters.

[](#c-TCnkkQJ0hO)speak.call(whiteRabbit, "Hurry");

[](#p-8ZeOAlGKXe)Since each function has its own `this` binding whose value depends on the way it is called, you cannot refer to the `this` of the wrapping scope in a regular function defined with the `function` keyword.

[](#p-EHZMeuTOUD)Arrow functions are different—they do not bind their own `this` but can see the `this` binding of the scope around them. Thus, you can do something like the following code, which references `this` from inside a local function:

[](#c-pPGE9nUDA9)let finder = {
find(array) {
return array.some(v => v == this.value);
},
value: 5
};
console.log(finder.find(\[4, 5\]));

[](#p-eBm7AuQUBb)A property like `find(array)` in an object expression is a shorthand way of defining a method. It creates a property called `find` and gives it a function as its value.

[](#p-YkWiHcMuVP)If I had written the argument to `some` using the `function` keyword, this code wouldn’t work.

## [](#h-SumMlRB7yn)Prototypes

[](#p-Xey+sIju1M)One way to create a rabbit object type with a `speak` method would be to create a helper function that has a rabbit type as its parameter and returns an object holding that as its `type` property and our speak function in its `speak` property.

[](#p-1rvfUl6glP)All rabbits share that same method. Especially for types with many methods, it would be nice if there were a way to keep a type’s methods in a single place, rather than adding them to each object individually.

[](#p-Gr4D0QWq9y)In JavaScript, _prototypes_ are the way to do that. Objects can be linked to other objects, to magically get all the properties that other object has. Plain old objects created with `{}` notation are linked to an object called `Object.prototype`.

[](#c-P0GVdA5c8J)let empty = {};
console.log(empty.toString);

console.log(empty.toString());

[](#p-brQdKaRo2W)It looks like we just pulled a property out of an empty object. But in fact, `toString` is a method stored in `Object.prototype`, meaning it is available in most objects.

[](#p-Bf6y/uAWB+)When an object gets a request for a property that it doesn’t have, its prototype will be searched for the property. If that doesn’t have it, the _prototype’s_ prototype is searched, and so on until an object without prototype is reached (`Object.prototype` is such an object).

[](#c-OQZG/UHNHD)console.log(Object.getPrototypeOf({}) == Object.prototype);

console.log(Object.getPrototypeOf(Object.prototype));

[](#p-72z+PtqY66)As you’d guess, `Object.getPrototypeOf` returns the prototype of an object.

[](#p-I5k2LdMhlJ)Many objects don’t directly have `Object.prototype` as their prototype but instead have another object that provides a different set of default properties. Functions derive from `Function.prototype` and arrays derive from `Array.prototype`.

[](#c-u0Ich5CNwz)console.log(Object.getPrototypeOf(Math.max) ==
Function.prototype);

console.log(Object.getPrototypeOf(\[\]) == Array.prototype);

[](#p-1fIXMD62Nu)Such a prototype object will itself have a prototype, often `Object.prototype`, so that it still indirectly provides methods like `toString`.

[](#p-3gbFvusn2U)You can use `Object.create` to create an object with a specific prototype.

[](#c-VtvGZpf42G)let protoRabbit = {
speak(line) {
console.log(\`The ${this.type} rabbit says '${line}'\`);
}
};
let blackRabbit = Object.create(protoRabbit);
blackRabbit.type = "black";
blackRabbit.speak("I am fear and darkness");

[](#p-y8kzFoQw1W)The “proto” rabbit acts as a container for the properties shared by all rabbits. An individual rabbit object, like the black rabbit, contains properties that apply only to itself—in this case its type—and derives shared properties from its prototype.

## [](#h-7RhGr+474h)Classes

[](#p-UUexyXQvqM)JavaScript’s prototype system can be interpreted as a somewhat free-form take on abstract data types or classes. A _class_ defines the shape of a type of object—what methods and properties it has. Such an object is called an _instance_ of the class.

[](#p-GhnffIpINq)Prototypes are useful for defining properties for which all instances of a class share the same value. Properties that differ per instance, such as our rabbits’ `type` property, need to be stored directly in the objects themselves.

[](#p-CblAFY2NtT)To create an instance of a given class, you have to make an object that derives from the proper prototype, but you _also_ have to make sure it itself has the properties that instances of this class are supposed to have. This is what a _constructor_ function does.

[](#c-oOKUeIzSVa)function makeRabbit(type) {
let rabbit = Object.create(protoRabbit);
rabbit.type = type;
return rabbit;
}

[](#p-l0nhds/qNG)JavaScript’s class notation makes it easier to define this type of function, along with a prototype object.

[](#c-kK/n/pIZ0u)class Rabbit {
constructor(type) {
this.type = type;
}
speak(line) {
console.log(\`The ${this.type} rabbit says '${line}'\`);
}
}

[](#p-36Q8vg+cYn)The `class` keyword starts a class declaration, which allows us to define a constructor and a set of methods together. Any number of methods may be written inside the declaration’s braces. This code has the effect of defining a binding called `Rabbit`, which holds a function that runs the code in `constructor` and has a `prototype` property that holds the `speak` method.

[](#p-aj+QKGR28Z)This function cannot be called like a normal function. Constructors, in JavaScript, are called by putting the keyword `new` in front of them. Doing so creates a fresh instance object whose prototype is the object from the function’s `prototype` property, then runs the function with `this` bound to the new object, and finally returns the object.

[](#c-1bL3TMgYRb)let killerRabbit = new Rabbit("killer");

[](#p-uM0RM9gow9)In fact, `class` was only introduced in the 2015 edition of JavaScript. Any function can be used as a constructor, and before 2015, the way to define a class was to write a regular function and then manipulate its `prototype` property.

[](#c-IPS9bWussR)function ArchaicRabbit(type) {
this.type = type;
}
ArchaicRabbit.prototype.speak = function(line) {
console.log(\`The ${this.type} rabbit says '${line}'\`);
};
let oldSchoolRabbit = new ArchaicRabbit("old school");

[](#p-CuN6BIS6u9)For this reason, all non-arrow functions start with a `prototype` property holding an empty object.

[](#p-DJG7BO1oTU)By convention, the names of constructors are capitalized so that they can easily be distinguished from other functions.

[](#p-XAOLARTe5Y)It is important to understand the distinction between the way a prototype is associated with a constructor (through its `prototype` property) and the way objects _have_ a prototype (which can be found with `Object.getPrototypeOf`). The actual prototype of a constructor is `Function.prototype` since constructors are functions. The constructor function’s `prototype` _property_ holds the prototype used for instances created through it.

[](#c-Q/QbNN+9Zh)console.log(Object.getPrototypeOf(Rabbit) ==
Function.prototype);

console.log(Object.getPrototypeOf(killerRabbit) ==
Rabbit.prototype);

[](#p-oW8JeJp9jN)Constructors will typically add some per-instance properties to `this`. It is also possible to declare properties directly in the class declaration. Unlike methods, such properties are added to instance objects and not the prototype.

[](#c-KBHDrbFbxX)class Particle {
speed = 0;
constructor(position) {
this.position = position;
}
}

[](#p-pp17mMu8If)Like `function`, `class` can be used both in statements and in expressions. When used as an expression, it doesn’t define a binding but just produces the constructor as a value. You are allowed to omit the class name in a class expression.

[](#c-79re+GWcTJ)let object = new class { getWord() { return "hello"; } };
console.log(object.getWord());

## [](#h-u5kICdau5v)Private Properties

[](#p-0kMziy4cl6)It is common for classes to define some properties and methods for internal use that are not part of their interface. These are called _private_ properties, as opposed to _public_ ones, which are part of the object’s external interface.

[](#p-E/yzjVpbO7)To declare a private method, put a `#` sign in front of its name. Such methods can be called only from inside the `class` declaration that defines them.

[](#c-U0DV3Ggb4o)class SecretiveObject {
#getSecret() {
return "I ate all the plums";
}
interrogate() {
let shallISayIt = this.#getSecret();
return "never";
}
}

[](#p-d2Q4Im6O0z)When a class does not declare a constructor, it will automatically get an empty one.

[](#p-tXQlrwa/XV)If you try to call `#getSecret` from outside the class, you get an error. Its existence is entirely hidden inside the class declaration.

[](#p-hJqUlSNXnj)To use private instance properties, you must declare them. Regular properties can be created by just assigning to them, but private properties _must_ be declared in the class declaration to be available at all.

[](#p-ff1k57/G7r)This class implements an appliance for getting a random whole number below a given maximum number. It has only one public property: `getNumber`.

[](#c-2bWeku8FvK)class RandomSource {
#max;
constructor(max) {
this.#max = max;
}
getNumber() {
return Math.floor(Math.random() \* this.#max);
}
}

## [](#h-oUlUep3Os8)Overriding derived properties

[](#p-Xbxf2Ooo0z)When you add a property to an object, whether it is present in the prototype or not, the property is added to the object _itself_. If there was already a property with the same name in the prototype, this property will no longer affect the object, as it is now hidden behind the object’s own property.

[](#c-iJAj/t1TcS)Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);

killerRabbit.teeth = "long, sharp, and bloody";
console.log(killerRabbit.teeth);

console.log((new Rabbit("basic")).teeth);

console.log(Rabbit.prototype.teeth);

[](#p-HM5YtS3KgJ)The following diagram sketches the situation after this code has run. The `Rabbit` and `Object` prototypes lie behind `killerRabbit` as a kind of backdrop, where properties that are not found in the object itself can be looked up.

![A diagram showing the object structure of rabbits and their prototypes. There is a box for the 'killerRabbit' instance (holding instance properties like 'type'), with its two prototypes, 'Rabbit.prototype' (holding the 'speak' method) and 'Object.prototype' (holding methods like 'toString') stacked behind it.](https://eloquentjavascript.net/img/rabbits.svg)

[](#p-or3/lz1DV8)Overriding properties that exist in a prototype can be a useful thing to do. As the rabbit teeth example shows, overriding can be used to express exceptional properties in instances of a more generic class of objects while letting the nonexceptional objects take a standard value from their prototype.

[](#p-GIhnbh3MdO)Overriding is also used to give the standard function and array prototypes a different `toString` method than the basic object prototype.

[](#c-DrIRvUgeOD)console.log(Array.prototype.toString ==
Object.prototype.toString);

console.log(\[1, 2\].toString());

[](#p-tEz1fkdb8y)Calling `toString` on an array gives a result similar to calling `.join(",")` on it—it puts commas between the values in the array. Directly calling `Object.prototype.toString` with an array produces a different string. That function doesn’t know about arrays, so it simply puts the word _object_ and the name of the type between square brackets.

[](#c-XpqFUrDFJE)console.log(Object.prototype.toString.call(\[1, 2\]));

## [](#h-gAcc11EHzV)Maps

[](#p-5v6QzULS7C)We saw the word _map_ used in the [previous chapter](https://eloquentjavascript.net/05_higher_order.html#map) for an operation that transforms a data structure by applying a function to its elements. Confusing as it is, in programming the same word is used for a related but rather different thing.

[](#p-++bw9zDmtH)A _map_ (noun) is a data structure that associates values (the keys) with other values. For example, you might want to map names to ages. It is possible to use objects for this.

[](#c-Wu6a8ObZI0)let ages = {
Boris: 39,
Liang: 22,
Júlia: 62
};

console.log(\`Júlia is ${ages\["Júlia"\]}\`);

console.log("Is Jack's age known?", "Jack" in ages);

console.log("Is toString's age known?", "toString" in ages);

[](#p-EQqc7pcOKT)Here, the object’s property names are the people’s names and the property values are their ages. But we certainly didn’t list anybody named toString in our map. Yet because plain objects derive from `Object.prototype`, it looks like the property is there.

[](#p-yMkxwxMZzl)For this reason, using plain objects as maps is dangerous. There are several possible ways to avoid this problem. First, you can create objects with _no_ prototype. If you pass `null` to `Object.create`, the resulting object will not derive from `Object.prototype` and can be safely used as a map.

[](#c-AkRQLQc4AG)console.log("toString" in Object.create(null));

[](#p-jGC2iO9E1x)Object property names must be strings. If you need a map whose keys can’t easily be converted to strings—such as objects—you cannot use an object as your map.

[](#p-7YowpbSrOa)Fortunately, JavaScript comes with a class called `Map` that is written for this exact purpose. It stores a mapping and allows any type of keys.

[](#c-dd6KsGgAGP)let ages = new Map();
ages.set("Boris", 39);
ages.set("Liang", 22);
ages.set("Júlia", 62);

console.log(\`Júlia is ${ages.get("Júlia")}\`);

console.log("Is Jack's age known?", ages.has("Jack"));

console.log(ages.has("toString"));

[](#p-iIdp+mGl3Y)The methods `set`, `get`, and `has` are part of the interface of the `Map` object. Writing a data structure that can quickly update and search a large set of values isn’t easy, but we don’t have to worry about that. Someone else did it for us, and we can go through this simple interface to use their work.

[](#p-tx3xnowcEp)If you do have a plain object that you need to treat as a map for some reason, it is useful to know that `Object.keys` returns only an object’s _own_ keys, not those in the prototype. As an alternative to the `in` operator, you can use the `Object.hasOwn` function, which ignores the object’s prototype.

[](#c-KF6ERT9sZf)console.log(Object.hasOwn({x: 1}, "x"));

console.log(Object.hasOwn({x: 1}, "toString"));

## [](#h-mJ/JHQRHg9)Polymorphism

[](#p-ozkqUookhO)When you call the `String` function (which converts a value to a string) on an object, it will call the `toString` method on that object to try to create a meaningful string from it. I mentioned that some of the standard prototypes define their own version of `toString` so they can create a string that contains more useful information than `"[object Object]"`. You can also do that yourself.

[](#c-DFhau0z7K/)Rabbit.prototype.toString = function() {
return \`a ${this.type} rabbit\`;
};

console.log(String(killerRabbit));

[](#p-2VOQNtgVXK)This is a simple instance of a powerful idea. When a piece of code is written to work with objects that have a certain interface—in this case, a `toString` method—any kind of object that happens to support this interface can be plugged into the code and will be able to work with it.

[](#p-phZ92zNL98)This technique is called _polymorphism_. Polymorphic code can work with values of different shapes, as long as they support the interface it expects.

[](#p-kGs0fDpreh)An example of a widely used interface is that of array-like objects that have a `length` property holding a number and numbered properties for each of their elements. Both arrays and strings support this interface, as do various other objects, some of which we’ll see later in the chapters about the browser. You can call most array methods—such as `Array.prototype.forEach`—on anything that provides this interface.

[](#c-8an+KU+XJV)Array.prototype.forEach.call({
length: 2,
0: "A",
1: "B"
}, elt => console.log(elt));

## [](#h-3vwredi8nD)Getters, setters, and statics

[](#p-0aNGN4nEbh)Interfaces often contain plain properties, not just methods. For example, `Map` objects have a `size` property that tells you how many keys are stored in them.

[](#p-SdyGtj5JbS)It is not necessary for such an object to compute and store such a property directly in the instance. Even properties that are accessed directly may hide a method call. Such methods are called _getters_ and are defined by writing `get` in front of the method name in an object expression or class declaration.

[](#c-Np05mJ4GVO)let varyingSize = {
get size() {
return Math.floor(Math.random() \* 100);
}
};

console.log(varyingSize.size);

console.log(varyingSize.size);

[](#p-QwpqNIZOsS)Whenever someone reads from this object’s `size` property, the associated method is called. You can do a similar thing when a property is written to, using a _setter_.

[](#c-7LQG88c1BA)class Temperature {
constructor(celsius) {
this.celsius = celsius;
}
get fahrenheit() {
return this.celsius \* 1.8 + 32;
}
set fahrenheit(value) {
this.celsius = (value - 32) / 1.8;
}

static fromFahrenheit(value) {
return new Temperature((value - 32) / 1.8);
}
}

let temp = new Temperature(22);
console.log(temp.fahrenheit);

temp.fahrenheit = 86;
console.log(temp.celsius);

[](#p-Hf3p+suFR+)The `Temperature` class allows you to read and write the temperature in either degrees Celsius or degrees Fahrenheit, but internally it stores only Celsius and automatically converts to and from Celsius in the `fahrenheit` getter and setter.

[](#p-MwIs1kR0mD)Sometimes you want to attach some properties directly to your constructor function rather than to the prototype. Such methods won’t have access to a class instance but can, for example, be used to provide additional ways to create instances.

[](#p-zLJ2u9mlXs)Inside a class declaration, methods or properties that have `static` written before their name are stored on the constructor. For example, the `Temperature` class allows you to write `Temperature.fromFahrenheit(100)` to create a temperature using degrees Fahrenheit.

[](#c-hoPF4gIATO)let boil = Temperature.fromFahrenheit(212);
console.log(boil.celsius);

## [](#h-Iq1mTp65i3)Symbols

[](#p-Ydrs4O9rtA)I mentioned in [Chapter 4](https://eloquentjavascript.net/04_data.html#for_of_loop) that a `for`/`of` loop can loop over several kinds of data structures. This is another case of polymorphism—such loops expect the data structure to expose a specific interface, which arrays and strings do. And we can also add this interface to our own objects! But before we can do that, we need to briefly take a look at the symbol type.

[](#p-1ABqhLFM+9)It is possible for multiple interfaces to use the same property name for different things. For example, on array-like objects, `length` refers to the number of elements in the collection. But an object interface describing a hiking route could use `length` to provide the length of the route in meters. It would not be possible for an object to conform to both these interfaces.

[](#p-0YTuRI/cjH)An object trying to be a route and array-like (maybe to enumerate its waypoints) is somewhat far-fetched, and this kind of problem isn’t that common in practice. For things like the iteration protocol, though, the language designers needed a type of property that _really_ doesn’t conflict with any others. So in 2015, _symbols_ were added to the language.

[](#p-7u3zfC6CYV)Most properties, including all those we have seen so far, are named with strings. But it is also possible to use symbols as property names. Symbols are values created with the `Symbol` function. Unlike strings, newly created symbols are unique—you cannot create the same symbol twice.

[](#c-z1x4NrbIJu)let sym = Symbol("name");
console.log(sym == Symbol("name"));

Rabbit.prototype\[sym\] = 55;
console.log(killerRabbit\[sym\]);

[](#p-PBxnKMHKqV)The string you pass to `Symbol` is included when you convert it to a string and can make it easier to recognize a symbol when, for example, showing it in the console. But it has no meaning beyond that—multiple symbols may have the same name.

[](#p-n90pM44NAN)Being both unique and usable as property names makes symbols suitable for defining interfaces that can peacefully live alongside other properties, no matter what their names are.

[](#c-647+NgW7T5)const length = Symbol("length");
Array.prototype\[length\] = 0;

console.log(\[1, 2\].length);

console.log(\[1, 2\]\[length\]);

[](#p-BaMC3Q+KCx)It is possible to include symbol properties in object expressions and classes by using square brackets around the property name. That causes the expression between the brackets to be evaluated to produce the property name, analogous to the square bracket property access notation.

[](#c-Ajzpyt+E+3)let myTrip = {
length: 2,
0: "Lankwitz",
1: "Babelsberg",
\[length\]: 21500
};
console.log(myTrip\[length\], myTrip.length);

## [](#h-z2tOOXM8qO)The iterator interface

[](#p-MuKK1lR2TY)The object given to a `for`/`of` loop is expected to be _iterable_. This means it has a method named with the `Symbol.iterator` symbol (a symbol value defined by the language, stored as a property of the `Symbol` function).

[](#p-gs0GMX9PA7)When called, that method should return an object that provides a second interface, _iterator_. This is the actual thing that iterates. It has a `next` method that returns the next result. That result should be an object with a `value` property that provides the next value, if there is one, and a `done` property, which should be true when there are no more results and false otherwise.

[](#p-a9jQxjOo3t)Note that the `next`, `value`, and `done` property names are plain strings, not symbols. Only `Symbol.iterator`, which is likely to be added to a _lot_ of different objects, is an actual symbol.

[](#p-wSWGcm7dId)We can directly use this interface ourselves.

[](#c-CKTaBW3WjJ)let okIterator = "OK"\[Symbol.iterator\]();
console.log(okIterator.next());

console.log(okIterator.next());

console.log(okIterator.next());

[](#p-W3uMNuwlXY)Let’s implement an iterable data structure similar to the linked list from the exercise in [Chapter 4](https://eloquentjavascript.net/04_data.html). We’ll write the list as a class this time.

[](#c-gbtYx+2BOB)class List {
constructor(value, rest) {
this.value = value;
this.rest = rest;
}

get length() {
return 1 + (this.rest ? this.rest.length : 0);
}

static fromArray(array) {
let result = null;
for (let i = array.length - 1; i >= 0; i--) {
result = new this(array\[i\], result);
}
return result;
}
}

[](#p-BUyEDXn/QN)Note that `this`, in a static method, points at the constructor of the class, not an instance—there is no instance around when a static method is called.

[](#p-mVl963he9a)Iterating over a list should return all the list’s elements from start to end. We’ll write a separate class for the iterator.

[](#c-DdCDPJPgdV)class ListIterator {
constructor(list) {
this.list = list;
}

next() {
if (this.list == null) {
return {done: true};
}
let value = this.list.value;
this.list = this.list.rest;
return {value, done: false};
}
}

[](#p-N8qXdZBlps)The class tracks the progress of iterating through the list by updating its `list` property to move to the next list object whenever a value is returned and reports that it is done when that list is empty (null).

[](#p-Iu3bFayPkp)Let’s set up the `List` class to be iterable. Throughout this book, I’ll occasionally use after-the-fact prototype manipulation to add methods to classes so that the individual pieces of code remain small and self contained. In a regular program, where there is no need to split the code into small pieces, you’d declare these methods directly in the class instead.

[](#c-o1rzfIRpoY)List.prototype\[Symbol.iterator\] = function() {
return new ListIterator(this);
};

[](#p-E7+RwcKNya)We can now loop over a list with `for`/`of`.

[](#c-mtRaGo5zew)let list = List.fromArray(\[1, 2, 3\]);
for (let element of list) {
console.log(element);
}

[](#p-1/0HTvmJYu)The `...` syntax in array notation and function calls similarly works with any iterable object. For example, you can use `[...value]` to create an array containing the elements in an arbitrary iterable object.

[](#c-h/UOuG536h)console.log(\[..."PCI"\]);

## [](#h-/a3bnONnws)Inheritance

[](#p-s4f4wqT5wi)Imagine we need a list type much like the `List` class we saw before, but because we will be asking for its length all the time, we don’t want it to have to scan through its `rest` every time. Instead, we want to store the length in every instance for efficient access.

[](#p-iJREewMgVn)JavaScript’s prototype system makes it possible to create a _new_ class, much like the old class, but with new definitions for some of its properties. The prototype for the new class derives from the old prototype but adds a new definition for, say, the `length` getter.

[](#p-yxSbbf8oT4)In object-oriented programming terms, this is called _inheritance_. The new class inherits properties and behavior from the old class.

[](#c-bM/xGe1d1z)class LengthList extends List {
#length;

constructor(value, rest) {
super(value, rest);
this.#length = super.length;
}

get length() {
return this.#length;
}
}

console.log(LengthList.fromArray(\[1, 2, 3\]).length);

[](#p-EbjAUADbj8)The use of the word `extends` indicates that this class shouldn’t be directly based on the default `Object` prototype but on some other class. This is called the _superclass_. The derived class is the _subclass_.

[](#p-nuE67XuPmk)To initialize a `LengthList` instance, the constructor calls the constructor of its superclass through the `super` keyword. This is necessary because if this new object is to behave (roughly) like a `List`, it is going to need the instance properties that lists have.

[](#p-RmJyDDSWTz)The constructor then stores the list’s length in a private property. If we had written `this.length` there, the class’s own getter would have been called, which doesn’t work yet since `#length` hasn’t been filled in yet. We can use `super.something` to call methods and getters on the superclass’s prototype, which is often useful.

[](#p-apvJjMYcsg)Inheritance allows us to build slightly different data types from existing data types with relatively little work. It is a fundamental part of the object-oriented tradition, alongside encapsulation and polymorphism. But while the latter two are now generally regarded as wonderful ideas, inheritance is more controversial.

[](#p-CWDhzksvzb)Whereas encapsulation and polymorphism can be used to _separate_ pieces of code from one another, reducing the tangledness of the overall program, inheritance fundamentally ties classes together, creating _more_ tangle. When inheriting from a class, you usually have to know more about how it works than when simply using it. Inheritance can be a useful tool to make some types of programs more succinct, but it shouldn’t be the first tool you reach for, and you probably shouldn’t actively go looking for opportunities to construct class hierarchies (family trees of classes).

## [](#h-Fdk67dJHwg)The instanceof operator

[](#p-wnmK5D9foe)It is occasionally useful to know whether an object was derived from a specific class. For this, JavaScript provides a binary operator called `instanceof`.

[](#c-wtZ2QK2G5a)console.log(
new LengthList(1, null) instanceof LengthList);

console.log(new LengthList(2, null) instanceof List);

console.log(new List(3, null) instanceof LengthList);

console.log(\[1\] instanceof Array);

[](#p-+hFJQaiLG6)The operator will see through inherited types, so a `LengthList` is an instance of `List`. The operator can also be applied to standard constructors like `Array`. Almost every object is an instance of `Object`.

## [](#h-ErccPg/l98)Summary

[](#p-ZoMazvCyv8)Objects do more than just hold their own properties. They have prototypes, which are other objects. They’ll act as if they have properties they don’t have as long as their prototype has that property. Simple objects have `Object.prototype` as their prototype.

[](#p-A+dQsxCVz8)Constructors, which are functions whose names usually start with a capital letter, can be used with the `new` operator to create new objects. The new object’s prototype will be the object found in the `prototype` property of the constructor. You can make good use of this by putting the properties that all values of a given type share into their prototype. There’s a `class` notation that provides a clear way to define a constructor and its prototype.

[](#p-AFyYjRH+5G)You can define getters and setters to secretly call methods every time an object’s property is accessed. Static methods are methods stored in a class’s constructor rather than its prototype.

[](#p-U1iTgKNfyX)The `instanceof` operator can, given an object and a constructor, tell you whether that object is an instance of that constructor.

[](#p-LOAETrspuz)One useful thing to do with objects is to specify an interface for them and tell everybody that they are supposed to talk to your object only through that interface. The rest of the details that make up your object are now _encapsulated_, hidden behind the interface. You can use private properties to hide a part of your object from the outside world.

[](#p-nz8jafatnY)More than one type may implement the same interface. Code written to use an interface automatically knows how to work with any number of different objects that provide the interface. This is called _polymorphism_.

[](#p-fg/ZL+fqD3)When implementing multiple classes that differ in only some details, it can be helpful to write the new classes as _subclasses_ of an existing class, _inheriting_ part of its behavior.

## [](#h-TcUD2vzyMe)Exercises

### [](#i-zO8FRQBMAy)A vector type

[](#p-YtkHcQdZSH)Write a class `Vec` that represents a vector in two-dimensional space. It takes `x` and `y` parameters (numbers), that it saves to properties of the same name.

[](#p-7B3ixqpWia)Give the `Vec` prototype two methods, `plus` and `minus`, that take another vector as a parameter and return a new vector that has the sum or difference of the two vectors’ (`this` and the parameter) _x_ and _y_ values.

[](#p-F5nP+jpza3)Add a getter property `length` to the prototype that computes the length of the vector—that is, the distance of the point (_x_, _y_) from the origin (0, 0).

[](#c-f3P62tUJWH)

console.log(new Vec(1, 2).plus(new Vec(2, 3)));

console.log(new Vec(1, 2).minus(new Vec(2, 3)));

console.log(new Vec(3, 4).length);

Display hints...

[](#p-jRIa414Yh5)Look back to the `Rabbit` class example if you’re unsure how `class` declarations look.

[](#p-2lTcnsjfvm)Adding a getter property to the constructor can be done by putting the word `get` before the method name. To compute the distance from (0, 0) to (x, y), you can use the Pythagorean theorem, which says that the square of the distance we are looking for is equal to the square of the x-coordinate plus the square of the y-coordinate. Thus, √(x2 + y2) is the number you want. `Math.sqrt` is the way you compute a square root in JavaScript and `x ** 2` can be used to square a number.

### [](#i-rpYp9Ou4LG)Groups

[](#p-1TnXiDoyR2)The standard JavaScript environment provides another data structure called `Set`. Like an instance of `Map`, a set holds a collection of values. Unlike `Map`, it does not associate other values with those—it just tracks which values are part of the set. A value can be part of a set only once—adding it again doesn’t have any effect.

[](#p-IBo4QI1mvy)Write a class called `Group` (since `Set` is already taken). Like `Set`, it has `add`, `delete`, and `has` methods. Its constructor creates an empty group, `add` adds a value to the group (but only if it isn’t already a member), `delete` removes its argument from the group (if it was a member), and `has` returns a Boolean value indicating whether its argument is a member of the group.

[](#p-cHm3PZ0L5i)Use the `===` operator, or something equivalent such as `indexOf`, to determine whether two values are the same.

[](#p-CbJ60eqr+J)Give the class a static `from` method that takes an iterable object as its argument and creates a group that contains all the values produced by iterating over it.

[](#c-dNauaecKx+)class Group {

}

let group = Group.from(\[10, 20\]);
console.log(group.has(10));

console.log(group.has(30));

group.add(10);
group.delete(10);
console.log(group.has(10));

Display hints...

[](#p-fQA7KS4poU)The easiest way to do this is to store an array of group members in an instance property. The `includes` or `indexOf` methods can be used to check whether a given value is in the array.

[](#p-/dVCq4SNi6)Your class’s constructor can set the member collection to an empty array. When `add` is called, it must check whether the given value is in the array or add it otherwise, possibly using `push`.

[](#p-GVg0o9XSa+)Deleting an element from an array, in `delete`, is less straightforward, but you can use `filter` to create a new array without the value. Don’t forget to overwrite the property holding the members with the newly filtered version of the array.

[](#p-uNRo2OReFq)The `from` method can use a `for`/`of` loop to get the values out of the iterable object and call `add` to put them into a newly created group.

### [](#i-djD3XDJ27V)Iterable groups

[](#p-azaOoj0ezw)Make the `Group` class from the previous exercise iterable. Refer to the section about the iterator interface earlier in the chapter if you aren’t clear on the exact form of the interface anymore.

[](#p-SoL9V7zUCt)If you used an array to represent the group’s members, don’t just return the iterator created by calling the `Symbol.iterator` method on the array. That would work, but it defeats the purpose of this exercise.

[](#p-h9xzbPAOXK)It is okay if your iterator behaves strangely when the group is modified during iteration.

[](#c-n6ZNn/zRLj)

for (let value of Group.from(\["a", "b", "c"\])) {
console.log(value);
}

Display hints...

[](#p-URAzFlYuQP)It is probably worthwhile to define a new class `GroupIterator`. Iterator instances should have a property that tracks the current position in the group. Every time `next` is called, it checks whether it is done and, if not, moves past the current value and returns it.

[](#p-h7IDV/LpHi)The `Group` class itself gets a method named by `Symbol.iterator` that, when called, returns a new instance of the iterator class for that group.
