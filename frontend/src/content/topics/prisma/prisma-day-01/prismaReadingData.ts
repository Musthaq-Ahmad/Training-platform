import type { ContentTopic } from '../../../types';

export const prismareadingdataTopics = {
  prismareadingdata: {
    id: 'prismareadingdata',
    heading: 'Reading Data',
    blocks: [
      {
        type: 'paragraph',
        text: 'This page shows how to read data with Prisma ORM: fetching many records or one, filtering, selecting fields, sorting and paginating, counting, and iterating large results.',
      },
      {
        type: 'paragraph',
        text: 'Every query chains methods on a model, and the last call in the chain says what you want back and runs the query, usually .all() or .first():',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'import { db } from "./prisma/db";\n\n// Every published post\nconst posts = await db.orm.public.Post.where({ published: true }).all();\n\n// One user, or null\nconst user = await db.orm.public.User.where({ email: "alice@prisma.io" }).first();',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'import { db } from "./prisma/db";\n\n// Every published post\nconst posts = await db.orm.posts.where({ published: true }).all();\n\n// One user, or null\nconst user = await db.orm.users.where({ email: "alice@prisma.io" }).first();',
        },
      },
      {
        type: 'paragraph',
        text: 'npm create prisma@latest scaffolds a new project, while npx prisma orm init adds Prisma ORM to a project you already have.',
      },
      {
        type: 'paragraph',
        text: 'Your contract is the contract.prisma file that replaced schema.prisma: it is where you declare your models, and every result on this page is typed from it. See Core concepts for how the contract and the client fit together.',
      },
      {
        type: 'paragraph',
        text: "db is the client you create once in src/prisma/db.ts, and npx prisma orm init writes that file for you. Commit it; unlike Prisma ORM 7's generated client, it is your code. db.ts reads two generated files that npx prisma contract emit writes next to it; you do not edit those. These examples are written from a file in src/, so the import is ./prisma/db; from elsewhere, change the relative path.",
      },
      {
        type: 'paragraph',
        text: 'db.orm holds your models. On PostgreSQL you reach a model through the database schema it is in: in db.orm.public.User, User is the model name and public is the PostgreSQL schema. It is public unless the model sits in a namespace block in your contract; see Coming from Prisma ORM 7. On MongoDB there is no schema segment, and the name is the collection: db.orm.users.',
      },
      {
        type: 'paragraph',
        text: 'You can write .where, .select, .orderBy, .limit, and .offset in any order, but .cursor(...) must come after .orderBy(...).',
      },
      {
        type: 'paragraph',
        text: 'For Prisma ORM 7 users, findMany and findFirst / findUnique map directly onto .all() and .first() (Coming from Prisma ORM 7 maps the rest of the API):',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'diff',
          code: '- const posts = await prisma.post.findMany({ where: { published: true } });\n+ const posts = await db.orm.public.Post.where({ published: true }).all();\n\n- const user = await prisma.user.findUnique({ where: { email } });\n+ const user = await db.orm.public.User.where({ email }).first();\n\n- const page = await prisma.post.findMany({ take: 20, skip: 20 });\n+ const page = await db.orm.public.Post.limit(20).offset(20).all();',
        },
      },
      {
        type: 'paragraph',
        text: '.first() asks the database for one row. findUnique and findFirst both become .first(), so if several records match you get one of them, in no guaranteed order; add .orderBy(...) to choose.',
      },
      {
        type: 'paragraph',
        text: 'All examples on this page are based on the contract below. The file is contract.prisma, and it is still written in the Prisma schema language, so it looks like the schema.prisma you already know. @default(cuid(2)) generates a CUID version 2 id.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'graphql',
          code: 'model User {\n  id        String   @id @default(cuid(2))\n  email     String   @unique\n  name      String?\n  createdAt DateTime @default(now())\n  posts     Post[]\n}\n\nmodel Post {\n  id        String   @id @default(cuid(2))\n  title     String\n  content   String?\n  published Boolean\n  authorId  String\n  author    User     @relation(fields: [authorId], references: [id])\n  createdAt DateTime @default(now())\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'graphql',
          code: 'model User {\n  id        ObjectId @id @map("_id")\n  email     String   @unique\n  name      String?\n  createdAt Date\n  posts     Post[]\n  @@map("users")\n}\n\nmodel Post {\n  id        ObjectId @id @map("_id")\n  title     String\n  content   String?\n  published Bool\n  author    User     @relation(fields: [authorId], references: [id])\n  authorId  ObjectId\n  createdAt Date\n  @@map("posts")\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'On MongoDB, @map("_id") renames the field to _id everywhere: you filter on _id, you select _id, and the returned document has an _id key. That is why the MongoDB examples below never say id.',
      },
      {
        type: 'paragraph',
        text: 'Use .all() when you want every matching record. It returns an array:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const users = await db.orm.public.User.all();',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "[\n  { id: 'cuid20000000000000000001', email: 'alice@prisma.io', name: 'Alice', createdAt: 2026-07-06T09:03:13.808Z },\n  { id: 'cuid20000000000000000002', email: 'bob@prisma.io', name: 'Bob', createdAt: 2026-07-06T09:03:14.112Z }\n]",
        },
      },
      {
        type: 'paragraph',
        text: '.all() takes no filter of its own, so put the filter in .where(...) before it. .all() also applies no limit, so combine it with limit on tables that can grow.',
      },
      {
        type: 'paragraph',
        text: 'Use .first() when you want a single record. It returns the record, or null when nothing matches, and on both databases it asks for at most one row:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const user = await db.orm.public.User.where({ email: "alice@prisma.io" }).first();',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "{ id: 'cuid20000000000000000001', email: 'alice@prisma.io', name: 'Alice', createdAt: 2026-07-06T09:03:13.808Z }",
        },
      },
      {
        type: 'paragraph',
        text: 'On PostgreSQL you can skip .where(...) and pass the filter straight to .first(...), which takes anything .where(...) takes, not just the primary key. On MongoDB, .first() takes no argument, so filter with .where(...):',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const user = await db.orm.public.User.first({ id: userId });',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const user = await db.orm.users.where({ _id: userId }).first();',
        },
      },
      {
        type: 'paragraph',
        text: 'If you want an error instead of null when nothing matches, call .firstOrThrow(), the replacement for findUniqueOrThrow and findFirstOrThrow:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const user = await db.orm.public.User.where({ email }).limit(1).all().firstOrThrow();',
        },
      },
      {
        type: 'paragraph',
        text: '.limit(1) keeps it to one row, and .firstOrThrow() throws an error with code RUNTIME.NO_ROWS when nothing matches. There is no .firstOrThrow() on .first(). The error is an Error with a code property, so check "code" in error before you read it. The same form works on MongoDB, with db.orm.users.',
      },
      {
        type: 'paragraph',
        text: 'Use .where(...) to narrow a query, and pass an object to match fields by equality:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const drafts = await db.orm.public.Post.where({ published: false }).all();',
        },
      },
      {
        type: 'paragraph',
        text: 'Chain several .where(...) calls to combine conditions with AND, which is also how you express a range:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const recentPosts = await db.orm.public.Post\n  .where((p) => p.createdAt.gte(start))\n  .where((p) => p.createdAt.lte(end))\n  .all();',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Filter operators on PostgreSQL',
      },
      {
        type: 'paragraph',
        text: 'On PostgreSQL, .where(...) also accepts a callback for richer comparisons, as in the range example above. The callback receives one object, written p here, with a property per field of your model. Each of those fields has .eq, .neq, .lt, .lte, .gt, .gte, .like, .ilike, .in([...]), .notIn([...]), .isNull(), and .isNotNull(), as far as its type supports them: a native enum field (pg.enum(...)), for example, has no .like or .ilike. .like and .ilike take SQL LIKE patterns, where % matches any run of characters. For search over words rather than patterns, text fields also have PostgreSQL full-text search:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '// Case-insensitive text search\nconst matchingPosts = await db.orm.public.Post\n  .where((p) => p.title.ilike("%prisma%"))\n  .all();\n\n// One of several values\nconst team = await db.orm.public.User\n  .where((u) => u.email.in(["alice@prisma.io", "bob@prisma.io"]))\n  .all();',
        },
      },
      {
        type: 'paragraph',
        text: 'To combine conditions with OR, AND, or NOT, use the or, and, and not helpers from @prisma/orm-postgres/orm-client. @prisma/orm-postgres is already installed; it is the package db.ts imports from:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'import { and, not, or } from "@prisma/orm-postgres/orm-client";\n\nconst highlighted = await db.orm.public.Post\n  .where((p) => or(p.title.ilike("%hello%"), p.title.ilike("%prisma%")))\n  .all();\n\nconst publishedPrismaPosts = await db.orm.public.Post\n  .where((p) => and(p.published.eq(true), p.title.ilike("%prisma%")))\n  .all();\n\nconst notHello = await db.orm.public.Post\n  .where((p) => not(p.title.eq("Hello")))\n  .all();',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Filter operators on MongoDB',
      },
      {
        type: 'paragraph',
        text: 'On MongoDB, .where(...) does not take a callback, but the object form covers equality:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const drafts = await db.orm.posts.where({ published: false }).all();',
        },
      },
      {
        type: 'paragraph',
        text: 'For anything else, pass .where(...) a filter built with MongoFieldFilter, imported from @prisma/orm-mongo/query-ast/execution. @prisma/orm-mongo is the package db.ts imports from. MongoFieldFilter has one static method per operator: eq, neq, gt, gte, lt, lte, in, nin (not in), isNull, and isNotNull, and each one takes the field name first:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'import { MongoFieldFilter } from "@prisma/orm-mongo/query-ast/execution";\n\nconst junePosts = await db.orm.posts\n  .where(MongoFieldFilter.gte("createdAt", new Date("2026-06-01")))\n  .where(MongoFieldFilter.lt("createdAt", new Date("2026-07-01")))\n  .all();',
        },
      },
      {
        type: 'paragraph',
        text: 'Chained .where(...) calls combine with AND, the same as on PostgreSQL. Call .not() on a filter to invert it, and use MongoOrExpr.of([...]) from the same import to combine filters with OR:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'import { MongoFieldFilter, MongoOrExpr } from "@prisma/orm-mongo/query-ast/execution";\n\nconst notAlice = await db.orm.users\n  .where(MongoFieldFilter.eq("name", "Alice").not())\n  .all();\n\nconst oldOrNew = await db.orm.posts\n  .where(\n    MongoOrExpr.of([\n      MongoFieldFilter.eq("title", "Old"),\n      MongoFieldFilter.eq("title", "New"),\n    ]),\n  )\n  .all();',
        },
      },
      {
        type: 'paragraph',
        text: 'MongoFieldFilter has no case-insensitive or partial-match operator. For those, use the pipeline builder, which has a regexMatch expression.',
      },
      {
        type: 'paragraph',
        text: 'The full operator list is in Filter conditions and operators.',
      },
      {
        type: 'paragraph',
        text: 'Use .select(...) to fetch only the fields you need. On PostgreSQL the result type narrows to match, while on MongoDB only the fetched document narrows; the type keeps every field, so a field you left out is undefined at runtime. On both, you can filter on fields you did not select:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const users = await db.orm.public.User.select("id", "email").all();',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const users = await db.orm.users.select("_id", "email").all();',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "[\n  { id: 'cuid20000000000000000001', email: 'alice@prisma.io' },\n  { id: 'cuid20000000000000000002', email: 'bob@prisma.io' }\n]",
        },
      },
      {
        type: 'paragraph',
        text: 'Use .orderBy(...) to sort, .limit(n) to limit, and .offset(n) to offset.',
      },
      {
        type: 'paragraph',
        text: "On PostgreSQL, sort with a callback that calls .asc() or .desc() on a field, and on MongoDB, sort with MongoDB's own direction numbers: 1 for ascending and -1 for descending.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '// Second page of posts, newest first\nconst page = await db.orm.public.Post\n  .orderBy((p) => p.createdAt.desc())\n  .limit(20)\n  .offset(20)\n  .all();',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '// Second page of posts, newest first\nconst page = await db.orm.posts\n  .orderBy({ createdAt: -1 })\n  .limit(20)\n  .offset(20)\n  .all();',
        },
      },
      {
        type: 'paragraph',
        text: 'For a composite sort on PostgreSQL, pass an array of callbacks, and records are sorted by the first field, with the second as tiebreaker:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const posts = await db.orm.public.Post\n  .orderBy([(p) => p.createdAt.desc(), (p) => p.id.desc()])\n  .all();',
        },
      },
      {
        type: 'paragraph',
        text: 'On PostgreSQL, a sort can also use a related record, a count, and a placement for nulls:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '// Posts by their author\'s name\nconst byAuthor = await db.orm.public.Post\n  .orderBy([(p) => p.author.name.asc(), (p) => p.id.asc()])\n  .all();\n\n// Users by how many posts they have\nconst mostPosts = await db.orm.public.User\n  .orderBy((u) => u.posts.count().desc())\n  .all();\n\n// Posts without content go last\nconst titled = await db.orm.public.Post\n  .orderBy((p) => p.content.desc({ nulls: "last" }))\n  .all();',
        },
      },
      {
        type: 'paragraph',
        text: "A relation to one record gives you that record's fields, one relation deep. A relation to many records gives you count(), which takes an optional filter, as in u.posts.count((p) => p.published.eq(true)). The orderBy() reference has the details.",
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Cursor pagination',
      },
      {
        type: 'paragraph',
        text: 'Offset gets slower on deep pages, so for stable pagination over a large table, follow .orderBy(...) with .cursor(...) and resume from the last record you returned. .cursor(...) is PostgreSQL only.',
      },
      {
        type: 'paragraph',
        text: 'The cursor record is excluded from the next page, so pages pick up strictly after it.',
      },
      {
        type: 'paragraph',
        text: 'Pass .cursor(...) a value for every field you sorted by, as in the example below. Keep the id tiebreaker in both the sort and the cursor, because createdAt is not unique, and a cursor on a non-unique field alone can skip or repeat records that share the boundary value. With id in the cursor, pages never overlap even when timestamps tie:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const page1 = await db.orm.public.Post\n  .orderBy([(p) => p.createdAt.desc(), (p) => p.id.desc()])\n  .limit(20)\n  .all();\n\nconst last = page1[page1.length - 1]!;\nconst page2 = await db.orm.public.Post\n  .orderBy([(p) => p.createdAt.desc(), (p) => p.id.desc()])\n  .cursor({ createdAt: last.createdAt, id: last.id })\n  .limit(20)\n  .all();',
        },
      },
      {
        type: 'paragraph',
        text: 'A cursor works only when every sort is a plain field of the model. With a sort by a related record, a count, an extension operation such as a vector distance, or a nulls placement, .cursor(...) throws an error whose code is ORM.ARGUMENT_INVALID, so page those queries with .limit(n) and .offset(n).',
      },
      {
        type: 'paragraph',
        text: 'On MongoDB, page with .limit(n) and .offset(n).',
      },
      {
        type: 'paragraph',
        text: 'On PostgreSQL, count with .aggregate(...). Like .all() and .first(), it is the last call in the chain: it says what you want back and runs the query. It takes a callback, written a here, and returns an object with the keys you named:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const result = await db.orm.public.Post\n  .where({ published: true })\n  .aggregate((a) => ({ total: a.count() }));',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '{ total: 2 }',
        },
      },
      {
        type: 'paragraph',
        text: 'The callback offers a.count(), a.sum(...), a.avg(...), a.min(...), and a.max(...), plus countBigInt(), sumBigInt(...), and avgDecimal(...) for values beyond a JavaScript number. All but a.count() take a field name as a string, such as a.max("createdAt"). Ask for as many as you like in one call, one key each:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const stats = await db.orm.public.Post\n  .where({ published: true })\n  .aggregate((a) => ({ total: a.count(), newest: a.max("createdAt") }));',
        },
      },
      {
        type: 'paragraph',
        text: 'There is no .count() method on the query chain, on either database.',
      },
      {
        type: 'paragraph',
        text: 'MongoDB has no .count() and no .aggregate(...). Count with the pipeline builder, db.query: .from("posts") names the collection, .count("total") counts, .build() finishes the query, and (await db.runtime()).query(...) runs it (on MongoDB db.runtime() returns a promise).',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'import { db } from "./prisma/db";\n\nconst built = db.query\n  .from("posts")\n  // .match((f) => f.published.eq(true)) counts only a subset\n  .count("total")\n  .build();\n\nconst [result] = await (await db.runtime()).query(built);',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '{ total: 2 }',
        },
      },
      {
        type: 'paragraph',
        text: 'You can await a read for an array, or loop over it with for await. Pick one; once you iterate a result with for await it is used up (see below).',
      },
      {
        type: 'paragraph',
        text: 'await runs the query and gives you an array, which is the right default: you get the whole result in memory and can read the array as often as you like.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const posts = await db.orm.public.Post.all();\n\nconsole.log(posts.length);\nconsole.log(posts[0]);',
        },
      },
      {
        type: 'paragraph',
        text: 'Use for await to handle records one at a time, as your loop asks for them, for example to write each one to a file:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'for await (const post of db.orm.public.Post.all()) {\n  await exportToSearchIndex(post);\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'It does not fetch less: on the standard client (postgres({...}) in src/prisma/db.ts) every row is loaded first. For large tables page with .limit() and .cursor() (see Sort and paginate).',
      },
      {
        type: 'paragraph',
        text: 'The serverless client, postgresServerless(...), does fetch rows as you iterate, but it has no db.orm, so none of the queries on this page run on it: see Transactions and runtime.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'An iterated result can only be read once',
      },
      {
        type: 'paragraph',
        text: 'Once a for await loop has touched a result, that result is finished, even if the loop exited early. Iterating it again, or awaiting it afterwards, throws:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const result = db.orm.public.Post.all();\n\nfor await (const post of result) {\n  // ...\n}\n\nawait result;',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'text',
          code: 'RuntimeError: AsyncIterableResult iterator has already been consumed via for-await loop.\nEach AsyncIterableResult can only be iterated once.',
        },
      },
      {
        type: 'paragraph',
        text: 'AsyncIterableResult is the type a query returns before you await it; the error means you read it twice. The error has the code RUNTIME.ITERATOR_CONSUMED.',
      },
      {
        type: 'paragraph',
        text: 'If you need the data more than once, await the query into an array and reuse the array:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const posts = await db.orm.public.Post.all();\n\nconst published = posts.filter((p) => p.published);\nconst titles = posts.map((p) => p.title);',
        },
      },
      {
        type: 'paragraph',
        text: 'The read-once rule is the same on PostgreSQL and MongoDB.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Fetching everything to use one record',
      },
      {
        type: 'paragraph',
        text: 'You wanted one record, so you queried and took the first element:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const users = await db.orm.public.User.where({ email }).all();\nconst user = users[0];',
        },
      },
      {
        type: 'paragraph',
        text: 'This fetches every matching record and throws away the rest. Use .first() instead: it returns one record or null, and it asks the database for at most one row:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const user = await db.orm.public.User.where({ email }).first();',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Forgetting that .all() has no limit',
      },
      {
        type: 'paragraph',
        text: ".all() returns every match, so on a table that grows, yesterday's fast query becomes today's slow one. Add .limit(n) when you don't genuinely need every record, and when you do need every record, page through the table: .cursor(...) on PostgreSQL, .offset(n) on MongoDB.",
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Reusing an iterated result',
      },
      {
        type: 'paragraph',
        text: 'You read a result with for await, then tried to read it again. The second read throws, because a result is used up as it is iterated. Store the data if you need it twice:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const posts = await db.orm.public.Post.all();\n// posts is a plain array now; read it as often as you like',
        },
      },
      {
        type: 'paragraph',
        text: 'Projects created with npm create prisma@latest include the Prisma ORM skills for your coding agent, and in an existing project you run npx prisma skills sync to add them. Skills are instruction files a coding agent reads, and the prisma-8 skill covers everything on this page, so try prompts that map to each section:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          '"Using the prisma-8 skill, write a query that returns the 20 newest published posts."',
          '"Add a case-insensitive title search to the posts query, using the .ilike operator."',
          '"Convert this offset pagination to cursor pagination with the .cursor() API."',
          '"This export loops over a huge table. Rewrite it to page through the rows with .limit() and .cursor()."',
        ],
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Write data: create, update, delete, and upsert records.',
          'Read related records in the same query with .include(...).',
          'Use advanced queries when a shape needs the SQL query builder or a MongoDB pipeline.',
        ],
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
