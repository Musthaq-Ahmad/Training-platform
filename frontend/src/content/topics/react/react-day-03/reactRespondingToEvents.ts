import type { ContentTopic } from '../../../types';

export const reactrespondingtoeventsTopics = {
  reactrespondingtoevents: {
    id: 'reactrespondingtoevents',
    heading: 'Responding to Events',
    blocks: [
      {
        type: 'paragraph',
        text: 'React lets you add event handlers to your JSX. Event handlers are your own functions that will be triggered in response to user interactions like clicking, hovering, focusing on form inputs, and so on.',
      },
      {
        type: 'paragraph',
        text: 'Built-in components like <button> only support built-in browser events like onClick. However, you can also create your own components, and give their event handler props any application-specific names that you like.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "export default function App() {\n  return (\n    <Toolbar\n      onPlayMovie={() => alert('Playing!')}\n      onUploadImage={() => alert('Uploading!')}\n    />\n  );\n}\n\nfunction Toolbar({ onPlayMovie, onUploadImage }) {\n  return (\n    <div>\n      <Button onClick={onPlayMovie}>\n        Play Movie\n      </Button>\n      <Button onClick={onUploadImage}>\n        Upload Image\n      </Button>\n    </div>\n  );\n}\n\nfunction Button({ onClick, children }) {\n  return (\n    <button onClick={onClick}>\n      {children}\n    </button>\n  );\n}",
        },
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
