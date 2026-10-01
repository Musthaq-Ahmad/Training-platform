# Controlling an Input with a State Variable

An input like `<input />` is _uncontrolled._ Even if you [pass an initial value](#providing-an-initial-value-for-an-input) like `<input defaultValue="Initial text" />`, your JSX only specifies the initial value. It does not control what the value should be right now.

**To render a _controlled_ input, pass the `value` prop to it (or `checked` for checkboxes and radios).** React will force the input to always have the `value` you passed. Usually, you would do this by declaring a [state variable:](/reference/react/useState)

```jsx
function Form() {
  const [firstName, setFirstName] = useState(''); // Declare a state variable...

  // ...

  return (
    <input
      value={firstName} // ...force the input's value to match the state variable...

      onChange={(e) => setFirstName(e.target.value)} // ... and update the state variable on any edits!
    />
  );
}
```

A controlled input makes sense if you needed state anyway—for example, to re-render your UI on every edit:

```jsx
function Form() {

  const [firstName, setFirstName] = useState('');

  return (

    <>

      <label>

        First name:

        <input value={firstName} onChange={e => setFirstName(e.target.value)} />

      </label>

      {firstName !== '' && <p>Your name is {firstName}.</p>}

      ...
```

It’s also useful if you want to offer multiple ways to adjust the input state (for example, by clicking a button):

```jsx
function Form() {

  // ...

  const [age, setAge] = useState('');

  const ageAsNumber = Number(age);

  return (

    <>

      <label>

        Age:

        <input

          value={age}

          onChange={e => setAge(e.target.value)}

          type="number"

        />

        <button onClick={() => setAge(ageAsNumber + 10)}>

          Add 10 years

        </button>
```

The `value` you pass to controlled components should not be `undefined` or `null`. If you need the initial value to be empty (such as with the `firstName` field below), initialize your state variable to an empty string (`''`).

```jsx
import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [age, setAge] = useState('20');
  const ageAsNumber = Number(age);
  return (
    <>
      <label>
        First name:
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </label>
      <label>
        Age:
        <input value={age} onChange={(e) => setAge(e.target.value)} type="number" />
        <button onClick={() => setAge(ageAsNumber + 10)}>Add 10 years</button>
      </label>
      {firstName !== '' && <p>Your name is {firstName}.</p>}
      {ageAsNumber > 0 && <p>Your age is {ageAsNumber}.</p>}
    </>
  );
}
```
