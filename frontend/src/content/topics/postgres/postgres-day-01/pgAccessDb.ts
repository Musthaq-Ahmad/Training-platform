import type { ContentTopic } from '../../../types';

export const pgaccessdbTopics = {
  pgaccessdb: {
    id: 'pgaccessdb',
    heading: 'Accessing a Database',
    blocks: [
      {
        type: 'paragraph',
        text: 'Once you have created a database, you can access it by:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Running the PostgreSQL interactive terminal program, called psql, which allows you to interactively enter, edit, and execute SQL commands.',
          'Using an existing graphical frontend tool like pgAdmin or an office suite with ODBC or JDBC support to create and manipulate a database. These possibilities are not covered in this tutorial.',
          'Writing a custom application, using one of the several available language bindings. These possibilities are discussed further in Part IV.',
        ],
      },
      {
        type: 'paragraph',
        text: 'You probably want to start up psql to try the examples in this tutorial. It can be activated for the mydb database by typing the command:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ psql mydb',
        },
      },
      {
        type: 'paragraph',
        text: 'If you do not supply the database name then it will default to your user account name. You already discovered this scheme in the previous section using createdb.',
      },
      {
        type: 'paragraph',
        text: 'In psql, you will be greeted with the following message:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: 'psql (18.6)\nType "help" for help.\n\nmydb=>',
        },
      },
      {
        type: 'paragraph',
        text: 'The last line could also be:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: 'mydb=#',
        },
      },
      {
        type: 'paragraph',
        text: 'That would mean you are a database superuser, which is most likely the case if you installed the PostgreSQL instance yourself. Being a superuser means that you are not subject to access controls. For the purposes of this tutorial that is not important.',
      },
      {
        type: 'paragraph',
        text: 'If you encounter problems starting psql then go back to the previous section. The diagnostics of createdb and psql are similar, and if the former worked the latter should work as well.',
      },
      {
        type: 'paragraph',
        text: 'The last line printed out by psql is the prompt, and it indicates that psql is listening to you and that you can type SQL queries into a work space maintained by psql. Try out these commands:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: 'mydb=> SELECT version();\n                                         version\n-------------------------------------------------------------------​-----------------------\n PostgreSQL 18.6 on x86_64-pc-linux-gnu, compiled by gcc (Debian 4.9.2-10) 4.9.2, 64-bit\n(1 row)\n\nmydb=> SELECT current_date;\n    date\n------------\n 2016-01-07\n(1 row)\n\nmydb=> SELECT 2 + 2;\n ?column?\n----------\n        4\n(1 row)',
        },
      },
      {
        type: 'paragraph',
        text: 'The psql program has a number of internal commands that are not SQL commands. They begin with the backslash character, “\\”. For example, you can get help on the syntax of various PostgreSQL SQL commands by typing:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: 'mydb=> \\h',
        },
      },
      {
        type: 'paragraph',
        text: 'To get out of psql, type:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: 'mydb=> \\q',
        },
      },
      {
        type: 'paragraph',
        text: 'and psql will quit and return you to your command shell. (For more internal commands, type \\? at the psql prompt.) The full capabilities of psql are documented in psql. In this tutorial we will not use these features explicitly, but you can use them yourself when it is helpful.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
