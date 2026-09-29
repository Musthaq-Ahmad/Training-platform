import type { ContentTopic } from '../../../types';

export const jsModulesTopics = {
  'js-modules': {
    id: 'js-modules',
    heading: 'What is a module?',
    blocks: [
      {
        type: 'paragraph',
        text: 'A module is just a file. One script is one module. As simple as that.',
      },
      {
        type: 'paragraph',
        text: 'Modules can load each other and use special directives export and import to interchange functionality, call functions of one module from another one:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'export keyword labels variables and functions that should be accessible from outside the current module.',
          'import allows the import of functionality from other modules.',
        ],
      },
      {
        type: 'paragraph',
        text: 'For instance, if we have a file sayHi.js exporting a function:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// 📁 sayHi.js\nexport function sayHi(user) {\n  alert(`Hello, ${user}!`);\n}',
        },
      },
      {
        type: 'paragraph',
        text: '…Then another file may import and use it:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "// 📁 main.js\nimport {sayHi} from './sayHi.js';\n\nalert(sayHi); // function...\nsayHi('John'); // Hello, John!",
        },
      },
      {
        type: 'paragraph',
        text: 'The import directive loads the module by path ./sayHi.js relative to the current file, and assigns exported function sayHi to the corresponding variable.',
      },
      {
        type: 'paragraph',
        text: 'Let’s run the example in-browser.',
      },
      {
        type: 'paragraph',
        text: 'As modules support special keywords and features, we must tell the browser that a script should be treated as a module, by using the attribute &lt;script type="module"&gt;.',
      },
      {
        type: 'paragraph',
        text: 'Like this:',
      },
      {
        type: 'paragraph',
        text: 'Result',
      },
      {
        type: 'paragraph',
        text: 'say.js',
      },
      {
        type: 'paragraph',
        text: 'index.html',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'export function sayHi(user) {\n  return `Hello, ${user}!`;\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "<!doctype html>\n<script type=\"module\">\n  import {sayHi} from './say.js';\n\n  document.body.innerHTML = sayHi('John');\n</script>",
        },
      },
      {
        type: 'paragraph',
        text: 'The browser automatically fetches and evaluates the imported module (and its imports if needed), and then runs the script.',
      },
      {
        type: 'paragraph',
        text: 'Modules work only via HTTP(s), not locally',
      },
      {
        type: 'paragraph',
        text: 'If you try to open a web-page locally, via file:// protocol, you’ll find that import/export directives don’t work. Use a local web-server, such as static-server or use the “live server” capability of your editor, such as VS Code Live Server Extension to test modules.',
      },
      {
        type: 'paragraph',
        text: 'What’s different in modules, compared to “regular” scripts?',
      },
      {
        type: 'paragraph',
        text: 'There are core features, valid both for browser and server-side JavaScript.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Always “use strict”',
      },
      {
        type: 'paragraph',
        text: 'Modules always work in strict mode. E.g. assigning to an undeclared variable will give an error.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<script type="module">\n  a = 5; // error\n</script>',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Module-level scope',
      },
      {
        type: 'paragraph',
        text: 'Each module has its own top-level scope. In other words, top-level variables and functions from a module are not seen in other scripts.',
      },
      {
        type: 'paragraph',
        text: 'In the example below, two scripts are imported, and hello.js tries to use user variable declared in user.js. It fails, because it’s a separate module (you’ll see the error in the console):',
      },
      {
        type: 'paragraph',
        text: 'Result',
      },
      {
        type: 'paragraph',
        text: 'hello.js',
      },
      {
        type: 'paragraph',
        text: 'user.js',
      },
      {
        type: 'paragraph',
        text: 'index.html',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'alert(user); // no such variable (each module has independent variables)',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let user = "John";',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<!doctype html>\n<script type="module" src="user.js"></script>\n<script type="module" src="hello.js"></script>',
        },
      },
      {
        type: 'paragraph',
        text: 'Modules should export what they want to be accessible from outside and import what they need.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'user.js should export the user variable.',
          'hello.js should import it from user.js module.',
        ],
      },
      {
        type: 'paragraph',
        text: 'In other words, with modules we use import/export instead of relying on global variables.',
      },
      {
        type: 'paragraph',
        text: 'This is the correct variant:',
      },
      {
        type: 'paragraph',
        text: 'Result',
      },
      {
        type: 'paragraph',
        text: 'hello.js',
      },
      {
        type: 'paragraph',
        text: 'user.js',
      },
      {
        type: 'paragraph',
        text: 'index.html',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import {user} from './user.js';\n\ndocument.body.innerHTML = user; // John",
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'export let user = "John";',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<!doctype html>\n<script type="module" src="hello.js"></script>',
        },
      },
      {
        type: 'paragraph',
        text: 'In the browser, if we talk about HTML pages, independent top-level scope also exists for each &lt;script type="module"&gt;.',
      },
      {
        type: 'paragraph',
        text: 'Here are two scripts on the same page, both type="module". They don’t see each other’s top-level variables:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<script type="module">\n  // The variable is only visible in this module script\n  let user = "John";\n</script>\n\n<script type="module">\n  alert(user); // Error: user is not defined\n</script>',
        },
      },
      {
        type: 'paragraph',
        text: 'Please note:',
      },
      {
        type: 'paragraph',
        text: 'In the browser, we can make a variable window-level global by explicitly assigning it to a window property, e.g. window.user = "John".',
      },
      {
        type: 'paragraph',
        text: 'Then all scripts will see it, both with type="module" and without it.',
      },
      {
        type: 'paragraph',
        text: 'That said, making such global variables is frowned upon. Please try to avoid them.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'A module code is evaluated only the first time when imported',
      },
      {
        type: 'paragraph',
        text: 'If the same module is imported into multiple other modules, its code is executed only once, upon the first import. Then its exports are given to all further importers.',
      },
      {
        type: 'paragraph',
        text: 'The one-time evaluation has important consequences, that we should be aware of.',
      },
      {
        type: 'paragraph',
        text: 'Let’s see a couple of examples.',
      },
      {
        type: 'paragraph',
        text: 'First, if executing a module code brings side-effects, like showing a message, then importing it multiple times will trigger it only once – the first time:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// 📁 alert.js\nalert("Module is evaluated!");',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// Import the same module from different files\n\n// 📁 1.js\nimport `./alert.js`; // Module is evaluated!\n\n// 📁 2.js\nimport `./alert.js`; // (shows nothing)',
        },
      },
      {
        type: 'paragraph',
        text: 'The second import shows nothing, because the module has already been evaluated.',
      },
      {
        type: 'paragraph',
        text: 'There’s a rule: top-level module code should be used for initialization, creation of module-specific internal data structures. If we need to make something callable multiple times – we should export it as a function, like we did with sayHi above.',
      },
      {
        type: 'paragraph',
        text: 'Now, let’s consider a deeper example.',
      },
      {
        type: 'paragraph',
        text: 'Let’s say, a module exports an object:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// 📁 admin.js\nexport let admin = {\n  name: "John"\n};',
        },
      },
      {
        type: 'paragraph',
        text: 'If this module is imported from multiple files, the module is only evaluated the first time, admin object is created, and then passed to all further importers.',
      },
      {
        type: 'paragraph',
        text: 'All importers get exactly the one and only admin object:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "// 📁 1.js\nimport {admin} from './admin.js';\nadmin.name = \"Pete\";\n\n// 📁 2.js\nimport {admin} from './admin.js';\nalert(admin.name); // Pete\n\n// Both 1.js and 2.js reference the same admin object\n// Changes made in 1.js are visible in 2.js",
        },
      },
      {
        type: 'paragraph',
        text: 'As you can see, when 1.js changes the name property in the imported admin, then 2.js can see the new admin.name.',
      },
      {
        type: 'paragraph',
        text: 'That’s exactly because the module is executed only once. Exports are generated, and then they are shared between importers, so if something changes the admin object, other importers will see that.',
      },
      {
        type: 'paragraph',
        text: 'Such behavior is actually very convenient, because it allows us to configure modules.',
      },
      {
        type: 'paragraph',
        text: 'In other words, a module can provide a generic functionality that needs a setup. E.g. authentication needs credentials. Then it can export a configuration object expecting the outer code to assign to it.',
      },
      {
        type: 'paragraph',
        text: 'Here’s the classical pattern:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'A module exports some means of configuration, e.g. a configuration object.',
          'On the first import we initialize it, write to its properties. The top-level application script may do that.',
          'Further imports use the module.',
        ],
      },
      {
        type: 'paragraph',
        text: 'For instance, the admin.js module may provide certain functionality (e.g. authentication), but expect the credentials to come into the config object from outside:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// 📁 admin.js\nexport let config = { };\n\nexport function sayHi() {\n  alert(`Ready to serve, ${config.user}!`);\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Here, admin.js exports the config object (initially empty, but may have default properties too).',
      },
      {
        type: 'paragraph',
        text: 'Then in init.js, the first script of our app, we import config from it and set config.user:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// 📁 init.js\nimport {config} from \'./admin.js\';\nconfig.user = "Pete";',
        },
      },
      {
        type: 'paragraph',
        text: '…Now the module admin.js is configured.',
      },
      {
        type: 'paragraph',
        text: 'Further importers can call it, and it correctly shows the current user:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "// 📁 another.js\nimport {sayHi} from './admin.js';\n\nsayHi(); // Ready to serve, Pete!",
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'import.meta',
      },
      {
        type: 'paragraph',
        text: 'The object import.meta contains the information about the current module.',
      },
      {
        type: 'paragraph',
        text: 'Its content depends on the environment. In the browser, it contains the URL of the script, or a current webpage URL if inside HTML:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<script type="module">\n  alert(import.meta.url); // script URL\n  // for an inline script - the URL of the current HTML-page\n</script>',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'In a module, “this” is undefined',
      },
      {
        type: 'paragraph',
        text: 'That’s kind of a minor feature, but for completeness we should mention it.',
      },
      {
        type: 'paragraph',
        text: 'In a module, top-level this is undefined.',
      },
      {
        type: 'paragraph',
        text: 'Compare it to non-module scripts, where this is a global object:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<script>\n  alert(this); // window\n</script>\n\n<script type="module">\n  alert(this); // undefined\n</script>',
        },
      },
      {
        type: 'paragraph',
        text: 'There are also several browser-specific differences of scripts with type="module" compared to regular ones.',
      },
      {
        type: 'paragraph',
        text: 'You may want to skip this section for now if you’re reading for the first time, or if you don’t use JavaScript in a browser.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Module scripts are deferred',
      },
      {
        type: 'paragraph',
        text: 'Module scripts are always deferred, same effect as defer attribute (described in the chapter Scripts: async, defer), for both external and inline scripts.',
      },
      {
        type: 'paragraph',
        text: 'In other words:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'downloading external module scripts &lt;script type="module" src="..."&gt; doesn’t block HTML processing, they load in parallel with other resources.',
          'module scripts wait until the HTML document is fully ready (even if they are tiny and load faster than HTML), and then run.',
          'relative order of scripts is maintained: scripts that go first in the document, execute first.',
        ],
      },
      {
        type: 'paragraph',
        text: 'As a side effect, module scripts always “see” the fully loaded HTML-page, including HTML elements below them.',
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
          code: '<script type="module">\n  alert(typeof button); // object: the script can \'see\' the button below\n  // as modules are deferred, the script runs after the whole page is loaded\n</script>\n\nCompare to regular script below:\n\n<script>\n  alert(typeof button); // button is undefined, the script can\'t see elements below\n  // regular scripts run immediately, before the rest of the page is processed\n</script>\n\n<button id="button">Button</button>',
        },
      },
      {
        type: 'paragraph',
        text: 'Please note: the second script actually runs before the first! So we’ll see undefined first, and then object.',
      },
      {
        type: 'paragraph',
        text: 'That’s because modules are deferred, so we wait for the document to be processed. The regular script runs immediately, so we see its output first.',
      },
      {
        type: 'paragraph',
        text: 'When using modules, we should be aware that the HTML page shows up as it loads, and JavaScript modules run after that, so the user may see the page before the JavaScript application is ready. Some functionality may not work yet. We should put “loading indicators”, or otherwise ensure that the visitor won’t be confused by that.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Async works on inline scripts',
      },
      {
        type: 'paragraph',
        text: 'For non-module scripts, the async attribute only works on external scripts. Async scripts run immediately when ready, independently of other scripts or the HTML document.',
      },
      {
        type: 'paragraph',
        text: 'For module scripts, it works on inline scripts as well.',
      },
      {
        type: 'paragraph',
        text: 'For example, the inline script below has async, so it doesn’t wait for anything.',
      },
      {
        type: 'paragraph',
        text: 'It performs the import (fetches ./analytics.js) and runs when ready, even if the HTML document is not finished yet, or if other scripts are still pending.',
      },
      {
        type: 'paragraph',
        text: 'That’s good for functionality that doesn’t depend on anything, like counters, ads, document-level event listeners.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "<!-- all dependencies are fetched (analytics.js), and the script runs -->\n<!-- doesn't wait for the document or other <script> tags -->\n<script async type=\"module\">\n  import {counter} from './analytics.js';\n\n  counter.count();\n</script>",
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'External scripts',
      },
      {
        type: 'paragraph',
        text: 'External scripts that have type="module" are different in two aspects:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'External scripts with the same src run only once: &lt;!-- the script my.js is fetched and executed only once --&gt; &lt;script type="module" src="my.js"&gt;&lt;/script&gt; &lt;script type="module" src="my.js"&gt;&lt;/script&gt;',
          'External scripts that are fetched from another origin (e.g. another site) require CORS headers, as described in the chapter Fetch: Cross-Origin Requests. In other words, if a module script is fetched from another origin, the remote server must supply a header Access-Control-Allow-Origin allowing the fetch. &lt;!-- another-site.com must supply Access-Control-Allow-Origin --&gt; &lt;!-- otherwise, the script won\'t execute --&gt; &lt;script type="module" src="http://another-site.com/their.js"&gt;&lt;/script&gt; That ensures better security by default.',
        ],
      },
      {
        type: 'subheading',
        level: 3,
        text: 'No “bare” modules allowed',
      },
      {
        type: 'paragraph',
        text: 'In the browser, import must get either a relative or absolute URL. Modules without any path are called “bare” modules. Such modules are not allowed in import.',
      },
      {
        type: 'paragraph',
        text: 'For instance, this import is invalid:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import {sayHi} from 'sayHi'; // Error, \"bare\" module\n// the module must have a path, e.g. './sayHi.js' or wherever the module is",
        },
      },
      {
        type: 'paragraph',
        text: 'Certain environments, like Node.js or bundle tools allow bare modules, without any path, as they have their own ways for finding modules and hooks to fine-tune them. But browsers do not support bare modules yet.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Compatibility, “nomodule”',
      },
      {
        type: 'paragraph',
        text: 'Old browsers do not understand type="module". Scripts of an unknown type are just ignored. For them, it’s possible to provide a fallback using the nomodule attribute:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<script type="module">\n  alert("Runs in modern browsers");\n</script>\n\n<script nomodule>\n  alert("Modern browsers know both type=module and nomodule, so skip this")\n  alert("Old browsers ignore script with unknown type=module, but execute this.");\n</script>',
        },
      },
      {
        type: 'paragraph',
        text: 'In real-life, browser modules are rarely used in their “raw” form. Usually, we bundle them together with a special tool such as Webpack and deploy to the production server.',
      },
      {
        type: 'paragraph',
        text: 'One of the benefits of using bundlers – they give more control over how modules are resolved, allowing bare modules and much more, like CSS/HTML modules.',
      },
      {
        type: 'paragraph',
        text: 'Build tools do the following:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Take a “main” module, the one intended to be put in &lt;script type="module"&gt; in HTML.',
          'Analyze its dependencies: imports and then imports of imports etc.',
          'Build a single file with all modules (or multiple files, that’s tunable), replacing native import calls with bundler functions, so that it works. “Special” module types like HTML/CSS modules are also supported.',
          'In the process, other transformations and optimizations may be applied: * Unreachable code removed. * Unused exports removed (“tree-shaking”). * Development-specific statements like console and debugger removed. * Modern, bleeding-edge JavaScript syntax may be transformed to older one with similar functionality using Babel. * The resulting file is minified (spaces removed, variables replaced with shorter names, etc).',
        ],
      },
      {
        type: 'paragraph',
        text: 'If we use bundle tools, then as scripts are bundled together into a single file (or few files), import/export statements inside those scripts are replaced by special bundler functions. So the resulting “bundled” script does not contain any import/export, it doesn’t require type="module", and we can put it into a regular script:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<!-- Assuming we got bundle.js from a tool like Webpack -->\n<script src="bundle.js"></script>',
        },
      },
      {
        type: 'paragraph',
        text: 'That said, native modules are also usable. So we won’t be using Webpack here: you can configure it later.',
      },
      {
        type: 'paragraph',
        text: 'To summarize, the core concepts are:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'A module is a file. To make import/export work, browsers need &lt;script type="module"&gt;. Modules have several differences: * Deferred by default. * Async works on inline scripts. * To load external scripts from another origin (domain/protocol/port), CORS headers are needed. * Duplicate external scripts are ignored.',
          'Modules have their own, local top-level scope and interchange functionality via import/export.',
          'Modules always use strict.',
          'Module code is executed only once. Exports are created once and shared between importers.',
        ],
      },
      {
        type: 'paragraph',
        text: 'When we use modules, each module implements the functionality and exports it. Then we use import to directly import it where it’s needed. The browser loads and evaluates the scripts automatically.',
      },
      {
        type: 'paragraph',
        text: 'In production, people often use bundlers such as Webpack to bundle modules together for performance and other reasons.',
      },
      {
        type: 'paragraph',
        text: 'In the next chapter we’ll see more examples of modules, and how things can be exported/imported.',
      },
      {
        type: 'paragraph',
        text: 'Export and import directives have several syntax variants.',
      },
      {
        type: 'paragraph',
        text: 'In the previous article we saw a simple use, now let’s explore more examples.',
      },
      {
        type: 'paragraph',
        text: 'We can label any declaration as exported by placing export before it, be it a variable, function or a class.',
      },
      {
        type: 'paragraph',
        text: 'For instance, here all exports are valid:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "// export an array\nexport let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];\n\n// export a constant\nexport const MODULES_BECAME_STANDARD_YEAR = 2015;\n\n// export a class\nexport class User {\n  constructor(name) {\n    this.name = name;\n  }\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'No semicolons after export class/function',
      },
      {
        type: 'paragraph',
        text: 'Please note that export before a class or a function does not make it a function expression. It’s still a function declaration, albeit exported.',
      },
      {
        type: 'paragraph',
        text: 'Most JavaScript style guides don’t recommend semicolons after function and class declarations.',
      },
      {
        type: 'paragraph',
        text: 'That’s why there’s no need for a semicolon at the end of export class and export function:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'export function sayHi(user) {\n  alert(`Hello, ${user}!`);\n}  // no ; at the end',
        },
      },
      {
        type: 'paragraph',
        text: 'Also, we can put export separately.',
      },
      {
        type: 'paragraph',
        text: 'Here we first declare, and then export:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// 📁 say.js\nfunction sayHi(user) {\n  alert(`Hello, ${user}!`);\n}\n\nfunction sayBye(user) {\n  alert(`Bye, ${user}!`);\n}\n\nexport {sayHi, sayBye}; // a list of exported variables',
        },
      },
      {
        type: 'paragraph',
        text: '…Or, technically we could put export above functions as well.',
      },
      {
        type: 'paragraph',
        text: 'Usually, we put a list of what to import in curly braces import {...}, like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "// 📁 main.js\nimport {sayHi, sayBye} from './say.js';\n\nsayHi('John'); // Hello, John!\nsayBye('John'); // Bye, John!",
        },
      },
      {
        type: 'paragraph',
        text: 'But if there’s a lot to import, we can import everything as an object using import * as &lt;obj&gt;, for instance:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "// 📁 main.js\nimport * as say from './say.js';\n\nsay.sayHi('John');\nsay.sayBye('John');",
        },
      },
      {
        type: 'paragraph',
        text: 'At first sight, “import everything” seems such a cool thing, short to write, why should we ever explicitly list what we need to import?',
      },
      {
        type: 'paragraph',
        text: 'Well, there are few reasons.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Explicitly listing what to import gives shorter names: sayHi() instead of say.sayHi().',
          'Explicit list of imports gives better overview of the code structure: what is used and where. It makes code support and refactoring easier.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Don’t be afraid to import too much',
      },
      {
        type: 'paragraph',
        text: 'Modern build tools, such as webpack and others, bundle modules together and optimize them to speedup loading. They also remove unused imports.',
      },
      {
        type: 'paragraph',
        text: 'For instance, if you import * as library from a huge code library, and then use only few methods, then unused ones will not be included into the optimized bundle.',
      },
      {
        type: 'paragraph',
        text: 'We can also use as to import under different names.',
      },
      {
        type: 'paragraph',
        text: 'For instance, let’s import sayHi into the local variable hi for brevity, and import sayBye as bye:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "// 📁 main.js\nimport {sayHi as hi, sayBye as bye} from './say.js';\n\nhi('John'); // Hello, John!\nbye('John'); // Bye, John!",
        },
      },
      {
        type: 'paragraph',
        text: 'The similar syntax exists for export.',
      },
      {
        type: 'paragraph',
        text: 'Let’s export functions as hi and bye:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// 📁 say.js\n...\nexport {sayHi as hi, sayBye as bye};',
        },
      },
      {
        type: 'paragraph',
        text: 'Now hi and bye are official names for outsiders, to be used in imports:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "// 📁 main.js\nimport * as say from './say.js';\n\nsay.hi('John'); // Hello, John!\nsay.bye('John'); // Bye, John!",
        },
      },
      {
        type: 'paragraph',
        text: 'In practice, there are mainly two kinds of modules.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Modules that contain a library, pack of functions, like say.js above.',
          'Modules that declare a single entity, e.g. a module user.js exports only class User.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Mostly, the second approach is preferred, so that every “thing” resides in its own module.',
      },
      {
        type: 'paragraph',
        text: 'Naturally, that requires a lot of files, as everything wants its own module, but that’s not a problem at all. Actually, code navigation becomes easier if files are well-named and structured into folders.',
      },
      {
        type: 'paragraph',
        text: 'Modules provide a special export default (“the default export”) syntax to make the “one thing per module” way look better.',
      },
      {
        type: 'paragraph',
        text: 'Put export default before the entity to export:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// 📁 user.js\nexport default class User { // just add "default"\n  constructor(name) {\n    this.name = name;\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'There may be only one export default per file.',
      },
      {
        type: 'paragraph',
        text: '…And then import it without curly braces:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "// 📁 main.js\nimport User from './user.js'; // not {User}, just User\n\nnew User('John');",
        },
      },
      {
        type: 'paragraph',
        text: 'Imports without curly braces look nicer. A common mistake when starting to use modules is to forget curly braces at all. So, remember, import needs curly braces for named exports and doesn’t need them for the default one.',
      },
      {
        type: 'table',
        headers: ['Named export', 'Default export'],
        rows: [
          ['export class User {...}', 'export default class User {...}'],
          ['import {User} from ...', 'import User from ...'],
        ],
      },
      {
        type: 'paragraph',
        text: 'Technically, we may have both default and named exports in a single module, but in practice people usually don’t mix them. A module has either named exports or the default one.',
      },
      {
        type: 'paragraph',
        text: 'As there may be at most one default export per file, the exported entity may have no name.',
      },
      {
        type: 'paragraph',
        text: 'For instance, these are all perfectly valid default exports:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'export default class { // no class name\n  constructor() { ... }\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'export default function(user) { // no function name\n  alert(`Hello, ${user}!`);\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "// export a single value, without making a variable\nexport default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];",
        },
      },
      {
        type: 'paragraph',
        text: 'Not giving a name is fine, because there is only one export default per file, so import without curly braces knows what to import.',
      },
      {
        type: 'paragraph',
        text: 'Without default, such an export would give an error:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'export class { // Error! (non-default export needs a name)\n  constructor() {}\n}',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'The “default” name',
      },
      {
        type: 'paragraph',
        text: 'In some situations the default keyword is used to reference the default export.',
      },
      {
        type: 'paragraph',
        text: 'For example, to export a function separately from its definition:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function sayHi(user) {\n  alert(`Hello, ${user}!`);\n}\n\n// same as if we added "export default" before the function\nexport {sayHi as default};',
        },
      },
      {
        type: 'paragraph',
        text: 'Or, another situation, let’s say a module user.js exports one main “default” thing, and a few named ones (rarely the case, but it happens):',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// 📁 user.js\nexport default class User {\n  constructor(name) {\n    this.name = name;\n  }\n}\n\nexport function sayHi(user) {\n  alert(`Hello, ${user}!`);\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Here’s how to import the default export along with a named one:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "// 📁 main.js\nimport {default as User, sayHi} from './user.js';\n\nnew User('John');",
        },
      },
      {
        type: 'paragraph',
        text: 'And, finally, if importing everything * as an object, then the default property is exactly the default export:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "// 📁 main.js\nimport * as user from './user.js';\n\nlet User = user.default; // the default export\nnew User('John');",
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'A word against default exports',
      },
      {
        type: 'paragraph',
        text: 'Named exports are explicit. They exactly name what they import, so we have that information from them; that’s a good thing.',
      },
      {
        type: 'paragraph',
        text: 'Named exports force us to use exactly the right name to import:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import {User} from './user.js';\n// import {MyUser} won't work, the name must be {User}",
        },
      },
      {
        type: 'paragraph',
        text: '…While for a default export, we always choose the name when importing:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import User from './user.js'; // works\nimport MyUser from './user.js'; // works too\n// could be import Anything... and it'll still work",
        },
      },
      {
        type: 'paragraph',
        text: 'So team members may use different names to import the same thing, and that’s not good.',
      },
      {
        type: 'paragraph',
        text: 'Usually, to avoid that and keep the code consistent, there’s a rule that imported variables should correspond to file names, e.g:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import User from './user.js';\nimport LoginForm from './loginForm.js';\nimport func from '/path/to/func.js';\n...",
        },
      },
      {
        type: 'paragraph',
        text: 'Still, some teams consider it a serious drawback of default exports. So they prefer to always use named exports. Even if only a single thing is exported, it’s still exported under a name, without default.',
      },
      {
        type: 'paragraph',
        text: 'That also makes re-export (see below) a little bit easier.',
      },
      {
        type: 'paragraph',
        text: '“Re-export” syntax export ... from ... allows to import things and immediately export them (possibly under another name), like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "export {sayHi} from './say.js'; // re-export sayHi\n\nexport {default as User} from './user.js'; // re-export default",
        },
      },
      {
        type: 'paragraph',
        text: 'Why would that be needed? Let’s see a practical use case.',
      },
      {
        type: 'paragraph',
        text: 'Imagine, we’re writing a “package”: a folder with a lot of modules, with some of the functionality exported outside (tools like NPM allow us to publish and distribute such packages, but we don’t have to use them), and many modules are just “helpers”, for internal use in other package modules.',
      },
      {
        type: 'paragraph',
        text: 'The file structure could be like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'auth/\n    index.js\n    user.js\n    helpers.js\n    tests/\n        login.js\n    providers/\n        github.js\n        facebook.js\n        ...',
        },
      },
      {
        type: 'paragraph',
        text: 'We’d like to expose the package functionality via a single entry point.',
      },
      {
        type: 'paragraph',
        text: 'In other words, a person who would like to use our package, should import only from the “main file” auth/index.js.',
      },
      {
        type: 'paragraph',
        text: 'Like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import {login, logout} from 'auth/index.js'",
        },
      },
      {
        type: 'paragraph',
        text: 'The “main file”, auth/index.js exports all the functionality that we’d like to provide in our package.',
      },
      {
        type: 'paragraph',
        text: 'The idea is that outsiders, other programmers who use our package, should not meddle with its internal structure, search for files inside our package folder. We export only what’s necessary in auth/index.js and keep the rest hidden from prying eyes.',
      },
      {
        type: 'paragraph',
        text: 'As the actual exported functionality is scattered among the package, we can import it into auth/index.js and export from it:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "// 📁 auth/index.js\n\n// import login/logout and immediately export them\nimport {login, logout} from './helpers.js';\nexport {login, logout};\n\n// import default as User and export it\nimport User from './user.js';\nexport {User};\n...",
        },
      },
      {
        type: 'paragraph',
        text: 'Now users of our package can import {login} from "auth/index.js".',
      },
      {
        type: 'paragraph',
        text: 'The syntax export ... from ... is just a shorter notation for such import-export:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "// 📁 auth/index.js\n// re-export login/logout\nexport {login, logout} from './helpers.js';\n\n// re-export the default export as User\nexport {default as User} from './user.js';\n...",
        },
      },
      {
        type: 'paragraph',
        text: 'The notable difference of export ... from compared to import/export is that re-exported modules aren’t available in the current file. So inside the above example of auth/index.js we can’t use re-exported login/logout functions.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Re-exporting the default export',
      },
      {
        type: 'paragraph',
        text: 'The default export needs separate handling when re-exporting.',
      },
      {
        type: 'paragraph',
        text: 'Let’s say we have user.js with the export default class User and would like to re-export it:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// 📁 user.js\nexport default class User {\n  // ...\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'We can come across two problems with it:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          "export User from './user.js' won’t work. That would lead to a syntax error. To re-export the default export, we have to write export {default as User}, as in the example above.",
          "export * from './user.js' re-exports only named exports, but ignores the default one. If we’d like to re-export both named and default exports, then two statements are needed: export * from './user.js'; // to re-export named exports export {default} from './user.js'; // to re-export the default export",
        ],
      },
      {
        type: 'paragraph',
        text: 'Such oddities of re-exporting a default export are one of the reasons why some developers don’t like default exports and prefer named ones.',
      },
      {
        type: 'paragraph',
        text: 'Here are all types of export that we covered in this and previous articles.',
      },
      {
        type: 'paragraph',
        text: 'You can check yourself by reading them and recalling what they mean:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Before declaration of a class/function/…: * export [default] class/function/variable ...',
          'Standalone export: * export {x [as y], ...}.',
          'Re-export: * export {x [as y], ...} from "module" * export * from "module" (doesn’t re-export default). * export {default [as y]} from "module" (re-export default).',
        ],
      },
      {
        type: 'paragraph',
        text: 'Import:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Importing named exports: * import {x [as y], ...} from "module"',
          'Importing the default export: * import x from "module" * import {default as x} from "module"',
          'Import all: * import * as obj from "module"',
          'Import the module (its code runs), but do not assign any of its exports to variables: * import "module"',
        ],
      },
      {
        type: 'paragraph',
        text: 'We can put import/export statements at the top or at the bottom of a script, that doesn’t matter.',
      },
      {
        type: 'paragraph',
        text: 'So, technically this code is fine:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "sayHi();\n\n// ...\n\nimport {sayHi} from './say.js'; // import at the end of the file",
        },
      },
      {
        type: 'paragraph',
        text: 'In practice imports are usually at the start of the file, but that’s only for more convenience.',
      },
      {
        type: 'paragraph',
        text: 'Please note that import/export statements don’t work if inside {...}.',
      },
      {
        type: 'paragraph',
        text: 'A conditional import, like this, won’t work:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'if (something) {\n  import {sayHi} from "./say.js"; // Error: import must be at top level\n}',
        },
      },
      {
        type: 'paragraph',
        text: '…But what if we really need to import something conditionally? Or at the right time? Like, load a module upon request, when it’s really needed?',
      },
      {
        type: 'paragraph',
        text: 'We’ll see dynamic imports in the next article.',
      },
      {
        type: 'paragraph',
        text: 'Export and import statements that we covered in previous chapters are called “static”. The syntax is very simple and strict.',
      },
      {
        type: 'paragraph',
        text: 'First, we can’t dynamically generate any parameters of import.',
      },
      {
        type: 'paragraph',
        text: 'The module path must be a primitive string, can’t be a function call. This won’t work:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'import ... from getModuleName(); // Error, only from "string" is allowed',
        },
      },
      {
        type: 'paragraph',
        text: 'Second, we can’t import conditionally or at run-time:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "if(...) {\n  import ...; // Error, not allowed!\n}\n\n{\n  import ...; // Error, we can't put import in any block\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'That’s because import/export aim to provide a backbone for the code structure. That’s a good thing, as code structure can be analyzed, modules can be gathered and bundled into one file by special tools, unused exports can be removed (“tree-shaken”). That’s possible only because the structure of imports/exports is simple and fixed.',
      },
      {
        type: 'paragraph',
        text: 'But how can we import a module dynamically, on-demand?',
      },
      {
        type: 'paragraph',
        text: 'The import(module) expression loads the module and returns a promise that resolves into a module object that contains all its exports. It can be called from any place in the code.',
      },
      {
        type: 'paragraph',
        text: 'We can use it dynamically in any place of the code, for instance:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let modulePath = prompt("Which module to load?");\n\nimport(modulePath)\n  .then(obj => <module object>)\n  .catch(err => <loading error, e.g. if no such module>)',
        },
      },
      {
        type: 'paragraph',
        text: 'Or, we could use let module = await import(modulePath) if inside an async function.',
      },
      {
        type: 'paragraph',
        text: 'For instance, if we have the following module say.js:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// 📁 say.js\nexport function hi() {\n  alert(`Hello`);\n}\n\nexport function bye() {\n  alert(`Bye`);\n}',
        },
      },
      {
        type: 'paragraph',
        text: '…Then dynamic import can be like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "let {hi, bye} = await import('./say.js');\n\nhi();\nbye();",
        },
      },
      {
        type: 'paragraph',
        text: 'Or, if say.js has the default export:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// 📁 say.js\nexport default function() {\n  alert("Module loaded (export default)!");\n}',
        },
      },
      {
        type: 'paragraph',
        text: '…Then, in order to access it, we can use default property of the module object:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "let obj = await import('./say.js');\nlet say = obj.default;\n// or, in one line: let {default: say} = await import('./say.js');\n\nsay();",
        },
      },
      {
        type: 'paragraph',
        text: 'Here’s the full example:',
      },
      {
        type: 'paragraph',
        text: 'Result',
      },
      {
        type: 'paragraph',
        text: 'say.js',
      },
      {
        type: 'paragraph',
        text: 'index.html',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'export function hi() {\n  alert(`Hello`);\n}\n\nexport function bye() {\n  alert(`Bye`);\n}\n\nexport default function() {\n  alert("Module loaded (export default)!");\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<!doctype html>\n<script>\n  async function load() {\n    let say = await import(\'./say.js\');\n    say.hi(); // Hello!\n    say.bye(); // Bye!\n    say.default(); // Module loaded (export default)!\n  }\n</script>\n<button onclick="load()">Click me</button>',
        },
      },
      {
        type: 'paragraph',
        text: 'Please note:',
      },
      {
        type: 'paragraph',
        text: 'Dynamic imports work in regular scripts, they don’t require script type="module".',
      },
      {
        type: 'paragraph',
        text: 'Please note:',
      },
      {
        type: 'paragraph',
        text: 'Although import() looks like a function call, it’s a special syntax that just happens to use parentheses (similar to super()).',
      },
      {
        type: 'paragraph',
        text: 'So we can’t copy import to a variable or use call/apply with it. It’s not a function.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
