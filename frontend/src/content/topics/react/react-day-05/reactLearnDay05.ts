import type { ContentTopic } from '../../../types';

export const reactlearnday05Topics = {
  reactlearnday05: {
    id: 'reactlearnday05',
    heading: 'React Learn',
    blocks: [
      {
        type: 'paragraph',
        text: 'Welcome to the React documentation! This page will give you an introduction to 80% of the React concepts that you will use on a daily basis.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'You will learn',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'How to create and nest components',
          'How to add markup and styles',
          'How to display data',
          'How to render conditions and lists',
          'How to respond to events and update the screen',
          'How to share data between components',
        ],
      },
      {
        type: 'paragraph',
        text: 'React apps are made out of components. A component is a piece of the UI (user interface) that has its own logic and appearance. A component can be as small as a button, or as large as an entire page.',
      },
      {
        type: 'paragraph',
        text: 'React components are JavaScript functions that return markup:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "function MyButton() {\n\n  return (\n\n    <button>I'm a button</button>\n\n  );\n\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Now that you’ve declared MyButton, you can nest it into another component:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'export default function MyApp() {\n\n  return (\n\n    <div>\n\n      <h1>Welcome to my app</h1>\n\n      <MyButton />\n\n    </div>\n\n  );\n\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Notice that <MyButton /> starts with a capital letter. That’s how you know it’s a React component. React component names must always start with a capital letter, while HTML tags must be lowercase.',
      },
      {
        type: 'paragraph',
        text: 'Have a look at the result:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "function MyButton() {\n  return (\n    <button>\n      I'm a button\n    </button>\n  );\n}\n\nexport default function MyApp() {\n  return (\n    <div>\n      <h1>Welcome to my app</h1>\n      <MyButton />\n    </div>\n  );\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'The export default keywords specify the main component in the file. If you’re not familiar with some piece of JavaScript syntax, MDN and javascript.info have great references.',
      },
      {
        type: 'paragraph',
        text: 'The markup syntax you’ve seen above is called JSX. It is optional, but most React projects use JSX for its convenience. All of the tools we recommend for local development support JSX out of the box.',
      },
      {
        type: 'paragraph',
        text: 'JSX is stricter than HTML. You have to close tags like <br />. Your component also can’t return multiple JSX tags. You have to wrap them into a shared parent, like a <div>...</div> or an empty <>...</> wrapper:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'function AboutPage() {\n\n  return (\n\n    <>\n\n      <h1>About</h1>\n\n      <p>Hello there.<br />How do you do?</p>\n\n    </>\n\n  );\n\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'If you have a lot of HTML to port to JSX, you can use an online converter.',
      },
      {
        type: 'paragraph',
        text: 'In React, you specify a CSS class with className. It works the same way as the HTML class attribute:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: '<img className="avatar" />',
        },
      },
      {
        type: 'paragraph',
        text: 'Then you write the CSS rules for it in a separate CSS file:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: '/* In your CSS */\n\n.avatar {\n\n  border-radius: 50%;\n\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'React does not prescribe how you add CSS files. In the simplest case, you’ll add a <link> tag to your HTML. If you use a build tool or a framework, consult its documentation to learn how to add a CSS file to your project.',
      },
      {
        type: 'paragraph',
        text: 'JSX lets you put markup into JavaScript. Curly braces let you “escape back” into JavaScript so that you can embed some variable from your code and display it to the user. For example, this will display user.name:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'return (\n\n  <h1>\n\n    {user.name}\n\n  </h1>\n\n);',
        },
      },
      {
        type: 'paragraph',
        text: 'You can also “escape into JavaScript” from JSX attributes, but you have to use curly braces instead of quotes. For example, className="avatar" passes the "avatar" string as the CSS class, but src={user.imageUrl} reads the JavaScript user.imageUrl variable value, and then passes that value as the src attribute:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'return (\n\n  <img\n\n    className="avatar"\n\n    src={user.imageUrl}\n\n  />\n\n);',
        },
      },
      {
        type: 'paragraph',
        text: 'You can put more complex expressions inside the JSX curly braces too, for example, string concatenation:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "const user = {\n  name: 'Hedy Lamarr',\n  imageUrl: 'https://react.dev/images/docs/scientists/yXOvdOSs.jpg',\n  imageSize: 90,\n};\n\nexport default function Profile() {\n  return (\n    <>\n      <h1>{user.name}</h1>\n      <img\n        className=\"avatar\"\n        src={user.imageUrl}\n        alt={'Photo of ' + user.name}\n        style={{\n          width: user.imageSize,\n          height: user.imageSize\n        }}\n      />\n    </>\n  );\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'In the above example, style={{}} is not a special syntax, but a regular {} object inside the style={ } JSX curly braces. You can use the style attribute when your styles depend on JavaScript variables.',
      },
      {
        type: 'paragraph',
        text: 'In React, there is no special syntax for writing conditions. Instead, you’ll use the same techniques as you use when writing regular JavaScript code. For example, you can use an if statement to conditionally include JSX:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'let content;\n\nif (isLoggedIn) {\n\n  content = <AdminPanel />;\n\n} else {\n\n  content = <LoginForm />;\n\n}\n\nreturn (\n\n  <div>\n\n    {content}\n\n  </div>\n\n);',
        },
      },
      {
        type: 'paragraph',
        text: 'If you prefer more compact code, you can use the conditional ? operator. Unlike if, it works inside JSX:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: '<div>\n\n  {isLoggedIn ? (\n\n    <AdminPanel />\n\n  ) : (\n\n    <LoginForm />\n\n  )}\n\n</div>',
        },
      },
      {
        type: 'paragraph',
        text: 'When you don’t need the else branch, you can also use a shorter logical && syntax:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: '<div>\n\n  {isLoggedIn && <AdminPanel />}\n\n</div>',
        },
      },
      {
        type: 'paragraph',
        text: 'All of these approaches also work for conditionally specifying attributes. If you’re unfamiliar with some of this JavaScript syntax, you can start by always using if...else.',
      },
      {
        type: 'paragraph',
        text: 'You will rely on JavaScript features like for loop and the array map() function to render lists of components.',
      },
      {
        type: 'paragraph',
        text: 'For example, let’s say you have an array of products:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "const products = [\n\n  { title: 'Cabbage', id: 1 },\n\n  { title: 'Garlic', id: 2 },\n\n  { title: 'Apple', id: 3 },\n\n];",
        },
      },
      {
        type: 'paragraph',
        text: 'Inside your component, use the map() function to transform an array of products into an array of <li> items:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'const listItems = products.map(product =>\n\n  <li key={product.id}>\n\n    {product.title}\n\n  </li>\n\n);\n\n\n\nreturn (\n\n  <ul>{listItems}</ul>\n\n);',
        },
      },
      {
        type: 'paragraph',
        text: 'Notice how <li> has a key attribute. For each item in a list, you should pass a string or a number that uniquely identifies that item among its siblings. Usually, a key should be coming from your data, such as a database ID. React uses your keys to know what happened if you later insert, delete, or reorder the items.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "const products = [\n  { title: 'Cabbage', isFruit: false, id: 1 },\n  { title: 'Garlic', isFruit: false, id: 2 },\n  { title: 'Apple', isFruit: true, id: 3 },\n];\n\nexport default function ShoppingList() {\n  const listItems = products.map(product =>\n    <li\n      key={product.id}\n      style={{\n        color: product.isFruit ? 'magenta' : 'darkgreen'\n      }}\n    >\n      {product.title}\n    </li>\n  );\n\n  return (\n    <ul>{listItems}</ul>\n  );\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'You can respond to events by declaring event handler functions inside your components:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "function MyButton() {\n\n  function handleClick() {\n\n    alert('You clicked me!');\n\n  }\n\n\n\n  return (\n\n    <button onClick={handleClick}>\n\n      Click me\n\n    </button>\n\n  );\n\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Notice how onClick={handleClick} has no parentheses at the end! Do not call the event handler function: you only need to pass it down. React will call your event handler when the user clicks the button.',
      },
      {
        type: 'paragraph',
        text: 'Often, you’ll want your component to “remember” some information and display it. For example, maybe you want to count the number of times a button is clicked. To do this, add state to your component.',
      },
      {
        type: 'paragraph',
        text: 'First, import useState from React:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import { useState } from 'react';",
        },
      },
      {
        type: 'paragraph',
        text: 'Now you can declare a state variable inside your component:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'function MyButton() {\n\n  const [count, setCount] = useState(0);\n\n  // ...',
        },
      },
      {
        type: 'paragraph',
        text: 'You’ll get two things from useState: the current state (count), and the function that lets you update it (setCount). You can give them any names, but the convention is to write [something, setSomething].',
      },
      {
        type: 'paragraph',
        text: 'The first time the button is displayed, count will be 0 because you passed 0 to useState(). When you want to change state, call setCount() and pass the new value to it. Clicking this button will increment the counter:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'function MyButton() {\n\n  const [count, setCount] = useState(0);\n\n\n\n  function handleClick() {\n\n    setCount(count + 1);\n\n  }\n\n\n\n  return (\n\n    <button onClick={handleClick}>\n\n      Clicked {count} times\n\n    </button>\n\n  );\n\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'React will call your component function again. This time, count will be 1. Then it will be 2. And so on.',
      },
      {
        type: 'paragraph',
        text: 'If you render the same component multiple times, each will get its own state. Click each button separately:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import { useState } from 'react';\n\nexport default function MyApp() {\n  return (\n    <div>\n      <h1>Counters that update separately</h1>\n      <MyButton />\n      <MyButton />\n    </div>\n  );\n}\n\nfunction MyButton() {\n  const [count, setCount] = useState(0);\n\n  function handleClick() {\n    setCount(count + 1);\n  }\n\n  return (\n    <button onClick={handleClick}>\n      Clicked {count} times\n    </button>\n  );\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Notice how each button “remembers” its own count state and doesn’t affect other buttons.',
      },
      {
        type: 'paragraph',
        text: 'Functions starting with use are called Hooks. useState is a built-in Hook provided by React. You can find other built-in Hooks in the API reference. You can also write your own Hooks by combining the existing ones.',
      },
      {
        type: 'paragraph',
        text: 'Hooks are more restrictive than other functions. You can only call Hooks at the top of your components (or other Hooks). If you want to use useState in a condition or a loop, extract a new component and put it there.',
      },
      {
        type: 'paragraph',
        text: 'In the previous example, each MyButton had its own independent count, and when each button was clicked, only the count for the button clicked changed:',
      },
      {
        type: 'image',
        src: 'https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fsharing_data_child.dark.png&w=828&q=75',
        alt: 'Diagram showing a tree of three components, one parent labeled MyApp and two children labeled MyButton. Both MyButton components contain a count with value zero.',
      },
      {
        type: 'image',
        src: 'https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fsharing_data_child.png&w=828&q=75',
        alt: 'Diagram showing a tree of three components, one parent labeled MyApp and two children labeled MyButton. Both MyButton components contain a count with value zero.',
      },
      {
        type: 'paragraph',
        text: 'Initially, each MyButton’s count state is 0',
      },
      {
        type: 'image',
        src: 'https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fsharing_data_child_clicked.dark.png&w=828&q=75',
        alt: 'The same diagram as the previous, with the count of the first child MyButton component highlighted indicating a click with the count value incremented to one. The second MyButton component still contains value zero.',
      },
      {
        type: 'image',
        src: 'https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fsharing_data_child_clicked.png&w=828&q=75',
        alt: 'The same diagram as the previous, with the count of the first child MyButton component highlighted indicating a click with the count value incremented to one. The second MyButton component still contains value zero.',
      },
      {
        type: 'paragraph',
        text: 'The first MyButton updates its count to 1',
      },
      {
        type: 'paragraph',
        text: 'However, often you’ll need components to share data and always update together.',
      },
      {
        type: 'paragraph',
        text: 'To make both MyButton components display the same count and update together, you need to move the state from the individual buttons “upwards” to the closest component containing all of them.',
      },
      {
        type: 'paragraph',
        text: 'In this example, it is MyApp:',
      },
      {
        type: 'image',
        src: 'https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fsharing_data_parent.dark.png&w=828&q=75',
        alt: 'Diagram showing a tree of three components, one parent labeled MyApp and two children labeled MyButton. MyApp contains a count value of zero which is passed down to both of the MyButton components, which also show value zero.',
      },
      {
        type: 'image',
        src: 'https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fsharing_data_parent.png&w=828&q=75',
        alt: 'Diagram showing a tree of three components, one parent labeled MyApp and two children labeled MyButton. MyApp contains a count value of zero which is passed down to both of the MyButton components, which also show value zero.',
      },
      {
        type: 'paragraph',
        text: 'Initially, MyApp’s count state is 0 and is passed down to both children',
      },
      {
        type: 'image',
        src: 'https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fsharing_data_parent_clicked.dark.png&w=828&q=75',
        alt: 'The same diagram as the previous, with the count of the parent MyApp component highlighted indicating a click with the value incremented to one. The flow to both of the children MyButton components is also highlighted, and the count value in each child is set to one indicating the value was passed down.',
      },
      {
        type: 'image',
        src: 'https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fsharing_data_parent_clicked.png&w=828&q=75',
        alt: 'The same diagram as the previous, with the count of the parent MyApp component highlighted indicating a click with the value incremented to one. The flow to both of the children MyButton components is also highlighted, and the count value in each child is set to one indicating the value was passed down.',
      },
      {
        type: 'paragraph',
        text: 'On click, MyApp updates its count state to 1 and passes it down to both children',
      },
      {
        type: 'paragraph',
        text: 'Now when you click either button, the count in MyApp will change, which will change both of the counts in MyButton. Here’s how you can express this in code.',
      },
      {
        type: 'paragraph',
        text: 'First, move the state up from MyButton into MyApp:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "export default function MyApp() {\n\n  const [count, setCount] = useState(0);\n\n\n\n  function handleClick() {\n\n    setCount(count + 1);\n\n  }\n\n\n\n  return (\n\n    <div>\n\n      <h1>Counters that update separately</h1>\n\n      <MyButton />\n\n      <MyButton />\n\n    </div>\n\n  );\n\n}\n\n\n\nfunction MyButton() {\n\n  // ... we're moving code from here ...\n\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Then, pass the state down from MyApp to each MyButton, together with the shared click handler. You can pass information to MyButton using the JSX curly braces, just like you previously did with built-in tags like <img>:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'export default function MyApp() {\n\n  const [count, setCount] = useState(0);\n\n\n\n  function handleClick() {\n\n    setCount(count + 1);\n\n  }\n\n\n\n  return (\n\n    <div>\n\n      <h1>Counters that update together</h1>\n\n      <MyButton count={count} onClick={handleClick} />\n\n      <MyButton count={count} onClick={handleClick} />\n\n    </div>\n\n  );\n\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'The information you pass down like this is called props. Now the MyApp component contains the count state and the handleClick event handler, and passes both of them down as props to each of the buttons.',
      },
      {
        type: 'paragraph',
        text: 'Finally, change MyButton to read the props you have passed from its parent component:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'function MyButton({ count, onClick }) {\n\n  return (\n\n    <button onClick={onClick}>\n\n      Clicked {count} times\n\n    </button>\n\n  );\n\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'When you click the button, the onClick handler fires. Each button’s onClick prop was set to the handleClick function inside MyApp, so the code inside of it runs. That code calls setCount(count + 1), incrementing the count state variable. The new count value is passed as a prop to each button, so they all show the new value. This is called “lifting state up”. By moving state up, you’ve shared it between components.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import { useState } from 'react';\n\nexport default function MyApp() {\n  const [count, setCount] = useState(0);\n\n  function handleClick() {\n    setCount(count + 1);\n  }\n\n  return (\n    <div>\n      <h1>Counters that update together</h1>\n      <MyButton count={count} onClick={handleClick} />\n      <MyButton count={count} onClick={handleClick} />\n    </div>\n  );\n}\n\nfunction MyButton({ count, onClick }) {\n  return (\n    <button onClick={onClick}>\n      Clicked {count} times\n    </button>\n  );\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'By now, you know the basics of how to write React code!',
      },
      {
        type: 'paragraph',
        text: 'Check out the Tutorial to put them into practice and build your first mini-app with React.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
