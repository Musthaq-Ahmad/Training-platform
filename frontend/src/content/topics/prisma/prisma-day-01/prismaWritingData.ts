import type { ContentTopic } from '../../../types';

export const prismawritingdataTopics = {
  prismawritingdata: {
    id: 'prismawritingdata',
    heading: 'Writing Data',
    blocks: [
      {
        type: 'paragraph',
        text: 'This page shows how to write data with Prisma ORM: creating, updating, deleting, and upserting single records, and writing many records at once.',
      },
      {
        type: 'paragraph',
        text: 'Every example imports db. In a new project run npm create prisma@latest -- my-app, and in an existing project run npx prisma orm init. Either way you get src/prisma/db.ts, which exports db, and the import is ./prisma/db from a file in src/.',
      },
      {
        type: 'paragraph',
        text: 'This page uses db.orm, which holds your models. The rest of db is db.sql for the SQL query builder, db.raw.sql for raw SQL, and db.transaction for running several writes together.',
      },
      {
        type: 'paragraph',
        text: "On PostgreSQL the path to a model is db.orm.<schema>.<ModelName>, so the User model is db.orm.public.User. public is the PostgreSQL schema that holds the model's table, and the path always includes the schema name. The schema is public unless you put the model inside a namespace block, as Example schema shows. On MongoDB there is no schema segment, and the path is db.orm.<collectionName>, where the collection name is the model's @@map(...) value, or the model name when there is no @@map. The MongoDB User model in the example schema maps to users, so it is db.orm.users.",
      },
      {
        type: 'paragraph',
        text: 'Examples use this contract. In Prisma ORM 8 the schema file is contract.prisma instead of schema.prisma; the docs call it your contract. @default(cuid(2)) means Prisma ORM generates the id for you, so you never pass one:',
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
          code: 'model User {\n  id        ObjectId @id @map("_id")\n  email     String   @unique\n  name      String?\n  createdAt Date\n  posts     Post[]\n  @@map("users")\n}\n\nmodel Post {\n  id        ObjectId @id @map("_id")\n  title     String\n  content   String?\n  published Bool\n  tags      String[]\n  author    User     @relation(fields: [authorId], references: [id])\n  authorId  ObjectId\n  createdAt Date\n  @@map("posts")\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'To put models in another PostgreSQL schema, wrap them in a namespace block:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'graphql',
          code: 'namespace billing {\n  model Invoice {\n    id     String @id @default(cuid(2))\n    amount Int\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'The model is then only at db.orm.billing.Invoice, and the block name is the PostgreSQL schema name.',
      },
      {
        type: 'paragraph',
        text: 'Use .create(...) to insert one record, and pass the fields directly. Prisma ORM returns the inserted record, including generated values such as IDs and database defaults:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'import { db } from "./prisma/db";\n\nconst user = await db.orm.public.User.create({\n  email: "jane@prisma.io",\n  name: "Jane",\n});\n// user.id and user.createdAt are filled in',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'import { db } from "./prisma/db";\n\nconst user = await db.orm.users.create({\n  email: "jane@prisma.io",\n  name: "Jane",\n  createdAt: new Date(),\n});\n// user._id is filled in by the server',
        },
      },
      {
        type: 'paragraph',
        text: 'The returned record is complete, so you can use the generated values right away (PostgreSQL shown; on MongoDB the key is _id):',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "{ id: 'cuid20000000000000000003', email: 'jane@prisma.io', name: 'Jane', createdAt: 2026-07-06T09:09:56.119Z }",
        },
      },
      {
        type: 'paragraph',
        text: 'To get back only some fields, chain .select(...) before .create(...): the record is still inserted in full, but you only get back the fields you listed:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const account = await db.orm.public.User\n  .select("id", "email")\n  .create({ email: "jane@prisma.io", name: "Jane" });',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "{ id: 'cuid20000000000000000003', email: 'jane@prisma.io' }",
        },
      },
      {
        type: 'paragraph',
        text: '.select(...) works the same before update, delete, upsert, createAll, updateAll, and deleteAll. The AndCount methods give you back a number, so .select(...) has no effect on them.',
      },
      {
        type: 'paragraph',
        text: "When a write breaks a unique constraint, the call throws, and errors have no shared class: a PostgreSQL database error carries sqlState (a five-character SQL state code), a MongoDB driver error carries a numeric code, and a Prisma ORM error carries a string code such as RUNTIME.ITERATOR_CONSUMED. On PostgreSQL, 23505 is the SQL state code for a unique violation. The error reference lists Prisma ORM's own codes:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'try {\n  await db.orm.public.User.create({ email: "jane@prisma.io", name: "Jane" });\n} catch (error) {\n  if ((error as { sqlState?: string }).sqlState === "23505") {\n    // that email is already taken\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'On MongoDB the driver throws its own error, and a duplicate key gives you an error whose error.code is 11000.',
      },
      {
        type: 'paragraph',
        text: 'MongoDB contracts do not support @default. For a timestamp, type the field temporal.createdAt() or temporal.updatedAt() and a client created by mongo() fills it in, as Field types shows. Pass any other value yourself.',
      },
      {
        type: 'paragraph',
        text: '@map("_id") renames the id field to _id everywhere, so the returned document has an _id key and not an id key.',
      },
      {
        type: 'paragraph',
        text: "To write related records in the same call, pass a callback for the relation field. The callback's argument, named p below, is the relation builder, which holds the methods that link or insert related records:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const user = await db.orm.public.User.create({\n  email: "jane@prisma.io",\n  name: "Jane",\n  posts: (p) =>\n    p.create([{ title: "First post", content: null, published: false }]),\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'You do not pass authorId on the nested posts, because Prisma ORM fills it in from the user it just inserted.',
      },
      {
        type: 'paragraph',
        text: 'connect links a record that already exists, and works in .update(...) too:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'await db.orm.public.User\n  .where({ email: "jane@prisma.io" })\n  .update({ posts: (p) => p.connect([{ id: existingPostId }]) });',
        },
      },
      {
        type: 'paragraph',
        text: 'p.disconnect(...) unlinks a related record, but it applies on .update(...) only, not on .create(...).',
      },
      {
        type: 'paragraph',
        text: 'connectOrCreate, the relation set, and nested updates, upserts, and deletes do not exist: see Not available. For the full picture of relations, see Relations and joins.',
      },
      {
        type: 'paragraph',
        text: 'Use .where(...) to pick the record, then .update(...) with the fields to change, which updates one matching record and returns it:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const updatedUser = await db.orm.public.User\n  .where({ email: "jane@prisma.io" })\n  .update({ name: "Jane Doe" });',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const updatedUser = await db.orm.users\n  .where({ email: "jane@prisma.io" })\n  .update({ name: "Jane Doe" });',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "{ id: 'cuid20000000000000000003', email: 'jane@prisma.io', name: 'Jane Doe', createdAt: 2026-07-06T09:09:56.119Z }",
        },
      },
      {
        type: 'paragraph',
        text: 'When nothing matches the filter, .update(...) returns null rather than throwing.',
      },
      {
        type: 'paragraph',
        text: 'When the filter matches more than one record, .update(...) still changes only one of the matching records, with no guaranteed order. Use updateAll or updateAndCount if you mean all of them.',
      },
      {
        type: 'paragraph',
        text: "On MongoDB you can also pass a callback instead of an object, and change a field with an operation rather than a value. The callback's argument, named p here, gives you one entry per field, and each field carries the operations you can apply to it:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'await db.orm.posts\n  .where({ title: "Draft thoughts" })\n  .update((p) => [p.content.set("Now filled in"), p.published.set(true)]);',
        },
      },
      {
        type: 'paragraph',
        text: 'The callback returns an array, so you can apply several operations in one update.',
      },
      {
        type: 'paragraph',
        text: 'set and unset work on any field, while inc and mul are on number fields only. push, pull, addToSet, and pop are for array fields, and you call them the same way: p.tags.push("news"). These field operations are MongoDB only: PostgreSQL has no callback form of update, so on PostgreSQL you pass an object. See Field update operations in the reference.',
      },
      {
        type: 'paragraph',
        text: 'There is no increment on PostgreSQL, so to add to a number in place, write the update as raw SQL. For a views Int column added to Post, db.raw.sql writes a raw statement, .affectedCount() says you want the row count back as { affectedRows }, .build() finishes it, and db.runtime().execute(...) runs it; Advanced queries explains raw SQL:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const query = db.raw.sql`UPDATE post SET views = views + 1 WHERE id = ${postId}`\n  .affectedCount()\n  .build();\nconst { affectedRows } = await db.runtime().execute(query);',
        },
      },
      {
        type: 'paragraph',
        text: 'Use .where(...) then .delete(), which deletes one matching record and returns it:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const deletedUser = await db.orm.public.User\n  .where({ email: "jane@prisma.io" })\n  .delete();',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const deletedUser = await db.orm.users\n  .where({ email: "jane@prisma.io" })\n  .delete();',
        },
      },
      {
        type: 'paragraph',
        text: '.delete() returns null when nothing matches, and deletes only one record when several match. See Update one record. To delete every match, use deleteAll or deleteAndCount.',
      },
      {
        type: 'paragraph',
        text: 'Use .upsert(...) to update a record if it exists and create it otherwise, and pass the two branches separately:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'await db.orm.public.User.upsert({\n  create: { email: "eve@prisma.io", name: "Eve" },\n  update: { name: "Eve Exists" },\n  conflictOn: { email: "eve@prisma.io" },\n});',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'await db.orm.users.where({ email: "eve@prisma.io" }).upsert({\n  create: { email: "eve@prisma.io", name: "Eve", createdAt: new Date() },\n  update: { name: "Eve Exists" },\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'conflictOn repeats the unique field and its value from create; Prisma ORM uses it to look for an existing row. For a unique constraint over several columns, pass them all in one object: conflictOn: { tenantId, email }. Without conflictOn on PostgreSQL, the upsert looks for a row by primary key, which a new record does not have, so the insert runs and fails on the unique constraint. Always pass conflictOn.',
      },
      {
        type: 'paragraph',
        text: 'On MongoDB, there is no conflictOn, so put the match in .where(...) before .upsert(...).',
      },
      {
        type: 'paragraph',
        text: 'Use the All and AndCount methods when you intend to write every record you pass, or change every record the filter matches:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const user = await db.orm.public.User.first({ email: "jane@prisma.io" });\nif (!user) throw new Error("no such user");\n// Insert many records\nconst newPosts = await db.orm.public.Post.createAll([\n  { title: "One", content: null, published: false, authorId: user.id },\n  { title: "Two", content: null, published: false, authorId: user.id },\n]);\n\n// Insert many, get back only the number inserted\nconst insertedCount = await db.orm.public.Post.createAndCount([\n  { title: "Three", content: null, published: false, authorId: user.id },\n]);\n\n// Update every match, get back only the number updated\nconst updatedCount = await db.orm.public.Post.where({ published: false }).updateAndCount({ published: true });\n\n// Delete every match, get back the deleted records\nconst deletedPosts = await db.orm.public.Post.where({ published: false }).deleteAll();\n\n// Delete every match, get back only the number deleted\nconst deletedCount = await db.orm.public.Post.where((p) => p.title.ilike("draft%")).deleteAndCount();',
        },
      },
      {
        type: 'paragraph',
        text: 'createAll gives you back the inserted records, with their generated IDs:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "[{ id: 'cuid20000000000000000101', title: 'One', published: false, /* ... */ }, { id: 'cuid20000000000000000102', title: 'Two', published: false, /* ... */ }]",
        },
      },
      {
        type: 'paragraph',
        text: 'The AndCount methods return a plain number, so if three posts match, updatedCount is 3, not an object.',
      },
      {
        type: 'paragraph',
        text: 'To insert many records and skip the ones that would break a unique constraint, pass { onConflict: "skip" } as the second argument to createAll or createAndCount. That skips a record that breaks any unique constraint on the table. To skip only the records that clash on one constraint, add conflictOn to the same object with the names of that constraint\'s fields, as in createAll(users, { onConflict: "skip", conflictOn: ["email"] }). A record that clashes on any other unique constraint is not skipped, so the database rejects the insert and the call throws a unique-constraint error. Here conflictOn takes field names, while in .upsert(...) it takes the fields and their values. This replaces Prisma ORM 7\'s skipDuplicates, and it works on PostgreSQL and SQLite. On MongoDB, createAll and createAndCount take only the records, with no second argument. createAll returns only the records the database wrote, and createAndCount counts only those. createAll() in the reference covers the details.',
      },
      {
        type: 'paragraph',
        text: '.where((p) => p.title.ilike("draft%")) is the callback form of a filter, for conditions an object cannot express. Its argument gives you one entry per field, and each field carries the comparisons you can apply to it. Reading data covers the filters you can write.',
      },
      {
        type: 'paragraph',
        text: 'The bulk methods work the same on MongoDB, on the collection: db.orm.posts. Pass createdAt in every object you give createAll, as with create.',
      },
      {
        type: 'paragraph',
        text: 'Each write comes in three forms, and you pick by what you need back:',
      },
      {
        type: 'table',
        headers: ['Form', 'What it writes', 'What you get back'],
        rows: [
          ['create, update, delete', 'one record', 'that record'],
          [
            'createAll, updateAll, deleteAll',
            'every record you pass, or every match',
            'those records',
          ],
          [
            'createAndCount, updateAndCount, deleteAndCount',
            'every record you pass, or every match',
            'the number of records written',
          ],
        ],
      },
      {
        type: 'paragraph',
        text: 'update and delete return null when nothing matches. Use the AndCount forms when the number is all you need, because they do not send the records back.',
      },
      {
        type: 'paragraph',
        text: 'The All forms return a result you can use two ways. Nothing is sent to the database until you await the result or loop over it, so an updateAll you never await changes nothing. await it for an array of records:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const publishedPosts = await db.orm.public.Post\n  .where({ published: false })\n  .updateAll({ published: true });',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "[{ id: 'cuid20000000000000000101', title: 'One', published: true, /* ... */ }, { id: 'cuid20000000000000000102', title: 'Two', published: true, /* ... */ }]",
        },
      },
      {
        type: 'paragraph',
        text: 'Or iterate it with for await to handle records as they arrive:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const updated = db.orm.public.Post.where({ published: false }).updateAll({ published: true });\n\nfor await (const post of updated) {\n  console.log(post.id);\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Pick one: await it or loop it with for await. Mixing the two throws an error whose error.code is RUNTIME.ITERATOR_CONSUMED.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Updating or deleting more than one record',
      },
      {
        type: 'paragraph',
        text: 'You filtered on a non-unique field and expected every match to change:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'await db.orm.public.Post.where({ published: false }).update({ published: true });',
        },
      },
      {
        type: 'paragraph',
        text: '.update(...) and .delete() only change one record, even when the filter matches many. See Update one record.',
      },
      {
        type: 'paragraph',
        text: 'When you intend to affect every match, say so with the bulk methods:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const updatedCount = await db.orm.public.Post\n  .where({ published: false })\n  .updateAndCount({ published: true });',
        },
      },
      {
        type: 'paragraph',
        text: 'Use updateAll or deleteAll when you also need the changed records back, and updateAndCount or deleteAndCount when the number is enough. update and delete never change more than one record, so they stay safe for the one-record case.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Wrapping create fields in a data object',
      },
      {
        type: 'paragraph',
        text: 'You wrote the Prisma ORM 7 shape, which fails type-checking because there is no field named data on your models:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'diff',
          code: '- await db.orm.public.User.create({ data: { email, name } });\n+ await db.orm.public.User.create({ email, name });',
        },
      },
      {
        type: 'paragraph',
        text: "You pass the record's own fields, and you get the record back.",
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Updating or deleting without a filter',
      },
      {
        type: 'paragraph',
        text: 'You called .update(...) or .delete() straight on the model:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'await db.orm.public.User.delete();',
        },
      },
      {
        type: 'paragraph',
        text: 'Both need a .where(...) first, and the call does not type-check without one. If you truly mean every record, pass an empty filter, which adds no condition and so matches everything. .delete() needs a .where(...) for the same reason, and .where({}) satisfies it there too:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'await db.orm.public.User.where({}).deleteAll();',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Running related writes back to back',
      },
      {
        type: 'paragraph',
        text: 'You created a user, then created their first post as a second await:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'const user = await db.orm.public.User.create({ email, name });\nconst post = await db.orm.public.Post.create({ title, published: false, authorId: user.id });',
        },
      },
      {
        type: 'paragraph',
        text: "If the second write fails, the first has already committed, and you're left with half the operation. When writes must succeed together, run them in a transaction, and inside the callback, query through tx instead of db:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'await db.transaction(async (tx) => {\n  const user = await tx.orm.public.User.create({ email, name });\n  await tx.orm.public.Post.create({ title, published: false, authorId: user.id });\n});',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Passing an array of queries to a transaction',
      },
      {
        type: 'paragraph',
        text: "Prisma ORM 7 supported $transaction([query1, query2]), but Prisma ORM 8 does not: there is no $transaction, and queries don't queue up in arrays. Put the calls inside one db.transaction(...) callback instead, and the Transactions page shows the pattern.",
      },
      {
        type: 'paragraph',
        text: 'Projects created with npm create prisma@latest include the Prisma ORM skills for your coding agent, and in an existing project you run npx prisma skills sync to add them. Skills are instruction files that tell the agent how Prisma ORM 8 works, and the prisma-8 skill covers everything on this page, so try prompts that map to each section:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          '"Using the prisma-8 skill, add a signup function that creates a User and returns only its id and email."',
          '"Write an upsert that creates a user by email or updates their name if they exist."',
          '"This cleanup script must delete every draft older than 30 days. Use the bulk delete method and log how many records were removed."',
          '"Review my mutations for places where .update() should be updateAll or updateAndCount."',
        ],
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Run several writes atomically with db.transaction(...).',
          'Read data to filter, sort, paginate, and select fields from your models.',
          'Use the SQL builder for inserts and updates with explicit RETURNING clauses.',
        ],
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
