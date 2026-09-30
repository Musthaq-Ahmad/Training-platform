import type { ContentTopic } from '../../../types';

export const tsbasicsTopics = {
  tsbasics: {
    id: 'tsbasics',
    heading: 'Static type-checking',
    blocks: [
      {
        type: 'paragraph',
        text: 'Think back to that TypeError we got earlier from trying to call a string as a function. Most people don’t like to get any sorts of errors when running their code - those are considered bugs! And when we write new code, we try our best to avoid introducing new bugs.',
      },
      {
        type: 'paragraph',
        text: 'If we add just a bit of code, save our file, re-run the code, and immediately see the error, we might be able to isolate the problem quickly; but that’s not always the case. We might not have tested the feature thoroughly enough, so we might never actually run into a potential error that would be thrown! Or if we were lucky enough to witness the error, we might have ended up doing large refactorings and adding a lot of different code that we’re forced to dig through.',
      },
      {
        type: 'paragraph',
        text: 'Ideally, we could have a tool that helps us find these bugs before our code runs. That’s what a static type-checker like TypeScript does. Static type systems describe the shapes and behaviors of what our values will be when we run our programs. A type-checker like TypeScript uses that information and tells us when things might be going off the rails.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const message = "hello!";\n \nmessage();',
        },
      },
      {
        type: 'paragraph',
        text: 'Running that last sample with TypeScript will give us an error message before we run the code in the first place.',
      },
      {
        type: 'paragraph',
        text: 'So far we’ve been discussing certain things like runtime errors - cases where the JavaScript runtime tells us that it thinks something is nonsensical. Those cases come up because the ECMAScript specification has explicit instructions on how the language should behave when it runs into something unexpected.',
      },
      {
        type: 'paragraph',
        text: 'For example, the specification says that trying to call something that isn’t callable should throw an error. Maybe that sounds like “obvious behavior”, but you could imagine that accessing a property that doesn’t exist on an object should throw an error too. Instead, JavaScript gives us different behavior and returns the value undefined:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const user = {\n  name: "Daniel",\n  age: 26,\n};\n\nuser.location; // returns undefined',
        },
      },
      {
        type: 'paragraph',
        text: 'Ultimately, a static type system has to make the call over what code should be flagged as an error in its system, even if it’s “valid” JavaScript that won’t immediately throw an error. In TypeScript, the following code produces an error about location not being defined:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const user = {\n  name: "Daniel",\n  age: 26,\n};\n \nuser.location;',
        },
      },
      {
        type: 'paragraph',
        text: 'While sometimes that implies a trade-off in what you can express, the intent is to catch legitimate bugs in our programs. And TypeScript catches a lot of legitimate bugs.',
      },
      {
        type: 'paragraph',
        text: 'For example: typos,',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const announcement = "Hello World!";\n \n// How quickly can you spot the typos?\nannouncement.toLocaleLowercase();\nannouncement.toLocalLowerCase();\n \n// We probably meant to write this...\nannouncement.toLocaleLowerCase();',
        },
      },
      {
        type: 'paragraph',
        text: 'uncalled functions,',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function flipCoin() {\n  // Meant to be Math.random()\n  return Math.random < 0.5;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'or basic logic errors.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const value = Math.random() < 0.5 ? "a" : "b";\nif (value !== "a") {\n  // ...\n} else if (value === "b") {\n  // Oops, unreachable\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'TypeScript can catch bugs when we make mistakes in our code. That’s great, but TypeScript can also prevent us from making those mistakes in the first place.',
      },
      {
        type: 'paragraph',
        text: 'The type-checker has information to check things like whether we’re accessing the right properties on variables and other properties. Once it has that information, it can also start suggesting which properties you might want to use.',
      },
      {
        type: 'paragraph',
        text: 'That means TypeScript can be leveraged for editing code too, and the core type-checker can provide error messages and code completion as you type in the editor. That’s part of what people often refer to when they talk about tooling in TypeScript.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'import express from "express";\nconst app = express();\n \napp.get("/", function (req, res) {\n  res.sen\n});\n \napp.listen(3000);',
        },
      },
      {
        type: 'paragraph',
        text: 'TypeScript takes tooling seriously, and that goes beyond completions and errors as you type. An editor that supports TypeScript can deliver “quick fixes” to automatically fix errors, refactorings to easily re-organize code, and useful navigation features for jumping to definitions of a variable, or finding all references to a given variable. All of this is built on top of the type-checker and is fully cross-platform, so it’s likely that your favorite editor has TypeScript support available.',
      },
      {
        type: 'paragraph',
        text: 'We’ve been talking about type-checking, but we haven’t yet used our type-checker. Let’s get acquainted with our new friend tsc, the TypeScript compiler. First we’ll need to grab it via npm.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'npm install -g typescript',
        },
      },
      {
        type: 'paragraph',
        text: 'Now let’s move to an empty folder and try writing our first TypeScript program: hello.ts:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '// Greets the world.\nconsole.log("Hello world!");',
        },
      },
      {
        type: 'paragraph',
        text: 'Notice there are no frills here; this “hello world” program looks identical to what you’d write for a “hello world” program in JavaScript. And now let’s type-check it by running the command tsc which was installed for us by the typescript package.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'tsc hello.ts',
        },
      },
      {
        type: 'paragraph',
        text: 'Tada!',
      },
      {
        type: 'paragraph',
        text: 'Wait, “tada” what exactly? We ran tsc and nothing happened! Well, there were no type errors, so we didn’t get any output in our console since there was nothing to report.',
      },
      {
        type: 'paragraph',
        text: 'But check again - we got some file output instead. If we look in our current directory, we’ll see a hello.js file next to hello.ts. That’s the output from our hello.ts file after tsc compiles or transforms it into a plain JavaScript file. And if we check the contents, we’ll see what TypeScript spits out after it processes a .ts file:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '// Greets the world.\nconsole.log("Hello world!");',
        },
      },
      {
        type: 'paragraph',
        text: 'In this case, there was very little for TypeScript to transform, so it looks identical to what we wrote. The compiler tries to emit clean readable code that looks like something a person would write. While that’s not always so easy, TypeScript indents consistently, is mindful of when our code spans across different lines of code, and tries to keep comments around.',
      },
      {
        type: 'paragraph',
        text: 'What about if we did introduce a type-checking error? Let’s rewrite hello.ts:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '// This is an industrial-grade general-purpose greeter function:\nfunction greet(person, date) {\n  console.log(`Hello ${person}, today is ${date}!`);\n}\n \ngreet("Brendan");',
        },
      },
      {
        type: 'paragraph',
        text: 'If we run tsc hello.ts again, notice that we get an error on the command line!',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'Expected 2 arguments, but got 1.',
        },
      },
      {
        type: 'paragraph',
        text: 'TypeScript is telling us we forgot to pass an argument to the greet function, and rightfully so. So far we’ve only written standard JavaScript, and yet type-checking was still able to find problems with our code. Thanks TypeScript!',
      },
      {
        type: 'paragraph',
        text: 'One thing you might not have noticed from the last example was that our hello.js file changed again. If we open that file up then we’ll see that the contents still basically look the same as our input file. That might be a bit surprising given the fact that tsc reported an error about our code, but this is based on one of TypeScript’s core values: much of the time, you will know better than TypeScript.',
      },
      {
        type: 'paragraph',
        text: 'To reiterate from earlier, type-checking code limits the sorts of programs you can run, and so there’s a tradeoff on what sorts of things a type-checker finds acceptable. Most of the time that’s okay, but there are scenarios where those checks get in the way. For example, imagine yourself migrating JavaScript code over to TypeScript and introducing type-checking errors. Eventually you’ll get around to cleaning things up for the type-checker, but that original JavaScript code was already working! Why should converting it over to TypeScript stop you from running it?',
      },
      {
        type: 'paragraph',
        text: 'So TypeScript doesn’t get in your way. Of course, over time, you may want to be a bit more defensive against mistakes, and make TypeScript act a bit more strictly. In that case, you can use the noEmitOnError compiler option. Try changing your hello.ts file and running tsc with that flag:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'tsc --noEmitOnError hello.ts',
        },
      },
      {
        type: 'paragraph',
        text: 'You’ll notice that hello.js never gets updated.',
      },
      {
        type: 'paragraph',
        text: 'Up until now, we haven’t told TypeScript what person or date are. Let’s edit the code to tell TypeScript that person is a string, and that date should be a Date object. We’ll also use the toDateString() method on date.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function greet(person: string, date: Date) {\n  console.log(`Hello ${person}, today is ${date.toDateString()}!`);\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'What we did was add type annotations on person and date to describe what types of values greet can be called with. You can read that signature as ”greet takes a person of type string, and a date of type Date“.',
      },
      {
        type: 'paragraph',
        text: 'With this, TypeScript can tell us about other cases where greet might have been called incorrectly. For example…',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function greet(person: string, date: Date) {\n  console.log(`Hello ${person}, today is ${date.toDateString()}!`);\n}\n \ngreet("Maddison", Date());',
        },
      },
      {
        type: 'paragraph',
        text: 'Huh? TypeScript reported an error on our second argument, but why?',
      },
      {
        type: 'paragraph',
        text: 'Perhaps surprisingly, calling Date() in JavaScript returns a string. On the other hand, constructing a Date with new Date() actually gives us what we were expecting.',
      },
      {
        type: 'paragraph',
        text: 'Anyway, we can quickly fix up the error:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function greet(person: string, date: Date) {\n  console.log(`Hello ${person}, today is ${date.toDateString()}!`);\n}\n \ngreet("Maddison", new Date());',
        },
      },
      {
        type: 'paragraph',
        text: 'Keep in mind, we don’t always have to write explicit type annotations. In many cases, TypeScript can even just infer (or “figure out”) the types for us even if we omit them.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'let msg = "hello there!";',
        },
      },
      {
        type: 'paragraph',
        text: 'Even though we didn’t tell TypeScript that msg had the type string it was able to figure that out. That’s a feature, and it’s best not to add annotations when the type system would end up inferring the same type anyway.',
      },
      {
        type: 'paragraph',
        text: 'Let’s take a look at what happens when we compile the above function greet with tsc to output JavaScript:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '"use strict";\nfunction greet(person, date) {\n    console.log("Hello ".concat(person, ", today is ").concat(date.toDateString(), "!"));\n}\ngreet("Maddison", new Date());\n ',
        },
      },
      {
        type: 'paragraph',
        text: 'Notice two things here:',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          'Our person and date parameters no longer have type annotations.',
          'Our “template string” - that string that used backticks (the ` character) - was converted to plain strings with concatenations.',
        ],
      },
      {
        type: 'paragraph',
        text: 'More on that second point later, but let’s now focus on that first point. Type annotations aren’t part of JavaScript (or ECMAScript to be pedantic), so there really aren’t any browsers or other runtimes that can just run TypeScript unmodified. That’s why TypeScript needs a compiler in the first place - it needs some way to strip out or transform any TypeScript-specific code so that you can run it. Most TypeScript-specific code gets erased away, and likewise, here our type annotations were completely erased.',
      },
      {
        type: 'paragraph',
        text: 'One other difference from the above was that our template string was rewritten from',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '`Hello ${person}, today is ${date.toDateString()}!`;',
        },
      },
      {
        type: 'paragraph',
        text: 'to',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '"Hello ".concat(person, ", today is ").concat(date.toDateString(), "!");',
        },
      },
      {
        type: 'paragraph',
        text: 'Why did this happen?',
      },
      {
        type: 'paragraph',
        text: 'Template strings are a feature from a version of ECMAScript called ECMAScript 2015 (a.k.a. ECMAScript 6, ES2015, ES6, etc. - don’t ask). TypeScript has the ability to rewrite code from newer versions of ECMAScript to older ones such as ECMAScript 3 or ECMAScript 5 (a.k.a. ES5). This process of moving from a newer or “higher” version of ECMAScript down to an older or “lower” one is sometimes called downleveling.',
      },
      {
        type: 'paragraph',
        text: 'By default TypeScript targets ES5, an extremely old version of ECMAScript. We could have chosen something a little bit more recent by using the target option. Running with --target es2015 changes TypeScript to target ECMAScript 2015, meaning code should be able to run wherever ECMAScript 2015 is supported. So running tsc --target es2015 hello.ts gives us the following output:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function greet(person, date) {\n  console.log(`Hello ${person}, today is ${date.toDateString()}!`);\n}\ngreet("Maddison", new Date());',
        },
      },
      {
        type: 'paragraph',
        text: 'Different users come to TypeScript looking for different things in a type-checker. Some people are looking for a more loose opt-in experience which can help validate only some parts of their program, and still have decent tooling. This is the default experience with TypeScript, where types are optional, inference takes the most lenient types, and there’s no checking for potentially null/undefined values. Much like how tsc emits in the face of errors, these defaults are put in place to stay out of your way. If you’re migrating existing JavaScript, that might be a desirable first step.',
      },
      {
        type: 'paragraph',
        text: 'In contrast, a lot of users prefer to have TypeScript validate as much as it can straight away, and that’s why the language provides strictness settings as well. These strictness settings turn static type-checking from a switch (either your code is checked or not) into something closer to a dial. The further you turn this dial up, the more TypeScript will check for you. This can require a little extra work, but generally speaking it pays for itself in the long run, and enables more thorough checks and more accurate tooling. When possible, a new codebase should always turn these strictness checks on.',
      },
      {
        type: 'paragraph',
        text: 'TypeScript has several type-checking strictness flags that can be turned on or off, and all of our examples will be written with all of them enabled unless otherwise stated. The strict flag in the CLI, or "strict": true in a tsconfig.json toggles them all on simultaneously, but we can opt out of them individually. The two biggest ones you should know about are noImplicitAny and strictNullChecks.',
      },
      {
        type: 'paragraph',
        text: 'Recall that in some places, TypeScript doesn’t try to infer types for us and instead falls back to the most lenient type: any. This isn’t the worst thing that can happen - after all, falling back to any is just the plain JavaScript experience anyway.',
      },
      {
        type: 'paragraph',
        text: 'However, using any often defeats the purpose of using TypeScript in the first place. The more typed your program is, the more validation and tooling you’ll get, meaning you’ll run into fewer bugs as you code. Turning on the noImplicitAny flag will issue an error on any variables whose type is implicitly inferred as any.',
      },
      {
        type: 'paragraph',
        text: 'By default, values like null and undefined are assignable to any other type. This can make writing some code easier, but forgetting to handle null and undefined is the cause of countless bugs in the world - some consider it a billion dollar mistake! The strictNullChecks flag makes handling null and undefined more explicit, and spares us from worrying about whether we forgot to handle null and undefined.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
