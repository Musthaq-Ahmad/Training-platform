# Importing and Exporting Components

You can declare many components in one file, but large files can get difficult to navigate. To solve this, you can _export_ a component into its own file, and then _import_ that component from another file:

**Gallery.js**

```jsx
import Profile from './Profile.js';

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

**Profile.js**

```jsx
export default function Profile() {
  return <img src="https://react.dev/images/docs/scientists/QIrZWGIs.jpg" alt="Alan L. Hart" />;
}
```
