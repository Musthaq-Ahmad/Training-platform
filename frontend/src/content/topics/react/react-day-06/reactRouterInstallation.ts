import type { ContentTopic } from '../../../types';

export const reactrouterinstallationTopics = {
  reactrouterinstallation: {
    id: 'reactrouterinstallation',
    heading: 'React Router Installation',
    blocks: [
      {
        type: 'list',
        ordered: false,
        items: ['Framework', 'Data', 'Declarative'],
      },
      {
        type: 'paragraph',
        text: 'You can start with a React template from Vite and choose "React", otherwise bootstrap your application however you prefer.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: 'npx create-vite@latest',
        },
      },
      {
        type: 'paragraph',
        text: 'Next install React Router from npm:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: 'npm i react-router',
        },
      },
      {
        type: 'paragraph',
        text: 'Finally, render a <BrowserRouter> around your application:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'import React from "react";\nimport ReactDOM from "react-dom/client";\nimport { BrowserRouter } from "react-router";\nimport App from "./app";\n\nconst root = document.getElementById("root");\n\nReactDOM.createRoot(root).render(\n  <BrowserRouter>\n    <App />\n  </BrowserRouter>,\n);',
        },
      },
      {
        type: 'paragraph',
        text: 'Next: Routing',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
