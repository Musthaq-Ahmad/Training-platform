import type { ContentTopic } from '../../../types';

export const reactconditionalrenderingTopics = {
  reactconditionalrendering: {
    id: 'reactconditionalrendering',
    heading: 'Conditional Rendering',
    blocks: [
      {
        type: 'paragraph',
        text: 'Your components will often need to display different things depending on different conditions. In React, you can conditionally render JSX using JavaScript syntax like if statements, &&, and ? : operators.',
      },
      {
        type: 'paragraph',
        text: 'In this example, the JavaScript && operator is used to conditionally render a checkmark:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'function Item({ name, isPacked }) {\n  return (\n    <li className="item">\n      {name} {isPacked && \'✅\'}\n    </li>\n  );\n}\n\nexport default function PackingList() {\n  return (\n    <section>\n      <h1>Sally Ride\'s Packing List</h1>\n      <ul>\n        <Item\n          isPacked={true}\n          name="Space suit"\n        />\n        <Item\n          isPacked={true}\n          name="Helmet with a golden leaf"\n        />\n        <Item\n          isPacked={false}\n          name="Photo of Tam"\n        />\n      </ul>\n    </section>\n  );\n}',
        },
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
