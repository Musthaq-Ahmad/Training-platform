import type { ContentTopic } from '../../../types';

export const jsFundamentalsTopics = {
  'js-fundamentals': {
    id: 'js-fundamentals',
    heading: 'JavaScript Fundamentals',
    blocks: [
      {
        type: 'paragraph',
        text: 'A variable is a “named storage” for data. We can use variables to store goodies, visitors, and other data.',
      },
      {
        type: 'paragraph',
        text: 'To create a variable in JavaScript, use the let keyword.',
      },
      {
        type: 'paragraph',
        text: 'The statement below creates (in other words: declares) a variable with the name “message”:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let message;',
        },
      },
      {
        type: 'paragraph',
        text: 'Now, we can put some data into it by using the assignment operator =:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "let message;\n\nmessage = 'Hello'; // store the string 'Hello' in the variable named message",
        },
      },
      {
        type: 'paragraph',
        text: 'The string is now saved into the memory area associated with the variable. We can access it using the variable name:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "let message;\nmessage = 'Hello!';\n\nalert(message); // shows the variable content",
        },
      },
      {
        type: 'paragraph',
        text: 'To be concise, we can combine the variable declaration and assignment into a single line:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "let message = 'Hello!'; // define the variable and assign the value\n\nalert(message); // Hello!",
        },
      },
      {
        type: 'paragraph',
        text: 'We can also declare multiple variables in one line:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "let user = 'John', age = 25, message = 'Hello';",
        },
      },
      {
        type: 'paragraph',
        text: 'That might seem shorter, but we don’t recommend it. For the sake of better readability, please use a single line per variable.',
      },
      {
        type: 'paragraph',
        text: 'The multiline variant is a bit longer, but easier to read:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "let user = 'John';\nlet age = 25;\nlet message = 'Hello';",
        },
      },
      {
        type: 'paragraph',
        text: 'Some people also define multiple variables in this multiline style:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "let user = 'John',\n  age = 25,\n  message = 'Hello';",
        },
      },
      {
        type: 'paragraph',
        text: '…Or even in the “comma-first” style:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "let user = 'John'\n  , age = 25\n  , message = 'Hello';",
        },
      },
      {
        type: 'paragraph',
        text: 'Technically, all these variants do the same thing. So, it’s a matter of personal taste and aesthetics.',
      },
      {
        type: 'paragraph',
        text: 'var instead of let',
      },
      {
        type: 'paragraph',
        text: 'In older scripts, you may also find another keyword: var instead of let:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "var message = 'Hello';",
        },
      },
      {
        type: 'paragraph',
        text: 'The var keyword is almost the same as let. It also declares a variable but in a slightly different, “old-school” way.',
      },
      {
        type: 'paragraph',
        text: 'There are subtle differences between let and var, but they do not matter to us yet. We’ll cover them in detail in the chapter The old "var".',
      },
      {
        type: 'paragraph',
        text: 'We can easily grasp the concept of a “variable” if we imagine it as a “box” for data, with a uniquely-named sticker on it.',
      },
      {
        type: 'paragraph',
        text: 'For instance, the variable message can be imagined as a box labelled "message" with the value "Hello!" in it:',
      },
      {
        type: 'paragraph',
        text: 'We can put any value in the box.',
      },
      {
        type: 'paragraph',
        text: 'We can also change it as many times as we want:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "let message;\n\nmessage = 'Hello!';\n\nmessage = 'World!'; // value changed\n\nalert(message);",
        },
      },
      {
        type: 'paragraph',
        text: 'When the value is changed, the old data is removed from the variable:',
      },
      {
        type: 'paragraph',
        text: 'We can also declare two variables and copy data from one into the other.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "let hello = 'Hello world!';\n\nlet message;\n\n// copy 'Hello world' from hello into message\nmessage = hello;\n\n// now two variables hold the same data\nalert(hello); // Hello world!\nalert(message); // Hello world!",
        },
      },
      {
        type: 'paragraph',
        text: 'Declaring twice triggers an error',
      },
      {
        type: 'paragraph',
        text: 'A variable should be declared only once.',
      },
      {
        type: 'paragraph',
        text: 'A repeated declaration of the same variable is an error:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let message = "This";\n\n// repeated \'let\' leads to an error\nlet message = "That"; // SyntaxError: \'message\' has already been declared',
        },
      },
      {
        type: 'paragraph',
        text: 'So, we should declare a variable once and then refer to it without let.',
      },
      {
        type: 'paragraph',
        text: 'Functional languages',
      },
      {
        type: 'paragraph',
        text: 'It’s interesting to note that there exist so-called pure functional programming languages, such as Haskell, that forbid changing variable values.',
      },
      {
        type: 'paragraph',
        text: 'In such languages, once the value is stored “in the box”, it’s there forever. If we need to store something else, the language forces us to create a new box (declare a new variable). We can’t reuse the old one.',
      },
      {
        type: 'paragraph',
        text: 'Though it may seem a little odd at first sight, these languages are quite capable of serious development. More than that, there are areas like parallel computations where this limitation confers certain benefits.',
      },
      {
        type: 'paragraph',
        text: 'There are two limitations on variable names in JavaScript:',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          'The name must contain only letters, digits, or the symbols $ and _.',
          'The first character must not be a digit.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Examples of valid names:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let userName;\nlet test123;',
        },
      },
      {
        type: 'paragraph',
        text: 'When the name contains multiple words, camelCase is commonly used. That is: words go one after another, with each word except the first starting with a capital letter: myVeryLongName.',
      },
      {
        type: 'paragraph',
        text: "What’s interesting – the dollar sign '$' and the underscore '_' can also be used in names. They are regular symbols, just like letters, without any special meaning.",
      },
      {
        type: 'paragraph',
        text: 'These names are valid:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let $ = 1; // declared a variable with the name "$"\nlet _ = 2; // and now a variable with the name "_"\n\nalert($ + _); // 3',
        },
      },
      {
        type: 'paragraph',
        text: 'Examples of incorrect variable names:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "let 1a; // cannot start with a digit\n\nlet my-name; // hyphens '-' aren't allowed in the name",
        },
      },
      {
        type: 'paragraph',
        text: 'Case matters',
      },
      {
        type: 'paragraph',
        text: 'Variables named apple and APPLE are two different variables.',
      },
      {
        type: 'paragraph',
        text: 'Non-Latin letters are allowed, but not recommended',
      },
      {
        type: 'paragraph',
        text: 'It is possible to use any language, including Cyrillic letters, Chinese logograms and so on, like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "let имя = '...';\nlet 我 = '...';",
        },
      },
      {
        type: 'paragraph',
        text: 'Technically, there is no error here. Such names are allowed, but there is an international convention to use English in variable names. Even if we’re writing a small script, it may have a long life ahead. People from other countries may need to read it sometime.',
      },
      {
        type: 'paragraph',
        text: 'Reserved names',
      },
      {
        type: 'paragraph',
        text: 'There is a list of reserved words, which cannot be used as variable names because they are used by the language itself.',
      },
      {
        type: 'paragraph',
        text: 'For example: let, class, return, and function are reserved.',
      },
      {
        type: 'paragraph',
        text: 'The code below gives a syntax error:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let let = 5; // can\'t name a variable "let", error!\nlet return = 5; // also can\'t name it "return", error!',
        },
      },
      {
        type: 'paragraph',
        text: 'An assignment without use strict',
      },
      {
        type: 'paragraph',
        text: 'Normally, we need to define a variable before using it. But in the old times, it was technically possible to create a variable by a mere assignment of the value without using let. This still works now if we don’t put use strict in our scripts to maintain compatibility with old scripts.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// note: no "use strict" in this example\n\nnum = 5; // the variable "num" is created if it didn\'t exist\n\nalert(num); // 5',
        },
      },
      {
        type: 'paragraph',
        text: 'This is a bad practice and would cause an error in strict mode:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '"use strict";\n\nnum = 5; // error: num is not defined',
        },
      },
      {
        type: 'paragraph',
        text: 'To declare a constant (unchanging) variable, use const instead of let:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "const myBirthday = '18.04.1982';",
        },
      },
      {
        type: 'paragraph',
        text: 'Variables declared using const are called “constants”. They cannot be reassigned. An attempt to do so would cause an error:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "const myBirthday = '18.04.1982';\n\nmyBirthday = '01.01.2001'; // error, can't reassign the constant!",
        },
      },
      {
        type: 'paragraph',
        text: 'When a programmer is sure that a variable will never change, they can declare it with const to guarantee and communicate that fact to everyone.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Uppercase constants',
      },
      {
        type: 'paragraph',
        text: 'There is a widespread practice to use constants as aliases for difficult-to-remember values that are known before execution.',
      },
      {
        type: 'paragraph',
        text: 'Such constants are named using capital letters and underscores.',
      },
      {
        type: 'paragraph',
        text: 'For instance, let’s make constants for colors in so-called “web” (hexadecimal) format:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const COLOR_RED = "#F00";\nconst COLOR_GREEN = "#0F0";\nconst COLOR_BLUE = "#00F";\nconst COLOR_ORANGE = "#FF7F00";\n\n// ...when we need to pick a color\nlet color = COLOR_ORANGE;\nalert(color); // #FF7F00',
        },
      },
      {
        type: 'paragraph',
        text: 'Benefits:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'COLOR_ORANGE is much easier to remember than "#FF7F00".',
          'It is much easier to mistype "#FF7F00" than COLOR_ORANGE.',
          'When reading the code, COLOR_ORANGE is much more meaningful than #FF7F00.',
        ],
      },
      {
        type: 'paragraph',
        text: 'When should we use capitals for a constant and when should we name it normally? Let’s make that clear.',
      },
      {
        type: 'paragraph',
        text: 'Being a “constant” just means that a variable’s value never changes. But some constants are known before execution (like a hexadecimal value for red) and some constants are calculated in run-time, during the execution, but do not change after their initial assignment.',
      },
      {
        type: 'paragraph',
        text: 'For instance:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const pageLoadTime = /* time taken by a webpage to load */;',
        },
      },
      {
        type: 'paragraph',
        text: 'The value of pageLoadTime is not known before the page load, so it’s named normally. But it’s still a constant because it doesn’t change after the assignment.',
      },
      {
        type: 'paragraph',
        text: 'In other words, capital-named constants are only used as aliases for “hard-coded” values.',
      },
      {
        type: 'paragraph',
        text: 'Talking about variables, there’s one more extremely important thing.',
      },
      {
        type: 'paragraph',
        text: 'A variable name should have a clean, obvious meaning, describing the data that it stores.',
      },
      {
        type: 'paragraph',
        text: 'Variable naming is one of the most important and complex skills in programming. A glance at variable names can reveal which code was written by a beginner versus an experienced developer.',
      },
      {
        type: 'paragraph',
        text: 'In a real project, most of the time is spent modifying and extending an existing code base rather than writing something completely separate from scratch. When we return to some code after doing something else for a while, it’s much easier to find information that is well-labelled. Or, in other words, when the variables have good names.',
      },
      {
        type: 'paragraph',
        text: 'Please spend time thinking about the right name for a variable before declaring it. Doing so will repay you handsomely.',
      },
      {
        type: 'paragraph',
        text: 'Some good-to-follow rules are:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Use human-readable names like userName or shoppingCart.',
          'Stay away from abbreviations or short names like a, b, and c, unless you know what you’re doing.',
          'Make names maximally descriptive and concise. Examples of bad names are data and value. Such names say nothing. It’s only okay to use them if the context of the code makes it exceptionally obvious which data or value the variable is referencing.',
          'Agree on terms within your team and in your mind. If a site visitor is called a “user” then we should name related variables currentUser or newUser instead of currentVisitor or newManInTown.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Sounds simple? Indeed it is, but creating descriptive and concise variable names in practice is not. Go for it.',
      },
      {
        type: 'paragraph',
        text: 'Reuse or create?',
      },
      {
        type: 'paragraph',
        text: 'And the last note. There are some lazy programmers who, instead of declaring new variables, tend to reuse existing ones.',
      },
      {
        type: 'paragraph',
        text: 'As a result, their variables are like boxes into which people throw different things without changing their stickers. What’s inside the box now? Who knows? We need to come closer and check.',
      },
      {
        type: 'paragraph',
        text: 'Such programmers save a little bit on variable declaration but lose ten times more on debugging.',
      },
      {
        type: 'paragraph',
        text: 'An extra variable is good, not evil.',
      },
      {
        type: 'paragraph',
        text: 'Modern JavaScript minifiers and browsers optimize code well enough, so it won’t create performance issues. Using different variables for different values can even help the engine optimize your code.',
      },
      {
        type: 'paragraph',
        text: 'We can declare variables to store data by using the var, let, or const keywords.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'let – is a modern variable declaration.',
          'var – is an old-school variable declaration. Normally we don’t use it at all, but we’ll cover subtle differences from let in the chapter The old "var", just in case you need them.',
          'const – is like let, but the value of the variable can’t be changed.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Variables should be named in a way that allows us to easily understand what’s inside them.',
      },
      {
        type: 'paragraph',
        text: 'A value in JavaScript is always of a certain type. For example, a string or a number.',
      },
      {
        type: 'paragraph',
        text: 'There are eight basic data types in JavaScript. Here, we’ll cover them in general and in the next chapters we’ll talk about each of them in detail.',
      },
      {
        type: 'paragraph',
        text: 'We can put any type in a variable. For example, a variable can at one moment be a string and then store a number:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// no error\nlet message = "hello";\nmessage = 123456;',
        },
      },
      {
        type: 'paragraph',
        text: 'Programming languages that allow such things, such as JavaScript, are called “dynamically typed”, meaning that there exist data types, but variables are not bound to any of them.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let n = 123;\nn = 12.345;',
        },
      },
      {
        type: 'paragraph',
        text: 'The number type represents both integer and floating point numbers.',
      },
      {
        type: 'paragraph',
        text: 'There are many operations for numbers, e.g. multiplication *, division /, addition +, subtraction -, and so on.',
      },
      {
        type: 'paragraph',
        text: 'Besides regular numbers, there are so-called “special numeric values” which also belong to this data type: Infinity, -Infinity and NaN.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Infinity represents the mathematical Infinity ∞. It is a special value that’s greater than any number. We can get it as a result of division by zero: alert( 1 / 0 ); // Infinity Or just reference it directly: alert( Infinity ); // Infinity',
          'NaN represents a computational error. It is a result of an incorrect or an undefined mathematical operation, for instance: alert( "not a number" / 2 ); // NaN, such division is erroneous NaN is sticky. Any further mathematical operation on NaN returns NaN: alert( NaN + 1 ); // NaN alert( 3 * NaN ); // NaN alert( "not a number" / 2 - 1 ); // NaN So, if there’s a NaN somewhere in a mathematical expression, it propagates to the whole result (there’s only one exception to that: NaN ** 0 is 1).',
        ],
      },
      {
        type: 'paragraph',
        text: 'Mathematical operations are safe',
      },
      {
        type: 'paragraph',
        text: 'Doing maths is “safe” in JavaScript. We can do anything: divide by zero, treat non-numeric strings as numbers, etc.',
      },
      {
        type: 'paragraph',
        text: 'The script will never stop with a fatal error (“die”). At worst, we’ll get NaN as the result.',
      },
      {
        type: 'paragraph',
        text: 'Special numeric values formally belong to the “number” type. Of course they are not numbers in the common sense of this word.',
      },
      {
        type: 'paragraph',
        text: 'We’ll see more about working with numbers in the chapter Numbers.',
      },
      {
        type: 'paragraph',
        text: 'In JavaScript, the “number” type cannot safely represent integer values larger than (253-1) (that’s 9007199254740991), or less than -(253-1) for negatives.',
      },
      {
        type: 'paragraph',
        text: 'To be really precise, the “number” type can store larger integers (up to 1.7976931348623157 * 10308), but outside of the safe integer range ±(253-1) there’ll be a precision error, because not all digits fit into the fixed 64-bit storage. So an “approximate” value may be stored.',
      },
      {
        type: 'paragraph',
        text: 'For example, these two numbers (right above the safe range) are the same:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'console.log(9007199254740991 + 1); // 9007199254740992\nconsole.log(9007199254740991 + 2); // 9007199254740992',
        },
      },
      {
        type: 'paragraph',
        text: 'So to say, all odd integers greater than (253-1) can’t be stored at all in the “number” type.',
      },
      {
        type: 'paragraph',
        text: 'For most purposes ±(253-1) range is quite enough, but sometimes we need the entire range of really big integers, e.g. for cryptography or microsecond-precision timestamps.',
      },
      {
        type: 'paragraph',
        text: 'BigInt type was recently added to the language to represent integers of arbitrary length.',
      },
      {
        type: 'paragraph',
        text: 'A BigInt value is created by appending n to the end of an integer:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// the "n" at the end means it\'s a BigInt\nconst bigInt = 1234567890123456789012345678901234567890n;',
        },
      },
      {
        type: 'paragraph',
        text: 'As BigInt numbers are rarely needed, we don’t cover them here, but devoted them a separate chapter BigInt. Read it when you need such big numbers.',
      },
      {
        type: 'paragraph',
        text: 'A string in JavaScript must be surrounded by quotes.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let str = "Hello";\nlet str2 = \'Single quotes are ok too\';\nlet phrase = `can embed another ${str}`;',
        },
      },
      {
        type: 'paragraph',
        text: 'In JavaScript, there are 3 types of quotes.',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: ['Double quotes: "Hello".', "Single quotes: 'Hello'.", 'Backticks: `Hello`.'],
      },
      {
        type: 'paragraph',
        text: 'Double and single quotes are “simple” quotes. There’s practically no difference between them in JavaScript.',
      },
      {
        type: 'paragraph',
        text: 'Backticks are “extended functionality” quotes. They allow us to embed variables and expressions into a string by wrapping them in ${…}, for example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let name = "John";\n\n// embed a variable\nalert( `Hello, ${name}!` ); // Hello, John!\n\n// embed an expression\nalert( `the result is ${1 + 2}` ); // the result is 3',
        },
      },
      {
        type: 'paragraph',
        text: 'The expression inside ${…} is evaluated and the result becomes a part of the string. We can put anything in there: a variable like name or an arithmetical expression like 1 + 2 or something more complex.',
      },
      {
        type: 'paragraph',
        text: 'Please note that this can only be done in backticks. Other quotes don’t have this embedding functionality!',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'alert( "the result is ${1 + 2}" ); // the result is ${1 + 2} (double quotes do nothing)',
        },
      },
      {
        type: 'paragraph',
        text: 'We’ll cover strings more thoroughly in the chapter Strings.',
      },
      {
        type: 'paragraph',
        text: 'There is no character type.',
      },
      {
        type: 'paragraph',
        text: 'In some languages, there is a special “character” type for a single character. For example, in the C language and in Java it is called “char”.',
      },
      {
        type: 'paragraph',
        text: 'In JavaScript, there is no such type. There’s only one type: string. A string may consist of zero characters (be empty), one character or many of them.',
      },
      {
        type: 'paragraph',
        text: 'The boolean type has only two values: true and false.',
      },
      {
        type: 'paragraph',
        text: 'This type is commonly used to store yes/no values: true means “yes, correct”, and false means “no, incorrect”.',
      },
      {
        type: 'paragraph',
        text: 'For instance:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let nameFieldChecked = true; // yes, name field is checked\nlet ageFieldChecked = false; // no, age field is not checked',
        },
      },
      {
        type: 'paragraph',
        text: 'Boolean values also come as a result of comparisons:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let isGreater = 4 > 1;\n\nalert( isGreater ); // true (the comparison result is "yes")',
        },
      },
      {
        type: 'paragraph',
        text: 'We’ll cover booleans more deeply in the chapter Logical operators.',
      },
      {
        type: 'paragraph',
        text: 'The special null value does not belong to any of the types described above.',
      },
      {
        type: 'paragraph',
        text: 'It forms a separate type of its own which contains only the null value:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let age = null;',
        },
      },
      {
        type: 'paragraph',
        text: 'In JavaScript, null is not a “reference to a non-existing object” or a “null pointer” like in some other languages.',
      },
      {
        type: 'paragraph',
        text: 'It’s just a special value which represents “nothing”, “empty” or “value unknown”.',
      },
      {
        type: 'paragraph',
        text: 'The code above states that age is unknown.',
      },
      {
        type: 'paragraph',
        text: 'The special value undefined also stands apart. It makes a type of its own, just like null.',
      },
      {
        type: 'paragraph',
        text: 'The meaning of undefined is “value is not assigned”.',
      },
      {
        type: 'paragraph',
        text: 'If a variable is declared, but not assigned, then its value is undefined:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let age;\n\nalert(age); // shows "undefined"',
        },
      },
      {
        type: 'paragraph',
        text: 'Technically, it is possible to explicitly assign undefined to a variable:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let age = 100;\n\n// change the value to undefined\nage = undefined;\n\nalert(age); // "undefined"',
        },
      },
      {
        type: 'paragraph',
        text: '…But we don’t recommend doing that. Normally, one uses null to assign an “empty” or “unknown” value to a variable, while undefined is reserved as a default initial value for unassigned things.',
      },
      {
        type: 'paragraph',
        text: 'The object type is special.',
      },
      {
        type: 'paragraph',
        text: 'All other types are called “primitive” because their values can contain only a single thing (be it a string or a number or whatever). In contrast, objects are used to store collections of data and more complex entities.',
      },
      {
        type: 'paragraph',
        text: 'Being that important, objects deserve a special treatment. We’ll deal with them later in the chapter Objects, after we learn more about primitives.',
      },
      {
        type: 'paragraph',
        text: 'The symbol type is used to create unique identifiers for objects. We have to mention it here for the sake of completeness, but also postpone the details till we know objects.',
      },
      {
        type: 'paragraph',
        text: 'The typeof operator returns the type of the operand. It’s useful when we want to process values of different types differently or just want to do a quick check.',
      },
      {
        type: 'paragraph',
        text: 'A call to typeof x returns a string with the type name:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'typeof undefined // "undefined"\n\ntypeof 0 // "number"\n\ntypeof 10n // "bigint"\n\ntypeof true // "boolean"\n\ntypeof "foo" // "string"\n\ntypeof Symbol("id") // "symbol"\n\ntypeof Math // "object"  (1)\n\ntypeof null // "object"  (2)\n\ntypeof alert // "function"  (3)',
        },
      },
      {
        type: 'paragraph',
        text: 'The last three lines may need additional explanation:',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          'Math is a built-in object that provides mathematical operations. We will learn it in the chapter Numbers. Here, it serves just as an example of an object.',
          'The result of typeof null is "object". That’s an officially recognized error in typeof, coming from very early days of JavaScript and kept for compatibility. Definitely, null is not an object. It is a special value with a separate type of its own. The behavior of typeof is wrong here.',
          'The result of typeof alert is "function", because alert is a function. We’ll study functions in the next chapters where we’ll also see that there’s no special “function” type in JavaScript. Functions belong to the object type. But typeof treats them differently, returning "function". That also comes from the early days of JavaScript. Technically, such behavior isn’t correct, but can be convenient in practice.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The typeof(x) syntax',
      },
      {
        type: 'paragraph',
        text: 'You may also come across another syntax: typeof(x). It’s the same as typeof x.',
      },
      {
        type: 'paragraph',
        text: 'To put it clear: typeof is an operator, not a function. The parentheses here aren’t a part of typeof. It’s the kind of parentheses used for mathematical grouping.',
      },
      {
        type: 'paragraph',
        text: 'Usually, such parentheses contain a mathematical expression, such as (2 + 2), but here they contain only one argument (x). Syntactically, they allow to avoid a space between the typeof operator and its argument, and some people like it.',
      },
      {
        type: 'paragraph',
        text: 'Some people prefer typeof(x), although the typeof x syntax is much more common.',
      },
      {
        type: 'paragraph',
        text: 'There are 8 basic data types in JavaScript.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Seven primitive data types: * number for numbers of any kind: integer or floating-point, integers are limited by ±(253-1). * bigint for integer numbers of arbitrary length. * string for strings. A string may have zero or more characters, there’s no separate single-character type. * boolean for true/false. * null for unknown values – a standalone type that has a single value null. * undefined for unassigned values – a standalone type that has a single value undefined. * symbol for unique identifiers.',
          'And one non-primitive data type: * object for more complex data structures.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The typeof operator allows us to see which type is stored in a variable.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Usually used as typeof x, but typeof(x) is also possible.',
          'Returns a string with the name of the type, like "string".',
          'For null returns "object" – this is an error in the language, it’s not actually an object.',
        ],
      },
      {
        type: 'paragraph',
        text: 'In the next chapters, we’ll concentrate on primitive values and once we’re familiar with them, we’ll move on to objects.',
      },
      {
        type: 'paragraph',
        text: 'Most of the time, operators and functions automatically convert the values given to them to the right type.',
      },
      {
        type: 'paragraph',
        text: 'For example, alert automatically converts any value to a string to show it. Mathematical operations convert values to numbers.',
      },
      {
        type: 'paragraph',
        text: 'There are also cases when we need to explicitly convert a value to the expected type.',
      },
      {
        type: 'paragraph',
        text: 'Not talking about objects yet',
      },
      {
        type: 'paragraph',
        text: 'In this chapter, we won’t cover objects. For now, we’ll just be talking about primitives.',
      },
      {
        type: 'paragraph',
        text: 'Later, after we learn about objects, in the chapter Object to primitive conversion we’ll see how objects fit in.',
      },
      {
        type: 'paragraph',
        text: 'String conversion happens when we need the string form of a value.',
      },
      {
        type: 'paragraph',
        text: 'For example, alert(value) does it to show the value.',
      },
      {
        type: 'paragraph',
        text: 'We can also call the String(value) function to convert a value to a string:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let value = true;\nalert(typeof value); // boolean\n\nvalue = String(value); // now value is a string "true"\nalert(typeof value); // string',
        },
      },
      {
        type: 'paragraph',
        text: 'String conversion is mostly obvious. A false becomes "false", null becomes "null", etc.',
      },
      {
        type: 'paragraph',
        text: 'Numeric conversion in mathematical functions and expressions happens automatically.',
      },
      {
        type: 'paragraph',
        text: 'For example, when division / is applied to non-numbers:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'alert( "6" / "2" ); // 3, strings are converted to numbers',
        },
      },
      {
        type: 'paragraph',
        text: 'We can use the Number(value) function to explicitly convert a value to a number:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let str = "123";\nalert(typeof str); // string\n\nlet num = Number(str); // becomes a number 123\n\nalert(typeof num); // number',
        },
      },
      {
        type: 'paragraph',
        text: 'Explicit conversion is usually required when we read a value from a string-based source like a text form but expect a number to be entered.',
      },
      {
        type: 'paragraph',
        text: 'If the string is not a valid number, the result of such a conversion is NaN. For instance:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let age = Number("an arbitrary string instead of a number");\n\nalert(age); // NaN, conversion failed',
        },
      },
      {
        type: 'paragraph',
        text: 'Numeric conversion rules:',
      },
      {
        type: 'table',
        headers: ['Value', 'Becomes…'],
        rows: [
          ['undefined', 'NaN'],
          ['null', '0'],
          ['true and false', '1 and 0'],
          [
            'string',
            'Whitespaces (includes spaces, tabs \\t, newlines \\n etc.) from the start and end are removed. If the remaining string is empty, the result is 0. Otherwise, the number is “read” from the string. An error gives NaN.',
          ],
        ],
      },
      {
        type: 'paragraph',
        text: 'Examples:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'alert( Number("   123   ") ); // 123\nalert( Number("123z") );      // NaN (error reading a number at "z")\nalert( Number(true) );        // 1\nalert( Number(false) );       // 0',
        },
      },
      {
        type: 'paragraph',
        text: 'Please note that null and undefined behave differently here: null becomes zero while undefined becomes NaN.',
      },
      {
        type: 'paragraph',
        text: 'Most mathematical operators also perform such conversion, we’ll see that in the next chapter.',
      },
      {
        type: 'paragraph',
        text: 'Boolean conversion is the simplest one.',
      },
      {
        type: 'paragraph',
        text: 'It happens in logical operations (later we’ll meet condition tests and other similar things) but can also be performed explicitly with a call to Boolean(value).',
      },
      {
        type: 'paragraph',
        text: 'The conversion rule:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Values that are intuitively “empty”, like 0, an empty string, null, undefined, and NaN, become false.',
          'Other values become true.',
        ],
      },
      {
        type: 'paragraph',
        text: 'For instance:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'alert( Boolean(1) ); // true\nalert( Boolean(0) ); // false\n\nalert( Boolean("hello") ); // true\nalert( Boolean("") ); // false',
        },
      },
      {
        type: 'paragraph',
        text: 'Please note: the string with zero "0" is true',
      },
      {
        type: 'paragraph',
        text: 'Some languages (namely PHP) treat "0" as false. But in JavaScript, a non-empty string is always true.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'alert( Boolean("0") ); // true\nalert( Boolean(" ") ); // spaces, also true (any non-empty string is true)',
        },
      },
      {
        type: 'paragraph',
        text: 'The three most widely used type conversions are to string, to number, and to boolean.',
      },
      {
        type: 'paragraph',
        text: 'String Conversion – Occurs when we output something. Can be performed with String(value). The conversion to string is usually obvious for primitive values.',
      },
      {
        type: 'paragraph',
        text: 'Numeric Conversion – Occurs in math operations. Can be performed with Number(value).',
      },
      {
        type: 'paragraph',
        text: 'The conversion follows the rules:',
      },
      {
        type: 'table',
        headers: ['Value', 'Becomes…'],
        rows: [
          ['undefined', 'NaN'],
          ['null', '0'],
          ['true / false', '1 / 0'],
          [
            'string',
            'The string is read “as is”, whitespaces (includes spaces, tabs \\t, newlines \\n etc.) from both sides are ignored. An empty string becomes 0. An error gives NaN.',
          ],
        ],
      },
      {
        type: 'paragraph',
        text: 'Boolean Conversion – Occurs in logical operations. Can be performed with Boolean(value).',
      },
      {
        type: 'paragraph',
        text: 'Follows the rules:',
      },
      {
        type: 'table',
        headers: ['Value', 'Becomes…'],
        rows: [
          ['0, null, undefined, NaN, ""', 'false'],
          ['any other value', 'true'],
        ],
      },
      {
        type: 'paragraph',
        text: 'Most of these rules are easy to understand and memorize. The notable exceptions where people usually make mistakes are:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'undefined is NaN as a number, not 0.',
          '"0" and space-only strings like " " are true as a boolean.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Objects aren’t covered here. We’ll return to them later in the chapter Object to primitive conversion that is devoted exclusively to objects after we learn more basic things about JavaScript.',
      },
      {
        type: 'paragraph',
        text: 'We know many comparison operators from maths.',
      },
      {
        type: 'paragraph',
        text: 'In JavaScript they are written like this:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Greater/less than: a &gt; b, a &lt; b.',
          'Greater/less than or equals: a &gt;= b, a &lt;= b.',
          'Equals: a == b, please note the double equality sign == means the equality test, while a single one a = b means an assignment.',
          'Not equals: In maths the notation is ≠, but in JavaScript it’s written as a != b.',
        ],
      },
      {
        type: 'paragraph',
        text: 'In this article we’ll learn more about different types of comparisons, how JavaScript makes them, including important peculiarities.',
      },
      {
        type: 'paragraph',
        text: 'At the end you’ll find a good recipe to avoid “JavaScript quirks”-related issues.',
      },
      {
        type: 'paragraph',
        text: 'All comparison operators return a boolean value:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'true – means “yes”, “correct” or “the truth”.',
          'false – means “no”, “wrong” or “not the truth”.',
        ],
      },
      {
        type: 'paragraph',
        text: 'For example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'alert( 2 > 1 );  // true (correct)\nalert( 2 == 1 ); // false (wrong)\nalert( 2 != 1 ); // true (correct)',
        },
      },
      {
        type: 'paragraph',
        text: 'A comparison result can be assigned to a variable, just like any value:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let result = 5 > 4; // assign the result of the comparison\nalert( result ); // true',
        },
      },
      {
        type: 'paragraph',
        text: 'To see whether a string is greater than another, JavaScript uses the so-called “dictionary” or “lexicographical” order.',
      },
      {
        type: 'paragraph',
        text: 'In other words, strings are compared letter-by-letter.',
      },
      {
        type: 'paragraph',
        text: 'For example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "alert( 'Z' > 'A' ); // true\nalert( 'Glow' > 'Glee' ); // true\nalert( 'Bee' > 'Be' ); // true",
        },
      },
      {
        type: 'paragraph',
        text: 'The algorithm to compare two strings is simple:',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          'Compare the first character of both strings.',
          'If the first character from the first string is greater (or less) than the other string’s, then the first string is greater (or less) than the second. We’re done.',
          'Otherwise, if both strings’ first characters are the same, compare the second characters the same way.',
          'Repeat until the end of either string.',
          'If both strings end at the same length, then they are equal. Otherwise, the longer string is greater.',
        ],
      },
      {
        type: 'paragraph',
        text: "In the first example above, the comparison 'Z' &gt; 'A' gets to a result at the first step.",
      },
      {
        type: 'paragraph',
        text: "The second comparison 'Glow' and 'Glee' needs more steps as strings are compared character-by-character:",
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          'G is the same as G.',
          'l is the same as l.',
          'o is greater than e. Stop here. The first string is greater.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Not a real dictionary, but Unicode order',
      },
      {
        type: 'paragraph',
        text: 'The comparison algorithm given above is roughly equivalent to the one used in dictionaries or phone books, but it’s not exactly the same.',
      },
      {
        type: 'paragraph',
        text: 'For instance, case matters. A capital letter "A" is not equal to the lowercase "a". Which one is greater? The lowercase "a". Why? Because the lowercase character has a greater index in the internal encoding table JavaScript uses (Unicode). We’ll get back to specific details and consequences of this in the chapter Strings.',
      },
      {
        type: 'paragraph',
        text: 'When comparing values of different types, JavaScript converts the values to numbers.',
      },
      {
        type: 'paragraph',
        text: 'For example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "alert( '2' > 1 ); // true, string '2' becomes a number 2\nalert( '01' == 1 ); // true, string '01' becomes a number 1",
        },
      },
      {
        type: 'paragraph',
        text: 'For boolean values, true becomes 1 and false becomes 0.',
      },
      {
        type: 'paragraph',
        text: 'For example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'alert( true == 1 ); // true\nalert( false == 0 ); // true',
        },
      },
      {
        type: 'paragraph',
        text: 'A funny consequence',
      },
      {
        type: 'paragraph',
        text: 'It is possible that at the same time:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Two values are equal.',
          'One of them is true as a boolean and the other one is false as a boolean.',
        ],
      },
      {
        type: 'paragraph',
        text: 'For example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let a = 0;\nalert( Boolean(a) ); // false\n\nlet b = "0";\nalert( Boolean(b) ); // true\n\nalert(a == b); // true!',
        },
      },
      {
        type: 'paragraph',
        text: 'From JavaScript’s standpoint, this result is quite normal. An equality check converts values using the numeric conversion (hence "0" becomes 0), while the explicit Boolean conversion uses another set of rules.',
      },
      {
        type: 'paragraph',
        text: 'A regular equality check == has a problem. It cannot differentiate 0 from false:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'alert( 0 == false ); // true',
        },
      },
      {
        type: 'paragraph',
        text: 'The same thing happens with an empty string:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "alert( '' == false ); // true",
        },
      },
      {
        type: 'paragraph',
        text: 'This happens because operands of different types are converted to numbers by the equality operator ==. An empty string, just like false, becomes a zero.',
      },
      {
        type: 'paragraph',
        text: 'What to do if we’d like to differentiate 0 from false?',
      },
      {
        type: 'paragraph',
        text: 'A strict equality operator === checks the equality without type conversion.',
      },
      {
        type: 'paragraph',
        text: 'In other words, if a and b are of different types, then a === b immediately returns false without an attempt to convert them.',
      },
      {
        type: 'paragraph',
        text: 'Let’s try it:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'alert( 0 === false ); // false, because the types are different',
        },
      },
      {
        type: 'paragraph',
        text: 'There is also a “strict non-equality” operator !== analogous to !=.',
      },
      {
        type: 'paragraph',
        text: 'The strict equality operator is a bit longer to write, but makes it obvious what’s going on and leaves less room for errors.',
      },
      {
        type: 'paragraph',
        text: 'There’s a non-intuitive behavior when null or undefined are compared to other values.',
      },
      {
        type: 'paragraph',
        text: 'For a strict equality check ===',
      },
      {
        type: 'paragraph',
        text: 'These values are different, because each of them is a different type.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'alert( null === undefined ); // false',
        },
      },
      {
        type: 'paragraph',
        text: 'For a non-strict check ==',
      },
      {
        type: 'paragraph',
        text: 'There’s a special rule. These two are a “sweet couple”: they equal each other (in the sense of ==), but not any other value.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'alert( null == undefined ); // true',
        },
      },
      {
        type: 'paragraph',
        text: 'For maths and other comparisons &lt; &gt; &lt;= &gt;=',
      },
      {
        type: 'paragraph',
        text: 'null/undefined are converted to numbers: null becomes 0, while undefined becomes NaN.',
      },
      {
        type: 'paragraph',
        text: 'Now let’s see some funny things that happen when we apply these rules. And, what’s more important, how to not fall into a trap with them.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Strange result: null vs 0',
      },
      {
        type: 'paragraph',
        text: 'Let’s compare null with a zero:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'alert( null > 0 );  // (1) false\nalert( null == 0 ); // (2) false\nalert( null >= 0 ); // (3) true',
        },
      },
      {
        type: 'paragraph',
        text: 'Mathematically, that’s strange. The last result states that “null is greater than or equal to zero”, so in one of the comparisons above it must be true, but they are both false.',
      },
      {
        type: 'paragraph',
        text: 'The reason is that an equality check == and comparisons &gt; &lt; &gt;= &lt;= work differently. Comparisons convert null to a number, treating it as 0. That’s why (3) null &gt;= 0 is true and (1) null &gt; 0 is false.',
      },
      {
        type: 'paragraph',
        text: 'On the other hand, the equality check == for undefined and null is defined such that, without any conversions, they equal each other and don’t equal anything else. That’s why (2) null == 0 is false.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'An incomparable undefined',
      },
      {
        type: 'paragraph',
        text: 'The value undefined shouldn’t be compared to other values:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'alert( undefined > 0 ); // false (1)\nalert( undefined < 0 ); // false (2)\nalert( undefined == 0 ); // false (3)',
        },
      },
      {
        type: 'paragraph',
        text: 'Why does it dislike zero so much? Always false!',
      },
      {
        type: 'paragraph',
        text: 'We get these results because:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Comparisons (1) and (2) return false because undefined gets converted to NaN and NaN is a special numeric value which returns false for all comparisons.',
          'The equality check (3) returns false because undefined only equals null, undefined, and no other value.',
        ],
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Avoid problems',
      },
      {
        type: 'paragraph',
        text: 'Why did we go over these examples? Should we remember these peculiarities all the time? Well, not really. Actually, these tricky things will gradually become familiar over time, but there’s a solid way to avoid problems with them:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Treat any comparison with undefined/null except the strict equality === with exceptional care.',
          'Don’t use comparisons &gt;= &gt; &lt; &lt;= with a variable which may be null/undefined, unless you’re really sure of what you’re doing. If a variable can have these values, check for them separately.',
        ],
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Comparison operators return a boolean value.',
          'Strings are compared letter-by-letter in the “dictionary” order.',
          'When values of different types are compared, they get converted to numbers (with the exclusion of a strict equality check).',
          'The values null and undefined are equal == to themselves and each other, but do not equal any other value.',
          'Be careful when using comparisons like &gt; or &lt; with variables that can occasionally be null/undefined. Checking for null/undefined separately is a good idea.',
        ],
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
