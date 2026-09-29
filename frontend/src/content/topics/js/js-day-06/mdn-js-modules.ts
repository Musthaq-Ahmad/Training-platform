import type { ContentTopic } from '../../../types';

export const mdnJsModulesTopics = {
  'mdn-js-modules': {
    id: 'mdn-js-modules',
    heading: 'A background on modules',
    blocks: [
      {
        type: 'paragraph',
        text: 'JavaScript programs started off pretty small — most of its usage in the early days was to do isolated scripting tasks, providing a bit of interactivity to your web pages where needed, so large scripts were generally not needed. Fast forward a few years and we now have complete applications being run in browsers with a lot of JavaScript, as well as JavaScript being used in other contexts (Node.js, for example).',
      },
      {
        type: 'paragraph',
        text: 'Complex projects necessitate a mechanism for splitting JavaScript programs into separate modules that can be imported when needed. Node.js has had this ability for a long time, and there are a number of JavaScript libraries and frameworks that enable module usage (for example, other CommonJS and AMD-based module systems like RequireJS, webpack, and Babel).',
      },
      {
        type: 'paragraph',
        text: 'All modern browsers support module features natively without needing transpilation. It can only be a good thing — browsers can optimize loading of modules, making it more efficient than having to use a library and do all of that extra client-side processing and extra round trips. It does not obsolete bundlers like webpack, though — bundlers still do a good job at partitioning code into reasonably sized chunks, and are able to do other optimizations like minification, dead code elimination, and tree-shaking.',
      },
      {
        type: 'paragraph',
        text: "To demonstrate usage of modules, we've created a set of examples that you can find on GitHub. These examples demonstrate a set of modules that create a <canvas> element on a webpage, and then draw (and report information about) different shapes on the canvas.",
      },
      {
        type: 'paragraph',
        text: 'These are fairly trivial, but have been kept deliberately simple to demonstrate modules clearly.',
      },
      {
        type: 'paragraph',
        text: "Note: If you want to download the examples and run them locally, you'll need to run them through a local web server.",
      },
      {
        type: 'paragraph',
        text: 'In our first example (see basic-modules) we have a file structure as follows:',
      },
      {
        type: 'paragraph',
        text: 'index.html main.js modules/ canvas.js square.js',
      },
      {
        type: 'paragraph',
        text: 'Note: All of the examples in this guide have basically the same structure; the above should start getting pretty familiar.',
      },
      {
        type: 'paragraph',
        text: "The modules directory's two modules are described below:",
      },
      {
        type: 'list',
        ordered: false,
        items: [
          "canvas.js — contains functions related to setting up the canvas: * create() — creates a canvas with a specified width and height inside a wrapper <div> with a specified ID, which is itself appended inside a specified parent element. Returns an object containing the canvas's 2D context and the wrapper's ID. * createReportList() — creates an unordered list appended inside a specified wrapper element, which can be used to output report data into. Returns the list's ID.",
          "square.js — contains: * name — a constant containing the string 'square'. * draw() — draws a square on a specified canvas, with a specified size, position, and color. Returns an object containing the square's size, position, and color. * reportArea() — writes a square's area to a specific report list, given its length. * reportPerimeter() — writes a square's perimeter to a specific report list, given its length.",
        ],
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Aside — .mjs versus .js',
      },
      {
        type: 'paragraph',
        text: "Throughout this article, we've used .js extensions for our module files, but in other resources you may see the .mjs extension used instead. V8's documentation recommends this, for example. The reasons given are:",
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'It is good for clarity, i.e., it makes it clear which files are modules, and which are regular JavaScript.',
          'It ensures that your module files are parsed as a module by runtimes such as Node.js, and build tools such as Babel.',
        ],
      },
      {
        type: 'paragraph',
        text: "However, we decided to keep using .js, at least for the moment. To get modules to work correctly in a browser, you need to make sure that your server is serving them with a Content-Type header that contains a JavaScript MIME type such as text/javascript. If you don't, you'll get a strict MIME type checking error along the lines of \"The server responded with a non-JavaScript MIME type\" and the browser won't run your JavaScript. Most servers already set the correct type for .js files, but not yet for .mjs files. Servers that already serve .mjs files correctly include GitHub Pages and http-server for Node.js.",
      },
      {
        type: 'paragraph',
        text: "This is OK if you are using such an environment already, or if you aren't but you know what you are doing and have access (i.e., you can configure your server to set the correct Content-Type for .mjs files). It could however cause confusion if you don't control the server you are serving files from, or are publishing files for public use, as we are here.",
      },
      {
        type: 'paragraph',
        text: 'For learning and portability purposes, we decided to keep to .js.',
      },
      {
        type: 'paragraph',
        text: 'If you really value the clarity of using .mjs for modules versus using .js for "normal" JavaScript files, but don\'t want to run into the problem described above, you could always use .mjs during development and convert them to .js during your build step.',
      },
      {
        type: 'paragraph',
        text: 'It is also worth noting that:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Some tools may never support .mjs.',
          'The &lt;script type="module"&gt; attribute is used to denote when a module is being pointed to, as described in Applying the module to your HTML.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The first thing you do to get access to module features is export them. This is done using the export statement.',
      },
      {
        type: 'paragraph',
        text: 'The easiest way to use it is to place it in front of any items you want exported out of the module, for example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'export const name = "square";\n\nexport function draw(ctx, length, x, y, color) {\n  ctx.fillStyle = color;\n  ctx.fillRect(x, y, length, length);\n\n  return { length, x, y, color };\n}',
        },
      },
      {
        type: 'paragraph',
        text: "You can export functions, var, let, const, and — as we'll see later — classes. They need to be top-level items: for example, you can't use export inside a function.",
      },
      {
        type: 'paragraph',
        text: 'A more convenient way of exporting all the items you want to export is to use a single export statement at the end of your module file, followed by a comma-separated list of the features you want to export wrapped in curly braces. For example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'export { name, draw, reportArea, reportPerimeter };',
        },
      },
      {
        type: 'paragraph',
        text: "Once you've exported some features out of your module, you need to import them into your script to be able to use them. The simplest way to do this is as follows:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'import { name, draw, reportArea, reportPerimeter } from "./modules/square.js";',
        },
      },
      {
        type: 'paragraph',
        text: 'You use the import statement, followed by a comma-separated list of the features you want to import wrapped in curly braces, followed by the keyword from, followed by the module specifier.',
      },
      {
        type: 'paragraph',
        text: 'The module specifier provides a string that the JavaScript environment can resolve to a path to the module file. In a browser, this could be a path relative to the site root, which for our basic-modules example would be /js-examples/module-examples/basic-modules. However, here we are instead using the dot (.) syntax to mean "the current location", followed by the relative path to the file we are trying to find. This is much better than writing out the entire absolute path each time, as relative paths are shorter and make the URL portable — the example will still work if you move it to a different location in the site hierarchy.',
      },
      {
        type: 'paragraph',
        text: 'So for example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '/js-examples/module-examples/basic-modules/modules/square.js',
        },
      },
      {
        type: 'paragraph',
        text: 'becomes',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: './modules/square.js',
        },
      },
      {
        type: 'paragraph',
        text: 'You can see such lines in action in main.js.',
      },
      {
        type: 'paragraph',
        text: "Note: In some module systems, you can use a module specifier like modules/square that isn't a relative or absolute path, and that doesn't have a file extension. This kind of specifier can be used in a browser environment if you first define an import map.",
      },
      {
        type: 'paragraph',
        text: "Once you've imported the features into your script, you can use them just like they were defined inside the same file. The following is found in main.js, below the import lines:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const myCanvas = create("myCanvas", document.body, 480, 320);\nconst reportList = createReportList(myCanvas.id);\n\nconst square = draw(myCanvas.ctx, 50, 50, 100, "blue");\nreportArea(square.length, reportList);\nreportPerimeter(square.length, reportList);',
        },
      },
      {
        type: 'paragraph',
        text: 'Note: The imported values are read-only views of the features that were exported. Similar to const variables, you cannot re-assign the variable that was imported, but you can still modify properties of object values. The value can only be re-assigned by the module exporting it. See the import reference for an example.',
      },
      {
        type: 'paragraph',
        text: 'Above we saw how a browser can import a module using a module specifier that is either an absolute URL, or a relative URL that is resolved using the base URL of the document:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'import { name as circleName } from "https://example.com/shapes/circle.js";\nimport { name as squareName, draw } from "./shapes/square.js";',
        },
      },
      {
        type: 'paragraph',
        text: 'Import maps allow developers to instead specify almost any text they want in the module specifier when importing a module; the map provides a corresponding value that will replace the text when the module URL is resolved.',
      },
      {
        type: 'paragraph',
        text: 'For example, the imports key in the import map below defines a "module specifier map" JSON object where the property names can be used as module specifiers, and the corresponding values will be substituted when the browser resolves the module URL. The values must be absolute or relative URLs. Relative URLs are resolved to absolute URL addresses using the base URL of the document containing the import map.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<script type="importmap">\n  {\n    "imports": {\n      "shapes": "./shapes/square.js",\n      "shapes/square": "./modules/shapes/square.js",\n      "https://example.com/shapes/square.js": "./shapes/square.js",\n      "https://example.com/shapes/": "/shapes/square/",\n      "../shapes/square": "./shapes/square.js"\n    }\n  }\n</script>',
        },
      },
      {
        type: 'paragraph',
        text: 'The import map is defined using a JSON object inside a <script> element with the type attribute set to importmap. Note that an import map only applies to the document — the specification does not cover how to apply an import map in a worker or worklet context.',
      },
      {
        type: 'paragraph',
        text: 'With this map you can now use the property names above as module specifiers. If there is no trailing forward slash on the module specifier key then the whole module specifier key is matched and substituted. For example, below we match bare module names, and remap a URL to another path.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// Bare module names as module specifiers\nimport { name as squareNameOne } from "shapes";\nimport { name as squareNameTwo } from "shapes/square";\n\n// Remap a URL to another URL\nimport { name as squareNameThree } from "https://example.com/shapes/square.js";',
        },
      },
      {
        type: 'paragraph',
        text: 'If the module specifier has a trailing forward slash then the value must have one as well, and the key is matched as a "path prefix". This allows remapping of whole classes of URLs.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// Remap a URL as a prefix ( https://example.com/shapes/)\nimport { name as squareNameFour } from "https://example.com/shapes/moduleshapes/square.js";',
        },
      },
      {
        type: 'paragraph',
        text: 'It is possible for multiple keys in an import map to be valid matches for a module specifier. For example, a module specifier of shapes/circle/ could match the module specifier keys shapes/ and shapes/circle/. In this case the browser will select the most specific (longest) matching module specifier key.',
      },
      {
        type: 'paragraph',
        text: 'Import maps allow modules to be imported using bare module names (as in Node.js), and can also simulate importing modules from packages, both with and without file extensions. While not shown above, they also allow particular versions of a library to be imported, based on the path of the script that is importing the module. Generally they let developers write more ergonomic import code, and make it easier to manage the different versions and dependencies of modules used by a site. This can reduce the effort required to use the same JavaScript libraries in both browser and server.',
      },
      {
        type: 'paragraph',
        text: 'The following sections expand on the various features outlined above.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Feature detection',
      },
      {
        type: 'paragraph',
        text: 'You can check support for import maps using the HTMLScriptElement.supports() static method (which is itself broadly supported):',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'if (HTMLScriptElement.supports?.("importmap")) {\n  console.log("Browser supports import maps.");\n}',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Importing modules as bare names',
      },
      {
        type: 'paragraph',
        text: 'In some JavaScript environments, such as Node.js, you can use bare names for the module specifier. This works because the environment can resolve module names to a standard location in the file system. For example, you might use the following syntax to import the "square" module.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'import { name, draw, reportArea, reportPerimeter } from "square";',
        },
      },
      {
        type: 'paragraph',
        text: "To use bare names on a browser you need an import map, which provides the information needed by the browser to resolve module specifiers to URLs (JavaScript will throw a TypeError if it attempts to import a module specifier that can't be resolved to a module location).",
      },
      {
        type: 'paragraph',
        text: 'Below you can see a map that defines a square module specifier key, which in this case maps to a relative address value.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<script type="importmap">\n  {\n    "imports": {\n      "square": "./shapes/square.js"\n    }\n  }\n</script>',
        },
      },
      {
        type: 'paragraph',
        text: 'With this map we can now use a bare name when we import the module:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'import { name as squareName, draw } from "square";',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Remapping module paths',
      },
      {
        type: 'paragraph',
        text: 'Module specifier map entries, where both the specifier key and its associated value have a trailing forward slash (/), can be used as a path-prefix. This allows the remapping of a whole set of import URLs from one location to another. It can also be used to emulate working with "packages and modules", such as you might see in the Node ecosystem.',
      },
      {
        type: 'paragraph',
        text: 'Note: The trailing / indicates that the module specifier key can be substituted as part of a module specifier. If this is not present, the browser will only match (and substitute) the whole module specifier key.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Packages of modules',
      },
      {
        type: 'paragraph',
        text: 'The following JSON import map definition maps lodash as a bare name, and the module specifier prefix lodash/ to the path /node_modules/lodash-es/ (resolved to the document base URL):',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '{\n  "imports": {\n    "lodash": "/node_modules/lodash-es/lodash.js",\n    "lodash/": "/node_modules/lodash-es/"\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'With this mapping you can import both the whole "package", using the bare name, and modules within it (using the path mapping):',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'import _ from "lodash";\nimport fp from "lodash/fp.js";',
        },
      },
      {
        type: 'paragraph',
        text: 'It is possible to import fp above without the .js file extension, but you would need to create a bare module specifier key for that file, such as lodash/fp, rather than using the path. This may be reasonable for just one module, but scales poorly if you wish to import many modules.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'General URL remapping',
      },
      {
        type: 'paragraph',
        text: "A module specifier key doesn't have to be a path — it can also be an absolute URL (or a URL-like relative path like ./, ../, /). This may be useful if you want to remap a module that has absolute paths to a resource with your own local resources.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '{\n  "imports": {\n    "https://www.unpkg.com/moment/": "/node_modules/moment/"\n  }\n}',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Scoped modules for version management',
      },
      {
        type: 'paragraph',
        text: 'Ecosystems like Node use package managers such as npm to manage modules and their dependencies. The package manager ensures that each module is separated from other modules and their dependencies. As a result, while a complex application might include the same module multiple times with several different versions in different parts of the module graph, users do not need to think about this complexity.',
      },
      {
        type: 'paragraph',
        text: 'Note: You can also achieve version management using relative paths, but this is subpar because, among other things, this forces a particular structure on your project, and prevents you from using bare module names.',
      },
      {
        type: 'paragraph',
        text: 'Import maps similarly allow you to have multiple versions of dependencies in your application and refer to them using the same module specifier. You implement this with the scopes key, which allows you to provide module specifier maps that will be used depending on the path of the script performing the import. The example below demonstrates this.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '{\n  "imports": {\n    "cool-module": "/node_modules/cool-module/index.js"\n  },\n  "scopes": {\n    "/node_modules/dependency/": {\n      "cool-module": "/node_modules/some/other/location/cool-module/index.js"\n    }\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: "With this mapping, if a script with a URL that contains /node_modules/dependency/ imports cool-module, the version in /node_modules/some/other/location/cool-module/index.js will be used. The map in imports is used as a fallback if there is no matching scope in the scoped map, or the matching scopes don't contain a matching specifier. For example, if cool-module is imported from a script with a non-matching scope path, then the module specifier map in imports will be used instead, mapping to the version in /node_modules/cool-module/index.js.",
      },
      {
        type: 'paragraph',
        text: 'Note that the path used to select a scope does not affect how the address is resolved. The value in the mapped path does not have to match the scopes path, and relative paths are still resolved to the base URL of the script that contains the import map.',
      },
      {
        type: 'paragraph',
        text: 'Just as for module specifier maps, you can have many scope keys, and these may contain overlapping paths. If multiple scopes match the referrer URL, then the most specific scope path is checked first (the longest scope key) for a matching specifier. The browsers will fall back to the next most specific matching scoped path if there is no matching specifier, and so on. If there is no matching specifier in any of the matching scopes, the browser checks for a match in the module specifier map in the imports key.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Improve caching by mapping away hashed filenames',
      },
      {
        type: 'paragraph',
        text: 'Script files used by websites often have hashed filenames to simplify caching. The downside of this approach is that if a module changes, any modules that import it using its hashed filename will also need to be updated/regenerated. This potentially results in a cascade of updates, which is wasteful of network resources.',
      },
      {
        type: 'paragraph',
        text: 'Import maps provide a convenient solution to this problem. Rather than depending on specific hashed filenames, applications and scripts instead depend on an un-hashed version of the module name (address). An import map like the one below then provides a mapping to the actual script file.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '{\n  "imports": {\n    "main_script": "/node/srcs/application-fg7744e1b.js",\n    "dependency_script": "/node/srcs/dependency-3qn7e4b1q.js"\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: "If dependency_script changes, then its hash contained in the file name changes as well. In this case, we only need to update the import map to reflect the changed name of the module. We don't have to update the source of any JavaScript code that depends on it, because the specifier in the import statement does not change.",
      },
      {
        type: 'paragraph',
        text: 'One exciting feature that a unified module architecture brings is the ability to load non-JavaScript resources as modules. For example, you can import JSON as a JavaScript object, or import CSS as a CSSStyleSheet object.',
      },
      {
        type: 'paragraph',
        text: 'You must explicitly declare what kind of resource you are importing. By default, the browser assumes that the resource is JavaScript, and will throw an error if the resolved resource is something else. To import JSON, CSS, or other types of resource, use the import attributes syntax:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'import colors from "./colors.json" with { type: "json" };\nimport styles from "./styles.css" with { type: "css" };',
        },
      },
      {
        type: 'paragraph',
        text: "Browsers will also perform validation on the module type, and fail if, for example, ./data.json does not resolve to a JSON file. This ensures that you don't accidentally execute code when you just intend to import data. Once imported successfully, you can now use the imported value as a normal JavaScript object or CSSStyleSheet object.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'console.log(colors.map((color) => color.value));\ndocument.adoptedStyleSheets = [styles];',
        },
      },
      {
        type: 'paragraph',
        text: 'Now we just need to apply the main.js module to our HTML page. This is very similar to how we apply a regular script to a page, with a few notable differences.',
      },
      {
        type: 'paragraph',
        text: 'First of all, you need to include type="module" in the <script> element, to declare this script as a module. To import the main.js script, we use this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<script type="module" src="main.js"></script>',
        },
      },
      {
        type: 'paragraph',
        text: "You can also embed the module's script directly into the HTML file by placing the JavaScript code within the body of the <script> element:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<script type="module">\n  /* JavaScript module code here */\n</script>',
        },
      },
      {
        type: 'paragraph',
        text: 'You can only use import and export statements inside modules, not regular scripts. An error will be thrown if your <script> element doesn\'t have the type="module" attribute and attempts to import other modules. For example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<script>\n  import _ from "lodash"; // SyntaxError: import declarations may only appear at top level of a module\n  // …\n</script>\n<script src="a-module-using-import-statements.js"></script>\n<!-- SyntaxError: import declarations may only appear at top level of a module -->',
        },
      },
      {
        type: 'paragraph',
        text: "You should generally define all your modules in separate files. Modules declared inline in HTML can only import other modules, but anything they export will not be accessible by other modules (because they don't have a URL).",
      },
      {
        type: 'paragraph',
        text: 'Note: Modules and their dependencies can be preloaded by specifying them in <link> elements with rel="modulepreload". This can significantly reduce load time when the modules are used.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          "You need to pay attention to local testing — if you try to load the HTML file locally (i.e., with a file:// URL), you'll run into CORS errors due to JavaScript module security requirements. You need to do your testing through a server.",
          'Also, note that you might get different behavior from sections of script defined inside modules as opposed to in classic scripts. This is because modules use strict mode automatically.',
          'There is no need to use the defer attribute (see <script> attributes) when loading a module script; modules are deferred automatically.',
          'Modules are only executed once, even if they have been referenced in multiple <script> tags.',
          "Last but not least, let's make this clear — module features are imported into the scope of a single script — they aren't available in the global scope. Therefore, you will only be able to access imported features in the script they are imported into, and you won't be able to access them from the JavaScript console, for example. You'll still get syntax errors shown in the DevTools, but you'll not be able to use some of the debugging techniques you might have expected to use.",
        ],
      },
      {
        type: 'paragraph',
        text: 'Module-defined variables are scoped to the module unless explicitly attached to the global object. On the other hand, globally-defined variables are available within the module. For example, given the following code:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<!doctype html>\n<html lang="en-US">\n  <head>\n    <meta charset="UTF-8" />\n    <title>Example page</title>\n    <link rel="stylesheet" href="" />\n  </head>\n  <body>\n    <div id="main"></div>\n    <script>\n      // A var statement creates a global variable.\n      var text = "Hello";\n    </script>\n    <script type="module" src="./render.js"></script>\n  </body>\n</html>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '/* render.js */\ndocument.getElementById("main").innerText = text;',
        },
      },
      {
        type: 'paragraph',
        text: 'The page would still render Hello, because the global variables text and document are available in the module. (Also note from this example that a module doesn\'t necessarily need an import/export statement — the only thing needed is for the entry point to have type="module".)',
      },
      {
        type: 'paragraph',
        text: "The functionality we've exported so far has been comprised of named exports — each item (be it a function, const, etc.) has been referred to by its name upon export, and that name has been used to refer to it on import as well.",
      },
      {
        type: 'paragraph',
        text: 'There is also a type of export called the default export — this is designed to make it easy to have a default function provided by a module, and also helps JavaScript modules to interoperate with existing CommonJS and AMD module systems (as explained nicely in ES6 In Depth: Modules by Jason Orendorff; search for "Default exports").',
      },
      {
        type: 'paragraph',
        text: "Let's look at an example as we explain how it works. In our basic-modules square.js you can find a function called randomSquare() that creates a square with a random color, size, and position. We want to export this as our default, so at the bottom of the file we write this:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'export default randomSquare;',
        },
      },
      {
        type: 'paragraph',
        text: 'Note the lack of curly braces.',
      },
      {
        type: 'paragraph',
        text: 'We could instead prepend export default onto the function and define it as an anonymous function, like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'export default function (ctx) {\n  // …\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Over in our main.js file, we import the default function using this line:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'import randomSquare from "./modules/square.js";',
        },
      },
      {
        type: 'paragraph',
        text: 'Again, note the lack of curly braces. This is because there is only one default export allowed per module, and we know that randomSquare is it. The above line is basically shorthand for:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'import { default as randomSquare } from "./modules/square.js";',
        },
      },
      {
        type: 'paragraph',
        text: 'Note: The as syntax for renaming exported items is explained below in the Renaming imports and exports section.',
      },
      {
        type: 'paragraph',
        text: "So far, our canvas shape drawing modules seem to be working OK. But what happens if we try to add a module that deals with drawing another shape, like a circle or triangle? These shapes would probably have associated functions like draw(), reportArea(), etc. too; if we tried to import different functions of the same name into the same top-level module file, we'd end up with conflicts and errors.",
      },
      {
        type: 'paragraph',
        text: "Fortunately there are a number of ways to get around this. We'll look at these in the following sections.",
      },
      {
        type: 'paragraph',
        text: "Inside your import and export statement's curly braces, you can use the keyword as along with a new feature name, to change the identifying name you will use for a feature inside the top-level module.",
      },
      {
        type: 'paragraph',
        text: 'So for example, both of the following would do the same job, albeit in a slightly different way:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// -- module.js --\nexport { function1 as newFunctionName, function2 as anotherNewFunctionName };\n\n// -- main.js --\nimport { newFunctionName, anotherNewFunctionName } from "./modules/module.js";',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// -- module.js --\nexport { function1, function2 };\n\n// -- main.js --\nimport {\n  function1 as newFunctionName,\n  function2 as anotherNewFunctionName,\n} from "./modules/module.js";',
        },
      },
      {
        type: 'paragraph',
        text: "Let's look at a real example. In our renaming directory you'll see the same module system as in the previous example, except that we've added circle.js and triangle.js modules to draw and report on circles and triangles.",
      },
      {
        type: 'paragraph',
        text: "Inside each of these modules, we've got features with the same names being exported, and therefore each has the same export statement at the bottom:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'export { name, draw, reportArea, reportPerimeter };',
        },
      },
      {
        type: 'paragraph',
        text: 'When importing these into main.js, if we tried to use',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'import { name, draw, reportArea, reportPerimeter } from "./modules/square.js";\nimport { name, draw, reportArea, reportPerimeter } from "./modules/circle.js";\nimport { name, draw, reportArea, reportPerimeter } from "./modules/triangle.js";',
        },
      },
      {
        type: 'paragraph',
        text: 'The browser would throw an error such as "SyntaxError: redeclaration of import name" (Firefox).',
      },
      {
        type: 'paragraph',
        text: 'Instead we need to rename the imports so that they are unique:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'import {\n  name as squareName,\n  draw as drawSquare,\n  reportArea as reportSquareArea,\n  reportPerimeter as reportSquarePerimeter,\n} from "./modules/square.js";\n\nimport {\n  name as circleName,\n  draw as drawCircle,\n  reportArea as reportCircleArea,\n  reportPerimeter as reportCirclePerimeter,\n} from "./modules/circle.js";\n\nimport {\n  name as triangleName,\n  draw as drawTriangle,\n  reportArea as reportTriangleArea,\n  reportPerimeter as reportTrianglePerimeter,\n} from "./modules/triangle.js";',
        },
      },
      {
        type: 'paragraph',
        text: 'Note that you could solve the problem in the module files instead, e.g.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// in square.js\nexport {\n  name as squareName,\n  draw as drawSquare,\n  reportArea as reportSquareArea,\n  reportPerimeter as reportSquarePerimeter,\n};',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// in main.js\nimport {\n  squareName,\n  drawSquare,\n  reportSquareArea,\n  reportSquarePerimeter,\n} from "./modules/square.js";',
        },
      },
      {
        type: 'paragraph',
        text: "And it would work just the same. What style you use is up to you, however it arguably makes more sense to leave your module code alone, and make the changes in the imports. This especially makes sense when you are importing from third party modules that you don't have any control over.",
      },
      {
        type: 'paragraph',
        text: "The above method works OK, but it's a little messy and long-winded. An even better solution is to import each module's features inside a module object. The following syntax form does that:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'import * as Module from "./modules/module.js";',
        },
      },
      {
        type: 'paragraph',
        text: 'This grabs all the exports available inside module.js, and makes them available as members of an object Module, effectively giving it its own namespace. So for example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'Module.function1();\nModule.function2();',
        },
      },
      {
        type: 'paragraph',
        text: "Again, let's look at a real example. If you go to our module-objects directory, you'll see the same example again, but rewritten to take advantage of this new syntax. In the modules, the exports are all in the following simple form:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'export { name, draw, reportArea, reportPerimeter };',
        },
      },
      {
        type: 'paragraph',
        text: 'The imports on the other hand look like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'import * as Canvas from "./modules/canvas.js";\n\nimport * as Square from "./modules/square.js";\nimport * as Circle from "./modules/circle.js";\nimport * as Triangle from "./modules/triangle.js";',
        },
      },
      {
        type: 'paragraph',
        text: "In each case, you can now access the module's imports underneath the specified object name, for example:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const square = Square.draw(myCanvas.ctx, 50, 50, 100, "blue");\nSquare.reportArea(square.length, reportList);\nSquare.reportPerimeter(square.length, reportList);',
        },
      },
      {
        type: 'paragraph',
        text: 'So you can now write the code just the same as before (as long as you include the object names where needed), and the imports are much neater.',
      },
      {
        type: 'paragraph',
        text: "As we hinted at earlier, you can also export and import classes; this is another option for avoiding conflicts in your code, and is especially useful if you've already got your module code written in an object-oriented style.",
      },
      {
        type: 'paragraph',
        text: 'You can see an example of our shape drawing module rewritten with ES classes in our classes directory. As an example, the square.js file now contains all its functionality in a single class:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class Square {\n  constructor(ctx, listId, length, x, y, color) {\n    // …\n  }\n\n  draw() {\n    // …\n  }\n\n  // …\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'which we then export:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'export { Square };',
        },
      },
      {
        type: 'paragraph',
        text: 'Over in main.js, we import it like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'import { Square } from "./modules/square.js";',
        },
      },
      {
        type: 'paragraph',
        text: 'And then use the class to draw our square:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const square = new Square(myCanvas.ctx, myCanvas.listId, 50, 50, 100, "blue");\nsquare.draw();\nsquare.reportArea();\nsquare.reportPerimeter();',
        },
      },
      {
        type: 'paragraph',
        text: "There will be times where you'll want to aggregate modules together. You might have multiple levels of dependencies, where you want to simplify things, combining several submodules into one parent module. This is possible using export syntax of the following forms in the parent module:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'export * from "x.js";\nexport { name } from "x.js";',
        },
      },
      {
        type: 'paragraph',
        text: "For an example, see our module-aggregation directory. In this example (based on our earlier classes example) we've got an extra module called shapes.js, which aggregates all the functionality from circle.js, square.js, and triangle.js together. We've also moved our submodules inside a subdirectory inside the modules directory called shapes. So the module structure in this example is:",
      },
      {
        type: 'paragraph',
        text: 'modules/ canvas.js shapes.js shapes/ circle.js square.js triangle.js',
      },
      {
        type: 'paragraph',
        text: 'In each of the submodules, the export is of the same form, e.g.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'export { Square };',
        },
      },
      {
        type: 'paragraph',
        text: 'Next up comes the aggregation part. Inside shapes.js, we include the following lines:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'export { Square } from "./shapes/square.js";\nexport { Triangle } from "./shapes/triangle.js";\nexport { Circle } from "./shapes/circle.js";',
        },
      },
      {
        type: 'paragraph',
        text: 'These grab the exports from the individual submodules and effectively make them available from the shapes.js module.',
      },
      {
        type: 'paragraph',
        text: "Note: The exports referenced in shapes.js basically get redirected through the file and don't really exist there, so you won't be able to write any useful related code inside the same file.",
      },
      {
        type: 'paragraph',
        text: 'So now in the main.js file, we can get access to all three module classes by replacing',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'import { Square } from "./modules/square.js";\nimport { Circle } from "./modules/circle.js";\nimport { Triangle } from "./modules/triangle.js";',
        },
      },
      {
        type: 'paragraph',
        text: 'with the following single line:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'import { Square, Circle, Triangle } from "./modules/shapes.js";',
        },
      },
      {
        type: 'paragraph',
        text: "A recent addition to JavaScript modules functionality is dynamic module loading. This allows you to dynamically load modules only when they are needed, rather than having to load everything up front. This has some obvious performance advantages; let's read on and see how it works.",
      },
      {
        type: 'paragraph',
        text: "This new functionality allows you to call import() as a function, passing it the path to the module as a parameter. It returns a Promise, which fulfills with a module object (see Creating a module object) giving you access to that object's exports. For example:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'import("./modules/myModule.js").then((module) => {\n  // Do something with the module.\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'Note: Dynamic import is permitted in the browser main thread, and in shared and dedicated workers. However import() will throw if called in a service worker or worklet.',
      },
      {
        type: 'paragraph',
        text: 'Let\'s look at an example. In the dynamic-module-imports directory we\'ve got another example based on our classes example. This time however we are not drawing anything on the canvas when the example loads. Instead, we include three buttons — "Circle", "Square", and "Triangle" — that, when pressed, dynamically load the required module and then use it to draw the associated shape.',
      },
      {
        type: 'paragraph',
        text: "In this example we've only made changes to our index.html and main.js files — the module exports remain the same as before.",
      },
      {
        type: 'paragraph',
        text: "Over in main.js we've grabbed a reference to each button using a document.querySelector() call, for example:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const squareBtn = document.querySelector(".square");',
        },
      },
      {
        type: 'paragraph',
        text: 'We then attach an event listener to each button so that when pressed, the relevant module is dynamically loaded and used to draw the shape:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'squareBtn.addEventListener("click", () => {\n  import("./modules/square.js").then((Module) => {\n    const square = new Module.Square(\n      myCanvas.ctx,\n      myCanvas.listId,\n      50,\n      50,\n      100,\n      "blue",\n    );\n    square.draw();\n    square.reportArea();\n    square.reportPerimeter();\n  });\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'Note that, because the promise fulfillment returns a module object, the class is then made a subfeature of the object, hence we now need to access the constructor with Module. prepended to it, e.g., Module.Square( /* … */ ).',
      },
      {
        type: 'paragraph',
        text: 'Another advantage of dynamic imports is that they are always available, even in script environments. Therefore, if you have an existing <script> tag in your HTML that doesn\'t have type="module", you can still reuse code distributed as modules by dynamically importing it.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<script>\n  import("./modules/square.js").then((module) => {\n    // Do something with the module.\n  });\n  // Other code that operates on the global scope and is not\n  // ready to be refactored into modules yet.\n  var btn = document.querySelector(".square");\n</script>',
        },
      },
      {
        type: 'paragraph',
        text: 'Top level await is a feature available within modules. This means the await keyword can be used. It allows modules to act as big asynchronous functions meaning code can be evaluated before use in parent modules, but without blocking sibling modules from loading.',
      },
      {
        type: 'paragraph',
        text: "Let's take a look at an example. You can find all the files and code described in this section within the top-level-await directory, which extends from the previous examples.",
      },
      {
        type: 'paragraph',
        text: "Firstly we'll declare our color palette in a separate colors.json file:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '{\n  "yellow": "#F4D03F",\n  "green": "#52BE80",\n  "blue": "#5499C7",\n  "red": "#CD6155",\n  "orange": "#F39C12"\n}',
        },
      },
      {
        type: 'paragraph',
        text: "Then we'll create a module called getColors.js which uses a fetch request to load the colors.json file and return the data as an object.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// fetch request\nconst colors = fetch("../data/colors.json").then((response) => response.json());\n\nexport default await colors;',
        },
      },
      {
        type: 'paragraph',
        text: 'Notice the last export line here.',
      },
      {
        type: 'paragraph',
        text: "We're using the keyword await before specifying the constant colors to export. This means any other modules which include this one will wait until colors has been downloaded and parsed before using it.",
      },
      {
        type: 'paragraph',
        text: "Let's include this module in our main.js file:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'import colors from "./modules/getColors.js";\nimport { Canvas } from "./modules/canvas.js";\n\nconst circleBtn = document.querySelector(".circle");\n\n// …',
        },
      },
      {
        type: 'paragraph',
        text: "We'll use colors instead of the previously used strings when calling our shape functions:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const square = new Module.Square(\n  myCanvas.ctx,\n  myCanvas.listId,\n  50,\n  50,\n  100,\n  colors.blue,\n);\n\nconst circle = new Module.Circle(\n  myCanvas.ctx,\n  myCanvas.listId,\n  75,\n  200,\n  100,\n  colors.green,\n);\n\nconst triangle = new Module.Triangle(\n  myCanvas.ctx,\n  myCanvas.listId,\n  100,\n  75,\n  190,\n  colors.yellow,\n);',
        },
      },
      {
        type: 'paragraph',
        text: "This is useful because the code within main.js won't execute until the code in getColors.js has run. However it won't block other modules being loaded. For instance our canvas.js module will continue to load while colors is being fetched.",
      },
      {
        type: 'paragraph',
        text: "Import declarations are hoisted. In this case, it means that the imported values are available in the module's code even before the place that declares them, and that the imported module's side effects are produced before the rest of the module's code starts running.",
      },
      {
        type: 'paragraph',
        text: 'So for example, in main.js, importing Canvas in the middle of the code would still work:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// …\nconst myCanvas = new Canvas("myCanvas", document.body, 480, 320);\nmyCanvas.create();\nimport { Canvas } from "./modules/canvas.js";\nmyCanvas.createReportList();\n// …',
        },
      },
      {
        type: 'paragraph',
        text: 'Still, it is considered good practice to put all your imports at the top of the code, which makes it easier to analyze dependencies.',
      },
      {
        type: 'paragraph',
        text: 'Modules can import other modules, and those modules can import other modules, and so on. This forms a directed graph called the "dependency graph". In an ideal world, this graph is acyclic. In this case, the graph can be evaluated using a depth-first traversal.',
      },
      {
        type: 'paragraph',
        text: 'However, cycles are often inevitable. Cyclic import arises if module a imports module b, but b directly or indirectly depends on a. For example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// -- a.js --\nimport { b } from "./b.js";\n\n// -- b.js --\nimport { a } from "./a.js";\n\n// Cycle:\n// a.js ───> b.js\n//  ^         │\n//  └─────────┘',
        },
      },
      {
        type: 'paragraph',
        text: "Cyclic imports don't always fail. The imported variable's value is only retrieved when the variable is actually used (hence allowing live bindings), and only if the variable remains uninitialized at that time will a ReferenceError be thrown.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// -- a.js --\nimport { b } from "./b.js";\n\nsetTimeout(() => {\n  console.log(b); // 1\n}, 10);\n\nexport const a = 2;\n\n// -- b.js --\nimport { a } from "./a.js";\n\nsetTimeout(() => {\n  console.log(a); // 2\n}, 10);\n\nexport const b = 1;',
        },
      },
      {
        type: 'paragraph',
        text: 'In this example, both a and b are used asynchronously. Therefore, at the time the module is evaluated, neither b nor a is actually read, so the rest of the code is executed as normal, and the two export declarations produce the values of a and b. Then, after the timeout, both a and b are available, so the two console.log statements also execute as normal.',
      },
      {
        type: 'paragraph',
        text: 'If you change the code to use a synchronously, the module evaluation fails:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// -- a.js (entry module) --\nimport { b } from "./b.js";\n\nexport const a = 2;\n\n// -- b.js --\nimport { a } from "./a.js";\n\nconsole.log(a); // ReferenceError: Cannot access \'a\' before initialization\nexport const b = 1;',
        },
      },
      {
        type: 'paragraph',
        text: 'This is because when JavaScript evaluates a.js, it needs to first evaluate b.js, the dependency of a.js. However, b.js uses a, which is not yet available.',
      },
      {
        type: 'paragraph',
        text: 'On the other hand, if you change the code to use b synchronously but a asynchronously, the module evaluation succeeds:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// -- a.js (entry module) --\nimport { b } from "./b.js";\n\nconsole.log(b); // 1\nexport const a = 2;\n\n// -- b.js --\nimport { a } from "./a.js";\n\nsetTimeout(() => {\n  console.log(a); // 2\n}, 10);\nexport const b = 1;',
        },
      },
      {
        type: 'paragraph',
        text: 'This is because the evaluation of b.js completes normally, so the value of b is available when a.js is evaluated.',
      },
      {
        type: 'paragraph',
        text: 'You should usually avoid cyclic imports in your project, because they make your code more error-prone. Some common cycle-elimination techniques are:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Merge the two modules into one.',
          'Move the shared code into a third module.',
          'Move some code from one module to the other.',
        ],
      },
      {
        type: 'paragraph',
        text: 'However, cyclic imports can also occur if the libraries depend on each other, which is harder to fix.',
      },
      {
        type: 'paragraph',
        text: "The introduction of modules encourages the JavaScript ecosystem to distribute and reuse code in a modular fashion. However, that doesn't necessarily mean a piece of JavaScript code can run in every environment. Suppose you discovered a module that generates SHA hashes of your user's password. Can you use it in the browser front end? Can you use it on your Node.js server? The answer is: it depends.",
      },
      {
        type: 'paragraph',
        text: 'Modules still have access to global variables, as demonstrated previously. If the module references globals like window, it can run in the browser, but will throw an error in your Node.js server, because window is not available there. Similarly, if the code requires access to process to be functional, it can only be used in Node.js.',
      },
      {
        type: 'paragraph',
        text: 'In order to maximize the reusability of a module, it is often advised to make the code "isomorphic" — that is, exhibits the same behavior in every runtime. This is commonly achieved in three ways:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Separate your modules into "core" and "binding". For the "core", focus on pure JavaScript logic like computing the hash, without any DOM, network, filesystem access, and expose utility functions. For the "binding" part, you can read from and write to the global context. For example, the "browser binding" may choose to read the value from an input box, while the "Node binding" may read it from process.env, but values read from either place will be piped to the same core function and handled in the same way. The core can be imported in every environment and used in the same way, while only the binding, which is usually lightweight, needs to be platform-specific.',
          'Detect whether a particular global exists before using it. For example, if you test that typeof window === "undefined", you know that you are probably in a Node.js environment, and should not read DOM. js // myModule.js let password; if (typeof process !== "undefined") { // We are running in Node.js; read it from `process.env` password = process.env.PASSWORD; } else if (typeof window !== "undefined") { // We are running in the browser; read it from the input box password = document.getElementById("password").value; } This is preferable if the two branches actually end up with the same behavior ("isomorphic"). If it\'s impossible to provide the same functionality, or if doing so involves loading significant amounts of code while a large part remains unused, better use different "bindings" instead.',
          'Use a polyfill to provide a fallback for missing features. For example, if you want to use the fetch function, which is only supported in Node.js since v18, you can use a similar API, like the one provided by node-fetch. You can do so conditionally through dynamic imports: js // myModule.js if (typeof fetch === "undefined") { // We are running in Node.js; use node-fetch globalThis.fetch = (await import("node-fetch")).default; } // … The globalThis variable is a global object that is available in every environment and is useful if you want to read or create global variables within modules.',
        ],
      },
      {
        type: 'paragraph',
        text: 'These practices are not unique to modules. Still, with the trend of code reusability and modularization, you are encouraged to make your code cross-platform so that it can be enjoyed by as many people as possible. Runtimes like Node.js are also actively implementing web APIs where possible to improve interoperability with the web.',
      },
      {
        type: 'paragraph',
        text: 'Here are a few tips that may help you if you are having trouble getting your modules to work. Feel free to add to the list if you discover more!',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'We mentioned this before, but to reiterate: .mjs files need to be loaded with a MIME-type of text/javascript (or another JavaScript-compatible MIME-type, but text/javascript is recommended), otherwise you\'ll get a strict MIME type checking error like "The server responded with a non-JavaScript MIME type".',
          "If you try to load the HTML file locally (i.e., with a file:// URL), you'll run into CORS errors due to JavaScript module security requirements. You need to do your testing through a server. GitHub pages is ideal as it also serves .mjs files with the correct MIME type.",
          'Because .mjs is a non-standard file extension, some operating systems might not recognize it, or try to replace it with something else. For example, we found that macOS was silently adding on .js to the end of .mjs files and then automatically hiding the file extension. So all of our files were actually coming out as x.mjs.js. Once we turned off automatically hiding file extensions, and trained it to accept .mjs, it was OK.',
        ],
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'JavaScript modules on v8.dev (2018)',
          'ES modules: A cartoon deep-dive on hacks.mozilla.org (2018)',
          'ES6 in Depth: Modules on hacks.mozilla.org (2015)',
          'Exploring JS, Ch.16: Modules by Dr. Axel Rauschmayer',
          'Previous',
        ],
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
