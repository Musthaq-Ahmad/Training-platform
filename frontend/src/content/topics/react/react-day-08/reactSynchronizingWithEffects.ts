import type { ContentTopic } from '../../../types';

export const reactsynchronizingwitheffectsTopics = {
  reactsynchronizingwitheffects: {
    id: 'reactsynchronizingwitheffects',
    heading: 'Synchronizing with Effects',
    blocks: [
      {
        type: 'paragraph',
        text: 'Some components need to synchronize with external systems. For example, you might want to control a non-React component based on the React state, set up a server connection, or send an analytics log when a component appears on the screen. Effects let you run some code after rendering so that you can synchronize your component with some system outside of React.',
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
          'What Effects are',
          'How Effects are different from events',
          'How to declare an Effect in your component',
          'How to skip re-running an Effect unnecessarily',
          'Why Effects run twice in development and how to fix them',
        ],
      },
      {
        type: 'paragraph',
        text: 'Before getting to Effects, you need to be familiar with two types of logic inside React components:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Rendering code (introduced in Describing the UI) lives at the top level of your component. This is where you take the props and state, transform them, and return the JSX you want to see on the screen. Rendering code must be pure. Like a math formula, it should only calculate the result, but not do anything else.',
          'Event handlers (introduced in Adding Interactivity) are nested functions inside your components that do things rather than just calculate them. An event handler might update an input field, submit an HTTP POST request to buy a product, or navigate the user to another screen. Event handlers contain “side effects” (they change the program’s state) caused by a specific user action (for example, a button click or typing).',
        ],
      },
      {
        type: 'paragraph',
        text: 'Sometimes this isn’t enough. Consider a ChatRoom component that must connect to the chat server whenever it’s visible on the screen. Connecting to a server is not a pure calculation (it’s a side effect) so it can’t happen during rendering. However, there is no single particular event like a click that causes ChatRoom to be displayed.',
      },
      {
        type: 'paragraph',
        text: 'Effects let you specify side effects that are caused by rendering itself, rather than by a particular event. Sending a message in the chat is an event because it is directly caused by the user clicking a specific button. However, setting up a server connection is an Effect because it should happen no matter which interaction caused the component to appear. Effects run at the end of a commit after the screen updates. This is a good time to synchronize the React components with some external system (like network or a third-party library).',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Note',
      },
      {
        type: 'paragraph',
        text: 'Here and later in this text, capitalized “Effect” refers to the React-specific definition above, i.e. a side effect caused by rendering. To refer to the broader programming concept, we’ll say “side effect”.',
      },
      {
        type: 'paragraph',
        text: 'Don’t rush to add Effects to your components. Keep in mind that Effects are typically used to “step out” of your React code and synchronize with some external system. This includes browser APIs, third-party widgets, network, and so on. If your Effect only adjusts some state based on other state, you might not need an Effect.',
      },
      {
        type: 'paragraph',
        text: 'To write an Effect, follow these three steps:',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          'Declare an Effect. By default, your Effect will run after every commit.',
          'Specify the Effect dependencies. Most Effects should only re-run when needed rather than after every render. For example, a fade-in animation should only trigger when a component appears. Connecting and disconnecting to a chat room should only happen when the component appears and disappears, or when the chat room changes. You will learn how to control this by specifying dependencies.',
          'Add cleanup if needed. Some Effects need to specify how to stop, undo, or clean up whatever they were doing. For example, “connect” needs “disconnect”, “subscribe” needs “unsubscribe”, and “fetch” needs either “cancel” or “ignore”. You will learn how to do this by returning a cleanup function.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Let’s look at each of these steps in detail.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Step 1: Declare an Effect',
      },
      {
        type: 'paragraph',
        text: 'To declare an Effect in your component, import the useEffect Hook from React:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import { useEffect } from 'react';",
        },
      },
      {
        type: 'paragraph',
        text: 'Then, call it at the top level of your component and put some code inside your Effect:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'function MyComponent() {\n\n  useEffect(() => {\n\n    // Code here will run after *every* render\n\n  });\n\n  return <div />;\n\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Every time your component renders, React will update the screen and then run the code inside useEffect. In other words, useEffect “delays” a piece of code from running until that render is reflected on the screen.',
      },
      {
        type: 'paragraph',
        text: 'Let’s see how you can use an Effect to synchronize with an external system. Consider a <VideoPlayer> React component. It would be nice to control whether it’s playing or paused by passing an isPlaying prop to it:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: '<VideoPlayer isPlaying={isPlaying} />;',
        },
      },
      {
        type: 'paragraph',
        text: 'Your custom VideoPlayer component renders the built-in browser <video> tag:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'function VideoPlayer({ src, isPlaying }) {\n\n  // TODO: do something with isPlaying\n\n  return <video src={src} />;\n\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'However, the browser <video> tag does not have an isPlaying prop. The only way to control it is to manually call the play() and pause() methods on the DOM element. You need to synchronize the value of isPlaying prop, which tells whether the video should currently be playing, with calls like play() and pause().',
      },
      {
        type: 'paragraph',
        text: 'We’ll need to first get a ref to the <video> DOM node.',
      },
      {
        type: 'paragraph',
        text: 'You might be tempted to try to call play() or pause() during rendering, but that isn’t correct:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import { useState, useRef, useEffect } from 'react';\n\nfunction VideoPlayer({ src, isPlaying }) {\n  const ref = useRef(null);\n\n  if (isPlaying) {\n    ref.current.play();  // Calling these while rendering isn't allowed.\n  } else {\n    ref.current.pause(); // Also, this crashes.\n  }\n\n  return <video ref={ref} src={src} loop playsInline />;\n}\n\nexport default function App() {\n  const [isPlaying, setIsPlaying] = useState(false);\n  return (\n    <>\n      <button onClick={() => setIsPlaying(!isPlaying)}>\n        {isPlaying ? 'Pause' : 'Play'}\n      </button>\n      <VideoPlayer\n        isPlaying={isPlaying}\n        src=\"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4\"\n      />\n    </>\n  );\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'The reason this code isn’t correct is that it tries to do something with the DOM node during rendering. In React, rendering should be a pure calculation of JSX and should not contain side effects like modifying the DOM.',
      },
      {
        type: 'paragraph',
        text: 'Moreover, when VideoPlayer is called for the first time, its DOM does not exist yet! There isn’t a DOM node yet to call play() or pause() on, because React doesn’t know what DOM to create until you return the JSX.',
      },
      {
        type: 'paragraph',
        text: 'The solution here is to wrap the side effect with useEffect to move it out of the rendering calculation:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import { useEffect, useRef } from 'react';\n\n\n\nfunction VideoPlayer({ src, isPlaying }) {\n\n  const ref = useRef(null);\n\n\n\n  useEffect(() => {\n\n    if (isPlaying) {\n\n      ref.current.play();\n\n    } else {\n\n      ref.current.pause();\n\n    }\n\n  });\n\n\n\n  return <video ref={ref} src={src} loop playsInline />;\n\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'By wrapping the DOM update in an Effect, you let React update the screen first. Then your Effect runs.',
      },
      {
        type: 'paragraph',
        text: 'When your VideoPlayer component renders (either the first time or if it re-renders), a few things will happen. First, React will update the screen, ensuring the <video> tag is in the DOM with the right props. Then React will run your Effect. Finally, your Effect will call play() or pause() depending on the value of isPlaying.',
      },
      {
        type: 'paragraph',
        text: 'Press Play/Pause multiple times and see how the video player stays synchronized to the isPlaying value:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import { useState, useRef, useEffect } from 'react';\n\nfunction VideoPlayer({ src, isPlaying }) {\n  const ref = useRef(null);\n\n  useEffect(() => {\n    if (isPlaying) {\n      ref.current.play();\n    } else {\n      ref.current.pause();\n    }\n  });\n\n  return <video ref={ref} src={src} loop playsInline />;\n}\n\nexport default function App() {\n  const [isPlaying, setIsPlaying] = useState(false);\n  return (\n    <>\n      <button onClick={() => setIsPlaying(!isPlaying)}>\n        {isPlaying ? 'Pause' : 'Play'}\n      </button>\n      <VideoPlayer\n        isPlaying={isPlaying}\n        src=\"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4\"\n      />\n    </>\n  );\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'In this example, the “external system” you synchronized to React state was the browser media API. You can use a similar approach to wrap legacy non-React code (like jQuery plugins) into declarative React components.',
      },
      {
        type: 'paragraph',
        text: 'Note that controlling a video player is much more complex in practice. Calling play() may fail, the user might play or pause using the built-in browser controls, and so on. This example is very simplified and incomplete.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Pitfall',
      },
      {
        type: 'paragraph',
        text: 'By default, Effects run after every render. This is why code like this will produce an infinite loop:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'const [count, setCount] = useState(0);\n\nuseEffect(() => {\n\n  setCount(count + 1);\n\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'Effects run as a result of rendering. Setting state triggers rendering. Setting state immediately in an Effect is like plugging a power outlet into itself. The Effect runs, it sets the state, which causes a re-render, which causes the Effect to run, it sets the state again, this causes another re-render, and so on.',
      },
      {
        type: 'paragraph',
        text: 'Effects should usually synchronize your components with an external system. If there’s no external system and you only want to adjust some state based on other state, you might not need an Effect.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Step 2: Specify the Effect dependencies',
      },
      {
        type: 'paragraph',
        text: 'By default, Effects run after every render. Often, this is not what you want:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Sometimes, it’s slow. Synchronizing with an external system is not always instant, so you might want to skip doing it unless it’s necessary. For example, you don’t want to reconnect to the chat server on every keystroke.',
          'Sometimes, it’s wrong. For example, you don’t want to trigger a component fade-in animation on every keystroke. The animation should only play once when the component appears for the first time.',
        ],
      },
      {
        type: 'paragraph',
        text: 'To demonstrate the issue, here is the previous example with a few console.log calls and a text input that updates the parent component’s state. Notice how typing causes the Effect to re-run:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import { useState, useRef, useEffect } from 'react';\n\nfunction VideoPlayer({ src, isPlaying }) {\n  const ref = useRef(null);\n\n  useEffect(() => {\n    if (isPlaying) {\n      console.log('Calling video.play()');\n      ref.current.play();\n    } else {\n      console.log('Calling video.pause()');\n      ref.current.pause();\n    }\n  });\n\n  return <video ref={ref} src={src} loop playsInline />;\n}\n\nexport default function App() {\n  const [isPlaying, setIsPlaying] = useState(false);\n  const [text, setText] = useState('');\n  return (\n    <>\n      <input value={text} onChange={e => setText(e.target.value)} />\n      <button onClick={() => setIsPlaying(!isPlaying)}>\n        {isPlaying ? 'Pause' : 'Play'}\n      </button>\n      <VideoPlayer\n        isPlaying={isPlaying}\n        src=\"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4\"\n      />\n    </>\n  );\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'You can tell React to skip unnecessarily re-running the Effect by specifying an array of dependencies as the second argument to the useEffect call. Start by adding an empty [] array to the above example on line 14:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: '  useEffect(() => {\n\n    // ...\n\n  }, []);',
        },
      },
      {
        type: 'paragraph',
        text: "You should see an error saying React Hook useEffect has a missing dependency: 'isPlaying':",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import { useState, useRef, useEffect } from 'react';\n\nfunction VideoPlayer({ src, isPlaying }) {\n  const ref = useRef(null);\n\n  useEffect(() => {\n    if (isPlaying) {\n      console.log('Calling video.play()');\n      ref.current.play();\n    } else {\n      console.log('Calling video.pause()');\n      ref.current.pause();\n    }\n  }, []); // This causes an error\n\n  return <video ref={ref} src={src} loop playsInline />;\n}\n\nexport default function App() {\n  const [isPlaying, setIsPlaying] = useState(false);\n  const [text, setText] = useState('');\n  return (\n    <>\n      <input value={text} onChange={e => setText(e.target.value)} />\n      <button onClick={() => setIsPlaying(!isPlaying)}>\n        {isPlaying ? 'Pause' : 'Play'}\n      </button>\n      <VideoPlayer\n        isPlaying={isPlaying}\n        src=\"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4\"\n      />\n    </>\n  );\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'The problem is that the code inside of your Effect depends on the isPlaying prop to decide what to do, but this dependency was not explicitly declared. To fix this issue, add isPlaying to the dependency array:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "  useEffect(() => {\n\n    if (isPlaying) { // It's used here...\n\n      // ...\n\n    } else {\n\n      // ...\n\n    }\n\n  }, [isPlaying]); // ...so it must be declared here!",
        },
      },
      {
        type: 'paragraph',
        text: 'Now all dependencies are declared, so there is no error. Specifying [isPlaying] as the dependency array tells React that it should skip re-running your Effect if isPlaying is the same as it was during the previous render. With this change, typing into the input doesn’t cause the Effect to re-run, but pressing Play/Pause does:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import { useState, useRef, useEffect } from 'react';\n\nfunction VideoPlayer({ src, isPlaying }) {\n  const ref = useRef(null);\n\n  useEffect(() => {\n    if (isPlaying) {\n      console.log('Calling video.play()');\n      ref.current.play();\n    } else {\n      console.log('Calling video.pause()');\n      ref.current.pause();\n    }\n  }, [isPlaying]);\n\n  return <video ref={ref} src={src} loop playsInline />;\n}\n\nexport default function App() {\n  const [isPlaying, setIsPlaying] = useState(false);\n  const [text, setText] = useState('');\n  return (\n    <>\n      <input value={text} onChange={e => setText(e.target.value)} />\n      <button onClick={() => setIsPlaying(!isPlaying)}>\n        {isPlaying ? 'Pause' : 'Play'}\n      </button>\n      <VideoPlayer\n        isPlaying={isPlaying}\n        src=\"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4\"\n      />\n    </>\n  );\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'The dependency array can contain multiple dependencies. React will only skip re-running the Effect if all of the dependencies you specify have exactly the same values as they had during the previous render. React compares the dependency values using the Object.is comparison. See the useEffect reference for details.',
      },
      {
        type: 'paragraph',
        text: 'Notice that you can’t “choose” your dependencies. You will get a lint error if the dependencies you specified don’t match what React expects based on the code inside your Effect. This helps catch many bugs in your code. If you don’t want some code to re-run, edit the Effect code itself to not “need” that dependency.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Pitfall',
      },
      {
        type: 'paragraph',
        text: 'The behaviors without the dependency array and with an empty [] dependency array are different:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'useEffect(() => {\n\n  // This runs after every render\n\n});\n\n\n\nuseEffect(() => {\n\n  // This runs only on mount (when the component appears)\n\n}, []);\n\n\n\nuseEffect(() => {\n\n  // This runs on mount *and also* if either a or b have changed since the last render\n\n}, [a, b]);',
        },
      },
      {
        type: 'paragraph',
        text: 'We’ll take a close look at what “mount” means in the next step.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'Deep Dive',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Why was the ref omitted from the dependency array?',
      },
      {
        type: 'paragraph',
        text: 'This Effect uses both ref and isPlaying, but only isPlaying is declared as a dependency:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'function VideoPlayer({ src, isPlaying }) {\n\n  const ref = useRef(null);\n\n  useEffect(() => {\n\n    if (isPlaying) {\n\n      ref.current.play();\n\n    } else {\n\n      ref.current.pause();\n\n    }\n\n  }, [isPlaying]);',
        },
      },
      {
        type: 'paragraph',
        text: 'This is because the ref object has a stable identity: React guarantees you’ll always get the same object from the same useRef call on every render. It never changes, so it will never by itself cause the Effect to re-run. Therefore, it does not matter whether you include it or not. Including it is fine too:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'function VideoPlayer({ src, isPlaying }) {\n\n  const ref = useRef(null);\n\n  useEffect(() => {\n\n    if (isPlaying) {\n\n      ref.current.play();\n\n    } else {\n\n      ref.current.pause();\n\n    }\n\n  }, [isPlaying, ref]);',
        },
      },
      {
        type: 'paragraph',
        text: 'The set functions returned by useState also have stable identity, so you will often see them omitted from the dependencies too. If the linter lets you omit a dependency without errors, it is safe to do.',
      },
      {
        type: 'paragraph',
        text: 'Omitting always-stable dependencies only works when the linter can “see” that the object is stable. For example, if ref was passed from a parent component, you would have to specify it in the dependency array. However, this is good because you can’t know whether the parent component always passes the same ref, or passes one of several refs conditionally. So your Effect would depend on which ref is passed.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Step 3: Add cleanup if needed',
      },
      {
        type: 'paragraph',
        text: 'Consider a different example. You’re writing a ChatRoom component that needs to connect to the chat server when it appears. You are given a createConnection() API that returns an object with connect() and disconnect() methods. How do you keep the component connected while it is displayed to the user?',
      },
      {
        type: 'paragraph',
        text: 'Start by writing the Effect logic:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'useEffect(() => {\n\n  const connection = createConnection();\n\n  connection.connect();\n\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'It would be slow to connect to the chat after every re-render, so you add the dependency array:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'useEffect(() => {\n\n  const connection = createConnection();\n\n  connection.connect();\n\n}, []);',
        },
      },
      {
        type: 'paragraph',
        text: 'The code inside the Effect does not use any props or state, so your dependency array is [] (empty). This tells React to only run this code when the component “mounts”, i.e. appears on the screen for the first time.',
      },
      {
        type: 'paragraph',
        text: 'Let’s try running this code:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import { useEffect } from 'react';\nimport { createConnection } from './chat.js';\n\nexport default function ChatRoom() {\n  useEffect(() => {\n    const connection = createConnection();\n    connection.connect();\n  }, []);\n  return <h1>Welcome to the chat!</h1>;\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'This Effect only runs on mount, so you might expect "✅ Connecting..." to be printed once in the console. However, if you check the console, "✅ Connecting..." gets printed twice. Why does it happen?',
      },
      {
        type: 'paragraph',
        text: 'Imagine the ChatRoom component is a part of a larger app with many different screens. The user starts their journey on the ChatRoom page. The component mounts and calls connection.connect(). Then imagine the user navigates to another screen—for example, to the Settings page. The ChatRoom component unmounts. Finally, the user clicks Back and ChatRoom mounts again. This would set up a second connection—but the first connection was never destroyed! As the user navigates across the app, the connections would keep piling up.',
      },
      {
        type: 'paragraph',
        text: 'Bugs like this are easy to miss without extensive manual testing. To help you spot them quickly, in development React remounts every component once immediately after its initial mount.',
      },
      {
        type: 'paragraph',
        text: 'Seeing the "✅ Connecting..." log twice helps you notice the real issue: your code doesn’t close the connection when the component unmounts.',
      },
      {
        type: 'paragraph',
        text: 'To fix the issue, return a cleanup function from your Effect:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: '  useEffect(() => {\n\n    const connection = createConnection();\n\n    connection.connect();\n\n    return () => {\n\n      connection.disconnect();\n\n    };\n\n  }, []);',
        },
      },
      {
        type: 'paragraph',
        text: 'React will call your cleanup function each time before the Effect runs again, and one final time when the component unmounts (gets removed). Let’s see what happens when the cleanup function is implemented:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import { useState, useEffect } from 'react';\nimport { createConnection } from './chat.js';\n\nexport default function ChatRoom() {\n  useEffect(() => {\n    const connection = createConnection();\n    connection.connect();\n    return () => connection.disconnect();\n  }, []);\n  return <h1>Welcome to the chat!</h1>;\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Now you get three console logs in development:',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: ['"✅ Connecting..."', '"❌ Disconnected."', '"✅ Connecting..."'],
      },
      {
        type: 'paragraph',
        text: 'This is the correct behavior in development. By remounting your component, React verifies that navigating away and back would not break your code. Disconnecting and then connecting again is exactly what should happen! When you implement the cleanup well, there should be no user-visible difference between running the Effect once vs running it, cleaning it up, and running it again. There’s an extra connect/disconnect call pair because React is probing your code for bugs in development. This is normal—don’t try to make it go away!',
      },
      {
        type: 'paragraph',
        text: 'In production, you would only see "✅ Connecting..." printed once. Remounting components only happens in development to help you find Effects that need cleanup. You can turn off Strict Mode to opt out of the development behavior, but we recommend keeping it on. This lets you find many bugs like the one above.',
      },
      {
        type: 'paragraph',
        text: 'React intentionally remounts your components in development to find bugs like in the last example. The right question isn’t “how to run an Effect once”, but “how to fix my Effect so that it works after remounting”.',
      },
      {
        type: 'paragraph',
        text: 'Usually, the answer is to implement the cleanup function. The cleanup function should stop or undo whatever the Effect was doing. The rule of thumb is that the user shouldn’t be able to distinguish between the Effect running once (as in production) and a setup → cleanup → setup sequence (as you’d see in development).',
      },
      {
        type: 'paragraph',
        text: 'Most of the Effects you’ll write will fit into one of the common patterns below.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Pitfall',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Don’t use refs to prevent Effects from firing',
      },
      {
        type: 'paragraph',
        text: 'A common pitfall for preventing Effects firing twice in development is to use a ref to prevent the Effect from running more than once. For example, you could “fix” the above bug with a useRef:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: '  const connectionRef = useRef(null);\n\n  useEffect(() => {\n\n    // 🚩 This wont fix the bug!!!\n\n    if (!connectionRef.current) {\n\n      connectionRef.current = createConnection();\n\n      connectionRef.current.connect();\n\n    }\n\n  }, []);',
        },
      },
      {
        type: 'paragraph',
        text: 'This makes it so you only see "✅ Connecting..." once in development, but it doesn’t fix the bug.',
      },
      {
        type: 'paragraph',
        text: 'When the user navigates away, the connection still isn’t closed and when they navigate back, a new connection is created. As the user navigates across the app, the connections would keep piling up, the same as it would before the “fix”.',
      },
      {
        type: 'paragraph',
        text: 'To fix the bug, it is not enough to just make the Effect run once. The effect needs to work after re-mounting, which means the connection needs to be cleaned up like in the solution above.',
      },
      {
        type: 'paragraph',
        text: 'See the examples below for how to handle common patterns.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Controlling non-React widgets',
      },
      {
        type: 'paragraph',
        text: 'Sometimes you need to add UI widgets that aren’t written in React. For example, let’s say you’re adding a map component to your page. It has a setZoomLevel() method, and you’d like to keep the zoom level in sync with a zoomLevel state variable in your React code. Your Effect would look similar to this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'useEffect(() => {\n\n  const map = mapRef.current;\n\n  map.setZoomLevel(zoomLevel);\n\n}, [zoomLevel]);',
        },
      },
      {
        type: 'paragraph',
        text: 'Note that there is no cleanup needed in this case. In development, React will call the Effect twice, but this is not a problem because calling setZoomLevel twice with the same value does not do anything. It may be slightly slower, but this doesn’t matter because it won’t remount needlessly in production.',
      },
      {
        type: 'paragraph',
        text: 'Some APIs may not allow you to call them twice in a row. For example, the showModal method of the built-in <dialog> element throws if you call it twice. Implement the cleanup function and make it close the dialog:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'useEffect(() => {\n\n  const dialog = dialogRef.current;\n\n  dialog.showModal();\n\n  return () => dialog.close();\n\n}, []);',
        },
      },
      {
        type: 'paragraph',
        text: 'In development, your Effect will call showModal(), then immediately close(), and then showModal() again. This has the same user-visible behavior as calling showModal() once, as you would see in production.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Subscribing to events',
      },
      {
        type: 'paragraph',
        text: 'If your Effect subscribes to something, the cleanup function should unsubscribe:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "useEffect(() => {\n\n  function handleScroll(e) {\n\n    console.log(window.scrollX, window.scrollY);\n\n  }\n\n  window.addEventListener('scroll', handleScroll);\n\n  return () => window.removeEventListener('scroll', handleScroll);\n\n}, []);",
        },
      },
      {
        type: 'paragraph',
        text: 'In development, your Effect will call addEventListener(), then immediately removeEventListener(), and then addEventListener() again with the same handler. So there would be only one active subscription at a time. This has the same user-visible behavior as calling addEventListener() once, as in production.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Triggering animations',
      },
      {
        type: 'paragraph',
        text: 'If your Effect animates something in, the cleanup function should reset the animation to the initial values:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'useEffect(() => {\n\n  const node = ref.current;\n\n  node.style.opacity = 1; // Trigger the animation\n\n  return () => {\n\n    node.style.opacity = 0; // Reset to the initial value\n\n  };\n\n}, []);',
        },
      },
      {
        type: 'paragraph',
        text: 'In development, opacity will be set to 1, then to 0, and then to 1 again. This should have the same user-visible behavior as setting it to 1 directly, which is what would happen in production. If you use a third-party animation library with support for tweening, your cleanup function should reset the timeline to its initial state.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Fetching data',
      },
      {
        type: 'paragraph',
        text: 'If your Effect fetches something, the cleanup function should either abort the fetch or ignore its result:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'useEffect(() => {\n\n  let ignore = false;\n\n\n\n  async function startFetching() {\n\n    const json = await fetchTodos(userId);\n\n    if (!ignore) {\n\n      setTodos(json);\n\n    }\n\n  }\n\n\n\n  startFetching();\n\n\n\n  return () => {\n\n    ignore = true;\n\n  };\n\n}, [userId]);',
        },
      },
      {
        type: 'paragraph',
        text: "You can’t “undo” a network request that already happened, but your cleanup function should ensure that the fetch that’s not relevant anymore does not keep affecting your application. If the userId changes from 'Alice' to 'Bob', cleanup ensures that the 'Alice' response is ignored even if it arrives after 'Bob'.",
      },
      {
        type: 'paragraph',
        text: 'In development, you will see two fetches in the Network tab. There is nothing wrong with that. With the approach above, the first Effect will immediately get cleaned up so its copy of the ignore variable will be set to true. So even though there is an extra request, it won’t affect the state thanks to the if (!ignore) check.',
      },
      {
        type: 'paragraph',
        text: 'In production, there will only be one request. If the second request in development is bothering you, the best approach is to use a solution that deduplicates requests and caches their responses between components:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'function TodoList() {\n\n  const todos = useSomeDataLibrary(`/api/user/${userId}/todos`);\n\n  // ...',
        },
      },
      {
        type: 'paragraph',
        text: 'This will not only improve the development experience, but also make your application feel faster. For example, the user pressing the Back button won’t have to wait for some data to load again because it will be cached. You can either build such a cache yourself or use one of the many alternatives to manual fetching in Effects.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'Deep Dive',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'What are good alternatives to data fetching in Effects?',
      },
      {
        type: 'paragraph',
        text: 'Writing fetch calls inside Effects is a popular way to fetch data, especially in fully client-side apps. This is, however, a very manual approach and it has significant downsides:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Effects don’t run on the server. This means that the initial server-rendered HTML will only include a loading state with no data. The client computer will have to download all JavaScript and render your app only to discover that now it needs to load the data. This is not very efficient.',
          'Fetching directly in Effects makes it easy to create “network waterfalls”. You render the parent component, it fetches some data, renders the child components, and then they start fetching their data. If the network is not very fast, this is significantly slower than fetching all data in parallel.',
          'Fetching directly in Effects usually means you don’t preload or cache data. For example, if the component unmounts and then mounts again, it would have to fetch the data again.',
          'It’s not very ergonomic. There’s quite a bit of boilerplate code involved when writing fetch calls in a way that doesn’t suffer from bugs like race conditions.',
        ],
      },
      {
        type: 'paragraph',
        text: 'This list of downsides is not specific to React. It applies to fetching data on mount with any library. Like with routing, data fetching is not trivial to do well, so we recommend the following approaches:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'If you use a framework, use its built-in data fetching mechanism. Modern React frameworks have integrated data fetching mechanisms that are efficient and don’t suffer from the above pitfalls.',
          'Otherwise, consider using or building a client-side cache. Popular open source solutions include TanStack Query, useSWR, and React Router 6.4+. You can build your own solution too, in which case you would use Effects under the hood, but add logic for deduplicating requests, caching responses, and avoiding network waterfalls (by preloading data or hoisting data requirements to routes).',
        ],
      },
      {
        type: 'paragraph',
        text: 'You can continue fetching data directly in Effects if neither of these approaches suit you.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Sending analytics',
      },
      {
        type: 'paragraph',
        text: 'Consider this code that sends an analytics event on the page visit:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'useEffect(() => {\n\n  logVisit(url); // Sends a POST request\n\n}, [url]);',
        },
      },
      {
        type: 'paragraph',
        text: 'In development, logVisit will be called twice for every URL, so you might be tempted to try to fix that. We recommend keeping this code as is. Like with earlier examples, there is no user-visible behavior difference between running it once and running it twice. From a practical point of view, logVisit should not do anything in development because you don’t want the logs from the development machines to skew the production metrics. Your component remounts every time you save its file, so it logs extra visits in development anyway.',
      },
      {
        type: 'paragraph',
        text: 'In production, there will be no duplicate visit logs.',
      },
      {
        type: 'paragraph',
        text: 'To debug the analytics events you’re sending, you can deploy your app to a staging environment (which runs in production mode) or temporarily opt out of Strict Mode and its development-only remounting checks. You may also send analytics from the route change event handlers instead of Effects. For more precise analytics, intersection observers can help track which components are in the viewport and how long they remain visible.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Not an Effect: Initializing the application',
      },
      {
        type: 'paragraph',
        text: 'Some logic should only run once when the application starts. You can put it outside your components:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "if (typeof window !== 'undefined') { // Check if we're running in the browser.\n\n  checkAuthToken();\n\n  loadDataFromLocalStorage();\n\n}\n\n\n\nfunction App() {\n\n  // ...\n\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'This guarantees that such logic only runs once after the browser loads the page.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Not an Effect: Buying a product',
      },
      {
        type: 'paragraph',
        text: 'Sometimes, even if you write a cleanup function, there’s no way to prevent user-visible consequences of running the Effect twice. For example, maybe your Effect sends a POST request like buying a product:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "useEffect(() => {\n\n  // 🔴 Wrong: This Effect fires twice in development, exposing a problem in the code.\n\n  fetch('/api/buy', { method: 'POST' });\n\n}, []);",
        },
      },
      {
        type: 'paragraph',
        text: 'You wouldn’t want to buy the product twice. However, this is also why you shouldn’t put this logic in an Effect. What if the user goes to another page and then presses Back? Your Effect would run again. You don’t want to buy the product when the user visits a page; you want to buy it when the user clicks the Buy button.',
      },
      {
        type: 'paragraph',
        text: 'Buying is not caused by rendering; it’s caused by a specific interaction. It should run only when the user presses the button. Delete the Effect and move your /api/buy request into the Buy button event handler:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "  function handleClick() {\n\n    // ✅ Buying is an event because it is caused by a particular interaction.\n\n    fetch('/api/buy', { method: 'POST' });\n\n  }",
        },
      },
      {
        type: 'paragraph',
        text: 'This illustrates that if remounting breaks the logic of your application, this usually uncovers existing bugs. From a user’s perspective, visiting a page shouldn’t be different from visiting it, clicking a link, then pressing Back to view the page again. React verifies that your components abide by this principle by remounting them once in development.',
      },
      {
        type: 'paragraph',
        text: 'This playground can help you “get a feel” for how Effects work in practice.',
      },
      {
        type: 'paragraph',
        text: 'This example uses setTimeout to schedule a console log with the input text to appear three seconds after the Effect runs. The cleanup function cancels the pending timeout. Start by pressing “Mount the component”:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import { useState, useEffect } from 'react';\n\nfunction Playground() {\n  const [text, setText] = useState('a');\n\n  useEffect(() => {\n    function onTimeout() {\n      console.log('⏰ ' + text);\n    }\n\n    console.log('🔵 Schedule \"' + text + '\" log');\n    const timeoutId = setTimeout(onTimeout, 3000);\n\n    return () => {\n      console.log('🟡 Cancel \"' + text + '\" log');\n      clearTimeout(timeoutId);\n    };\n  }, [text]);\n\n  return (\n    <>\n      <label>\n        What to log:{' '}\n        <input\n          value={text}\n          onChange={e => setText(e.target.value)}\n        />\n      </label>\n      <h1>{text}</h1>\n    </>\n  );\n}\n\nexport default function App() {\n  const [show, setShow] = useState(false);\n  return (\n    <>\n      <button onClick={() => setShow(!show)}>\n        {show ? 'Unmount' : 'Mount'} the component\n      </button>\n      {show && <hr />}\n      {show && <Playground />}\n    </>\n  );\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'You will see three logs at first: Schedule "a" log, Cancel "a" log, and Schedule "a" log again. Three second later there will also be a log saying a. As you learned earlier, the extra schedule/cancel pair is because React remounts the component once in development to verify that you’ve implemented cleanup well.',
      },
      {
        type: 'paragraph',
        text: 'Now edit the input to say abc. If you do it fast enough, you’ll see Schedule "ab" log immediately followed by Cancel "ab" log and Schedule "abc" log. React always cleans up the previous render’s Effect before the next render’s Effect. This is why even if you type into the input fast, there is at most one timeout scheduled at a time. Edit the input a few times and watch the console to get a feel for how Effects get cleaned up.',
      },
      {
        type: 'paragraph',
        text: 'Type something into the input and then immediately press “Unmount the component”. Notice how unmounting cleans up the last render’s Effect. Here, it clears the last timeout before it has a chance to fire.',
      },
      {
        type: 'paragraph',
        text: 'Finally, edit the component above and comment out the cleanup function so that the timeouts don’t get cancelled. Try typing abcde fast. What do you expect to happen in three seconds? Will console.log(text) inside the timeout print the latest text and produce five abcde logs? Give it a try to check your intuition!',
      },
      {
        type: 'paragraph',
        text: "Three seconds later, you should see a sequence of logs (a, ab, abc, abcd, and abcde) rather than five abcde logs. Each Effect “captures” the text value from its corresponding render. It doesn’t matter that the text state changed: an Effect from the render with text = 'ab' will always see 'ab'. In other words, Effects from each render are isolated from each other. If you’re curious how this works, you can read about closures.",
      },
      {
        type: 'subheading',
        level: 5,
        text: 'Deep Dive',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Each render has its own Effects',
      },
      {
        type: 'paragraph',
        text: 'You can think of useEffect as “attaching” a piece of behavior to the render output. Consider this Effect:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'export default function ChatRoom({ roomId }) {\n\n  useEffect(() => {\n\n    const connection = createConnection(roomId);\n\n    connection.connect();\n\n    return () => connection.disconnect();\n\n  }, [roomId]);\n\n\n\n  return <h1>Welcome to {roomId}!</h1>;\n\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Let’s see what exactly happens as the user navigates around the app.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Initial render',
      },
      {
        type: 'paragraph',
        text: 'The user visits <ChatRoom roomId="general" />. Let’s mentally substitute roomId with \'general\':',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: '  // JSX for the first render (roomId = "general")\n\n  return <h1>Welcome to general!</h1>;',
        },
      },
      {
        type: 'paragraph',
        text: 'The Effect is also a part of the rendering output. The first render’s Effect becomes:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: '  // Effect for the first render (roomId = "general")\n\n  () => {\n\n    const connection = createConnection(\'general\');\n\n    connection.connect();\n\n    return () => connection.disconnect();\n\n  },\n\n  // Dependencies for the first render (roomId = "general")\n\n  [\'general\']',
        },
      },
      {
        type: 'paragraph',
        text: "React runs this Effect, which connects to the 'general' chat room.",
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Re-render with same dependencies',
      },
      {
        type: 'paragraph',
        text: 'Let’s say <ChatRoom roomId="general" /> re-renders. The JSX output is the same:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: '  // JSX for the second render (roomId = "general")\n\n  return <h1>Welcome to general!</h1>;',
        },
      },
      {
        type: 'paragraph',
        text: 'React sees that the rendering output has not changed, so it doesn’t update the DOM.',
      },
      {
        type: 'paragraph',
        text: 'The Effect from the second render looks like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: '  // Effect for the second render (roomId = "general")\n\n  () => {\n\n    const connection = createConnection(\'general\');\n\n    connection.connect();\n\n    return () => connection.disconnect();\n\n  },\n\n  // Dependencies for the second render (roomId = "general")\n\n  [\'general\']',
        },
      },
      {
        type: 'paragraph',
        text: "React compares ['general'] from the second render with ['general'] from the first render. Because all dependencies are the same, React ignores the Effect from the second render. It never gets called.",
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Re-render with different dependencies',
      },
      {
        type: 'paragraph',
        text: 'Then, the user visits <ChatRoom roomId="travel" />. This time, the component returns different JSX:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: '  // JSX for the third render (roomId = "travel")\n\n  return <h1>Welcome to travel!</h1>;',
        },
      },
      {
        type: 'paragraph',
        text: 'React updates the DOM to change "Welcome to general" into "Welcome to travel".',
      },
      {
        type: 'paragraph',
        text: 'The Effect from the third render looks like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: '  // Effect for the third render (roomId = "travel")\n\n  () => {\n\n    const connection = createConnection(\'travel\');\n\n    connection.connect();\n\n    return () => connection.disconnect();\n\n  },\n\n  // Dependencies for the third render (roomId = "travel")\n\n  [\'travel\']',
        },
      },
      {
        type: 'paragraph',
        text: "React compares ['travel'] from the third render with ['general'] from the second render. One dependency is different: Object.is('travel', 'general') is false. The Effect can’t be skipped.",
      },
      {
        type: 'paragraph',
        text: "Before React can apply the Effect from the third render, it needs to clean up the last Effect that did run. The second render’s Effect was skipped, so React needs to clean up the first render’s Effect. If you scroll up to the first render, you’ll see that its cleanup calls disconnect() on the connection that was created with createConnection('general'). This disconnects the app from the 'general' chat room.",
      },
      {
        type: 'paragraph',
        text: "After that, React runs the third render’s Effect. It connects to the 'travel' chat room.",
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Unmount',
      },
      {
        type: 'paragraph',
        text: "Finally, let’s say the user navigates away, and the ChatRoom component unmounts. React runs the last Effect’s cleanup function. The last Effect was from the third render. The third render’s cleanup destroys the createConnection('travel') connection. So the app disconnects from the 'travel' room.",
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Development-only behaviors',
      },
      {
        type: 'paragraph',
        text: 'When Strict Mode is on, React remounts every component once after mount (state and DOM are preserved). This helps you find Effects that need cleanup and exposes bugs like race conditions early. Additionally, React will remount the Effects whenever you save a file in development. Both of these behaviors are development-only.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Unlike events, Effects are caused by rendering itself rather than a particular interaction.',
          'Effects let you synchronize a component with some external system (third-party API, network, etc).',
          'By default, Effects run after every render (including the initial one).',
          'React will skip the Effect if all of its dependencies have the same values as during the last render.',
          'You can’t “choose” your dependencies. They are determined by the code inside the Effect.',
          'Empty dependency array ([]) corresponds to the component “mounting”, i.e. being added to the screen.',
          'In Strict Mode, React mounts components twice (in development only!) to stress-test your Effects.',
          'If your Effect breaks because of remounting, you need to implement a cleanup function.',
          'React will call your cleanup function before the Effect runs next time, and during the unmount.',
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
        text: '4:',
      },
      {
        type: 'paragraph',
        text: 'Focus a field on mount',
      },
      {
        type: 'paragraph',
        text: 'In this example, the form renders a <MyInput /> component.',
      },
      {
        type: 'paragraph',
        text: 'Use the input’s focus() method to make MyInput automatically focus when it appears on the screen. There is already a commented out implementation, but it doesn’t quite work. Figure out why it doesn’t work, and fix it. (If you’re familiar with the autoFocus attribute, pretend that it does not exist: we are reimplementing the same functionality from scratch.)',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import { useEffect, useRef } from 'react';\n\nexport default function MyInput({ value, onChange }) {\n  const ref = useRef(null);\n\n  // TODO: This doesn't quite work. Fix it.\n  // ref.current.focus()\n\n  return (\n    <input\n      ref={ref}\n      value={value}\n      onChange={onChange}\n    />\n  );\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'To verify that your solution works, press “Show form” and verify that the input receives focus (becomes highlighted and the cursor is placed inside). Press “Hide form” and “Show form” again. Verify the input is highlighted again.',
      },
      {
        type: 'paragraph',
        text: 'MyInput should only focus on mount rather than after every render. To verify that the behavior is right, press “Show form” and then repeatedly press the “Make it uppercase” checkbox. Clicking the checkbox should not focus the input above it.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
