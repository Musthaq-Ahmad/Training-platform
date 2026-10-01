import type { ContentTopic } from '../../../types';

export const reactrenderinglistsTopics = {
  reactrenderinglists: {
    id: 'reactrenderinglists',
    heading: 'Rendering Lists',
    blocks: [
      {
        type: 'paragraph',
        text: 'You will often want to display multiple similar components from a collection of data. You can use JavaScript’s filter() and map() with React to filter and transform your array of data into an array of components.',
      },
      {
        type: 'paragraph',
        text: 'For each array item, you will need to specify a key. Usually, you will want to use an ID from the database as a key. Keys let React keep track of each item’s place in the list even if the list changes.',
      },
      {
        type: 'code',
        code: {
          filename: 'App.js',
          language: 'jsx',
          code: "import { people } from './data.js';\nimport { getImageUrl } from './utils.js';\n\nexport default function List() {\n  const listItems = people.map(person =>\n    <li key={person.id}>\n      <img\n        src={getImageUrl(person)}\n        alt={person.name}\n      />\n      <p>\n        <b>{person.name}:</b>\n        {' ' + person.profession + ' '}\n        known for {person.accomplishment}\n      </p>\n    </li>\n  );\n  return (\n    <article>\n      <h1>Scientists</h1>\n      <ul>{listItems}</ul>\n    </article>\n  );\n}",
        },
      },
      {
        type: 'code',
        code: {
          filename: 'data.js',
          language: 'jsx',
          code: "export const people = [{\n  id: 0,\n  name: 'Creola Katherine Johnson',\n  profession: 'mathematician',\n  accomplishment: 'spaceflight calculations',\n  imageId: 'MK3eW3A'\n}, {\n  id: 1,\n  name: 'Mario José Molina-Pasquel Henríquez',\n  profession: 'chemist',\n  accomplishment: 'discovery of Arctic ozone hole',\n  imageId: 'mynHUSa'\n}, {\n  id: 2,\n  name: 'Mohammad Abdus Salam',\n  profession: 'physicist',\n  accomplishment: 'electromagnetism theory',\n  imageId: 'bE7W1ji'\n}, {\n  id: 3,\n  name: 'Percy Lavon Julian',\n  profession: 'chemist',\n  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',\n  imageId: 'IOjWm71'\n}, {\n  id: 4,\n  name: 'Subrahmanyan Chandrasekhar',\n  profession: 'astrophysicist',\n  accomplishment: 'white dwarf star mass calculations',\n  imageId: 'lrWQx8l'\n}];",
        },
      },
      {
        type: 'code',
        code: {
          filename: 'utils.js',
          language: 'jsx',
          code: "export function getImageUrl(person, size = 's') {\n  return (\n    'https://react.dev/images/docs/scientists/' +\n    person.imageId +\n    size +\n    '.jpg'\n  );\n}",
        },
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
