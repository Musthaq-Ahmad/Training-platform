import type { ContentTopic } from '../../../types';

export const reactupdatingarraysinstateTopics = {
  reactupdatingarraysinstate: {
    id: 'reactupdatingarraysinstate',
    heading: 'Updating Arrays in State',
    blocks: [
      {
        type: 'paragraph',
        text: 'Arrays are another type of mutable JavaScript objects you can store in state and should treat as read-only. Just like with objects, when you want to update an array stored in state, you need to create a new one (or make a copy of an existing one), and then set state to use the new array:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import { useState } from 'react';\n\nconst initialList = [\n  { id: 0, title: 'Big Bellies', seen: false },\n  { id: 1, title: 'Lunar Landscape', seen: false },\n  { id: 2, title: 'Terracotta Army', seen: true },\n];\n\nexport default function BucketList() {\n  const [list, setList] = useState(\n    initialList\n  );\n\n  function handleToggle(artworkId, nextSeen) {\n    setList(list.map(artwork => {\n      if (artwork.id === artworkId) {\n        return { ...artwork, seen: nextSeen };\n      } else {\n        return artwork;\n      }\n    }));\n  }\n\n  return (\n    <>\n      <h1>Art Bucket List</h1>\n      <h2>My list of art to see:</h2>\n      <ItemList\n        artworks={list}\n        onToggle={handleToggle} />\n    </>\n  );\n}\n\nfunction ItemList({ artworks, onToggle }) {\n  return (\n    <ul>\n      {artworks.map(artwork => (\n        <li key={artwork.id}>\n          <label>\n            <input\n              type=\"checkbox\"\n              checked={artwork.seen}\n              onChange={e => {\n                onToggle(\n                  artwork.id,\n                  e.target.checked\n                );\n              }}\n            />\n            {artwork.title}\n          </label>\n        </li>\n      ))}\n    </ul>\n  );\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'If copying arrays in code gets tedious, you can use a library like Immer to reduce repetitive code:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: '{\n  "dependencies": {\n    "immer": "1.7.3",\n    "react": "latest",\n    "react-dom": "latest",\n    "react-scripts": "latest",\n    "use-immer": "0.5.1"\n  },\n  "scripts": {\n    "start": "react-scripts start",\n    "build": "react-scripts build",\n    "test": "react-scripts test --env=jsdom",\n    "eject": "react-scripts eject"\n  },\n  "devDependencies": {}\n}',
        },
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
