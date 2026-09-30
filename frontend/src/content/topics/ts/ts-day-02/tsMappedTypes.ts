import type { ContentTopic } from '../../../types';

export const tsmappedtypesTopics = {
  tsmappedtypes: {
    id: 'tsmappedtypes',
    heading: 'Mapping Modifiers',
    blocks: [
      {
        type: 'paragraph',
        text: 'There are two additional modifiers which can be applied during mapping: readonly and ? which affect mutability and optionality respectively.',
      },
      {
        type: 'paragraph',
        text: 'You can remove or add these modifiers by prefixing with - or +. If you don’t add a prefix, then + is assumed.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "// Removes 'readonly' attributes from a type's properties\ntype CreateMutable<Type> = {\n  -readonly [Property in keyof Type]: Type[Property];\n};\n \ntype LockedAccount = {\n  readonly id: string;\n  readonly name: string;\n};\n \ntype UnlockedAccount = CreateMutable<LockedAccount>;",
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "// Removes 'optional' attributes from a type's properties\ntype Concrete<Type> = {\n  [Property in keyof Type]-?: Type[Property];\n};\n \ntype MaybeUser = {\n  id: string;\n  name?: string;\n  age?: number;\n};\n \ntype User = Concrete<MaybeUser>;",
        },
      },
      {
        type: 'paragraph',
        text: 'In TypeScript 4.1 and onwards, you can re-map keys in mapped types with an as clause in a mapped type:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'type MappedTypeWithNewProperties<Type> = {\n    [Properties in keyof Type as NewKeyType]: Type[Properties]\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'You can leverage features like template literal types to create new property names from prior ones:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'type Getters<Type> = {\n    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]\n};\n \ninterface Person {\n    name: string;\n    age: number;\n    location: string;\n}\n \ntype LazyPerson = Getters<Person>;',
        },
      },
      {
        type: 'paragraph',
        text: 'You can filter out keys by producing never via a conditional type:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '// Remove the \'kind\' property\ntype RemoveKindField<Type> = {\n    [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]\n};\n \ninterface Circle {\n    kind: "circle";\n    radius: number;\n}\n \ntype KindlessCircle = RemoveKindField<Circle>;',
        },
      },
      {
        type: 'paragraph',
        text: 'You can map over arbitrary unions, not just unions of string | number | symbol, but unions of any type:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'type EventConfig<Events extends { kind: string }> = {\n    [E in Events as E["kind"]]: (event: E) => void;\n}\n \ntype SquareEvent = { kind: "square", x: number, y: number };\ntype CircleEvent = { kind: "circle", radius: number };\n \ntype Config = EventConfig<SquareEvent | CircleEvent>',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Further Exploration',
      },
      {
        type: 'paragraph',
        text: 'Mapped types work well with other features in this type manipulation section, for example here is a mapped type using a conditional type which returns either a true or false depending on whether an object has the property pii set to the literal true:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'type ExtractPII<Type> = {\n  [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;\n};\n \ntype DBFields = {\n  id: { format: "incrementing" };\n  name: { type: string; pii: true };\n};\n \ntype ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;',
        },
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
