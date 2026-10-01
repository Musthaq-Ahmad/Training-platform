import type { ContentTopic } from '../../../types';

export const reactcontextTopics = {
  reactcontext: {
    id: 'reactcontext',
    heading: 'Passing Data Deeply with Context',
    blocks: [
      {
        type: 'paragraph',
        text: 'Usually, you will pass information from a parent component to a child component via props. But passing props can become verbose and inconvenient if you have to pass them through many components in the middle, or if many components in your app need the same information. Context lets the parent component make some information available to any component in the tree below it—no matter how deep—without passing it explicitly through props.',
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
          'What “prop drilling” is',
          'How to replace repetitive prop passing with context',
          'Common use cases for context',
          'Common alternatives to context',
        ],
      },
      {
        type: 'paragraph',
        text: 'Passing props is a great way to explicitly pipe data through your UI tree to the components that use it.',
      },
      {
        type: 'paragraph',
        text: 'But passing props can become verbose and inconvenient when you need to pass some prop deeply through the tree, or if many components need the same prop. The nearest common ancestor could be far removed from the components that need data, and lifting state up that high can lead to a situation called “prop drilling”.',
      },
      {
        type: 'paragraph',
        text: 'Lifting state up',
      },
      {
        type: 'image',
        src: 'https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fpassing_data_lifting_state.dark.png&w=1920&q=75',
        alt: 'Diagram with a tree of three components. The parent contains a bubble representing a value highlighted in purple. The value flows down to each of the two children, both highlighted in purple.',
      },
      {
        type: 'image',
        src: 'https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fpassing_data_lifting_state.png&w=1920&q=75',
        alt: 'Diagram with a tree of three components. The parent contains a bubble representing a value highlighted in purple. The value flows down to each of the two children, both highlighted in purple.',
      },
      {
        type: 'paragraph',
        text: 'Prop drilling',
      },
      {
        type: 'image',
        src: 'https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fpassing_data_prop_drilling.dark.png&w=1920&q=75',
        alt: 'Diagram with a tree of ten nodes, each node with two children or less. The root node contains a bubble representing a value highlighted in purple. The value flows down through the two children, each of which pass the value but do not contain it. The left child passes the value down to two children which are both highlighted purple. The right child of the root passes the value through to one of its two children - the right one, which is highlighted purple. That child passed the value through its single child, which passes it down to both of its two children, which are highlighted purple.',
      },
      {
        type: 'image',
        src: 'https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fpassing_data_prop_drilling.png&w=1920&q=75',
        alt: 'Diagram with a tree of ten nodes, each node with two children or less. The root node contains a bubble representing a value highlighted in purple. The value flows down through the two children, each of which pass the value but do not contain it. The left child passes the value down to two children which are both highlighted purple. The right child of the root passes the value through to one of its two children - the right one, which is highlighted purple. That child passed the value through its single child, which passes it down to both of its two children, which are highlighted purple.',
      },
      {
        type: 'paragraph',
        text: 'Wouldn’t it be great if there were a way to “teleport” data to the components in the tree that need it without passing props? With React’s context feature, there is!',
      },
      {
        type: 'paragraph',
        text: 'Context lets a parent component provide data to the entire tree below it. There are many uses for context. Here is one example. Consider this Heading component that accepts a level for its size:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import Heading from './Heading.js';\nimport Section from './Section.js';\n\nexport default function Page() {\n  return (\n    <Section>\n      <Heading level={1}>Title</Heading>\n      <Heading level={2}>Heading</Heading>\n      <Heading level={3}>Sub-heading</Heading>\n      <Heading level={4}>Sub-sub-heading</Heading>\n      <Heading level={5}>Sub-sub-sub-heading</Heading>\n      <Heading level={6}>Sub-sub-sub-sub-heading</Heading>\n    </Section>\n  );\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Let’s say you want multiple headings within the same Section to always have the same size:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import Heading from './Heading.js';\nimport Section from './Section.js';\n\nexport default function Page() {\n  return (\n    <Section>\n      <Heading level={1}>Title</Heading>\n      <Section>\n        <Heading level={2}>Heading</Heading>\n        <Heading level={2}>Heading</Heading>\n        <Heading level={2}>Heading</Heading>\n        <Section>\n          <Heading level={3}>Sub-heading</Heading>\n          <Heading level={3}>Sub-heading</Heading>\n          <Heading level={3}>Sub-heading</Heading>\n          <Section>\n            <Heading level={4}>Sub-sub-heading</Heading>\n            <Heading level={4}>Sub-sub-heading</Heading>\n            <Heading level={4}>Sub-sub-heading</Heading>\n          </Section>\n        </Section>\n      </Section>\n    </Section>\n  );\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Currently, you pass the level prop to each <Heading> separately:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: '<Section>\n\n  <Heading level={3}>About</Heading>\n\n  <Heading level={3}>Photos</Heading>\n\n  <Heading level={3}>Videos</Heading>\n\n</Section>',
        },
      },
      {
        type: 'paragraph',
        text: 'It would be nice if you could pass the level prop to the <Section> component instead and remove it from the <Heading>. This way you could enforce that all headings in the same section have the same size:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: '<Section level={3}>\n\n  <Heading>About</Heading>\n\n  <Heading>Photos</Heading>\n\n  <Heading>Videos</Heading>\n\n</Section>',
        },
      },
      {
        type: 'paragraph',
        text: 'But how can the <Heading> component know the level of its closest <Section>? That would require some way for a child to “ask” for data from somewhere above in the tree.',
      },
      {
        type: 'paragraph',
        text: 'You can’t do it with props alone. This is where context comes into play. You will do it in three steps:',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          'Create a context. (You can call it LevelContext, since it’s for the heading level.)',
          'Use that context from the component that needs the data. (Heading will use LevelContext.)',
          'Provide that context from the component that specifies the data. (Section will provide LevelContext.)',
        ],
      },
      {
        type: 'paragraph',
        text: 'Context lets a parent—even a distant one!—provide some data to the entire tree inside of it.',
      },
      {
        type: 'paragraph',
        text: 'Using context in close children',
      },
      {
        type: 'image',
        src: 'https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fpassing_data_context_close.dark.png&w=1920&q=75',
        alt: 'Diagram with a tree of three components. The parent contains a bubble representing a value highlighted in orange which projects down to the two children, each highlighted in orange.',
      },
      {
        type: 'image',
        src: 'https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fpassing_data_context_close.png&w=1920&q=75',
        alt: 'Diagram with a tree of three components. The parent contains a bubble representing a value highlighted in orange which projects down to the two children, each highlighted in orange.',
      },
      {
        type: 'paragraph',
        text: 'Using context in distant children',
      },
      {
        type: 'image',
        src: 'https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fpassing_data_context_far.dark.png&w=1920&q=75',
        alt: 'Diagram with a tree of ten nodes, each node with two children or less. The root parent node contains a bubble representing a value highlighted in orange. The value projects down directly to four leaves and one intermediate component in the tree, which are all highlighted in orange. None of the other intermediate components are highlighted.',
      },
      {
        type: 'image',
        src: 'https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fpassing_data_context_far.png&w=1920&q=75',
        alt: 'Diagram with a tree of ten nodes, each node with two children or less. The root parent node contains a bubble representing a value highlighted in orange. The value projects down directly to four leaves and one intermediate component in the tree, which are all highlighted in orange. None of the other intermediate components are highlighted.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Step 1: Create the context',
      },
      {
        type: 'paragraph',
        text: 'First, you need to create the context. You’ll need to export it from a file so that your components can use it:',
      },
      {
        type: 'code',
        code: {
          filename: 'App.js',
          language: 'jsx',
          code: "import { useState } from 'react';\nimport { places } from './data.js';\nimport { getImageUrl } from './utils.js';\n\nexport default function App() {\n  const [isLarge, setIsLarge] = useState(false);\n  const imageSize = isLarge ? 150 : 100;\n  return (\n    <>\n      <label>\n        <input\n          type=\"checkbox\"\n          checked={isLarge}\n          onChange={e => {\n            setIsLarge(e.target.checked);\n          }}\n        />\n        Use large images\n      </label>\n      <hr />\n      <List imageSize={imageSize} />\n    </>\n  )\n}\n\nfunction List({ imageSize }) {\n  const listItems = places.map(place =>\n    <li key={place.id}>\n      <Place\n        place={place}\n        imageSize={imageSize}\n      />\n    </li>\n  );\n  return <ul>{listItems}</ul>;\n}\n\nfunction Place({ place, imageSize }) {\n  return (\n    <>\n      <PlaceImage\n        place={place}\n        imageSize={imageSize}\n      />\n      <p>\n        <b>{place.name}</b>\n        {': ' + place.description}\n      </p>\n    </>\n  );\n}\n\nfunction PlaceImage({ place, imageSize }) {\n  return (\n    <img\n      src={getImageUrl(place)}\n      alt={place.name}\n      width={imageSize}\n      height={imageSize}\n    />\n  );\n}",
        },
      },
      {
        type: 'code',
        code: {
          filename: 'Section.js',
          language: 'jsx',
          code: 'export default function Section({ children }) {\n  return (\n    <section className="section">\n      {children}\n    </section>\n  );\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'Heading.js',
          language: 'jsx',
          code: "export default function Heading({ level, children }) {\n  switch (level) {\n    case 1:\n      return <h1>{children}</h1>;\n    case 2:\n      return <h2>{children}</h2>;\n    case 3:\n      return <h3>{children}</h3>;\n    case 4:\n      return <h4>{children}</h4>;\n    case 5:\n      return <h5>{children}</h5>;\n    case 6:\n      return <h6>{children}</h6>;\n    default:\n      throw Error('Unknown level: ' + level);\n  }\n}",
        },
      },
      {
        type: 'code',
        code: {
          filename: 'LevelContext.js',
          language: 'jsx',
          code: "import { createContext } from 'react';\n\nexport const LevelContext = createContext(1);",
        },
      },
      {
        type: 'paragraph',
        text: 'The only argument to createContext is the default value. Here, 1 refers to the biggest heading level, but you could pass any kind of value (even an object). You will see the significance of the default value in the next step.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Step 2: Use the context',
      },
      {
        type: 'paragraph',
        text: 'Import the useContext Hook from React and your context:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import { useContext } from 'react';\n\nimport { LevelContext } from './LevelContext.js';",
        },
      },
      {
        type: 'paragraph',
        text: 'Currently, the Heading component reads level from props:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'export default function Heading({ level, children }) {\n\n  // ...\n\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Instead, remove the level prop and read the value from the context you just imported, LevelContext:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'export default function Heading({ children }) {\n\n  const level = useContext(LevelContext);\n\n  // ...\n\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'useContext is a Hook. Just like useState and useReducer, you can only call a Hook immediately inside a React component (not inside loops or conditions). useContext tells React that the Heading component wants to read the LevelContext.',
      },
      {
        type: 'paragraph',
        text: 'Now that the Heading component doesn’t have a level prop, you don’t need to pass the level prop to Heading in your JSX like this anymore:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: '<Section>\n\n  <Heading level={4}>Sub-sub-heading</Heading>\n\n  <Heading level={4}>Sub-sub-heading</Heading>\n\n  <Heading level={4}>Sub-sub-heading</Heading>\n\n</Section>',
        },
      },
      {
        type: 'paragraph',
        text: 'Update the JSX so that it’s the Section that receives it instead:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: '<Section level={4}>\n\n  <Heading>Sub-sub-heading</Heading>\n\n  <Heading>Sub-sub-heading</Heading>\n\n  <Heading>Sub-sub-heading</Heading>\n\n</Section>',
        },
      },
      {
        type: 'paragraph',
        text: 'As a reminder, this is the markup that you were trying to get working:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import Heading from './Heading.js';\nimport Section from './Section.js';\n\nexport default function Page() {\n  return (\n    <Section level={1}>\n      <Heading>Title</Heading>\n      <Section level={2}>\n        <Heading>Heading</Heading>\n        <Heading>Heading</Heading>\n        <Heading>Heading</Heading>\n        <Section level={3}>\n          <Heading>Sub-heading</Heading>\n          <Heading>Sub-heading</Heading>\n          <Heading>Sub-heading</Heading>\n          <Section level={4}>\n            <Heading>Sub-sub-heading</Heading>\n            <Heading>Sub-sub-heading</Heading>\n            <Heading>Sub-sub-heading</Heading>\n          </Section>\n        </Section>\n      </Section>\n    </Section>\n  );\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Notice this example doesn’t quite work, yet! All the headings have the same size because even though you’re using the context, you have not provided it yet. React doesn’t know where to get it!',
      },
      {
        type: 'paragraph',
        text: 'If you don’t provide the context, React will use the default value you’ve specified in the previous step. In this example, you specified 1 as the argument to createContext, so useContext(LevelContext) returns 1, setting all those headings to <h1>. Let’s fix this problem by having each Section provide its own context.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Step 3: Provide the context',
      },
      {
        type: 'paragraph',
        text: 'The Section component currently renders its children:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'export default function Section({ children }) {\n\n  return (\n\n    <section className="section">\n\n      {children}\n\n    </section>\n\n  );\n\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Wrap them with a context provider to provide the LevelContext to them:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'import { LevelContext } from \'./LevelContext.js\';\n\n\n\nexport default function Section({ level, children }) {\n\n  return (\n\n    <section className="section">\n\n      <LevelContext value={level}>\n\n        {children}\n\n      </LevelContext>\n\n    </section>\n\n  );\n\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'This tells React: “if any component inside this <Section> asks for LevelContext, give them this level.” The component will use the value of the nearest <LevelContext> in the UI tree above it.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import Heading from './Heading.js';\nimport Section from './Section.js';\n\nexport default function Page() {\n  return (\n    <Section level={1}>\n      <Heading>Title</Heading>\n      <Section level={2}>\n        <Heading>Heading</Heading>\n        <Heading>Heading</Heading>\n        <Heading>Heading</Heading>\n        <Section level={3}>\n          <Heading>Sub-heading</Heading>\n          <Heading>Sub-heading</Heading>\n          <Heading>Sub-heading</Heading>\n          <Section level={4}>\n            <Heading>Sub-sub-heading</Heading>\n            <Heading>Sub-sub-heading</Heading>\n            <Heading>Sub-sub-heading</Heading>\n          </Section>\n        </Section>\n      </Section>\n    </Section>\n  );\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'It’s the same result as the original code, but you did not need to pass the level prop to each Heading component! Instead, it “figures out” its heading level by asking the closest Section above:',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          'You pass a level prop to the <Section>.',
          'Section wraps its children into <LevelContext value={level}>.',
          'Heading asks the closest value of LevelContext above with useContext(LevelContext).',
        ],
      },
      {
        type: 'paragraph',
        text: 'Currently, you still have to specify each section’s level manually:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'export default function Page() {\n\n  return (\n\n    <Section level={1}>\n\n      ...\n\n      <Section level={2}>\n\n        ...\n\n        <Section level={3}>\n\n          ...',
        },
      },
      {
        type: 'paragraph',
        text: 'Since context lets you read information from a component above, each Section could read the level from the Section above, and pass level + 1 down automatically. Here is how you could do it:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import { useContext } from 'react';\n\nimport { LevelContext } from './LevelContext.js';\n\n\n\nexport default function Section({ children }) {\n\n  const level = useContext(LevelContext);\n\n  return (\n\n    <section className=\"section\">\n\n      <LevelContext value={level + 1}>\n\n        {children}\n\n      </LevelContext>\n\n    </section>\n\n  );\n\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'With this change, you don’t need to pass the level prop either to the <Section> or to the <Heading>:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import Heading from './Heading.js';\nimport Section from './Section.js';\n\nexport default function Page() {\n  return (\n    <Section>\n      <Heading>Title</Heading>\n      <Section>\n        <Heading>Heading</Heading>\n        <Heading>Heading</Heading>\n        <Heading>Heading</Heading>\n        <Section>\n          <Heading>Sub-heading</Heading>\n          <Heading>Sub-heading</Heading>\n          <Heading>Sub-heading</Heading>\n          <Section>\n            <Heading>Sub-sub-heading</Heading>\n            <Heading>Sub-sub-heading</Heading>\n            <Heading>Sub-sub-heading</Heading>\n          </Section>\n        </Section>\n      </Section>\n    </Section>\n  );\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Now both Heading and Section read the LevelContext to figure out how “deep” they are. And the Section wraps its children into the LevelContext to specify that anything inside of it is at a “deeper” level.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Note',
      },
      {
        type: 'paragraph',
        text: 'This example uses heading levels because they show visually how nested components can override context. But context is useful for many other use cases too. You can pass down any information needed by the entire subtree: the current color theme, the currently logged in user, and so on.',
      },
      {
        type: 'paragraph',
        text: 'You can insert as many components as you like between the component that provides context and the one that uses it. This includes both built-in components like <div> and components you might build yourself.',
      },
      {
        type: 'paragraph',
        text: 'In this example, the same Post component (with a dashed border) is rendered at two different nesting levels. Notice that the <Heading> inside of it gets its level automatically from the closest <Section>:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'import Heading from \'./Heading.js\';\nimport Section from \'./Section.js\';\n\nexport default function ProfilePage() {\n  return (\n    <Section>\n      <Heading>My Profile</Heading>\n      <Post\n        title="Hello traveller!"\n        body="Read about my adventures."\n      />\n      <AllPosts />\n    </Section>\n  );\n}\n\nfunction AllPosts() {\n  return (\n    <Section>\n      <Heading>Posts</Heading>\n      <RecentPosts />\n    </Section>\n  );\n}\n\nfunction RecentPosts() {\n  return (\n    <Section>\n      <Heading>Recent Posts</Heading>\n      <Post\n        title="Flavors of Lisbon"\n        body="...those pastéis de nata!"\n      />\n      <Post\n        title="Buenos Aires in the rhythm of tango"\n        body="I loved it!"\n      />\n    </Section>\n  );\n}\n\nfunction Post({ title, body }) {\n  return (\n    <Section isFancy={true}>\n      <Heading>\n        {title}\n      </Heading>\n      <p><i>{body}</i></p>\n    </Section>\n  );\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'You didn’t do anything special for this to work. A Section specifies the context for the tree inside it, so you can insert a <Heading> anywhere, and it will have the correct size. Try it in the sandbox above!',
      },
      {
        type: 'paragraph',
        text: 'Context lets you write components that “adapt to their surroundings” and display themselves differently depending on where (or, in other words, in which context) they are being rendered.',
      },
      {
        type: 'paragraph',
        text: 'How context works might remind you of CSS property inheritance. In CSS, you can specify color: blue for a <div>, and any DOM node inside of it, no matter how deep, will inherit that color unless some other DOM node in the middle overrides it with color: green. Similarly, in React, the only way to override some context coming from above is to wrap children into a context provider with a different value.',
      },
      {
        type: 'paragraph',
        text: 'In CSS, different properties like color and background-color don’t override each other. You can set all <div>’s color to red without impacting background-color. Similarly, different React contexts don’t override each other. Each context that you make with createContext() is completely separate from other ones, and ties together components using and providing that particular context. One component may use or provide many different contexts without a problem.',
      },
      {
        type: 'paragraph',
        text: 'Context is very tempting to use! However, this also means it’s too easy to overuse it. Just because you need to pass some props several levels deep doesn’t mean you should put that information into context.',
      },
      {
        type: 'paragraph',
        text: 'Here’s a few alternatives you should consider before using context:',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          'Start by passing props. If your components are not trivial, it’s not unusual to pass a dozen props down through a dozen components. It may feel like a slog, but it makes it very clear which components use which data! The person maintaining your code will be glad you’ve made the data flow explicit with props.',
          'Extract components and pass JSX as children to them. If you pass some data through many layers of intermediate components that don’t use that data (and only pass it further down), this often means that you forgot to extract some components along the way. For example, maybe you pass data props like posts to visual components that don’t use them directly, like <Layout posts={posts} />. Instead, make Layout take children as a prop, and render <Layout><Posts posts={posts} /></Layout>. This reduces the number of layers between the component specifying the data and the one that needs it.',
        ],
      },
      {
        type: 'paragraph',
        text: 'If neither of these approaches works well for you, consider context.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Theming: If your app lets the user change its appearance (e.g. dark mode), you can put a context provider at the top of your app, and use that context in components that need to adjust their visual look.',
          'Current account: Many components might need to know the currently logged in user. Putting it in context makes it convenient to read it anywhere in the tree. Some apps also let you operate multiple accounts at the same time (e.g. to leave a comment as a different user). In those cases, it can be convenient to wrap a part of the UI into a nested provider with a different current account value.',
          'Routing: Most routing solutions use context internally to hold the current route. This is how every link “knows” whether it’s active or not. If you build your own router, you might want to do it too.',
          'Managing state: As your app grows, you might end up with a lot of state closer to the top of your app. Many distant components below may want to change it. It is common to use a reducer together with context to manage complex state and pass it down to distant components without too much hassle.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Context is not limited to static values. If you pass a different value on the next render, React will update all the components reading it below! This is why context is often used in combination with state.',
      },
      {
        type: 'paragraph',
        text: 'In general, if some information is needed by distant components in different parts of the tree, it’s a good indication that context will help you.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Context lets a component provide some information to the entire tree below it.',
          'To pass context: 1. Create and export it with export const MyContext = createContext(defaultValue). 2. Pass it to the useContext(MyContext) Hook to read it in any child component, no matter how deep. 3. Wrap children into <MyContext value={...}> to provide it from a parent.',
          'Context passes through any components in the middle.',
          'Context lets you write components that “adapt to their surroundings”.',
          'Before you use context, try passing props or passing JSX as children.',
        ],
      },
      {
        type: 'subheading',
        level: 4,
        text: '',
      },
      {
        type: 'paragraph',
        text: 'Challenge',
      },
      {
        type: 'paragraph',
        text: '1',
      },
      {
        type: 'paragraph',
        text: 'of',
      },
      {
        type: 'paragraph',
        text: '1:',
      },
      {
        type: 'paragraph',
        text: 'Replace prop drilling with context',
      },
      {
        type: 'paragraph',
        text: 'In this example, toggling the checkbox changes the imageSize prop passed to each <PlaceImage>. The checkbox state is held in the top-level App component, but each <PlaceImage> needs to be aware of it.',
      },
      {
        type: 'paragraph',
        text: 'Currently, App passes imageSize to List, which passes it to each Place, which passes it to the PlaceImage. Remove the imageSize prop, and instead pass it from the App component directly to PlaceImage.',
      },
      {
        type: 'paragraph',
        text: 'You can declare context in Context.js.',
      },
      {
        type: 'code',
        code: {
          filename: 'App.js',
          language: 'jsx',
          code: "import { useState } from 'react';\nimport { places } from './data.js';\nimport { getImageUrl } from './utils.js';\n\nexport default function App() {\n  const [isLarge, setIsLarge] = useState(false);\n  const imageSize = isLarge ? 150 : 100;\n  return (\n    <>\n      <label>\n        <input\n          type=\"checkbox\"\n          checked={isLarge}\n          onChange={e => {\n            setIsLarge(e.target.checked);\n          }}\n        />\n        Use large images\n      </label>\n      <hr />\n      <List imageSize={imageSize} />\n    </>\n  )\n}\n\nfunction List({ imageSize }) {\n  const listItems = places.map(place =>\n    <li key={place.id}>\n      <Place\n        place={place}\n        imageSize={imageSize}\n      />\n    </li>\n  );\n  return <ul>{listItems}</ul>;\n}\n\nfunction Place({ place, imageSize }) {\n  return (\n    <>\n      <PlaceImage\n        place={place}\n        imageSize={imageSize}\n      />\n      <p>\n        <b>{place.name}</b>\n        {': ' + place.description}\n      </p>\n    </>\n  );\n}\n\nfunction PlaceImage({ place, imageSize }) {\n  return (\n    <img\n      src={getImageUrl(place)}\n      alt={place.name}\n      width={imageSize}\n      height={imageSize}\n    />\n  );\n}",
        },
      },
      {
        type: 'code',
        code: {
          filename: 'Context.js',
          language: 'jsx',
          code: "import { createContext } from 'react';\n\nexport const ImageSizeContext = createContext(500);",
        },
      },
      {
        type: 'code',
        code: {
          filename: 'data.js',
          language: 'jsx',
          code: "export const places = [{\n  id: 0,\n  name: 'Bo-Kaap in Cape Town, South Africa',\n  description: 'The tradition of choosing bright colors for houses began in the late 20th century.',\n  imageId: 'K9HVAGH'\n}, {\n  id: 1,\n  name: 'Rainbow Village in Taichung, Taiwan',\n  description: 'To save the houses from demolition, Huang Yung-Fu, a local resident, painted all 1,200 of them in 1924.',\n  imageId: '9EAYZrt'\n}, {\n  id: 2,\n  name: 'Macromural de Pachuca, Mexico',\n  description: 'One of the largest murals in the world covering homes in a hillside neighborhood.',\n  imageId: 'DgXHVwu'\n}, {\n  id: 3,\n  name: 'Selarón Staircase in Rio de Janeiro, Brazil',\n  description: 'This landmark was created by Jorge Selarón, a Chilean-born artist, as a \"tribute to the Brazilian people.\"',\n  imageId: 'aeO3rpI'\n}, {\n  id: 4,\n  name: 'Burano, Italy',\n  description: 'The houses are painted following a specific color system dating back to 16th century.',\n  imageId: 'kxsph5C'\n}, {\n  id: 5,\n  name: 'Chefchaouen, Marocco',\n  description: 'There are a few theories on why the houses are painted blue, including that the color repels mosquitos or that it symbolizes sky and heaven.',\n  imageId: 'rTqKo46'\n}, {\n  id: 6,\n  name: 'Gamcheon Culture Village in Busan, South Korea',\n  description: 'In 2009, the village was converted into a cultural hub by painting the houses and featuring exhibitions and art installations.',\n  imageId: 'ZfQOOzf'\n}];",
        },
      },
      {
        type: 'code',
        code: {
          filename: 'utils.js',
          language: 'jsx',
          code: "export function getImageUrl(place) {\n  return (\n    'https://react.dev/images/docs/scientists/' +\n    place.imageId +\n    'l.jpg'\n  );\n}",
        },
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
