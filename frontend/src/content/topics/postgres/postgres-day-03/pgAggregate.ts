import type { ContentTopic } from '../../../types';

export const pgaggregateTopics = {
  pgaggregate: {
    id: 'pgaggregate',
    heading: 'Aggregate Functions',
    blocks: [
      {
        type: 'paragraph',
        text: 'Like most other relational database products, PostgreSQL supports aggregate functions. An aggregate function computes a single result from multiple input rows. For example, there are aggregates to compute the count, sum, avg (average), max (maximum) and min (minimum) over a set of rows.',
      },
      {
        type: 'paragraph',
        text: 'As an example, we can find the highest low-temperature reading anywhere with:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: 'SELECT max(temp_lo) FROM weather;',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: ' max\n-----\n  46\n(1 row)',
        },
      },
      {
        type: 'paragraph',
        text: 'If we wanted to know what city (or cities) that reading occurred in, we might try:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: 'SELECT city FROM weather WHERE temp_lo = max(temp_lo);     -- WRONG',
        },
      },
      {
        type: 'paragraph',
        text: 'but this will not work since the aggregate max cannot be used in the WHERE clause. (This restriction exists because the WHERE clause determines which rows will be included in the aggregate calculation; so obviously it has to be evaluated before aggregate functions are computed.) However, as is often the case the query can be restated to accomplish the desired result, here by using a subquery:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: 'SELECT city FROM weather\n    WHERE temp_lo = (SELECT max(temp_lo) FROM weather);',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: '     city\n---------------\n San Francisco\n(1 row)',
        },
      },
      {
        type: 'paragraph',
        text: 'This is OK because the subquery is an independent computation that computes its own aggregate separately from what is happening in the outer query.',
      },
      {
        type: 'paragraph',
        text: 'Aggregates are also very useful in combination with GROUP BY clauses. For example, we can get the number of readings and the maximum low temperature observed in each city with:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: 'SELECT city, count(*), max(temp_lo)\n    FROM weather\n    GROUP BY city;',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: '     city      | count | max\n---------------+-------+-----\n Hayward       |     1 |  37\n San Francisco |     2 |  46\n(2 rows)',
        },
      },
      {
        type: 'paragraph',
        text: 'which gives us one output row per city. Each aggregate result is computed over the table rows matching that city. We can filter these grouped rows using HAVING:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: 'SELECT city, count(*), max(temp_lo)\n    FROM weather\n    GROUP BY city\n    HAVING max(temp_lo) < 40;',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: '  city   | count | max\n---------+-------+-----\n Hayward |     1 |  37\n(1 row)',
        },
      },
      {
        type: 'paragraph',
        text: 'which gives us the same results for only the cities that have all temp_lo values below 40. Finally, if we only care about cities whose names begin with “S”, we might do:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: "SELECT city, count(*), max(temp_lo)\n    FROM weather\n    WHERE city LIKE 'S%'            -- (1)\n    GROUP BY city;",
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: '     city      | count | max\n---------------+-------+-----\n San Francisco |     2 |  46\n(1 row)',
        },
      },
      {
        type: 'paragraph',
        text: "It is important to understand the interaction between aggregates and SQL's WHERE and HAVING clauses. The fundamental difference between WHERE and HAVING is this: WHERE selects input rows before groups and aggregates are computed (thus, it controls which rows go into the aggregate computation), whereas HAVING selects group rows after groups and aggregates are computed. Thus, the WHERE clause must not contain aggregate functions; it makes no sense to try to use an aggregate to determine which rows will be inputs to the aggregates. On the other hand, the HAVING clause always contains aggregate functions. (Strictly speaking, you are allowed to write a HAVING clause that doesn't use aggregates, but it's seldom useful. The same condition could be used more efficiently at the WHERE stage.)",
      },
      {
        type: 'paragraph',
        text: 'In the previous example, we can apply the city name restriction in WHERE, since it needs no aggregate. This is more efficient than adding the restriction to HAVING, because we avoid doing the grouping and aggregate calculations for all rows that fail the WHERE check.',
      },
      {
        type: 'paragraph',
        text: 'Another way to select the rows that go into an aggregate computation is to use FILTER, which is a per-aggregate option:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: 'SELECT city, count(*) FILTER (WHERE temp_lo < 45), max(temp_lo)\n    FROM weather\n    GROUP BY city;',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: '     city      | count | max\n---------------+-------+-----\n Hayward       |     1 |  37\n San Francisco |     1 |  46\n(2 rows)',
        },
      },
      {
        type: 'paragraph',
        text: 'FILTER is much like WHERE, except that it removes rows only from the input of the particular aggregate function that it is attached to. Here, the count aggregate counts only rows with temp_lo below 45; but the max aggregate is still applied to all rows, so it still finds the reading of 46.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
