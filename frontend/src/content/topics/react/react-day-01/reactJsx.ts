import type { ContentTopic } from '../../../types';

export const reactjsxTopics = {
  reactjsx: {
    id: 'reactjsx',
    heading: 'Writing Markup with JSX',
    blocks: [
      {
        type: 'paragraph',
        text: 'Each React component is a JavaScript function that may contain some markup that React renders into the browser. React components use a syntax extension called JSX to represent that markup. JSX looks a lot like HTML, but it is a bit stricter and can display dynamic information.',
      },
      {
        type: 'paragraph',
        text: 'If we paste existing HTML markup into a React component, it won’t always work:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'export default function TodoList() {\n  return (\n    // This doesn\'t quite work!\n    <h1>Hedy Lamarr\'s Todos</h1>\n    <img\n      src="https://react.dev/images/docs/scientists/yXOvdOSs.jpg"\n      alt="Hedy Lamarr"\n      class="photo"\n    >\n    <ul>\n      <li>Invent new traffic lights\n      <li>Rehearse a movie scene\n      <li>Improve spectrum technology\n    </ul>',
        },
      },
      {
        type: 'paragraph',
        text: 'If you have existing HTML like this, you can fix it using a converter:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'export default function TodoList() {\n  return (\n    <>\n      <h1>Hedy Lamarr\'s Todos</h1>\n      <img\n        src="https://react.dev/images/docs/scientists/yXOvdOSs.jpg"\n        alt="Hedy Lamarr"\n        className="photo"\n      />\n      <ul>\n        <li>Invent new traffic lights</li>\n        <li>Rehearse a movie scene</li>\n        <li>Improve spectrum technology</li>\n      </ul>\n    </>\n  );\n}',
        },
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
