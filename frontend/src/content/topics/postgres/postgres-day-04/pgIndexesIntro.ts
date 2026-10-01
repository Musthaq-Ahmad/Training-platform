import type { ContentTopic } from '../../../types';

export const pgindexesintroTopics = {
  pgindexesintro: {
    id: 'pgindexesintro',
    heading: 'Indexes: Introduction',
    blocks: [
      {
        type: 'paragraph',
        text: 'Suppose we have a table similar to this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: 'CREATE TABLE test1 (\n    id integer,\n    content varchar\n);',
        },
      },
      {
        type: 'paragraph',
        text: 'and the application issues many queries of the form:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: 'SELECT content FROM test1 WHERE id = constant;',
        },
      },
      {
        type: 'paragraph',
        text: 'With no advance preparation, the system would have to scan the entire test1 table, row by row, to find all matching entries. If there are many rows in test1 and only a few rows (perhaps zero or one) that would be returned by such a query, this is clearly an inefficient method. But if the system has been instructed to maintain an index on the id column, it can use a more efficient method for locating matching rows. For instance, it might only have to walk a few levels deep into a search tree.',
      },
      {
        type: 'paragraph',
        text: 'A similar approach is used in most non-fiction books: terms and concepts that are frequently looked up by readers are collected in an alphabetic index at the end of the book. The interested reader can scan the index relatively quickly and flip to the appropriate page(s), rather than having to read the entire book to find the material of interest. Just as it is the task of the author to anticipate the items that readers are likely to look up, it is the task of the database programmer to foresee which indexes will be useful.',
      },
      {
        type: 'paragraph',
        text: 'The following command can be used to create an index on the id column, as discussed:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: 'CREATE INDEX test1_id_index ON test1 (id);',
        },
      },
      {
        type: 'paragraph',
        text: 'The name test1_id_index can be chosen freely, but you should pick something that enables you to remember later what the index was for.',
      },
      {
        type: 'paragraph',
        text: 'To remove an index, use the DROP INDEX command. Indexes can be added to and removed from tables at any time.',
      },
      {
        type: 'paragraph',
        text: 'Once an index is created, no further intervention is required: the system will update the index when the table is modified, and it will use the index in queries when it thinks doing so would be more efficient than a sequential table scan. But you might have to run the ANALYZE command regularly to update statistics to allow the query planner to make educated decisions. See Chapter 14 for information about how to find out whether an index is used and when and why the planner might choose not to use an index.',
      },
      {
        type: 'paragraph',
        text: 'Indexes can also benefit UPDATE and DELETE commands with search conditions. Indexes can moreover be used in join searches. Thus, an index defined on a column that is part of a join condition can also significantly speed up queries with joins.',
      },
      {
        type: 'paragraph',
        text: 'In general, PostgreSQL indexes can be used to optimize queries that contain one or more WHERE or JOIN clauses of the form',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: 'indexed-column indexable-operator comparison-value',
        },
      },
      {
        type: 'paragraph',
        text: "Here, the indexed-column is whatever column or expression the index has been defined on. The indexable-operator is an operator that is a member of the index's operator class for the indexed column. (More details about that appear below.) And the comparison-value can be any expression that is not volatile and does not reference the index's table.",
      },
      {
        type: 'paragraph',
        text: 'In some cases the query planner can extract an indexable clause of this form from another SQL construct. A simple example is that if the original clause was',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: 'comparison-value operator indexed-column',
        },
      },
      {
        type: 'paragraph',
        text: "then it can be flipped around into indexable form if the original operator has a commutator operator that is a member of the index's operator class.",
      },
      {
        type: 'paragraph',
        text: 'Creating an index on a large table can take a long time. By default, PostgreSQL allows reads (SELECT statements) to occur on the table in parallel with index creation, but writes (INSERT, UPDATE, DELETE) are blocked until the index build is finished. In production environments this is often unacceptable. It is possible to allow writes to occur in parallel with index creation, but there are several caveats to be aware of — for more information see Building Indexes Concurrently.',
      },
      {
        type: 'paragraph',
        text: 'After an index is created, the system has to keep it synchronized with the table. This adds overhead to data manipulation operations. Indexes can also prevent the creation of heap-only tuples. Therefore indexes that are seldom or never used in queries should be removed.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
