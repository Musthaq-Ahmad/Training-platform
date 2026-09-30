import type { ContentTopic } from '../../../types';

export const tsdosanddontsTopics = {
  tsdosanddonts: {
    id: 'tsdosanddonts',
    heading: 'General Types',
    blocks: [
      {
        type: 'subheading',
        level: 3,
        text: 'Number, String, Boolean, Symbol and Object',
      },
      {
        type: 'paragraph',
        text: '❌ Don’t ever use the types Number, String, Boolean, Symbol, or Object These types refer to non-primitive boxed objects that are almost never used appropriately in JavaScript code.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '/* WRONG */\nfunction reverse(s: String): String;',
        },
      },
      {
        type: 'paragraph',
        text: '✅ Do use the types number, string, boolean, and symbol.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '/* OK */\nfunction reverse(s: string): string;',
        },
      },
      {
        type: 'paragraph',
        text: 'Instead of Object, use the non-primitive object type (added in TypeScript 2.2).',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Generics',
      },
      {
        type: 'paragraph',
        text: '❌ Don’t ever have a generic type which doesn’t use its type parameter. See more details in TypeScript FAQ page.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'any',
      },
      {
        type: 'paragraph',
        text: '❌ Don’t use any as a type unless you are in the process of migrating a JavaScript project to TypeScript. The compiler effectively treats any as “please turn off type checking for this thing”. It is similar to putting an @ts-ignore comment around every usage of the variable. This can be very helpful when you are first migrating a JavaScript project to TypeScript as you can set the type for stuff you haven’t migrated yet as any, but in a full TypeScript project you are disabling type checking for any parts of your program that use it.',
      },
      {
        type: 'paragraph',
        text: 'In cases where you don’t know what type you want to accept, or when you want to accept anything because you will be blindly passing it through without interacting with it, you can use unknown.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Return Types of Callbacks',
      },
      {
        type: 'paragraph',
        text: '❌ Don’t use the return type any for callbacks whose value will be ignored:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '/* WRONG */\nfunction fn(x: () => any) {\n  x();\n}',
        },
      },
      {
        type: 'paragraph',
        text: '✅ Do use the return type void for callbacks whose value will be ignored:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '/* OK */\nfunction fn(x: () => void) {\n  x();\n}',
        },
      },
      {
        type: 'paragraph',
        text: '❔ Why: Using void is safer because it prevents you from accidentally using the return value of x in an unchecked way:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "function fn(x: () => void) {\n  var k = x(); // oops! meant to do something else\n  k.doSomething(); // error, but would be OK if the return type had been 'any'\n}",
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Optional Parameters in Callbacks',
      },
      {
        type: 'paragraph',
        text: '❌ Don’t use optional parameters in callbacks unless you really mean it:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '/* WRONG */\ninterface Fetcher {\n  getObject(done: (data: unknown, elapsedTime?: number) => void): void;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'This has a very specific meaning: the done callback might be invoked with 1 argument or might be invoked with 2 arguments. The author probably intended to say that the callback might not care about the elapsedTime parameter, but there’s no need to make the parameter optional to accomplish this — it’s always legal to provide a callback that accepts fewer arguments.',
      },
      {
        type: 'paragraph',
        text: '✅ Do write callback parameters as non-optional:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '/* OK */\ninterface Fetcher {\n  getObject(done: (data: unknown, elapsedTime: number) => void): void;\n}',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Overloads and Callbacks',
      },
      {
        type: 'paragraph',
        text: '❌ Don’t write separate overloads that differ only on callback arity:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '/* WRONG */\ndeclare function beforeAll(action: () => void, timeout?: number): void;\ndeclare function beforeAll(\n  action: (done: DoneFn) => void,\n  timeout?: number\n): void;',
        },
      },
      {
        type: 'paragraph',
        text: '✅ Do write a single overload using the maximum arity:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '/* OK */\ndeclare function beforeAll(\n  action: (done: DoneFn) => void,\n  timeout?: number\n): void;',
        },
      },
      {
        type: 'paragraph',
        text: '❔ Why: It’s always legal for a callback to disregard a parameter, so there’s no need for the shorter overload. Providing a shorter callback first allows incorrectly-typed functions to be passed in because they match the first overload.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Ordering',
      },
      {
        type: 'paragraph',
        text: '❌ Don’t put more general overloads before more specific overloads:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '/* WRONG */\ndeclare function fn(x: unknown): unknown;\ndeclare function fn(x: HTMLElement): number;\ndeclare function fn(x: HTMLDivElement): string;\n\nvar myElem: HTMLDivElement;\nvar x = fn(myElem); // x: unknown, wat?',
        },
      },
      {
        type: 'paragraph',
        text: '✅ Do sort overloads by putting the more general signatures after more specific signatures:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '/* OK */\ndeclare function fn(x: HTMLDivElement): string;\ndeclare function fn(x: HTMLElement): number;\ndeclare function fn(x: unknown): unknown;\n\nvar myElem: HTMLDivElement;\nvar x = fn(myElem); // x: string, :)',
        },
      },
      {
        type: 'paragraph',
        text: '❔ Why: TypeScript chooses the first matching overload when resolving function calls. When an earlier overload is “more general” than a later one, the later one is effectively hidden and cannot be called.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Use Optional Parameters',
      },
      {
        type: 'paragraph',
        text: '❌ Don’t write several overloads that differ only in trailing parameters:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '/* WRONG */\ninterface Example {\n  diff(one: string): number;\n  diff(one: string, two: string): number;\n  diff(one: string, two: string, three: boolean): number;\n}',
        },
      },
      {
        type: 'paragraph',
        text: '✅ Do use optional parameters whenever possible:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '/* OK */\ninterface Example {\n  diff(one: string, two?: string, three?: boolean): number;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Note that this collapsing should only occur when all overloads have the same return type.',
      },
      {
        type: 'paragraph',
        text: '❔ Why: This is important for two reasons.',
      },
      {
        type: 'paragraph',
        text: 'TypeScript resolves signature compatibility by seeing if any signature of the target can be invoked with the arguments of the source, and extraneous arguments are allowed. This code, for example, exposes a bug only when the signature is correctly written using optional parameters:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function fn(x: (a: string, b: number, c: number) => void) {}\nvar x: Example;\n// When written with overloads, OK -- used first overload\n// When written with optionals, correctly an error\nfn(x.diff);',
        },
      },
      {
        type: 'paragraph',
        text: 'The second reason is when a consumer uses the “strict null checking” feature of TypeScript. Because unspecified parameters appear as undefined in JavaScript, it’s usually fine to pass an explicit undefined to a function with optional arguments. This code, for example, should be OK under strict nulls:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'var x: Example;\n// When written with overloads, incorrectly an error because of passing \'undefined\' to \'string\'\n// When written with optionals, correctly OK\nx.diff("something", true ? undefined : "hour");',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Use Union Types',
      },
      {
        type: 'paragraph',
        text: '❌ Don’t write overloads that differ by type in only one argument position:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '/* WRONG */\ninterface Moment {\n  utcOffset(): number;\n  utcOffset(b: number): Moment;\n  utcOffset(b: string): Moment;\n}',
        },
      },
      {
        type: 'paragraph',
        text: '✅ Do use union types whenever possible:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '/* OK */\ninterface Moment {\n  utcOffset(): number;\n  utcOffset(b: number | string): Moment;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Note that we didn’t make b optional here because the return types of the signatures differ.',
      },
      {
        type: 'paragraph',
        text: '❔ Why: This is important for people who are “passing through” a value to your function:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function fn(x: string): Moment;\nfunction fn(x: number): Moment;\nfunction fn(x: number | string) {\n  // When written with separate overloads, incorrectly an error\n  // When written with union types, correctly OK\n  return moment().utcOffset(x);\n}',
        },
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
