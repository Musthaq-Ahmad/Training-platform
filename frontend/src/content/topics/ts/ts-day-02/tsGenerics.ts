import type { ContentTopic } from '../../../types';

export const tsgenericsTopics = {
  tsgenerics: {
    id: 'tsgenerics',
    heading: 'Hello World of Generics',
    blocks: [
      {
        type: 'paragraph',
        text: 'To start off, let’s do the “hello world” of generics: the identity function. The identity function is a function that will return back whatever is passed in. You can think of this in a similar way to the echo command.',
      },
      {
        type: 'paragraph',
        text: 'Without generics, we would either have to give the identity function a specific type:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function identity(arg: number): number {\n  return arg;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Or, we could describe the identity function using the any type:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function identity(arg: any): any {\n  return arg;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'While using any is certainly generic in that it will cause the function to accept any and all types for the type of arg, we actually are losing the information about what that type was when the function returns. If we passed in a number, the only information we have is that any type could be returned.',
      },
      {
        type: 'paragraph',
        text: 'Instead, we need a way of capturing the type of the argument in such a way that we can also use it to denote what is being returned. Here, we will use a type variable, a special kind of variable that works on types rather than values.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function identity<Type>(arg: Type): Type {\n  return arg;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'We’ve now added a type variable Type to the identity function. This Type allows us to capture the type the user provides (e.g. number), so that we can use that information later. Here, we use Type again as the return type. On inspection, we can now see the same type is used for the argument and the return type. This allows us to traffic that type information in one side of the function and out the other.',
      },
      {
        type: 'paragraph',
        text: 'We say that this version of the identity function is generic, as it works over a range of types. Unlike using any, it’s also just as precise (i.e., it doesn’t lose any information) as the first identity function that used numbers for the argument and return type.',
      },
      {
        type: 'paragraph',
        text: 'Once we’ve written the generic identity function, we can call it in one of two ways. The first way is to pass all of the arguments, including the type argument, to the function:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'let output = identity<string>("myString");',
        },
      },
      {
        type: 'paragraph',
        text: 'Here we explicitly set Type to be string as one of the arguments to the function call, denoted using the &lt;&gt; around the arguments rather than ().',
      },
      {
        type: 'paragraph',
        text: 'The second way is also perhaps the most common. Here we use type argument inference — that is, we want the compiler to set the value of Type for us automatically based on the type of the argument we pass in:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'let output = identity("myString");',
        },
      },
      {
        type: 'paragraph',
        text: 'Notice that we didn’t have to explicitly pass the type in the angle brackets (&lt;&gt;); the compiler just looked at the value "myString", and set Type to its type. While type argument inference can be a helpful tool to keep code shorter and more readable, you may need to explicitly pass in the type arguments as we did in the previous example when the compiler fails to infer the type, as may happen in more complex examples.',
      },
      {
        type: 'paragraph',
        text: 'When you begin to use generics, you’ll notice that when you create generic functions like identity, the compiler will enforce that you use any generically typed parameters in the body of the function correctly. That is, that you actually treat these parameters as if they could be any and all types.',
      },
      {
        type: 'paragraph',
        text: 'Let’s take our identity function from earlier:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function identity<Type>(arg: Type): Type {\n  return arg;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'What if we want to also log the length of the argument arg to the console with each call? We might be tempted to write this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function loggingIdentity<Type>(arg: Type): Type {\n  console.log(arg.length);\n  return arg;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'When we do, the compiler will give us an error that we’re using the .length member of arg, but nowhere have we said that arg has this member. Remember, we said earlier that these type variables stand in for any and all types, so someone using this function could have passed in a number instead, which does not have a .length member.',
      },
      {
        type: 'paragraph',
        text: 'Let’s say that we’ve actually intended this function to work on arrays of Type rather than Type directly. Since we’re working with arrays, the .length member should be available. We can describe this just like we would create arrays of other types:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function loggingIdentity<Type>(arg: Type[]): Type[] {\n  console.log(arg.length);\n  return arg;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'You can read the type of loggingIdentity as “the generic function loggingIdentity takes a type parameter Type, and an argument arg which is an array of Types, and returns an array of Types.” If we passed in an array of numbers, we’d get an array of numbers back out, as Type would bind to number. This allows us to use our generic type variable Type as part of the types we’re working with, rather than the whole type, giving us greater flexibility.',
      },
      {
        type: 'paragraph',
        text: 'We can alternatively write the sample example this way:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {\n  console.log(arg.length); // Array has a .length, so no more error\n  return arg;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'You may already be familiar with this style of type from other languages. In the next section, we’ll cover how you can create your own generic types like Array<Type>.',
      },
      {
        type: 'paragraph',
        text: 'In previous sections, we created generic identity functions that worked over a range of types. In this section, we’ll explore the type of the functions themselves and how to create generic interfaces.',
      },
      {
        type: 'paragraph',
        text: 'The type of generic functions is just like those of non-generic functions, with the type parameters listed first, similarly to function declarations:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function identity<Type>(arg: Type): Type {\n  return arg;\n}\n \nlet myIdentity: <Type>(arg: Type) => Type = identity;',
        },
      },
      {
        type: 'paragraph',
        text: 'We could also have used a different name for the generic type parameter in the type, so long as the number of type variables and how the type variables are used line up.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function identity<Type>(arg: Type): Type {\n  return arg;\n}\n \nlet myIdentity: <Input>(arg: Input) => Input = identity;',
        },
      },
      {
        type: 'paragraph',
        text: 'We can also write the generic type as a call signature of an object literal type:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function identity<Type>(arg: Type): Type {\n  return arg;\n}\n \nlet myIdentity: { <Type>(arg: Type): Type } = identity;',
        },
      },
      {
        type: 'paragraph',
        text: 'Which leads us to writing our first generic interface. Let’s take the object literal from the previous example and move it to an interface:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface GenericIdentityFn {\n  <Type>(arg: Type): Type;\n}\n \nfunction identity<Type>(arg: Type): Type {\n  return arg;\n}\n \nlet myIdentity: GenericIdentityFn = identity;',
        },
      },
      {
        type: 'paragraph',
        text: 'In a similar example, we may want to move the generic parameter to be a parameter of the whole interface. This lets us see what type(s) we’re generic over (e.g. Dictionary<string> rather than just Dictionary). This makes the type parameter visible to all the other members of the interface.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface GenericIdentityFn<Type> {\n  (arg: Type): Type;\n}\n \nfunction identity<Type>(arg: Type): Type {\n  return arg;\n}\n \nlet myIdentity: GenericIdentityFn<number> = identity;',
        },
      },
      {
        type: 'paragraph',
        text: 'Notice that our example has changed to be something slightly different. Instead of describing a generic function, we now have a non-generic function signature that is a part of a generic type. When we use GenericIdentityFn, we now will also need to specify the corresponding type argument (here: number), effectively locking in what the underlying call signature will use. Understanding when to put the type parameter directly on the call signature and when to put it on the interface itself will be helpful in describing what aspects of a type are generic.',
      },
      {
        type: 'paragraph',
        text: 'In addition to generic interfaces, we can also create generic classes. Note that it is not possible to create generic enums and namespaces.',
      },
      {
        type: 'paragraph',
        text: 'A generic class has a similar shape to a generic interface. Generic classes have a generic type parameter list in angle brackets (&lt;&gt;) following the name of the class.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class GenericNumber<NumType> {\n  zeroValue: NumType;\n  add: (x: NumType, y: NumType) => NumType;\n}\n \nlet myGenericNumber = new GenericNumber<number>();\nmyGenericNumber.zeroValue = 0;\nmyGenericNumber.add = function (x, y) {\n  return x + y;\n};',
        },
      },
      {
        type: 'paragraph',
        text: 'This is a pretty literal use of the GenericNumber class, but you may have noticed that nothing is restricting it to only use the number type. We could have instead used string or even more complex objects.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'let stringNumeric = new GenericNumber<string>();\nstringNumeric.zeroValue = "";\nstringNumeric.add = function (x, y) {\n  return x + y;\n};\n \nconsole.log(stringNumeric.add(stringNumeric.zeroValue, "test"));',
        },
      },
      {
        type: 'paragraph',
        text: 'Just as with interface, putting the type parameter on the class itself lets us make sure all of the properties of the class are working with the same type.',
      },
      {
        type: 'paragraph',
        text: 'As we cover in our section on classes, a class has two sides to its type: the static side and the instance side. Generic classes are only generic over their instance side rather than their static side, so when working with classes, static members can not use the class’s type parameter.',
      },
      {
        type: 'paragraph',
        text: 'If you remember from an earlier example, you may sometimes want to write a generic function that works on a set of types where you have some knowledge about what capabilities that set of types will have. In our loggingIdentity example, we wanted to be able to access the .length property of arg, but the compiler could not prove that every type had a .length property, so it warns us that we can’t make this assumption.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function loggingIdentity<Type>(arg: Type): Type {\n  console.log(arg.length);\n  return arg;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Instead of working with any and all types, we’d like to constrain this function to work with any and all types that also have the .length property. As long as the type has this member, we’ll allow it, but it’s required to have at least this member. To do so, we must list our requirement as a constraint on what Type can be.',
      },
      {
        type: 'paragraph',
        text: 'To do so, we’ll create an interface that describes our constraint. Here, we’ll create an interface that has a single .length property and then we’ll use this interface and the extends keyword to denote our constraint:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface Lengthwise {\n  length: number;\n}\n \nfunction loggingIdentity<Type extends Lengthwise>(arg: Type): Type {\n  console.log(arg.length); // Now we know it has a .length property, so no more error\n  return arg;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Because the generic function is now constrained, it will no longer work over any and all types:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'loggingIdentity(3);',
        },
      },
      {
        type: 'paragraph',
        text: 'Instead, we need to pass in values whose type has all the required properties:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'loggingIdentity({ length: 10, value: 3 });',
        },
      },
      {
        type: 'paragraph',
        text: 'You can declare a type parameter that is constrained by another type parameter. For example, here we’d like to get a property from an object given its name. We’d like to ensure that we’re not accidentally grabbing a property that does not exist on the obj, so we’ll place a constraint between the two types:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {\n  return obj[key];\n}\n \nlet x = { a: 1, b: 2, c: 3, d: 4 };\n \ngetProperty(x, "a");\ngetProperty(x, "m");',
        },
      },
      {
        type: 'paragraph',
        text: 'When creating factories in TypeScript using generics, it is necessary to refer to class types by their constructor functions. For example,',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function create<Type>(c: { new (): Type }): Type {\n  return new c();\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'A more advanced example uses the prototype property to infer and constrain relationships between the constructor function and the instance side of class types.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class BeeKeeper {\n  hasMask: boolean = true;\n}\n \nclass ZooKeeper {\n  nametag: string = "Mikle";\n}\n \nclass Animal {\n  numLegs: number = 4;\n}\n \nclass Bee extends Animal {\n  numLegs = 6;\n  keeper: BeeKeeper = new BeeKeeper();\n}\n \nclass Lion extends Animal {\n  keeper: ZooKeeper = new ZooKeeper();\n}\n \nfunction createInstance<A extends Animal>(c: new () => A): A {\n  return new c();\n}\n \ncreateInstance(Lion).keeper.nametag;\ncreateInstance(Bee).keeper.hasMask;',
        },
      },
      {
        type: 'paragraph',
        text: 'This pattern is used to power the mixins design pattern.',
      },
      {
        type: 'paragraph',
        text: 'By declaring a default for a generic type parameter, you make it optional to specify the corresponding type argument. For example, a function which creates a new HTMLElement. Calling the function with no arguments generates a HTMLDivElement; calling the function with an element as the first argument generates an element of the argument’s type. You can optionally pass a list of children as well. Previously you would have to define the function as:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'declare function create(): Container<HTMLDivElement, HTMLDivElement[]>;\ndeclare function create<T extends HTMLElement>(element: T): Container<T, T[]>;\ndeclare function create<T extends HTMLElement, U extends HTMLElement>(\n  element: T,\n  children: U[]\n): Container<T, U[]>;',
        },
      },
      {
        type: 'paragraph',
        text: 'With generic parameter defaults we can reduce it to:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'declare function create<T extends HTMLElement = HTMLDivElement, U extends HTMLElement[] = T[]>(\n  element?: T,\n  children?: U\n): Container<T, U>;\n \nconst div = create();\n \nconst p = create(new HTMLParagraphElement());',
        },
      },
      {
        type: 'paragraph',
        text: 'A generic parameter default follows the following rules:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'A type parameter is deemed optional if it has a default.',
          'Required type parameters must not follow optional type parameters.',
          'Default types for a type parameter must satisfy the constraint for the type parameter, if it exists.',
          'When specifying type arguments, you are only required to specify type arguments for the required type parameters. Unspecified type parameters will resolve to their default types.',
          'If a default type is specified and inference cannot choose a candidate, the default type is inferred.',
          'A class or interface declaration that merges with an existing class or interface declaration may introduce a default for an existing type parameter.',
          'A class or interface declaration that merges with an existing class or interface declaration may introduce a new type parameter as long as it specifies a default.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Covariance and contravariance are type theory terms that describe what the relationship between two generic types is. Here’s a brief primer on the concept.',
      },
      {
        type: 'paragraph',
        text: 'For example, if you have an interface representing an object that can make a certain type:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface Producer<T> {\n  make(): T;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'We can use a Producer<Cat> where a Producer<Animal> is expected, because a Cat is an Animal. This relationship is called covariance: the relationship from Producer<T> to Producer<U> is the same as the relationship from T to U.',
      },
      {
        type: 'paragraph',
        text: 'Conversely, if you have an interface that can consume a certain type:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface Consumer<T> {\n  consume: (arg: T) => void;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Then we can use a Consumer<Animal> where a Consumer<Cat> is expected, because any function that is capable of accepting an Animal must also be capable of accepting a Cat. This relationship is called contravariance: the relationship from Consumer<T> to Consumer<U> is the same as the relationship from U to T. Note the reversal of direction as compared to covariance! This is why contravariance “cancels itself out” but covariance doesn’t.',
      },
      {
        type: 'paragraph',
        text: 'In a structural type system like TypeScript’s, covariance and contravariance are naturally emergent behaviors that follow from the definition of types. Even in the absence of generics, we would see covariant (and contravariant) relationships:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface AnimalProducer {\n  make(): Animal;\n}\n\n// A CatProducer can be used anywhere an\n// Animal producer is expected\ninterface CatProducer {\n  make(): Cat;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'TypeScript has a structural type system, so when comparing two types, e.g. to see if a Producer<Cat> can be used where a Producer<Animal> is expected, the usual algorithm would be structurally expand both of those definitions, and compare their structures. However, variance allows for an extremely useful optimization: if Producer<T> is covariant on T, then we can simply check Cat and Animal instead, as we know they’ll have the same relationship as Producer<Cat> and Producer<Animal>.',
      },
      {
        type: 'paragraph',
        text: 'Note that this logic can only be used when we’re examining two instantiations of the same type. If we have a Producer<T> and a FastProducer<U>, there’s no guarantee that T and U necessarily refer to the same positions in these types, so this check will always be performed structurally.',
      },
      {
        type: 'paragraph',
        text: 'Because variance is a naturally emergent property of structural types, TypeScript automatically infers the variance of every generic type. In extremely rare cases involving certain kinds of circular types, this measurement can be inaccurate. If this happens, you can add a variance annotation to a type parameter to force a particular variance:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '// Contravariant annotation\ninterface Consumer<in T> {\n  consume: (arg: T) => void;\n}\n\n// Covariant annotation\ninterface Producer<out T> {\n  make(): T;\n}\n\n// Invariant annotation\ninterface ProducerConsumer<in out T> {\n  consume: (arg: T) => void;\n  make(): T;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Only do this if you are writing the same variance that should occur structurally.',
      },
      {
        type: 'paragraph',
        text: 'It’s critical to reinforce that variance annotations are only in effect during an instantiation-based comparison. They have no effect during a structural comparison. For example, you can’t use variance annotations to “force” a type to be actually invariant:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "// DON'T DO THIS - variance annotation\n// does not match structural behavior\ninterface Producer<in out T> {\n  make(): T;\n}\n\n// Not a type error -- this is a structural\n// comparison, so variance annotations are\n// not in effect\nconst p: Producer<string | number> = {\n    make(): number {\n        return 42;\n    }\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Here, the object literal’s make function returns number, which we might expect to cause an error because number isn’t string | number. However, this isn’t an instantiation-based comparison, because the object literal is an anonymous type, not a Producer&lt;string | number&gt;.',
      },
      {
        type: 'paragraph',
        text: 'It’s very important to only write variance annotations if you absolutely know why you’re doing it, what their limitations are, and when they aren’t in effect. Whether TypeScript uses an instantiation-based comparison or structural comparison is not a specified behavior and may change from version to version for correctness or performance reasons, so you should only ever write variance annotations when they match the structural behavior of a type. Don’t use variance annotations to try to “force” a particular variance; this will cause unpredictable behavior in your code.',
      },
      {
        type: 'paragraph',
        text: 'Remember, TypeScript can automatically infer variance from your generic types. It’s almost never necessary to write a variance annotation, and you should only do so when you’ve identified a specific need. Variance annotations do not change the structural behavior of a type, and depending on the situation, you might see a structural comparison made when you expected an instantiation-based comparison. Variance annotations can’t be used to modify how types behave in these structural contexts, and shouldn’t be written unless the annotation is the same as the structural definition. Because this is difficult to get right, and TypeScript can correctly infer variance in the vast majority of cases, you should not find yourself writing variance annotations in normal code.',
      },
      {
        type: 'paragraph',
        text: 'You may find temporary variance annotations useful in a “type debugging” situation, because variance annotations are checked. TypeScript will issue an error if the annotated variance is identifiably wrong:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '// Error, this interface is definitely contravariant on T\ninterface Foo<out T> {\n  consume: (arg: T) => void;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'However, variance annotations are allowed to be stricter (e.g. in out is valid if the actual variance is covariant). Be sure to remove your variance annotations once you’re done debugging.',
      },
      {
        type: 'paragraph',
        text: 'Lastly, if you’re trying to maximize your typechecking performance, and have run a profiler, and have identified a specific type that’s slow, and have identified variance inference specifically is slow, and have carefully validated the variance annotation you want to write, you may see a small performance benefit in extraordinarily complex types by adding variance annotations.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
