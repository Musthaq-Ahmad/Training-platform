import type { ContentTopic } from '../../../types';

export const pgsqlintroTopics = {
  pgsqlintro: {
    id: 'pgsqlintro',
    heading: 'Introduction to SQL',
    blocks: [
      {
        type: 'paragraph',
        text: 'This chapter provides an overview of how to use SQL to perform simple operations. This tutorial is only intended to give you an introduction and is in no way a complete tutorial on SQL. Numerous books have been written on SQL, including [melt93] and [date97]. You should be aware that some PostgreSQL language features are extensions to the standard.',
      },
      {
        type: 'paragraph',
        text: 'In the examples that follow, we assume that you have created a database named mydb, as described in the previous chapter, and have been able to start psql.',
      },
      {
        type: 'paragraph',
        text: 'Examples in this manual can also be found in the PostgreSQL source distribution in the directory src/tutorial/. (Binary distributions of PostgreSQL might not provide those files.) To use those files, first change to that directory and run make:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ cd .../src/tutorial\n$ make',
        },
      },
      {
        type: 'paragraph',
        text: 'This creates the scripts and compiles the C files containing user-defined functions and types. Then, to start the tutorial, do the following:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ psql -s mydb\n\n...\n\nmydb=> \\i basics.sql',
        },
      },
      {
        type: 'paragraph',
        text: "The \\i command reads in commands from the specified file. psql's -s option puts you in single step mode which pauses before sending each statement to the server. The commands used in this section are in the file basics.sql.",
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
