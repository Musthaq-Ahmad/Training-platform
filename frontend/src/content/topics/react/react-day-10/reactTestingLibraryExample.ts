import type { ContentTopic } from '../../../types';

export const reacttestinglibraryexampleTopics = {
  reacttestinglibraryexample: {
    id: 'reacttestinglibraryexample',
    heading: 'React Testing Library Example',
    blocks: [
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import React, {useState, useReducer} from 'react'\nimport axios from 'axios'\n\nconst initialState = {\n  error: null,\n  greeting: null,\n}\n\nfunction greetingReducer(state, action) {\n  switch (action.type) {\n    case 'SUCCESS': {\n      return {\n        error: null,\n        greeting: action.greeting,\n      }\n    }\n    case 'ERROR': {\n      return {\n        error: action.error,\n        greeting: null,\n      }\n    }\n    default: {\n      return state\n    }\n  }\n}\n\nexport default function Fetch({url}) {\n  const [{error, greeting}, dispatch] = useReducer(\n    greetingReducer,\n    initialState,\n  )\n  const [buttonClicked, setButtonClicked] = useState(false)\n\n  const fetchGreeting = async url =>\n    axios\n      .get(url)\n      .then(response => {\n        const {data} = response\n        const {greeting} = data\n        dispatch({type: 'SUCCESS', greeting})\n        setButtonClicked(true)\n      })\n      .catch(error => {\n        dispatch({type: 'ERROR', error})\n      })\n\n  const buttonText = buttonClicked ? 'Ok' : 'Load Greeting'\n\n  return (\n    <div>\n      <button onClick={() => fetchGreeting(url)} disabled={buttonClicked}>\n        {buttonText}\n      </button>\n      {greeting && <h1>{greeting}</h1>}\n      {error && <p role=\"alert\">Oops, failed to fetch!</p>}\n    </div>\n  )\n}",
        },
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
