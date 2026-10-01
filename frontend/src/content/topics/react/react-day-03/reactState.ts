import type { ContentTopic } from '../../../types';

export const reactstateTopics = {
  reactstate: {
    id: 'reactstate',
    heading: "State: A Component's Memory",
    blocks: [
      {
        type: 'paragraph',
        text: 'Components often need to change what’s on the screen as a result of an interaction. Typing into the form should update the input field, clicking “next” on an image carousel should change which image is displayed, clicking “buy” puts a product in the shopping cart. Components need to “remember” things: the current input value, the current image, the shopping cart. In React, this kind of component-specific memory is called state.',
      },
      {
        type: 'paragraph',
        text: 'You can add state to a component with a useState Hook. Hooks are special functions that let your components use React features (state is one of those features). The useState Hook lets you declare a state variable. It takes the initial state and returns a pair of values: the current state, and a state setter function that lets you update it.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'const [index, setIndex] = useState(0);\n\nconst [showMore, setShowMore] = useState(false);',
        },
      },
      {
        type: 'paragraph',
        text: 'Here is how an image gallery uses and updates state on click:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import { useState } from 'react';\nimport { sculptureList } from './data.js';\n\nexport default function Gallery() {\n  const [index, setIndex] = useState(0);\n  const [showMore, setShowMore] = useState(false);\n  const hasNext = index < sculptureList.length - 1;\n\n  function handleNextClick() {\n    if (hasNext) {\n      setIndex(index + 1);\n    } else {\n      setIndex(0);\n    }\n  }\n\n  function handleMoreClick() {\n    setShowMore(!showMore);\n  }\n\n  let sculpture = sculptureList[index];\n  return (\n    <>\n      <button onClick={handleNextClick}>\n        Next\n      </button>\n      <h2>\n        <i>{sculpture.name} </i>\n        by {sculpture.artist}\n      </h2>\n      <h3>\n        ({index + 1} of {sculptureList.length})\n      </h3>\n      <button onClick={handleMoreClick}>\n        {showMore ? 'Hide' : 'Show'} details\n      </button>\n      {showMore && <p>{sculpture.description}</p>}\n      <img\n        src={sculpture.url}\n        alt={sculpture.alt}\n      />\n    </>\n  );\n}",
        },
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
