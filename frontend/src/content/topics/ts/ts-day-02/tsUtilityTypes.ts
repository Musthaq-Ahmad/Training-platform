import type { ContentTopic } from '../../../types';

export const tsutilitytypesTopics = {
  tsutilitytypes: {
    id: 'tsutilitytypes',
    heading: 'Awaited<Type>',
    blocks: [
      {
        type: 'paragraph',
        text: 'This type is meant to model operations like await in async functions, or the .then() method on Promises - specifically, the way that they recursively unwrap Promises.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'Example',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'type A = Awaited<Promise<string>>;\n \ntype B = Awaited<Promise<Promise<number>>>;\n \ntype C = Awaited<boolean | Promise<number>>;',
        },
      },
      {
        type: 'paragraph',
        text: 'Constructs a type with all properties of Type set to optional. This utility will return a type that represents all subsets of a given type.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'Example',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface Todo {\n  title: string;\n  description: string;\n}\n \nfunction updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {\n  return { ...todo, ...fieldsToUpdate };\n}\n \nconst todo1 = {\n  title: "organize desk",\n  description: "clear clutter",\n};\n \nconst todo2 = updateTodo(todo1, {\n  description: "throw out trash",\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'Constructs a type consisting of all properties of Type set to required. The opposite of Partial.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'Example',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface Props {\n  a?: number;\n  b?: string;\n}\n \nconst obj: Props = { a: 5 };\n \nconst obj2: Required<Props> = { a: 5 };',
        },
      },
      {
        type: 'paragraph',
        text: 'Constructs a type with all properties of Type set to readonly, meaning the properties of the constructed type cannot be reassigned.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'Example',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface Todo {\n  title: string;\n}\n \nconst todo: Readonly<Todo> = {\n  title: "Delete inactive users",\n};\n \ntodo.title = "Hello";',
        },
      },
      {
        type: 'paragraph',
        text: 'This utility is useful for representing assignment expressions that will fail at runtime (i.e. when attempting to reassign properties of a frozen object).',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'Object.freeze',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function freeze<Type>(obj: Type): Readonly<Type>;',
        },
      },
      {
        type: 'paragraph',
        text: 'Constructs an object type whose property keys are Keys and whose property values are Type. This utility can be used to map the properties of a type to another type.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'Example',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'type CatName = "miffy" | "boris" | "mordred";\n \ninterface CatInfo {\n  age: number;\n  breed: string;\n}\n \nconst cats: Record<CatName, CatInfo> = {\n  miffy: { age: 10, breed: "Persian" },\n  boris: { age: 5, breed: "Maine Coon" },\n  mordred: { age: 16, breed: "British Shorthair" },\n};\n \ncats.boris;',
        },
      },
      {
        type: 'paragraph',
        text: 'Constructs a type by picking the set of properties Keys (string literal or union of string literals) from Type.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'Example',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface Todo {\n  title: string;\n  description: string;\n  completed: boolean;\n}\n \ntype TodoPreview = Pick<Todo, "title" | "completed">;\n \nconst todo: TodoPreview = {\n  title: "Clean room",\n  completed: false,\n};\n \ntodo;',
        },
      },
      {
        type: 'paragraph',
        text: 'Constructs a type by picking all properties from Type and then removing Keys (string literal or union of string literals). The opposite of Pick.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'Example',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface Todo {\n  title: string;\n  description: string;\n  completed: boolean;\n  createdAt: number;\n}\n \ntype TodoPreview = Omit<Todo, "description">;\n \nconst todo: TodoPreview = {\n  title: "Clean room",\n  completed: false,\n  createdAt: 1615544252770,\n};\n \ntodo;\n \ntype TodoInfo = Omit<Todo, "completed" | "createdAt">;\n \nconst todoInfo: TodoInfo = {\n  title: "Pick up kids",\n  description: "Kindergarten closes at 5pm",\n};\n \ntodoInfo;',
        },
      },
      {
        type: 'paragraph',
        text: 'Constructs a type by excluding from UnionType all union members that are assignable to ExcludedMembers.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'Example',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'type T0 = Exclude<"a" | "b" | "c", "a">;\ntype T1 = Exclude<"a" | "b" | "c", "a" | "b">;\ntype T2 = Exclude<string | number | (() => void), Function>;\n \ntype Shape =\n  | { kind: "circle"; radius: number }\n  | { kind: "square"; x: number }\n  | { kind: "triangle"; x: number; y: number };\n \ntype T3 = Exclude<Shape, { kind: "circle" }>',
        },
      },
      {
        type: 'paragraph',
        text: 'Constructs a type by extracting from Type all union members that are assignable to Union.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'Example',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'type T0 = Extract<"a" | "b" | "c", "a" | "f">;\ntype T1 = Extract<string | number | (() => void), Function>;\n \ntype Shape =\n  | { kind: "circle"; radius: number }\n  | { kind: "square"; x: number }\n  | { kind: "triangle"; x: number; y: number };\n \ntype T2 = Extract<Shape, { kind: "circle" }>',
        },
      },
      {
        type: 'paragraph',
        text: 'Constructs a type by excluding null and undefined from Type.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'Example',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'type T0 = NonNullable<string | number | undefined>;\ntype T1 = NonNullable<string[] | null | undefined>;',
        },
      },
      {
        type: 'paragraph',
        text: 'Constructs a tuple type from the types used in the parameters of a function type Type.',
      },
      {
        type: 'paragraph',
        text: 'For overloaded functions, this will be the parameters of the last signature; see Inferring Within Conditional Types.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'Example',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'declare function f1(arg: { a: number; b: string }): void;\n \ntype T0 = Parameters<() => string>;\ntype T1 = Parameters<(s: string) => void>;\ntype T2 = Parameters<<T>(arg: T) => T>;\ntype T3 = Parameters<typeof f1>;\ntype T4 = Parameters<any>;\ntype T5 = Parameters<never>;\ntype T6 = Parameters<string>;\ntype T7 = Parameters<Function>;',
        },
      },
      {
        type: 'paragraph',
        text: 'Constructs a tuple or array type from the types of a constructor function type. It produces a tuple type with all the parameter types (or the type never if Type is not a function).',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'Example',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'type T0 = ConstructorParameters<ErrorConstructor>;\ntype T1 = ConstructorParameters<FunctionConstructor>;\ntype T2 = ConstructorParameters<RegExpConstructor>;\nclass C {\n  constructor(a: number, b: string) {}\n}\ntype T3 = ConstructorParameters<typeof C>;\ntype T4 = ConstructorParameters<any>;\n \ntype T5 = ConstructorParameters<Function>;',
        },
      },
      {
        type: 'paragraph',
        text: 'Constructs a type consisting of the return type of function Type.',
      },
      {
        type: 'paragraph',
        text: 'For overloaded functions, this will be the return type of the last signature; see Inferring Within Conditional Types.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'Example',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'declare function f1(): { a: number; b: string };\n \ntype T0 = ReturnType<() => string>;\ntype T1 = ReturnType<(s: string) => void>;\ntype T2 = ReturnType<<T>() => T>;\ntype T3 = ReturnType<<T extends U, U extends number[]>() => T>;\ntype T4 = ReturnType<typeof f1>;\ntype T5 = ReturnType<any>;\ntype T6 = ReturnType<never>;\ntype T7 = ReturnType<string>;\ntype T8 = ReturnType<Function>;',
        },
      },
      {
        type: 'paragraph',
        text: 'Constructs a type consisting of the instance type of a constructor function in Type.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'Example',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class C {\n  x = 0;\n  y = 0;\n}\n \ntype T0 = InstanceType<typeof C>;\ntype T1 = InstanceType<any>;\ntype T2 = InstanceType<never>;\ntype T3 = InstanceType<string>;\ntype T4 = InstanceType<Function>;',
        },
      },
      {
        type: 'paragraph',
        text: 'Blocks inferences to the contained type. Other than blocking inferences, NoInfer<Type> is identical to Type.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'Example',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function createStreetLight<C extends string>(\n  colors: C[],\n  defaultColor?: NoInfer<C>,\n) {\n  // ...\n}\n\ncreateStreetLight(["red", "yellow", "green"], "red");  // OK\ncreateStreetLight(["red", "yellow", "green"], "blue");  // Error',
        },
      },
      {
        type: 'paragraph',
        text: 'Extracts the type of the this parameter for a function type, or unknown if the function type has no this parameter.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'Example',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function toHex(this: Number) {\n  return this.toString(16);\n}\n \nfunction numberToString(n: ThisParameterType<typeof toHex>) {\n  return toHex.apply(n);\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Removes the this parameter from Type. If Type has no explicitly declared this parameter, the result is simply Type. Otherwise, a new function type with no this parameter is created from Type. Generics are erased and only the last overload signature is propagated into the new function type.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'Example',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function toHex(this: Number) {\n  return this.toString(16);\n}\n \nconst fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);\n \nconsole.log(fiveToHex());',
        },
      },
      {
        type: 'paragraph',
        text: 'This utility does not return a transformed type. Instead, it serves as a marker for a contextual this type. Note that the noImplicitThis flag must be enabled to use this utility.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'Example',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "type ObjectDescriptor<D, M> = {\n  data?: D;\n  methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M\n};\n \nfunction makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {\n  let data: object = desc.data || {};\n  let methods: object = desc.methods || {};\n  return { ...data, ...methods } as D & M;\n}\n \nlet obj = makeObject({\n  data: { x: 0, y: 0 },\n  methods: {\n    moveBy(dx: number, dy: number) {\n      this.x += dx; // Strongly typed this\n      this.y += dy; // Strongly typed this\n    },\n  },\n});\n \nobj.x = 10;\nobj.y = 20;\nobj.moveBy(5, 5);",
        },
      },
      {
        type: 'paragraph',
        text: 'In the example above, the methods object in the argument to makeObject has a contextual type that includes ThisType&lt;D & M&gt; and therefore the type of this in methods within the methods object is { x: number, y: number } & { moveBy(dx: number, dy: number): void }. Notice how the type of the methods property simultaneously is an inference target and a source for the this type in methods.',
      },
      {
        type: 'paragraph',
        text: 'The ThisType<T> marker interface is simply an empty interface declared in lib.d.ts. Beyond being recognized in the contextual type of an object literal, the interface acts like any empty interface.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Uppercase<StringType>',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Lowercase<StringType>',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Capitalize<StringType>',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Uncapitalize<StringType>',
      },
      {
        type: 'paragraph',
        text: 'To help with string manipulation around template string literals, TypeScript includes a set of types which can be used in string manipulation within the type system. You can find those in the Template Literal Types documentation.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
