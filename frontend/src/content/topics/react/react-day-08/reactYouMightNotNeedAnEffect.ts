import type { ContentTopic } from '../../../types';

export const reactyoumightnotneedaneffectTopics = {
  reactyoumightnotneedaneffect: {
    id: 'reactyoumightnotneedaneffect',
    heading: 'You Might Not Need an Effect',
    blocks: [
      {
        type: 'paragraph',
        text: 'Effects are an escape hatch from the React paradigm. They let you “step outside” of React and synchronize your components with some external system like a non-React widget, network, or the browser DOM. If there is no external system involved (for example, if you want to update a component’s state when some props or state change), you shouldn’t need an Effect. Removing unnecessary Effects will make your code easier to follow, faster to run, and less error-prone.',
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
          'Why and how to remove unnecessary Effects from your components',
          'How to cache expensive computations without Effects',
          'How to reset and adjust component state without Effects',
          'How to share logic between event handlers',
          'Which logic should be moved to event handlers',
          'How to notify parent components about changes',
        ],
      },
      {
        type: 'paragraph',
        text: 'There are two common cases in which you don’t need Effects:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'You don’t need Effects to transform data for rendering. For example, let’s say you want to filter a list before displaying it. You might feel tempted to write an Effect that updates a state variable when the list changes. However, this is inefficient. When you update the state, React will first call your component functions to calculate what should be on the screen. Then React will “commit” these changes to the DOM, updating the screen. Then React will run your Effects. If your Effect also immediately updates the state, this restarts the whole process from scratch! To avoid the unnecessary render passes, transform all the data at the top level of your components. That code will automatically re-run whenever your props or state change.',
          'You don’t need Effects to handle user events. For example, let’s say you want to send an /api/buy POST request and show a notification when the user buys a product. In the Buy button click event handler, you know exactly what happened. By the time an Effect runs, you don’t know what the user did (for example, which button was clicked). This is why you’ll usually handle user events in the corresponding event handlers.',
        ],
      },
      {
        type: 'paragraph',
        text: 'You do need Effects to synchronize with external systems. For example, you can write an Effect that keeps a jQuery widget synchronized with the React state. You can also fetch data with Effects: for example, you can synchronize the search results with the current search query. Keep in mind that modern frameworks provide more efficient built-in data fetching mechanisms than writing Effects directly in your components.',
      },
      {
        type: 'paragraph',
        text: 'To help you gain the right intuition, let’s look at some common concrete examples!',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Updating state based on props or state',
      },
      {
        type: 'paragraph',
        text: 'Suppose you have a component with two state variables: firstName and lastName. You want to calculate a fullName from them by concatenating them. Moreover, you’d like fullName to update whenever firstName or lastName change. Your first instinct might be to add a fullName state variable and update it in an Effect:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "function Form() {\n\n  const [firstName, setFirstName] = useState('Taylor');\n\n  const [lastName, setLastName] = useState('Swift');\n\n\n\n  // 🔴 Avoid: redundant state and unnecessary Effect\n\n  const [fullName, setFullName] = useState('');\n\n  useEffect(() => {\n\n    setFullName(firstName + ' ' + lastName);\n\n  }, [firstName, lastName]);\n\n  // ...\n\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'This is more complicated than necessary. It is inefficient too: it does an entire render pass with a stale value for fullName, then immediately re-renders with the updated value. Remove the state variable and the Effect:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "function Form() {\n\n  const [firstName, setFirstName] = useState('Taylor');\n\n  const [lastName, setLastName] = useState('Swift');\n\n  // ✅ Good: calculated during rendering\n\n  const fullName = firstName + ' ' + lastName;\n\n  // ...\n\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'When something can be calculated from the existing props or state, don’t put it in state. Instead, calculate it during rendering. This makes your code faster (you avoid the extra “cascading” updates), simpler (you remove some code), and less error-prone (you avoid bugs caused by different state variables getting out of sync with each other). If this approach feels new to you, Thinking in React explains what should go into state.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Caching expensive calculations',
      },
      {
        type: 'paragraph',
        text: 'This component computes visibleTodos by taking the todos it receives by props and filtering them according to the filter prop. You might feel tempted to store the result in state and update it from an Effect:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "function TodoList({ todos, filter }) {\n\n  const [newTodo, setNewTodo] = useState('');\n\n\n\n  // 🔴 Avoid: redundant state and unnecessary Effect\n\n  const [visibleTodos, setVisibleTodos] = useState([]);\n\n  useEffect(() => {\n\n    setVisibleTodos(getFilteredTodos(todos, filter));\n\n  }, [todos, filter]);\n\n\n\n  // ...\n\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Like in the earlier example, this is both unnecessary and inefficient. First, remove the state and the Effect:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "function TodoList({ todos, filter }) {\n\n  const [newTodo, setNewTodo] = useState('');\n\n  // ✅ This is fine if getFilteredTodos() is not slow.\n\n  const visibleTodos = getFilteredTodos(todos, filter);\n\n  // ...\n\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Usually, this code is fine! But maybe getFilteredTodos() is slow or you have a lot of todos. In that case you don’t want to recalculate getFilteredTodos() if some unrelated state variable like newTodo has changed.',
      },
      {
        type: 'paragraph',
        text: 'You can cache (or “memoize”) an expensive calculation by wrapping it in a useMemo Hook:',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Note',
      },
      {
        type: 'paragraph',
        text: 'React Compiler can automatically memoize expensive calculations for you, eliminating the need for manual useMemo in many cases.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import { useMemo, useState } from 'react';\n\n\n\nfunction TodoList({ todos, filter }) {\n\n  const [newTodo, setNewTodo] = useState('');\n\n  const visibleTodos = useMemo(() => {\n\n    // ✅ Does not re-run unless todos or filter change\n\n    return getFilteredTodos(todos, filter);\n\n  }, [todos, filter]);\n\n  // ...\n\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Or, written as a single line:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import { useMemo, useState } from 'react';\n\n\n\nfunction TodoList({ todos, filter }) {\n\n  const [newTodo, setNewTodo] = useState('');\n\n  // ✅ Does not re-run getFilteredTodos() unless todos or filter change\n\n  const visibleTodos = useMemo(() => getFilteredTodos(todos, filter), [todos, filter]);\n\n  // ...\n\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'This tells React that you don’t want the inner function to re-run unless either todos or filter have changed. React will remember the return value of getFilteredTodos() during the initial render. During the next renders, it will check if todos or filter are different. If they’re the same as last time, useMemo will return the last result it has stored. But if they are different, React will call the inner function again (and store its result).',
      },
      {
        type: 'paragraph',
        text: 'The function you wrap in useMemo runs during rendering, so this only works for pure calculations.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'Deep Dive',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'How to tell if a calculation is expensive?',
      },
      {
        type: 'paragraph',
        text: 'In general, unless you’re creating or looping over thousands of objects, it’s probably not expensive. If you want to get more confidence, you can add a console log to measure the time spent in a piece of code:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "console.time('filter array');\n\nconst visibleTodos = getFilteredTodos(todos, filter);\n\nconsole.timeEnd('filter array');",
        },
      },
      {
        type: 'paragraph',
        text: 'Perform the interaction you’re measuring (for example, typing into the input). You will then see logs like filter array: 0.15ms in your console. If the overall logged time adds up to a significant amount (say, 1ms or more), it might make sense to memoize that calculation. As an experiment, you can then wrap the calculation in useMemo to verify whether the total logged time has decreased for that interaction or not:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "console.time('filter array');\n\nconst visibleTodos = useMemo(() => {\n\n  return getFilteredTodos(todos, filter); // Skipped if todos and filter haven't changed\n\n}, [todos, filter]);\n\nconsole.timeEnd('filter array');",
        },
      },
      {
        type: 'paragraph',
        text: 'useMemo won’t make the first render faster. It only helps you skip unnecessary work on updates.',
      },
      {
        type: 'paragraph',
        text: 'Keep in mind that your machine is probably faster than your users’ so it’s a good idea to test the performance with an artificial slowdown. For example, Chrome offers a CPU Throttling option for this.',
      },
      {
        type: 'paragraph',
        text: 'Also note that measuring performance in development will not give you the most accurate results. (For example, when Strict Mode is on, you will see each component render twice rather than once.) To get the most accurate timings, build your app for production and test it on a device like your users have.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Resetting all state when a prop changes',
      },
      {
        type: 'paragraph',
        text: 'This ProfilePage component receives a userId prop. The page contains a comment input, and you use a comment state variable to hold its value. One day, you notice a problem: when you navigate from one profile to another, the comment state does not get reset. As a result, it’s easy to accidentally post a comment on a wrong user’s profile. To fix the issue, you want to clear out the comment state variable whenever the userId changes:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "export default function ProfilePage({ userId }) {\n\n  const [comment, setComment] = useState('');\n\n\n\n  // 🔴 Avoid: Resetting state on prop change in an Effect\n\n  useEffect(() => {\n\n    setComment('');\n\n  }, [userId]);\n\n  // ...\n\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'This is inefficient because ProfilePage and its children will first render with the stale value, and then render again. It is also complicated because you’d need to do this in every component that has some state inside ProfilePage. For example, if the comment UI is nested, you’d want to clear out nested comment state too.',
      },
      {
        type: 'paragraph',
        text: 'Instead, you can tell React that each user’s profile is conceptually a different profile by giving it an explicit key. Split your component in two and pass a key attribute from the outer component to the inner one:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "export default function ProfilePage({ userId }) {\n\n  return (\n\n    <Profile\n\n      userId={userId}\n\n      key={userId}\n\n    />\n\n  );\n\n}\n\n\n\nfunction Profile({ userId }) {\n\n  // ✅ This and any other state below will reset on key change automatically\n\n  const [comment, setComment] = useState('');\n\n  // ...\n\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Normally, React preserves the state when the same component is rendered in the same spot. By passing userId as a key to the Profile component, you’re asking React to treat two Profile components with different userId as two different components that should not share any state. Whenever the key (which you’ve set to userId) changes, React will recreate the DOM and reset the state of the Profile component and all of its children. Now the comment field will clear out automatically when navigating between profiles.',
      },
      {
        type: 'paragraph',
        text: 'Note that in this example, only the outer ProfilePage component is exported and visible to other files in the project. Components rendering ProfilePage don’t need to pass the key to it: they pass userId as a regular prop. The fact ProfilePage passes it as a key to the inner Profile component is an implementation detail.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Adjusting some state when a prop changes',
      },
      {
        type: 'paragraph',
        text: 'Sometimes, you might want to reset or adjust a part of the state on a prop change, but not all of it.',
      },
      {
        type: 'paragraph',
        text: 'This List component receives a list of items as a prop, and maintains the selected item in the selection state variable. You want to reset the selection to null whenever the items prop receives a different array:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'function List({ items }) {\n\n  const [isReverse, setIsReverse] = useState(false);\n\n  const [selection, setSelection] = useState(null);\n\n\n\n  // 🔴 Avoid: Adjusting state on prop change in an Effect\n\n  useEffect(() => {\n\n    setSelection(null);\n\n  }, [items]);\n\n  // ...\n\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'This, too, is not ideal. Every time the items change, the List and its child components will render with a stale selection value at first. Then React will update the DOM and run the Effects. Finally, the setSelection(null) call will cause another re-render of the List and its child components, restarting this whole process again.',
      },
      {
        type: 'paragraph',
        text: 'Start by deleting the Effect. Instead, adjust the state directly during rendering:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'function List({ items }) {\n\n  const [isReverse, setIsReverse] = useState(false);\n\n  const [selection, setSelection] = useState(null);\n\n\n\n  // Better: Adjust the state while rendering\n\n  const [prevItems, setPrevItems] = useState(items);\n\n  if (items !== prevItems) {\n\n    setPrevItems(items);\n\n    setSelection(null);\n\n  }\n\n  // ...\n\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Storing information from previous renders like this can be hard to understand, but it’s better than updating the same state in an Effect. In the above example, setSelection is called directly during a render. React will re-render the List immediately after it exits with a return statement. React has not rendered the List children or updated the DOM yet, so this lets the List children skip rendering the stale selection value.',
      },
      {
        type: 'paragraph',
        text: 'When you update a component during rendering, React throws away the returned JSX and immediately retries rendering. To avoid very slow cascading retries, React only lets you update the same component’s state during a render. If you update another component’s state during a render, you’ll see an error. A condition like items !== prevItems is necessary to avoid loops. You may adjust state like this, but any other side effects (like changing the DOM or setting timeouts) should stay in event handlers or Effects to keep components pure.',
      },
      {
        type: 'paragraph',
        text: 'Although this pattern is more efficient than an Effect, most components shouldn’t need it either. No matter how you do it, adjusting state based on props or other state makes your data flow more difficult to understand and debug. Always check whether you can reset all state with a key or calculate everything during rendering instead. For example, instead of storing (and resetting) the selected item, you can store the selected item ID:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'function List({ items }) {\n\n  const [isReverse, setIsReverse] = useState(false);\n\n  const [selectedId, setSelectedId] = useState(null);\n\n  // ✅ Best: Calculate everything during rendering\n\n  const selection = items.find(item => item.id === selectedId) ?? null;\n\n  // ...\n\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Now there is no need to “adjust” the state at all. If the item with the selected ID is in the list, it remains selected. If it’s not, the selection calculated during rendering will be null because no matching item was found. This behavior is different, but arguably better because most changes to items preserve the selection.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Sharing logic between event handlers',
      },
      {
        type: 'paragraph',
        text: 'Let’s say you have a product page with two buttons (Buy and Checkout) that both let you buy that product. You want to show a notification whenever the user puts the product in the cart. Calling showNotification() in both buttons’ click handlers feels repetitive so you might be tempted to place this logic in an Effect:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "function ProductPage({ product, addToCart }) {\n\n  // 🔴 Avoid: Event-specific logic inside an Effect\n\n  useEffect(() => {\n\n    if (product.isInCart) {\n\n      showNotification(`Added ${product.name} to the shopping cart!`);\n\n    }\n\n  }, [product]);\n\n\n\n  function handleBuyClick() {\n\n    addToCart(product);\n\n  }\n\n\n\n  function handleCheckoutClick() {\n\n    addToCart(product);\n\n    navigateTo('/checkout');\n\n  }\n\n  // ...\n\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'This Effect is unnecessary. It will also most likely cause bugs. For example, let’s say that your app “remembers” the shopping cart between the page reloads. If you add a product to the cart once and refresh the page, the notification will appear again. It will keep appearing every time you refresh that product’s page. This is because product.isInCart will already be true on the page load, so the Effect above will call showNotification().',
      },
      {
        type: 'paragraph',
        text: 'When you’re not sure whether some code should be in an Effect or in an event handler, ask yourself why this code needs to run. Use Effects only for code that should run because the component was displayed to the user. In this example, the notification should appear because the user pressed the button, not because the page was displayed! Delete the Effect and put the shared logic into a function called from both event handlers:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "function ProductPage({ product, addToCart }) {\n\n  // ✅ Good: Event-specific logic is called from event handlers\n\n  function buyProduct() {\n\n    addToCart(product);\n\n    showNotification(`Added ${product.name} to the shopping cart!`);\n\n  }\n\n\n\n  function handleBuyClick() {\n\n    buyProduct();\n\n  }\n\n\n\n  function handleCheckoutClick() {\n\n    buyProduct();\n\n    navigateTo('/checkout');\n\n  }\n\n  // ...\n\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'This both removes the unnecessary Effect and fixes the bug.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Sending a POST request',
      },
      {
        type: 'paragraph',
        text: 'This Form component sends two kinds of POST requests. It sends an analytics event when it mounts. When you fill in the form and click the Submit button, it will send a POST request to the /api/register endpoint:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "function Form() {\n\n  const [firstName, setFirstName] = useState('');\n\n  const [lastName, setLastName] = useState('');\n\n\n\n  // ✅ Good: This logic should run because the component was displayed\n\n  useEffect(() => {\n\n    post('/analytics/event', { eventName: 'visit_form' });\n\n  }, []);\n\n\n\n  // 🔴 Avoid: Event-specific logic inside an Effect\n\n  const [jsonToSubmit, setJsonToSubmit] = useState(null);\n\n  useEffect(() => {\n\n    if (jsonToSubmit !== null) {\n\n      post('/api/register', jsonToSubmit);\n\n    }\n\n  }, [jsonToSubmit]);\n\n\n\n  function handleSubmit(e) {\n\n    e.preventDefault();\n\n    setJsonToSubmit({ firstName, lastName });\n\n  }\n\n  // ...\n\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Let’s apply the same criteria as in the example before.',
      },
      {
        type: 'paragraph',
        text: 'The analytics POST request should remain in an Effect. This is because the reason to send the analytics event is that the form was displayed. (It would fire twice in development, but see here for how to deal with that.)',
      },
      {
        type: 'paragraph',
        text: 'However, the /api/register POST request is not caused by the form being displayed. You only want to send the request at one specific moment in time: when the user presses the button. It should only ever happen on that particular interaction. Delete the second Effect and move that POST request into the event handler:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "function Form() {\n\n  const [firstName, setFirstName] = useState('');\n\n  const [lastName, setLastName] = useState('');\n\n\n\n  // ✅ Good: This logic runs because the component was displayed\n\n  useEffect(() => {\n\n    post('/analytics/event', { eventName: 'visit_form' });\n\n  }, []);\n\n\n\n  function handleSubmit(e) {\n\n    e.preventDefault();\n\n    // ✅ Good: Event-specific logic is in the event handler\n\n    post('/api/register', { firstName, lastName });\n\n  }\n\n  // ...\n\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'When you choose whether to put some logic into an event handler or an Effect, the main question you need to answer is what kind of logic it is from the user’s perspective. If this logic is caused by a particular interaction, keep it in the event handler. If it’s caused by the user seeing the component on the screen, keep it in the Effect.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Chains of computations',
      },
      {
        type: 'paragraph',
        text: 'Sometimes you might feel tempted to chain Effects that each adjust a piece of state based on other state:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "function Game() {\n\n  const [card, setCard] = useState(null);\n\n  const [goldCardCount, setGoldCardCount] = useState(0);\n\n  const [round, setRound] = useState(1);\n\n  const [isGameOver, setIsGameOver] = useState(false);\n\n\n\n  // 🔴 Avoid: Chains of Effects that adjust the state solely to trigger each other\n\n  useEffect(() => {\n\n    if (card !== null && card.gold) {\n\n      setGoldCardCount(c => c + 1);\n\n    }\n\n  }, [card]);\n\n\n\n  useEffect(() => {\n\n    if (goldCardCount > 3) {\n\n      setRound(r => r + 1)\n\n      setGoldCardCount(0);\n\n    }\n\n  }, [goldCardCount]);\n\n\n\n  useEffect(() => {\n\n    if (round > 5) {\n\n      setIsGameOver(true);\n\n    }\n\n  }, [round]);\n\n\n\n  useEffect(() => {\n\n    alert('Good game!');\n\n  }, [isGameOver]);\n\n\n\n  function handlePlaceCard(nextCard) {\n\n    if (isGameOver) {\n\n      throw Error('Game already ended.');\n\n    } else {\n\n      setCard(nextCard);\n\n    }\n\n  }\n\n\n\n  // ...",
        },
      },
      {
        type: 'paragraph',
        text: 'There are two problems with this code.',
      },
      {
        type: 'paragraph',
        text: 'The first problem is that it is very inefficient: the component (and its children) have to re-render between each set call in the chain. In the example above, in the worst case (setCard → render → setGoldCardCount → render → setRound → render → setIsGameOver → render) there are three unnecessary re-renders of the tree below.',
      },
      {
        type: 'paragraph',
        text: 'The second problem is that even if it weren’t slow, as your code evolves, you will run into cases where the “chain” you wrote doesn’t fit the new requirements. Imagine you are adding a way to step through the history of the game moves. You’d do it by updating each state variable to a value from the past. However, setting the card state to a value from the past would trigger the Effect chain again and change the data you’re showing. Such code is often rigid and fragile.',
      },
      {
        type: 'paragraph',
        text: 'In this case, it’s better to calculate what you can during rendering, and adjust the state in the event handler:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "function Game() {\n\n  const [card, setCard] = useState(null);\n\n  const [goldCardCount, setGoldCardCount] = useState(0);\n\n  const [round, setRound] = useState(1);\n\n\n\n  // ✅ Calculate what you can during rendering\n\n  const isGameOver = round > 5;\n\n\n\n  function handlePlaceCard(nextCard) {\n\n    if (isGameOver) {\n\n      throw Error('Game already ended.');\n\n    }\n\n\n\n    // ✅ Calculate all the next state in the event handler\n\n    setCard(nextCard);\n\n    if (nextCard.gold) {\n\n      if (goldCardCount < 3) {\n\n        setGoldCardCount(goldCardCount + 1);\n\n      } else {\n\n        setGoldCardCount(0);\n\n        setRound(round + 1);\n\n        if (round === 5) {\n\n          alert('Good game!');\n\n        }\n\n      }\n\n    }\n\n  }\n\n\n\n  // ...",
        },
      },
      {
        type: 'paragraph',
        text: 'This is a lot more efficient. Also, if you implement a way to view game history, now you will be able to set each state variable to a move from the past without triggering the Effect chain that adjusts every other value. If you need to reuse logic between several event handlers, you can extract a function and call it from those handlers.',
      },
      {
        type: 'paragraph',
        text: 'Remember that inside event handlers, state behaves like a snapshot. For example, even after you call setRound(round + 1), the round variable will reflect the value at the time the user clicked the button. If you need to use the next value for calculations, define it manually like const nextRound = round + 1.',
      },
      {
        type: 'paragraph',
        text: 'In some cases, you can’t calculate the next state directly in the event handler. For example, imagine a form with multiple dropdowns where the options of the next dropdown depend on the selected value of the previous dropdown. Then, a chain of Effects is appropriate because you are synchronizing with network.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Initializing the application',
      },
      {
        type: 'paragraph',
        text: 'Some logic should only run once when the app loads.',
      },
      {
        type: 'paragraph',
        text: 'You might be tempted to place it in an Effect in the top-level component:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'function App() {\n\n  // 🔴 Avoid: Effects with logic that should only ever run once\n\n  useEffect(() => {\n\n    loadDataFromLocalStorage();\n\n    checkAuthToken();\n\n  }, []);\n\n  // ...\n\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'However, you’ll quickly discover that it runs twice in development. This can cause issues—for example, maybe it invalidates the authentication token because the function wasn’t designed to be called twice. In general, your components should be resilient to being remounted. This includes your top-level App component.',
      },
      {
        type: 'paragraph',
        text: 'Although it may not ever get remounted in practice in production, following the same constraints in all components makes it easier to move and reuse code. If some logic must run once per app load rather than once per component mount, add a top-level variable to track whether it has already executed:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'let didInit = false;\n\n\n\nfunction App() {\n\n  useEffect(() => {\n\n    if (!didInit) {\n\n      didInit = true;\n\n      // ✅ Only runs once per app load\n\n      loadDataFromLocalStorage();\n\n      checkAuthToken();\n\n    }\n\n  }, []);\n\n  // ...\n\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'You can also run it during module initialization and before the app renders:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "if (typeof window !== 'undefined') { // Check if we're running in the browser.\n\n   // ✅ Only runs once per app load\n\n  checkAuthToken();\n\n  loadDataFromLocalStorage();\n\n}\n\n\n\nfunction App() {\n\n  // ...\n\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Code at the top level runs once when your component is imported—even if it doesn’t end up being rendered. To avoid slowdown or surprising behavior when importing arbitrary components, don’t overuse this pattern. Keep app-wide initialization logic to root component modules like App.js or in your application’s entry point.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Notifying parent components about state changes',
      },
      {
        type: 'paragraph',
        text: 'Let’s say you’re writing a Toggle component with an internal isOn state which can be either true or false. There are a few different ways to toggle it (by clicking or dragging). You want to notify the parent component whenever the Toggle internal state changes, so you expose an onChange event and call it from an Effect:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'function Toggle({ onChange }) {\n\n  const [isOn, setIsOn] = useState(false);\n\n\n\n  // 🔴 Avoid: The onChange handler runs too late\n\n  useEffect(() => {\n\n    onChange(isOn);\n\n  }, [isOn, onChange])\n\n\n\n  function handleClick() {\n\n    setIsOn(!isOn);\n\n  }\n\n\n\n  function handleDragEnd(e) {\n\n    if (isCloserToRightEdge(e)) {\n\n      setIsOn(true);\n\n    } else {\n\n      setIsOn(false);\n\n    }\n\n  }\n\n\n\n  // ...\n\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Like earlier, this is not ideal. The Toggle updates its state first, and React updates the screen. Then React runs the Effect, which calls the onChange function passed from a parent component. Now the parent component will update its own state, starting another render pass. It would be better to do everything in a single pass.',
      },
      {
        type: 'paragraph',
        text: 'Delete the Effect and instead update the state of both components within the same event handler:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'function Toggle({ onChange }) {\n\n  const [isOn, setIsOn] = useState(false);\n\n\n\n  function updateToggle(nextIsOn) {\n\n    // ✅ Good: Perform all updates during the event that caused them\n\n    setIsOn(nextIsOn);\n\n    onChange(nextIsOn);\n\n  }\n\n\n\n  function handleClick() {\n\n    updateToggle(!isOn);\n\n  }\n\n\n\n  function handleDragEnd(e) {\n\n    if (isCloserToRightEdge(e)) {\n\n      updateToggle(true);\n\n    } else {\n\n      updateToggle(false);\n\n    }\n\n  }\n\n\n\n  // ...\n\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'With this approach, both the Toggle component and its parent component update their state during the event. React batches updates from different components together, so there will only be one render pass.',
      },
      {
        type: 'paragraph',
        text: 'You might also be able to remove the state altogether, and instead receive isOn from the parent component:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: '// ✅ Also good: the component is fully controlled by its parent\n\nfunction Toggle({ isOn, onChange }) {\n\n  function handleClick() {\n\n    onChange(!isOn);\n\n  }\n\n\n\n  function handleDragEnd(e) {\n\n    if (isCloserToRightEdge(e)) {\n\n      onChange(true);\n\n    } else {\n\n      onChange(false);\n\n    }\n\n  }\n\n\n\n  // ...\n\n}',
        },
      },
      {
        type: 'paragraph',
        text: '“Lifting state up” lets the parent component fully control the Toggle by toggling the parent’s own state. This means the parent component will have to contain more logic, but there will be less state overall to worry about. Whenever you try to keep two different state variables synchronized, try lifting state up instead!',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Passing data to the parent',
      },
      {
        type: 'paragraph',
        text: 'This Child component fetches some data and then passes it to the Parent component in an Effect:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'function Parent() {\n\n  const [data, setData] = useState(null);\n\n  // ...\n\n  return <Child onFetched={setData} />;\n\n}\n\n\n\nfunction Child({ onFetched }) {\n\n  const data = useSomeAPI();\n\n  // 🔴 Avoid: Passing data to the parent in an Effect\n\n  useEffect(() => {\n\n    if (data) {\n\n      onFetched(data);\n\n    }\n\n  }, [onFetched, data]);\n\n  // ...\n\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'In React, data flows from the parent components to their children. When you see something wrong on the screen, you can trace where the information comes from by going up the component chain until you find which component passes the wrong prop or has the wrong state. When child components update the state of their parent components in Effects, the data flow becomes very difficult to trace. Since both the child and the parent need the same data, let the parent component fetch that data, and pass it down to the child instead:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'function Parent() {\n\n  const data = useSomeAPI();\n\n  // ...\n\n  // ✅ Good: Passing data down to the child\n\n  return <Child data={data} />;\n\n}\n\n\n\nfunction Child({ data }) {\n\n  // ...\n\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'This is simpler and keeps the data flow predictable: the data flows down from the parent to the child.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Subscribing to an external store',
      },
      {
        type: 'paragraph',
        text: 'Sometimes, your components may need to subscribe to some data outside of the React state. This data could be from a third-party library or a built-in browser API. Since this data can change without React’s knowledge, you need to manually subscribe your components to it. This is often done with an Effect, for example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "function useOnlineStatus() {\n\n  // Not ideal: Manual store subscription in an Effect\n\n  const [isOnline, setIsOnline] = useState(true);\n\n  useEffect(() => {\n\n    function updateState() {\n\n      setIsOnline(navigator.onLine);\n\n    }\n\n\n\n    updateState();\n\n\n\n    window.addEventListener('online', updateState);\n\n    window.addEventListener('offline', updateState);\n\n    return () => {\n\n      window.removeEventListener('online', updateState);\n\n      window.removeEventListener('offline', updateState);\n\n    };\n\n  }, []);\n\n  return isOnline;\n\n}\n\n\n\nfunction ChatIndicator() {\n\n  const isOnline = useOnlineStatus();\n\n  // ...\n\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Here, the component subscribes to an external data store (in this case, the browser navigator.onLine API). Since this API does not exist on the server (so it can’t be used for the initial HTML), initially the state is set to true. Whenever the value of that data store changes in the browser, the component updates its state.',
      },
      {
        type: 'paragraph',
        text: 'Although it’s common to use Effects for this, React has a purpose-built Hook for subscribing to an external store that is preferred instead. Delete the Effect and replace it with a call to useSyncExternalStore:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "function subscribe(callback) {\n\n  window.addEventListener('online', callback);\n\n  window.addEventListener('offline', callback);\n\n  return () => {\n\n    window.removeEventListener('online', callback);\n\n    window.removeEventListener('offline', callback);\n\n  };\n\n}\n\n\n\nfunction useOnlineStatus() {\n\n  // ✅ Good: Subscribing to an external store with a built-in Hook\n\n  return useSyncExternalStore(\n\n    subscribe, // React won't resubscribe for as long as you pass the same function\n\n    () => navigator.onLine, // How to get the value on the client\n\n    () => true // How to get the value on the server\n\n  );\n\n}\n\n\n\nfunction ChatIndicator() {\n\n  const isOnline = useOnlineStatus();\n\n  // ...\n\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'This approach is less error-prone than manually syncing mutable data to React state with an Effect. Typically, you’ll write a custom Hook like useOnlineStatus() above so that you don’t need to repeat this code in the individual components. Read more about subscribing to external stores from React components.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Fetching data',
      },
      {
        type: 'paragraph',
        text: 'Many apps use Effects to kick off data fetching. It is quite common to write a data fetching Effect like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'function SearchResults({ query }) {\n\n  const [results, setResults] = useState([]);\n\n  const [page, setPage] = useState(1);\n\n\n\n  useEffect(() => {\n\n    // 🔴 Avoid: Fetching without cleanup logic\n\n    fetchResults(query, page).then(json => {\n\n      setResults(json);\n\n    });\n\n  }, [query, page]);\n\n\n\n  function handleNextPageClick() {\n\n    setPage(page + 1);\n\n  }\n\n  // ...\n\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'You don’t need to move this fetch to an event handler.',
      },
      {
        type: 'paragraph',
        text: 'This might seem like a contradiction with the earlier examples where you needed to put the logic into the event handlers! However, consider that it’s not the typing event that’s the main reason to fetch. Search inputs are often prepopulated from the URL, and the user might navigate Back and Forward without touching the input.',
      },
      {
        type: 'paragraph',
        text: 'It doesn’t matter where page and query come from. While this component is visible, you want to keep results synchronized with data from the network for the current page and query. This is why it’s an Effect.',
      },
      {
        type: 'paragraph',
        text: 'However, the code above has a bug. Imagine you type "hello" fast. Then the query will change from "h", to "he", "hel", "hell", and "hello". This will kick off separate fetches, but there is no guarantee about which order the responses will arrive in. For example, the "hell" response may arrive after the "hello" response. Since it will call setResults() last, you will be displaying the wrong search results. This is called a “race condition”: two different requests “raced” against each other and came in a different order than you expected.',
      },
      {
        type: 'paragraph',
        text: 'To fix the race condition, you need to add a cleanup function to ignore stale responses:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'function SearchResults({ query }) {\n\n  const [results, setResults] = useState([]);\n\n  const [page, setPage] = useState(1);\n\n  useEffect(() => {\n\n    let ignore = false;\n\n    fetchResults(query, page).then(json => {\n\n      if (!ignore) {\n\n        setResults(json);\n\n      }\n\n    });\n\n    return () => {\n\n      ignore = true;\n\n    };\n\n  }, [query, page]);\n\n\n\n  function handleNextPageClick() {\n\n    setPage(page + 1);\n\n  }\n\n  // ...\n\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'This ensures that when your Effect fetches data, all responses except the last requested one will be ignored.',
      },
      {
        type: 'paragraph',
        text: 'Handling race conditions is not the only difficulty with implementing data fetching. You might also want to think about caching responses (so that the user can click Back and see the previous screen instantly), how to fetch data on the server (so that the initial server-rendered HTML contains the fetched content instead of a spinner), and how to avoid network waterfalls (so that a child can fetch data without waiting for every parent).',
      },
      {
        type: 'paragraph',
        text: 'These issues apply to any UI library, not just React. Solving them is not trivial, which is why modern frameworks provide more efficient built-in data fetching mechanisms than fetching data in Effects.',
      },
      {
        type: 'paragraph',
        text: 'If you don’t use a framework (and don’t want to build your own) but would like to make data fetching from Effects more ergonomic, consider extracting your fetching logic into a custom Hook like in this example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'function SearchResults({ query }) {\n\n  const [page, setPage] = useState(1);\n\n  const params = new URLSearchParams({ query, page });\n\n  const results = useData(`/api/search?${params}`);\n\n\n\n  function handleNextPageClick() {\n\n    setPage(page + 1);\n\n  }\n\n  // ...\n\n}\n\n\n\nfunction useData(url) {\n\n  const [data, setData] = useState(null);\n\n  useEffect(() => {\n\n    let ignore = false;\n\n    fetch(url)\n\n      .then(response => response.json())\n\n      .then(json => {\n\n        if (!ignore) {\n\n          setData(json);\n\n        }\n\n      });\n\n    return () => {\n\n      ignore = true;\n\n    };\n\n  }, [url]);\n\n  return data;\n\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'You’ll likely also want to add some logic for error handling and to track whether the content is loading. You can build a Hook like this yourself or use one of the many solutions already available in the React ecosystem. Although this alone won’t be as efficient as using a framework’s built-in data fetching mechanism, moving the data fetching logic into a custom Hook will make it easier to adopt an efficient data fetching strategy later.',
      },
      {
        type: 'paragraph',
        text: 'In general, whenever you have to resort to writing Effects, keep an eye out for when you can extract a piece of functionality into a custom Hook with a more declarative and purpose-built API like useData above. The fewer raw useEffect calls you have in your components, the easier you will find to maintain your application.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'If you can calculate something during render, you don’t need an Effect.',
          'To cache expensive calculations, add useMemo instead of useEffect.',
          'To reset the state of an entire component tree, pass a different key to it.',
          'To reset a particular bit of state in response to a prop change, set it during rendering.',
          'Code that runs because a component was displayed should be in Effects, the rest should be in events.',
          'If you need to update the state of several components, it’s better to do it during a single event.',
          'Whenever you try to synchronize state variables in different components, consider lifting state up.',
          'You can fetch data with Effects, but you need to implement cleanup to avoid race conditions.',
        ],
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
