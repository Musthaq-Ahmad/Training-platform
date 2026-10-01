import type { ContentTopic } from '../../../types';

export const reactfirstcomponentTopics = {
  reactfirstcomponent: {
    id: 'reactfirstcomponent',
    heading: 'Your First Component',
    blocks: [
      {
        type: 'paragraph',
        text: 'React applications are built from isolated pieces of UI called components. A React component is a JavaScript function that you can sprinkle with markup. Components can be as small as a button, or as large as an entire page. Here is a Gallery component rendering three Profile components:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'function Profile() {\n  return (\n    <img\n      src="https://react.dev/images/docs/scientists/MK3eW3As.jpg"\n      alt="Katherine Johnson"\n    />\n  );\n}\n\nexport default function Gallery() {\n  return (\n    <section>\n      <h1>Amazing scientists</h1>\n      <Profile />\n      <Profile />\n      <Profile />\n    </section>\n  );\n}',
        },
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
