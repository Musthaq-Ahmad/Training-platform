## [Dynamic and weak typing](#dynamic_and_weak_typing)

JavaScript is a [dynamic](https://en.wikipedia.org/wiki/Dynamic_programming_language 'External link (opens in new tab)') language with [dynamic types](https://en.wikipedia.org/wiki/Type_system#DYNAMIC 'External link (opens in new tab)'). Variables in JavaScript are not directly associated with any particular value type, and any variable can be assigned (and re-assigned) values of all types:

```
let foo = 42; // foo is now a number
foo = "bar"; // foo is now a string
foo = true; // foo is now a boolean
```

JavaScript is also a [weakly typed](https://en.wikipedia.org/wiki/Strong_and_weak_typing 'External link (opens in new tab)') language, which means it allows implicit type conversion when an operation involves mismatched types, instead of throwing type errors.

```
const foo = 42; // foo is a number
const result = foo + "1"; // JavaScript coerces foo to a string, so it can be concatenated with the other operand
console.log(result); // 421
```

Implicit coercions are very convenient, but can create subtle bugs when conversions happen where they are not expected, or where they are expected to happen in the other direction (for example, string to number instead of number to string). For [symbols](#symbol_type) and [BigInts](#bigint_type), JavaScript has intentionally disallowed certain implicit type conversions.

## [Primitive values](#primitive_values)

All types except [Object](#objects) define [immutable](https://developer.mozilla.org/en-US/docs/Glossary/Immutable) values represented directly at the lowest level of the language. We refer to values of these types as _primitive values_.

All primitive types, except [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null), can be tested by the [`typeof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) operator. `typeof null` returns `"object"`, so one has to use `=== null` to test for `null`.

All primitive types, except [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null) and [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined), have their corresponding object wrapper types, which provide useful methods for working with the primitive values. For example, the [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) object provides methods like [`toExponential()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential). When a property is accessed on a primitive value, JavaScript automatically wraps the value into the corresponding wrapper object and accesses the property on the object instead. However, accessing a property on `null` or `undefined` throws a `TypeError` exception, which necessitates the introduction of the [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) operator.

| Type                         | `typeof` return value | Object wrapper                                                                                        |
| ---------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------- |
| [Null](#null_type)           | `"object"`            | N/A                                                                                                   |
| [Undefined](#undefined_type) | `"undefined"`         | N/A                                                                                                   |
| [Boolean](#boolean_type)     | `"boolean"`           | [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) |
| [Number](#number_type)       | `"number"`            | [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)   |
| [BigInt](#bigint_type)       | `"bigint"`            | [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)   |
| [String](#string_type)       | `"string"`            | [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)   |
| [Symbol](#symbol_type)       | `"symbol"`            | [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)   |

The object wrapper classes' reference pages contain more information about the methods and properties available for each type, as well as detailed descriptions for the semantics of the primitive types themselves.

### [Null type](#null_type)

The Null type is inhabited by exactly one value: [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null).

### [Undefined type](#undefined_type)

The Undefined type is inhabited by exactly one value: [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).

Conceptually, `undefined` indicates the absence of a _value_, while `null` indicates the absence of an _object_ (which could also make up an excuse for [`typeof null === "object"`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#typeof_null)). The language usually defaults to `undefined` when something is devoid of a value:

- A [`return`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return) statement with no value (`return;`) implicitly returns `undefined`.
- Accessing a nonexistent [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) property (`obj.iDontExist`) returns `undefined`.
- A variable declaration without initialization (`let x;`) implicitly initializes the variable to `undefined`.
- Many methods, such as [`Array.prototype.find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) and [`Map.prototype.get()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get), return `undefined` when no element is found.

`null` is used much less often in the core language. The most important place is the end of the [prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain) — subsequently, methods that interact with prototypes, such as [`Object.getPrototypeOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf), [`Object.create()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create), etc., accept or return `null` instead of `undefined`.

`null` is a [keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#keywords), but `undefined` is a normal [identifier](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#identifiers) that happens to be a global property. In practice, the difference is minor, since `undefined` should not be redefined or shadowed.

### [Boolean type](#boolean_type)

The [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) type represents a logical entity and is inhabited by two values: `true` and `false`.

Boolean values are usually used for conditional operations, including [ternary operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator), [`if...else`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else), [`while`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while), etc.

### [Number type](#number_type)

The [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) type is a [double-precision 64-bit binary format IEEE 754 value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#number_encoding). It is capable of storing positive floating-point numbers between 2\-1074 ([`Number.MIN_VALUE`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_VALUE)) and 21023 × (2 - 2\-52) ([`Number.MAX_VALUE`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_VALUE)) as well as negative floating-point numbers of the same magnitude, but it can only safely store integers in the range -(253 − 1) ([`Number.MIN_SAFE_INTEGER`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER)) to 253 − 1 ([`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)). Outside this range, JavaScript can no longer safely represent integers; they will instead be represented by a double-precision floating point approximation. You can check if a number is within the range of safe integers using [`Number.isSafeInteger()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger).

Values outside the representable range are automatically converted:

- Positive values greater than [`Number.MAX_VALUE`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_VALUE) are converted to `Infinity`.
- Positive values smaller than [`Number.MIN_VALUE`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_VALUE) are converted to `0`.
- Negative values smaller than -[`Number.MAX_VALUE`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_VALUE) are converted to `-Infinity`.
- Negative values greater than -[`Number.MIN_VALUE`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_VALUE) are converted to `-0`.

`Infinity` and `-Infinity` behave similarly to mathematical infinity, but with some slight differences; see [`Number.POSITIVE_INFINITY`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY) and [`Number.NEGATIVE_INFINITY`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NEGATIVE_INFINITY) for details.

The Number type has only one value with multiple representations: `0` is represented as both `-0` and `+0` (where `0` is an alias for `+0`). In practice, there is almost no difference between the different representations; for example, `+0 === -0` is `true`. However, you are able to notice this when you divide by zero:

```
console.log(42 / +0); // Infinity
console.log(42 / -0); // -Infinity
```

[`NaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN) ("**N**ot **a** **N**umber") is a special kind of number value that's typically encountered when the result of an arithmetic operation cannot be expressed as a number. It is also the only value in JavaScript that is not equal to itself.

Although a number is conceptually a "mathematical value" and is always implicitly floating-point-encoded, JavaScript provides [bitwise operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators#bitwise_operators). When applying bitwise operators, the number is first converted to a 32-bit integer.

**Note:** Although bitwise operators _can_ be used to represent several Boolean values within a single number using [bit masking](https://en.wikipedia.org/wiki/Mask_%28computing%29 'External link (opens in new tab)'), this is usually considered a bad practice. JavaScript offers other means to represent a set of Booleans (like an array of Booleans, or an object with Boolean values assigned to named properties). Bit masking also tends to make the code more difficult to read, understand, and maintain.

It may be necessary to use such techniques in very constrained environments, like when trying to cope with the limitations of local storage, or in extreme cases (such as when each bit over the network counts). This technique should only be considered when it is the last measure that can be taken to optimize size.

### [BigInt type](#bigint_type)

The [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) type is a numeric primitive in JavaScript that can represent integers with arbitrary magnitude. With BigInts, you can safely store and operate on large integers even beyond the safe integer limit ([`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)) for Numbers.

A BigInt is created by appending `n` to the end of an integer or by calling the [`BigInt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/BigInt) function.

This example demonstrates where incrementing the [`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) returns the expected result:

```
// BigInt
const x = BigInt(Number.MAX_SAFE_INTEGER); // 9007199254740991n
x + 1n === x + 2n; // false because 9007199254740992n and 9007199254740993n are unequal

// Number
Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2; // true because both are 9007199254740992
```

You can use most operators to work with BigInts, including `+`, `*`, `-`, `**`, and `%` — the only forbidden one is [`>>>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unsigned_right_shift). A BigInt is not [strictly equal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality) to a Number with the same mathematical value, but it is [loosely](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality) so.

BigInt values are neither always more precise nor always less precise than numbers, since BigInts cannot represent fractional numbers, but can represent big integers more accurately. Neither type entails the other, and they are not mutually substitutable. A [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) is thrown if BigInt values are mixed with regular numbers in arithmetic expressions, or if they are [implicitly converted](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#number_coercion) to each other.

### [String type](#string_type)

The [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) type represents textual data and is encoded as a sequence of 16-bit unsigned integer values representing [UTF-16 code units](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#utf-16_characters_unicode_code_points_and_grapheme_clusters). Each element in the string occupies a position in the string. The first element is at index `0`, the next at index `1`, and so on. The [length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length) of a string is the number of UTF-16 code units in it, which may not correspond to the actual number of Unicode characters; see the [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#utf-16_characters_unicode_code_points_and_grapheme_clusters) reference page for more details.

JavaScript strings are immutable. This means that once a string is created, it is not possible to modify it. String methods create new strings based on the content of the current string — for example:

- A substring of the original using [`substring()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring).
- A concatenation of two strings using the concatenation operator (`+`) or [`concat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/concat).

#### Beware of "stringly-typing" your code!

It can be tempting to use strings to represent complex data. Doing this comes with short-term benefits:

- It is easy to build complex strings with concatenation.
- Strings are easy to debug (what you see printed is always what is in the string).
- Strings are the common denominator of a lot of APIs ([input fields](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement), [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) values, [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch) responses when using [`Response.text()`](https://developer.mozilla.org/en-US/docs/Web/API/Response/text), etc.) and it can be tempting to only work with strings.

With conventions, it is possible to represent any data structure in a string. This does not make it a good idea. For instance, with a separator, one could emulate a list (while a JavaScript array would be more suitable). Unfortunately, when the separator is used in one of the "list" elements, then, the list is broken. An escape character can be chosen, etc. All of this requires conventions and creates an unnecessary maintenance burden.

Use strings for textual data. When representing complex data, _parse_ strings, and use the appropriate abstraction.

### [Symbol type](#symbol_type)

A [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) is a **unique** and **immutable** primitive value and may be used as the key of an Object property (see below). In some programming languages, Symbols are called "atoms". The purpose of symbols is to create unique property keys that are guaranteed not to clash with keys from other code.

## [Objects](#objects)

In computer science, an object is a value in memory which is possibly referenced by an [identifier](https://developer.mozilla.org/en-US/docs/Glossary/Identifier). In JavaScript, objects are the only [mutable](https://developer.mozilla.org/en-US/docs/Glossary/Mutable) values. [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions) are, in fact, also objects with the additional capability of being _callable_.

### [Properties](#properties)

In JavaScript, objects can be seen as a collection of properties. With the [object literal syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#object_literals), a limited set of properties are initialized; then properties can be added and removed. Object properties are equivalent to key-value pairs. Property keys are either [strings](#string_type) or [symbols](#symbol_type). When other types (such as numbers) are used to index objects, the values are implicitly converted to strings. Property values can be values of any type, including other objects, which enables building complex data structures.

There are two types of object properties: The [_data_ property](#data_property) and the [_accessor_ property](#accessor_property). Each property has corresponding _attributes_. Each attribute is accessed internally by the JavaScript engine, but you can set them through [`Object.defineProperty()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty), or read them through [`Object.getOwnPropertyDescriptor()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor). You can read more about the various nuances on the [`Object.defineProperty()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) page.

#### Data property

Data properties associate a key with a value. It can be described by the following attributes:

[`value`](#value)

The value retrieved by a get access of the property. Can be any JavaScript value.

[`writable`](#writable)

A boolean value indicating if the property can be changed with an assignment.

[`enumerable`](#enumerable)

A boolean value indicating if the property can be enumerated by a [`for...in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) loop. See also [Enumerability and ownership of properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Enumerability_and_ownership_of_properties) for how enumerability interacts with other functions and syntaxes.

[`configurable`](#configurable)

A boolean value indicating if the property can be deleted, can be changed to an accessor property, and can have its attributes changed.

#### Accessor property

Associates a key with one of two accessor functions (`get` and `set`) to retrieve or store a value.

**Note:** It's important to recognize it's accessor _property_ — not accessor _method_. We can give a JavaScript object class-like accessors by using a function as a value — but that doesn't make the object a class.

An accessor property has the following attributes:

[`get`](#get)

A function called with an empty argument list to retrieve the property value whenever a get access to the value is performed. See also [getters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get). May be `undefined`.

[`set`](#set)

A function called with an argument that contains the assigned value. Executed whenever a specified property is attempted to be changed. See also [setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set). May be `undefined`.

[`enumerable`](#enumerable_2)

A boolean value indicating if the property can be enumerated by a [`for...in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) loop. See also [Enumerability and ownership of properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Enumerability_and_ownership_of_properties) for how enumerability interacts with other functions and syntaxes.

[`configurable`](#configurable_2)

A boolean value indicating if the property can be deleted, can be changed to a data property, and can have its attributes changed.

The [prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain) of an object points to another object or to `null` — it's conceptually a hidden property of the object, commonly represented as `[[Prototype]]`. Properties of the object's `[[Prototype]]` can also be accessed on the object itself.

Objects are ad-hoc key-value pairs, so they are often used as maps. However, there can be ergonomics, security, and performance issues. Use a [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) for storing arbitrary data instead. The [`Map` reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_vs._maps) contains a more detailed discussion of the pros & cons between plain objects and maps for storing key-value associations.

### [Dates](#dates)

JavaScript provides two sets of APIs for representing dates: the legacy [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object and the modern [`Temporal`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal) object. `Date` has many undesirable design choices and should be avoided in new code if possible.

### [Indexed collections: Arrays and typed Arrays](#indexed_collections_arrays_and_typed_arrays)

[Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) are regular objects for which there is a particular relationship between integer-keyed properties and the `length` property.

Additionally, arrays inherit from `Array.prototype`, which provides a handful of convenient methods to manipulate arrays. For example, [`indexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) searches a value in the array and [`push()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) appends an element to the array. This makes Arrays a perfect candidate to represent ordered lists.

[Typed Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Typed_arrays) present an array-like view of an underlying binary data buffer, and offer many methods that have similar semantics to the array counterparts. "Typed array" is an umbrella term for a range of data structures, including `Int8Array`, `Float32Array`, etc. Check the [typed array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Typed_arrays) page for more information. Typed arrays are often used in conjunction with [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) and [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView).

### [Keyed collections: Maps, Sets, WeakMaps, WeakSets](#keyed_collections_maps_sets_weakmaps_weaksets)

These data structures take object references as keys. [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) and [`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) represent a collection of unique values, while [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) and [`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) represent a collection of key-value associations.

You could implement `Map`s and `Set`s yourself. However, since objects cannot be compared (in the sense of `<` "less than", for instance), neither does the engine expose its hash function for objects, look-up performance would necessarily be linear. Native implementations of them (including `WeakMap`s) can have look-up performance that is approximately logarithmic to constant time.

Usually, to bind data to a DOM node, one could set properties directly on the object, or use `data-*` attributes. This has the downside that the data is available to any script running in the same context. `Map`s and `WeakMap`s make it easy to _privately_ bind data to an object.

`WeakMap` and `WeakSet` only allow garbage-collectable values as keys, which are either objects or [non-registered symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#shared_symbols_in_the_global_symbol_registry), and the keys may be collected even when they remain in the collection. They are specifically used for [memory usage optimization](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Memory_management#data_structures_aiding_memory_management).

### [Structured data: JSON](#structured_data_json)

JSON (**J**ava**S**cript **O**bject **N**otation) is a lightweight data-interchange format, derived from JavaScript, but used by many programming languages. JSON builds universal data structures that can be transferred between different environments and even across languages. See [`JSON`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) for more details.

### [More objects in the standard library](#more_objects_in_the_standard_library)

JavaScript has a standard library of built-in objects. Read the [reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) to find out more about the built-in objects.

## [Type coercion](#type_coercion)

As mentioned above, JavaScript is a [weakly typed](#dynamic_and_weak_typing) language. This means that you can often use a value of one type where another type is expected, and the language will convert it to the right type for you. To do so, JavaScript defines a handful of coercion rules.

### [Primitive coercion](#primitive_coercion)

The [primitive coercion](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-toprimitive 'External link (opens in new tab)') process is used where a primitive value is expected, but there's no strong preference for what the actual type should be. This is usually when a [string](#string_type), a [number](#number_type), or a [BigInt](#bigint_type) are equally acceptable. For example:

- The [`Date()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date) constructor, when it receives one argument that's not a `Date` instance — strings represent date strings, while numbers represent timestamps.
- The [`+`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition) operator — if one operand is a string, string concatenation is performed; otherwise, numeric addition is performed.
- The [`==`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality) operator — if one operand is a primitive while the other is an object, the object is converted to a primitive value with no preferred type.

This operation does not do any conversion if the value is already a primitive. Objects are converted to primitives by calling its [`[Symbol.toPrimitive]()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive) (with `"default"` as hint), `valueOf()`, and `toString()` methods, in that order. Note that primitive conversion calls `valueOf()` before `toString()`, which is similar to the behavior of [number coercion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#number_coercion) but different from [string coercion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_coercion).

The `[Symbol.toPrimitive]()` method, if present, must return a primitive — returning an object results in a [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError). For `valueOf()` and `toString()`, if one returns an object, the return value is ignored and the other's return value is used instead; if neither is present, or neither returns a primitive, a [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) is thrown. For example, in the following code:

```
console.log({} + []); // "[object Object]"
```

Neither `{}` nor `[]` have a `[Symbol.toPrimitive]()` method. Both `{}` and `[]` inherit `valueOf()` from [`Object.prototype.valueOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf), which returns the object itself. Since the return value is an object, it is ignored. Therefore, `toString()` is called instead. [`{}.toString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) returns `"[object Object]"`, while [`[].toString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString) returns `""`, so the result is their concatenation: `"[object Object]"`.

The `[Symbol.toPrimitive]()` method always takes precedence when doing conversion to any primitive type. Primitive conversion generally behaves like number conversion, because `valueOf()` is called in priority; however, objects with custom `[Symbol.toPrimitive]()` methods can choose to return any primitive. [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) and [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) objects are the only built-in objects that override the `[Symbol.toPrimitive]()` method. [`Date.prototype[Symbol.toPrimitive]()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Symbol.toPrimitive) treats the `"default"` hint as if it's `"string"`, while [`Symbol.prototype[Symbol.toPrimitive]()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/Symbol.toPrimitive) ignores the hint and always returns a symbol.

### [Numeric coercion](#numeric_coercion)

There are two numeric types: [Number](#number_type) and [BigInt](#bigint_type). Sometimes the language specifically expects a number or a BigInt (such as [`Array.prototype.slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice), where the index must be a number); other times, it may tolerate either and perform different operations depending on the operand's type. For strict coercion processes that do not allow implicit conversion from the other type, see [number coercion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#number_coercion) and [BigInt coercion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#bigint_coercion).

Numeric coercion is nearly the same as [number coercion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#number_coercion), except that BigInts are returned as-is instead of causing a [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError). Numeric coercion is used by all arithmetic operators, since they are overloaded for both numbers and BigInts. The only exception is [unary plus](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus), which always does number coercion.

### [Other coercions](#other_coercions)

All data types, except Null, Undefined, and Symbol, have their respective coercion process. See [string coercion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_coercion), [boolean coercion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean#boolean_coercion), and [object coercion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object#object_coercion) for more details.

As you may have noticed, there are three distinct paths through which objects may be converted to primitives:

- [Primitive coercion](#primitive_coercion): `[Symbol.toPrimitive]("default")` → `valueOf()` → `toString()`
- [Numeric coercion](#numeric_coercion), [number coercion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#number_coercion), [BigInt coercion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#bigint_coercion): `[Symbol.toPrimitive]("number")` → `valueOf()` → `toString()`
- [String coercion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_coercion): `[Symbol.toPrimitive]("string")` → `toString()` → `valueOf()`

In all cases, `[Symbol.toPrimitive]()`, if present, must be callable and return a primitive, while `valueOf` or `toString` will be ignored if they are not callable or return an object. At the end of the process, if successful, the result is guaranteed to be a primitive. The resulting primitive is then subject to further coercions depending on the context.

## [See also](#see_also)

- [JavaScript Data Structures and Algorithms](https://github.com/trekhleb/javascript-algorithms 'External link (opens in new tab)') by Oleksii Trekhleb
- [Computer Science in JavaScript](https://github.com/humanwhocodes/computer-science-in-javascript 'External link (opens in new tab)') by Nicholas C. Zakas
