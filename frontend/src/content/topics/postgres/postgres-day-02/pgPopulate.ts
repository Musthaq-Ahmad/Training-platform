import type { ContentTopic } from '../../../types';

export const pgpopulateTopics = {
  pgpopulate: {
    id: 'pgpopulate',
    heading: 'Populating a Table With Rows',
    blocks: [
      {
        type: 'paragraph',
        text: 'The INSERT statement is used to populate a table with rows:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: "INSERT INTO weather VALUES ('San Francisco', 46, 50, 0.25, '1994-11-27');",
        },
      },
      {
        type: 'paragraph',
        text: "Note that all data types use rather obvious input formats. Constants that are not simple numeric values usually must be surrounded by single quotes ('), as in the example. The date type is actually quite flexible in what it accepts, but for this tutorial we will stick to the unambiguous format shown here.",
      },
      {
        type: 'paragraph',
        text: 'The point type requires a coordinate pair as input, as shown here:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: "INSERT INTO cities VALUES ('San Francisco', '(-194.0, 53.0)');",
        },
      },
      {
        type: 'paragraph',
        text: 'The syntax used so far requires you to remember the order of the columns. An alternative syntax allows you to list the columns explicitly:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: "INSERT INTO weather (city, temp_lo, temp_hi, prcp, date)\n    VALUES ('San Francisco', 43, 57, 0.0, '1994-11-29');",
        },
      },
      {
        type: 'paragraph',
        text: 'You can list the columns in a different order if you wish or even omit some columns, e.g., if the precipitation is unknown:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: "INSERT INTO weather (date, city, temp_hi, temp_lo)\n    VALUES ('1994-11-29', 'Hayward', 54, 37);",
        },
      },
      {
        type: 'paragraph',
        text: 'Many developers consider explicitly listing the columns better style than relying on the order implicitly.',
      },
      {
        type: 'paragraph',
        text: 'Please enter all the commands shown above so you have some data to work with in the following sections.',
      },
      {
        type: 'paragraph',
        text: 'You could also have used COPY to load large amounts of data from flat-text files. This is usually faster because the COPY command is optimized for this application while allowing less flexibility than INSERT. An example would be:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: "COPY weather FROM '/home/user/weather.txt';",
        },
      },
      {
        type: 'paragraph',
        text: 'where the file name for the source file must be available on the machine running the backend process, not the client, since the backend process reads the file directly. The data inserted above into the weather table could also be inserted from a file containing (values are separated by a tab character):',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: 'San Francisco    46    50    0.25    1994-11-27\nSan Francisco    43    57    0.0    1994-11-29\nHayward    37    54    \\N    1994-11-29',
        },
      },
      {
        type: 'paragraph',
        text: 'You can read more about the COPY command in COPY.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
