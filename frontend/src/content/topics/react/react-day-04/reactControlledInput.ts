import type { ContentTopic } from '../../../types';

export const reactcontrolledinputTopics = {
  reactcontrolledinput: {
    id: 'reactcontrolledinput',
    heading: 'Controlling an Input with a State Variable',
    blocks: [
      {
        type: 'paragraph',
        text: 'An input like <input /> is uncontrolled. Even if you pass an initial value like <input defaultValue="Initial text" />, your JSX only specifies the initial value. It does not control what the value should be right now.',
      },
      {
        type: 'paragraph',
        text: 'To render a controlled input, pass the value prop to it (or checked for checkboxes and radios). React will force the input to always have the value you passed. Usually, you would do this by declaring a state variable:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "function Form() {\n\n  const [firstName, setFirstName] = useState(''); // Declare a state variable...\n\n  // ...\n\n  return (\n\n    <input\n\n      value={firstName} // ...force the input's value to match the state variable...\n\n      onChange={e => setFirstName(e.target.value)} // ... and update the state variable on any edits!\n\n    />\n\n  );\n\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'A controlled input makes sense if you needed state anyway—for example, to re-render your UI on every edit:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "function Form() {\n\n  const [firstName, setFirstName] = useState('');\n\n  return (\n\n    <>\n\n      <label>\n\n        First name:\n\n        <input value={firstName} onChange={e => setFirstName(e.target.value)} />\n\n      </label>\n\n      {firstName !== '' && <p>Your name is {firstName}.</p>}\n\n      ...",
        },
      },
      {
        type: 'paragraph',
        text: 'It’s also useful if you want to offer multiple ways to adjust the input state (for example, by clicking a button):',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'function Form() {\n\n  // ...\n\n  const [age, setAge] = useState(\'\');\n\n  const ageAsNumber = Number(age);\n\n  return (\n\n    <>\n\n      <label>\n\n        Age:\n\n        <input\n\n          value={age}\n\n          onChange={e => setAge(e.target.value)}\n\n          type="number"\n\n        />\n\n        <button onClick={() => setAge(ageAsNumber + 10)}>\n\n          Add 10 years\n\n        </button>',
        },
      },
      {
        type: 'paragraph',
        text: "The value you pass to controlled components should not be undefined or null. If you need the initial value to be empty (such as with the firstName field below), initialize your state variable to an empty string ('').",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import { useState } from 'react';\n\nexport default function Form() {\n  const [firstName, setFirstName] = useState('');\n  const [age, setAge] = useState('20');\n  const ageAsNumber = Number(age);\n  return (\n    <>\n      <label>\n        First name:\n        <input\n          value={firstName}\n          onChange={e => setFirstName(e.target.value)}\n        />\n      </label>\n      <label>\n        Age:\n        <input\n          value={age}\n          onChange={e => setAge(e.target.value)}\n          type=\"number\"\n        />\n        <button onClick={() => setAge(ageAsNumber + 10)}>\n          Add 10 years\n        </button>\n      </label>\n      {firstName !== '' &&\n        <p>Your name is {firstName}.</p>\n      }\n      {ageAsNumber > 0 &&\n        <p>Your age is {ageAsNumber}.</p>\n      }\n    </>\n  );\n}",
        },
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
