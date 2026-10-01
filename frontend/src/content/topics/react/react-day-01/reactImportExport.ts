import type { ContentTopic } from '../../../types';

export const reactimportexportTopics = {
  reactimportexport: {
    id: 'reactimportexport',
    heading: 'Importing and Exporting Components',
    blocks: [
      {
        type: 'paragraph',
        text: 'You can declare many components in one file, but large files can get difficult to navigate. To solve this, you can export a component into its own file, and then import that component from another file:',
      },
      {
        type: 'code',
        code: {
          filename: 'Gallery.js',
          language: 'jsx',
          code: "import Profile from './Profile.js';\n\nexport default function Gallery() {\n  return (\n    <section>\n      <h1>Amazing scientists</h1>\n      <Profile />\n      <Profile />\n      <Profile />\n    </section>\n  );\n}",
        },
      },
      {
        type: 'code',
        code: {
          filename: 'Profile.js',
          language: 'jsx',
          code: 'export default function Profile() {\n  return (\n    <img\n      src="https://react.dev/images/docs/scientists/QIrZWGIs.jpg"\n      alt="Alan L. Hart"\n    />\n  );\n}',
        },
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
