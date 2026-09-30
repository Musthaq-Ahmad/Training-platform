import type { ContentTopic } from '../../../types';

export const tsobjecttypesTopics = {
  tsobjecttypes: {
    id: 'tsobjecttypes',
    heading: 'Quick Reference',
    blocks: [
      {
        type: 'paragraph',
        text: 'We have cheat-sheets available for both type and interface, if you want a quick look at the important every-day syntax at a glance.',
      },
      {
        type: 'paragraph',
        text: 'Each property in an object type can specify a couple of things: the type, whether the property is optional, and whether the property can be written to.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Optional Properties',
      },
      {
        type: 'paragraph',
        text: 'Much of the time, we’ll find ourselves dealing with objects that might have a property set. In those cases, we can mark those properties as optional by adding a question mark (?) to the end of their names.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface PaintOptions {\n  shape: Shape;\n  xPos?: number;\n  yPos?: number;\n}\n \nfunction paintShape(opts: PaintOptions) {\n  // ...\n}\n \nconst shape = getShape();\npaintShape({ shape });\npaintShape({ shape, xPos: 100 });\npaintShape({ shape, yPos: 100 });\npaintShape({ shape, xPos: 100, yPos: 100 });',
        },
      },
      {
        type: 'paragraph',
        text: 'In this example, both xPos and yPos are considered optional. We can choose to provide either of them, so every call above to paintShape is valid. All optionality really says is that if the property is set, it better have a specific type.',
      },
      {
        type: 'paragraph',
        text: 'We can also read from those properties - but when we do under strictNullChecks, TypeScript will tell us they’re potentially undefined.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function paintShape(opts: PaintOptions) {\n  let xPos = opts.xPos;\n  let yPos = opts.yPos;\n  // ...\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'In JavaScript, even if the property has never been set, we can still access it - it’s just going to give us the value undefined. We can just handle undefined specially by checking for it.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function paintShape(opts: PaintOptions) {\n  let xPos = opts.xPos === undefined ? 0 : opts.xPos;\n  let yPos = opts.yPos === undefined ? 0 : opts.yPos;\n  // ...\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Note that this pattern of setting defaults for unspecified values is so common that JavaScript has syntax to support it.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {\n  console.log("x coordinate at", xPos);\n  console.log("y coordinate at", yPos);\n  // ...\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Here we used a destructuring pattern for paintShape’s parameter, and provided default values for xPos and yPos. Now xPos and yPos are both definitely present within the body of paintShape, but optional for any callers to paintShape.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'readonly Properties',
      },
      {
        type: 'paragraph',
        text: 'Properties can also be marked as readonly for TypeScript. While it won’t change any behavior at runtime, a property marked as readonly can’t be written to during type-checking.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "interface SomeType {\n  readonly prop: string;\n}\n \nfunction doSomething(obj: SomeType) {\n  // We can read from 'obj.prop'.\n  console.log(`prop has the value '${obj.prop}'.`);\n \n  // But we can't re-assign it.\n  obj.prop = \"hello\";\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Using the readonly modifier doesn’t necessarily imply that a value is totally immutable - or in other words, that its internal contents can’t be changed. It just means the property itself can’t be re-written to.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "interface Home {\n  readonly resident: { name: string; age: number };\n}\n \nfunction visitForBirthday(home: Home) {\n  // We can read and update properties from 'home.resident'.\n  console.log(`Happy birthday ${home.resident.name}!`);\n  home.resident.age++;\n}\n \nfunction evict(home: Home) {\n  // But we can't write to the 'resident' property itself on a 'Home'.\n  home.resident = {\n    name: \"Victor the Evictor\",\n    age: 42,\n  };\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'It’s important to manage expectations of what readonly implies. It’s useful to signal intent during development time for TypeScript on how an object should be used. TypeScript doesn’t factor in whether properties on two types are readonly when checking whether those types are compatible, so readonly properties can also change via aliasing.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "interface Person {\n  name: string;\n  age: number;\n}\n \ninterface ReadonlyPerson {\n  readonly name: string;\n  readonly age: number;\n}\n \nlet writablePerson: Person = {\n  name: \"Person McPersonface\",\n  age: 42,\n};\n \n// works\nlet readonlyPerson: ReadonlyPerson = writablePerson;\n \nconsole.log(readonlyPerson.age); // prints '42'\nwritablePerson.age++;\nconsole.log(readonlyPerson.age); // prints '43'",
        },
      },
      {
        type: 'paragraph',
        text: 'Using mapping modifiers, you can remove readonly attributes.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Index Signatures',
      },
      {
        type: 'paragraph',
        text: 'Sometimes you don’t know all the names of a type’s properties ahead of time, but you do know the shape of the values.',
      },
      {
        type: 'paragraph',
        text: 'In those cases you can use an index signature to describe the types of possible values, for example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface StringArray {\n  [index: number]: string;\n}\n \nconst myArray: StringArray = getStringArray();\nconst secondItem = myArray[1];',
        },
      },
      {
        type: 'paragraph',
        text: 'Above, we have a StringArray interface which has an index signature. This index signature states that when a StringArray is indexed with a number, it will return a string.',
      },
      {
        type: 'paragraph',
        text: 'Only some types are allowed for index signature properties: string, number, symbol, template string patterns, and union types consisting only of these.',
      },
      {
        type: 'paragraph',
        text: 'It is possible to support multiple types of indexers...',
      },
      {
        type: 'paragraph',
        text: 'It is possible to support multiple types of indexers. Note that when using both `number` and `string` indexers, the type returned from a numeric indexer must be a subtype of the type returned from the string indexer. This is because when indexing with a number, JavaScript will actually convert that to a string before indexing into an object. That means that indexing with 100 (a number) is the same thing as indexing with "100" (a string), so the two need to be consistent.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface Animal {\n  name: string;\n}\n \ninterface Dog extends Animal {\n  breed: string;\n}\n \n// Error: indexing with a numeric string might get you a completely separate type of Animal!\ninterface NotOkay {\n  [x: number]: Animal;\n  [x: string]: Dog;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'While string index signatures are a powerful way to describe the “dictionary” pattern, they also enforce that all properties match their return type. This is because a string index declares that obj.property is also available as obj["property"]. In the following example, name’s type does not match the string index’s type, and the type checker gives an error:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface NumberDictionary {\n  [index: string]: number;\n \n  length: number; // ok\n  name: string;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'However, properties of different types are acceptable if the index signature is a union of the property types:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface NumberOrStringDictionary {\n  [index: string]: number | string;\n  length: number; // ok, length is a number\n  name: string; // ok, name is a string\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Finally, you can make index signatures readonly in order to prevent assignment to their indices:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface ReadonlyStringArray {\n  readonly [index: number]: string;\n}\n \nlet myArray: ReadonlyStringArray = getReadOnlyStringArray();\nmyArray[2] = "Mallory";',
        },
      },
      {
        type: 'paragraph',
        text: 'You can’t set myArray[2] because the index signature is readonly.',
      },
      {
        type: 'paragraph',
        text: 'Where and how an object is assigned a type can make a difference in the type system. One of the key examples of this is in excess property checking, which validates the object more thoroughly when it is created and assigned to an object type during creation.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface SquareConfig {\n  color?: string;\n  width?: number;\n}\n \nfunction createSquare(config: SquareConfig): { color: string; area: number } {\n  return {\n    color: config.color || "red",\n    area: config.width ? config.width * config.width : 20,\n  };\n}\n \nlet mySquare = createSquare({ colour: "red", width: 100 });',
        },
      },
      {
        type: 'paragraph',
        text: 'Notice the given argument to createSquare is spelled colour instead of color. In plain JavaScript, this sort of thing fails silently.',
      },
      {
        type: 'paragraph',
        text: 'You could argue that this program is correctly typed, since the width properties are compatible, there’s no color property present, and the extra colour property is insignificant.',
      },
      {
        type: 'paragraph',
        text: 'However, TypeScript takes the stance that there’s probably a bug in this code. Object literals get special treatment and undergo excess property checking when assigning them to other variables, or passing them as arguments. If an object literal has any properties that the “target type” doesn’t have, you’ll get an error:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'let mySquare = createSquare({ colour: "red", width: 100 });',
        },
      },
      {
        type: 'paragraph',
        text: 'Getting around these checks is actually really simple. The easiest method is to just use a type assertion:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);',
        },
      },
      {
        type: 'paragraph',
        text: 'However, a better approach might be to add a string index signature if you’re sure that the object can have some extra properties that are used in some special way. If SquareConfig can have color and width properties with the above types, but could also have any number of other properties, then we could define it like so:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface SquareConfig {\n  color?: string;\n  width?: number;\n  [propName: string]: unknown;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Here we’re saying that SquareConfig can have any number of properties, and as long as they aren’t color or width, their types don’t matter.',
      },
      {
        type: 'paragraph',
        text: 'One final way to get around these checks, which might be a bit surprising, is to assign the object to another variable: Since assigning squareOptions won’t undergo excess property checks, the compiler won’t give you an error:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'let squareOptions = { colour: "red", width: 100 };\nlet mySquare = createSquare(squareOptions);',
        },
      },
      {
        type: 'paragraph',
        text: 'The above workaround will work as long as you have a common property between squareOptions and SquareConfig. In this example, it was the property width. It will however, fail if the variable does not have any common object property. For example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'let squareOptions = { colour: "red" };\nlet mySquare = createSquare(squareOptions);',
        },
      },
      {
        type: 'paragraph',
        text: 'Keep in mind that for simple code like above, you probably shouldn’t be trying to “get around” these checks. For more complex object literals that have methods and hold state, you might need to keep these techniques in mind, but a majority of excess property errors are actually bugs.',
      },
      {
        type: 'paragraph',
        text: 'That means if you’re running into excess property checking problems for something like option bags, you might need to revise some of your type declarations. In this instance, if it’s okay to pass an object with both a color or colour property to createSquare, you should fix up the definition of SquareConfig to reflect that.',
      },
      {
        type: 'paragraph',
        text: 'It’s pretty common to have types that might be more specific versions of other types. For example, we might have a BasicAddress type that describes the fields necessary for sending letters and packages in the U.S.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface BasicAddress {\n  name?: string;\n  street: string;\n  city: string;\n  country: string;\n  postalCode: string;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'In some situations that’s enough, but addresses often have a unit number associated with them if the building at an address has multiple units. We can then describe an AddressWithUnit.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface AddressWithUnit {\n  name?: string;\n  unit: string;\n  street: string;\n  city: string;\n  country: string;\n  postalCode: string;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'This does the job, but the downside here is that we had to repeat all the other fields from BasicAddress when our changes were purely additive. Instead, we can extend the original BasicAddress type and just add the new fields that are unique to AddressWithUnit.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface BasicAddress {\n  name?: string;\n  street: string;\n  city: string;\n  country: string;\n  postalCode: string;\n}\n \ninterface AddressWithUnit extends BasicAddress {\n  unit: string;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'The extends keyword on an interface allows us to effectively copy members from other named types, and add whatever new members we want. This can be useful for cutting down the amount of type declaration boilerplate we have to write, and for signaling intent that several different declarations of the same property might be related. For example, AddressWithUnit didn’t need to repeat the street property, and because street originates from BasicAddress, a reader will know that those two types are related in some way.',
      },
      {
        type: 'paragraph',
        text: 'interfaces can also extend from multiple types.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface Colorful {\n  color: string;\n}\n \ninterface Circle {\n  radius: number;\n}\n \ninterface ColorfulCircle extends Colorful, Circle {}\n \nconst cc: ColorfulCircle = {\n  color: "red",\n  radius: 42,\n};',
        },
      },
      {
        type: 'paragraph',
        text: 'interfaces allowed us to build up new types from other types by extending them. TypeScript provides another construct called intersection types that is mainly used to combine existing object types.',
      },
      {
        type: 'paragraph',
        text: 'An intersection type is defined using the & operator.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface Colorful {\n  color: string;\n}\ninterface Circle {\n  radius: number;\n}\n \ntype ColorfulCircle = Colorful & Circle;',
        },
      },
      {
        type: 'paragraph',
        text: 'Here, we’ve intersected Colorful and Circle to produce a new type that has all the members of Colorful and Circle.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function draw(circle: Colorful & Circle) {\n  console.log(`Color was ${circle.color}`);\n  console.log(`Radius was ${circle.radius}`);\n}\n \n// okay\ndraw({ color: "blue", radius: 42 });\n \n// oops\ndraw({ color: "red", raidus: 42 });',
        },
      },
      {
        type: 'paragraph',
        text: 'We just looked at two ways to combine types which are similar, but are actually subtly different. With interfaces, we could use an extends clause to extend from other types, and we were able to do something similar with intersections and name the result with a type alias. The principal difference between the two is how conflicts are handled, and that difference is typically one of the main reasons why you’d pick one over the other between an interface and a type alias of an intersection type.',
      },
      {
        type: 'paragraph',
        text: 'If interfaces are defined with the same name, TypeScript will attempt to merge them if the properties are compatible. If the properties are not compatible (i.e., they have the same property name but different types), TypeScript will raise an error.',
      },
      {
        type: 'paragraph',
        text: 'In the case of intersection types, properties with different types will be merged automatically. When the type is used later, TypeScript will expect the property to satisfy both types simultaneously, which may produce unexpected results.',
      },
      {
        type: 'paragraph',
        text: 'For example, the following code will throw an error because the properties are incompatible:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface Person {\n  name: string;\n}\n\ninterface Person {\n  name: number;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'In contrast, the following code will compile, but it results in a never type:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface Person1 {\n  name: string;\n}\n \ninterface Person2 {\n  name: number;\n}\n \ntype Staff = Person1 & Person2\n \ndeclare const staffer: Staff;\nstaffer.name;',
        },
      },
      {
        type: 'paragraph',
        text: 'In this case, Staff would require the name property to be both a string and a number, which results in property being of type never.',
      },
      {
        type: 'paragraph',
        text: 'Let’s imagine a Box type that can contain any value - strings, numbers, Giraffes, whatever.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface Box {\n  contents: any;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Right now, the contents property is typed as any, which works, but can lead to accidents down the line.',
      },
      {
        type: 'paragraph',
        text: 'We could instead use unknown, but that would mean that in cases where we already know the type of contents, we’d need to do precautionary checks, or use error-prone type assertions.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface Box {\n  contents: unknown;\n}\n \nlet x: Box = {\n  contents: "hello world",\n};\n \n// we could check \'x.contents\'\nif (typeof x.contents === "string") {\n  console.log(x.contents.toLowerCase());\n}\n \n// or we could use a type assertion\nconsole.log((x.contents as string).toLowerCase());',
        },
      },
      {
        type: 'paragraph',
        text: 'One type safe approach would be to instead scaffold out different Box types for every type of contents.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface NumberBox {\n  contents: number;\n}\n \ninterface StringBox {\n  contents: string;\n}\n \ninterface BooleanBox {\n  contents: boolean;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'But that means we’ll have to create different functions, or overloads of functions, to operate on these types.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function setContents(box: StringBox, newContents: string): void;\nfunction setContents(box: NumberBox, newContents: number): void;\nfunction setContents(box: BooleanBox, newContents: boolean): void;\nfunction setContents(box: { contents: any }, newContents: any) {\n  box.contents = newContents;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'That’s a lot of boilerplate. Moreover, we might later need to introduce new types and overloads. This is frustrating, since our box types and overloads are all effectively the same.',
      },
      {
        type: 'paragraph',
        text: 'Instead, we can make a generic Box type which declares a type parameter.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface Box<Type> {\n  contents: Type;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'You might read this as “A Box of Type is something whose contents have type Type”. Later on, when we refer to Box, we have to give a type argument in place of Type.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'let box: Box<string>;',
        },
      },
      {
        type: 'paragraph',
        text: 'Think of Box as a template for a real type, where Type is a placeholder that will get replaced with some other type. When TypeScript sees Box<string>, it will replace every instance of Type in Box<Type> with string, and end up working with something like { contents: string }. In other words, Box<string> and our earlier StringBox work identically.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface Box<Type> {\n  contents: Type;\n}\ninterface StringBox {\n  contents: string;\n}\n \nlet boxA: Box<string> = { contents: "hello" };\nboxA.contents;\n \nlet boxB: StringBox = { contents: "world" };\nboxB.contents;',
        },
      },
      {
        type: 'paragraph',
        text: 'Box is reusable in that Type can be substituted with anything. That means that when we need a box for a new type, we don’t need to declare a new Box type at all (though we certainly could if we wanted to).',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "interface Box<Type> {\n  contents: Type;\n}\n \ninterface Apple {\n  // ....\n}\n \n// Same as '{ contents: Apple }'.\ntype AppleBox = Box<Apple>;",
        },
      },
      {
        type: 'paragraph',
        text: 'This also means that we can avoid overloads entirely by instead using generic functions.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function setContents<Type>(box: Box<Type>, newContents: Type) {\n  box.contents = newContents;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'It is worth noting that type aliases can also be generic. We could have defined our new Box<Type> interface, which was:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface Box<Type> {\n  contents: Type;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'by using a type alias instead:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'type Box<Type> = {\n  contents: Type;\n};',
        },
      },
      {
        type: 'paragraph',
        text: 'Since type aliases, unlike interfaces, can describe more than just object types, we can also use them to write other kinds of generic helper types.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'type OrNull<Type> = Type | null;\n \ntype OneOrMany<Type> = Type | Type[];\n \ntype OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;\n \ntype OneOrManyOrNullStrings = OneOrManyOrNull<string>;',
        },
      },
      {
        type: 'paragraph',
        text: 'We’ll circle back to type aliases in just a little bit.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'The Array Type',
      },
      {
        type: 'paragraph',
        text: 'Generic object types are often some sort of container type that work independently of the type of elements they contain. It’s ideal for data structures to work this way so that they’re re-usable across different data types.',
      },
      {
        type: 'paragraph',
        text: 'It turns out we’ve been working with a type just like that throughout this handbook: the Array type. Whenever we write out types like number[] or string[], that’s really just a shorthand for Array<number> and Array<string>.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function doSomething(value: Array<string>) {\n  // ...\n}\n \nlet myArray: string[] = ["hello", "world"];\n \n// either of these work!\ndoSomething(myArray);\ndoSomething(new Array("hello", "world"));',
        },
      },
      {
        type: 'paragraph',
        text: 'Much like the Box type above, Array itself is a generic type.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface Array<Type> {\n  /**\n   * Gets or sets the length of the array.\n   */\n  length: number;\n \n  /**\n   * Removes the last element from an array and returns it.\n   */\n  pop(): Type | undefined;\n \n  /**\n   * Appends new elements to an array, and returns the new length of the array.\n   */\n  push(...items: Type[]): number;\n \n  // ...\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Modern JavaScript also provides other data structures which are generic, like Map&lt;K, V&gt;, Set<T>, and Promise<T>. All this really means is that because of how Map, Set, and Promise behave, they can work with any sets of types.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'The ReadonlyArray Type',
      },
      {
        type: 'paragraph',
        text: 'The ReadonlyArray is a special type that describes arrays that shouldn’t be changed.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "function doStuff(values: ReadonlyArray<string>) {\n  // We can read from 'values'...\n  const copy = values.slice();\n  console.log(`The first value is ${values[0]}`);\n \n  // ...but we can't mutate 'values'.\n  values.push(\"hello!\");\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Much like the readonly modifier for properties, it’s mainly a tool we can use for intent. When we see a function that returns ReadonlyArrays, it tells us we’re not meant to change the contents at all, and when we see a function that consumes ReadonlyArrays, it tells us that we can pass any array into that function without worrying that it will change its contents.',
      },
      {
        type: 'paragraph',
        text: 'Unlike Array, there isn’t a ReadonlyArray constructor that we can use.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'new ReadonlyArray("red", "green", "blue");',
        },
      },
      {
        type: 'paragraph',
        text: 'Instead, we can assign regular Arrays to ReadonlyArrays.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const roArray: ReadonlyArray<string> = ["red", "green", "blue"];',
        },
      },
      {
        type: 'paragraph',
        text: 'Just as TypeScript provides a shorthand syntax for Array<Type> with Type[], it also provides a shorthand syntax for ReadonlyArray<Type> with readonly Type[].',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "function doStuff(values: readonly string[]) {\n  // We can read from 'values'...\n  const copy = values.slice();\n  console.log(`The first value is ${values[0]}`);\n \n  // ...but we can't mutate 'values'.\n  values.push(\"hello!\");\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'One last thing to note is that unlike the readonly property modifier, assignability isn’t bidirectional between regular Arrays and ReadonlyArrays.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'let x: readonly string[] = [];\nlet y: string[] = [];\n \nx = y;\ny = x;',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Tuple Types',
      },
      {
        type: 'paragraph',
        text: 'A tuple type is another sort of Array type that knows exactly how many elements it contains, and exactly which types it contains at specific positions.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'type StringNumberPair = [string, number];',
        },
      },
      {
        type: 'paragraph',
        text: 'Here, StringNumberPair is a tuple type of string and number. Like ReadonlyArray, it has no representation at runtime, but is significant to TypeScript. To the type system, StringNumberPair describes arrays whose 0 index contains a string and whose 1 index contains a number.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function doSomething(pair: [string, number]) {\n  const a = pair[0];\n  const b = pair[1];\n  // ...\n}\n \ndoSomething(["hello", 42]);',
        },
      },
      {
        type: 'paragraph',
        text: 'If we try to index past the number of elements, we’ll get an error.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function doSomething(pair: [string, number]) {\n  // ...\n \n  const c = pair[2];\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'We can also destructure tuples using JavaScript’s array destructuring.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function doSomething(stringHash: [string, number]) {\n  const [inputString, hash] = stringHash;\n \n  console.log(inputString);\n \n  console.log(hash);\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Other than those length checks, simple tuple types like these are equivalent to types which are versions of Arrays that declare properties for specific indexes, and that declare length with a numeric literal type.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "interface StringNumberPair {\n  // specialized properties\n  length: 2;\n  0: string;\n  1: number;\n \n  // Other 'Array<string | number>' members...\n  slice(start?: number, end?: number): Array<string | number>;\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Another thing you may be interested in is that tuples can have optional properties by writing out a question mark (? after an element’s type). Optional tuple elements can only come at the end, and also affect the type of length.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'type Either2dOr3d = [number, number, number?];\n \nfunction setCoordinate(coord: Either2dOr3d) {\n  const [x, y, z] = coord;\n \n  console.log(`Provided coordinates had ${coord.length} dimensions`);\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Tuples can also have rest elements, which have to be an array/tuple type.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'type StringNumberBooleans = [string, number, ...boolean[]];\ntype StringBooleansNumber = [string, ...boolean[], number];\ntype BooleansStringNumber = [...boolean[], string, number];',
        },
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'StringNumberBooleans describes a tuple whose first two elements are string and number respectively, but which may have any number of booleans following.',
          'StringBooleansNumber describes a tuple whose first element is string and then any number of booleans and ending with a number.',
          'BooleansStringNumber describes a tuple whose starting elements are any number of booleans and ending with a string then a number.',
        ],
      },
      {
        type: 'paragraph',
        text: 'A tuple with a rest element has no set “length” - it only has a set of well-known elements in different positions.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const a: StringNumberBooleans = ["hello", 1];\nconst b: StringNumberBooleans = ["beautiful", 2, true];\nconst c: StringNumberBooleans = ["world", 3, true, false, true, false, true];',
        },
      },
      {
        type: 'paragraph',
        text: 'Why might optional and rest elements be useful? Well, it allows TypeScript to correspond tuples with parameter lists. Tuples types can be used in rest parameters and arguments, so that the following:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function readButtonInput(...args: [string, number, ...boolean[]]) {\n  const [name, version, ...input] = args;\n  // ...\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'is basically equivalent to:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function readButtonInput(name: string, version: number, ...input: boolean[]) {\n  // ...\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'This is handy when you want to take a variable number of arguments with a rest parameter, and you need a minimum number of elements, but you don’t want to introduce intermediate variables.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'readonly Tuple Types',
      },
      {
        type: 'paragraph',
        text: 'One final note about tuple types - tuple types have readonly variants, and can be specified by sticking a readonly modifier in front of them - just like with array shorthand syntax.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function doSomething(pair: readonly [string, number]) {\n  // ...\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'As you might expect, writing to any property of a readonly tuple isn’t allowed in TypeScript.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function doSomething(pair: readonly [string, number]) {\n  pair[0] = "hello!";\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Tuples tend to be created and left un-modified in most code, so annotating types as readonly tuples when possible is a good default. This is also important given that array literals with const assertions will be inferred with readonly tuple types.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'let point = [3, 4] as const;\n \nfunction distanceFromOrigin([x, y]: [number, number]) {\n  return Math.sqrt(x ** 2 + y ** 2);\n}\n \ndistanceFromOrigin(point);',
        },
      },
      {
        type: 'paragraph',
        text: 'Here, distanceFromOrigin never modifies its elements, but expects a mutable tuple. Since point’s type was inferred as readonly [3, 4], it won’t be compatible with [number, number] since that type can’t guarantee point’s elements won’t be mutated.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
