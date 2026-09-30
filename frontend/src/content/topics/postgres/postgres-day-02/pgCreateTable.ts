import type { ContentTopic } from '../../../types';

export const pgcreatetableTopics = {
  pgcreatetable: {
    id: 'pgcreatetable',
    heading: 'Creating a New Table',
    blocks: [
      {
        type: 'paragraph',
        text: 'You can create a new table by specifying the table name, along with all column names and their types:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: 'CREATE TABLE weather (\n    city            varchar(80),\n    temp_lo         int,           -- low temperature\n    temp_hi         int,           -- high temperature\n    prcp            real,          -- precipitation\n    date            date\n);',
        },
      },
      {
        type: 'paragraph',
        text: 'You can enter this into psql with the line breaks. psql will recognize that the command is not terminated until the semicolon.',
      },
      {
        type: 'paragraph',
        text: 'White space (i.e., spaces, tabs, and newlines) can be used freely in SQL commands. That means you can type the command aligned differently than above, or even all on one line. Two dashes (“--”) introduce comments. Whatever follows them is ignored up to the end of the line. SQL is case-insensitive about key words and identifiers, except when identifiers are double-quoted to preserve the case (not done above).',
      },
      {
        type: 'paragraph',
        text: 'varchar(80) specifies a data type that can store arbitrary character strings up to 80 characters in length. int is the normal integer type. real is a type for storing single precision floating-point numbers. date should be self-explanatory. (Yes, the column of type date is also named date. This might be convenient or confusing — you choose.)',
      },
      {
        type: 'paragraph',
        text: 'PostgreSQL supports the standard SQL types int, smallint, real, double precision, char(_`N`_), varchar(_`N`_), date, time, timestamp, and interval, as well as other types of general utility and a rich set of geometric types. PostgreSQL can be customized with an arbitrary number of user-defined data types. Consequently, type names are not key words in the syntax, except where required to support special cases in the SQL standard.',
      },
      {
        type: 'paragraph',
        text: 'The second example will store cities and their associated geographical location:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: 'CREATE TABLE cities (\n    name            varchar(80),\n    location        point\n);',
        },
      },
      {
        type: 'paragraph',
        text: 'The point type is an example of a PostgreSQL-specific data type.',
      },
      {
        type: 'paragraph',
        text: "Finally, it should be mentioned that if you don't need a table any longer or want to recreate it differently you can remove it using the following command:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: 'DROP TABLE tablename;',
        },
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
