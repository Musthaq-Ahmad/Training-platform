import type { ContentTopic } from '../../../types';

export const prismagettingstartedTopics = {
  prismagettingstarted: {
    id: 'prismagettingstarted',
    heading: 'Choose a Prisma ORM Setup Path',
    blocks: [
      {
        type: 'paragraph',
        text: 'Start with a quickstart if you want Prisma ORM to create the app. Use the existing-project path if you already have an app and database.',
      },
      {
        type: 'paragraph',
        text: 'Coming from an earlier version? Coming from Prisma ORM 7 maps every Prisma ORM 7 API to its Prisma ORM 8 form, and Release status says where Prisma ORM 8 stands today.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: 'npm create prisma@latest',
        },
      },
      {
        type: 'paragraph',
        text: 'The create-prisma reference lists every template and flag.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Deploy the full Prisma stack: The whole journey in one sitting: scaffold, Prisma Postgres, first query, and a Prisma Compute deploy.',
          'Create a new app with PostgreSQL: Create the app, run it against a local Prisma Postgres from Composer or your own PostgreSQL, and run the first query.',
          'Create a new app with MongoDB: Create the app, connect a MongoDB deployment, apply the first migration, and run the first query.',
        ],
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: 'npx prisma@latest orm init',
        },
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Add to PostgreSQL: Add Prisma ORM to an existing PostgreSQL app and infer a starter contract from the live schema.',
          'Add to MongoDB: Add Prisma ORM to an existing MongoDB app and model the collections you want to query first.',
        ],
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Use the generated app scripts for the first run.',
          'Open prisma-8.md or the installed Prisma ORM skills when you want agent-ready guidance inside the project.',
          'Change the starter contract when you are ready to model your own data.',
          'Open the Prisma ORM overview when you want the concepts behind the setup.',
        ],
      },
      {
        type: 'paragraph',
        text: 'You can hand either setup path to your coding agent. Copy the prompt that matches your project and give it to your agent. Both prompts use PostgreSQL.',
      },
      {
        type: 'paragraph',
        text: 'To create a new app, use this prompt:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'text',
          code: "Create a new [framework] application with Prisma ORM, seed it, and run it locally.\n\nIf I have not told you which framework, stop and ask before scaffolding. Valid --template values: minimal (the default), next, hono, nuxt, astro, nest, svelte, tanstack-start, elysia.\n\n1. Scaffold the app: `npm create prisma@latest -- my-app --template [framework] --provider postgres --yes`.\n2. Get a database connection string: use the one I give you, or create a Prisma Postgres database with `npx create-db@latest` and show me the claim URL it prints. Export it as `DATABASE_URL` in the shell; the generated scripts read the environment variable, not `.env`.\n3. From the project directory, apply the starter contract: `npm run db:init`. Sample users are seeded automatically on the app's first query; there is no separate seed script.\n4. Edit the starter contract under `src/prisma/` into a small schema for my use case, then run `npm run contract:emit` and plan and apply the migration: `npx prisma migration plan`, then `npx prisma db migrate --yes`. Migration planning diffs the emitted contract, so the emit step is required.\n5. Update the seed script under `src/prisma/` and the app routes to query the new schema, start `npm run dev` in the background (with `DATABASE_URL` exported), and verify with a request against the running app. For the `nest` template, if routes return 500s with `reading 'findAll'` in the logs, add explicit `@Inject()` tokens as shown in https://www.prisma.io/docs/guides/frameworks/nestjs.md.\n\nUse the installed Prisma ORM skills and the current Prisma docs: https://www.prisma.io/docs/llms.txt (append `.md` to any docs URL for a markdown version).",
        },
      },
      {
        type: 'paragraph',
        text: 'To add Prisma ORM to an app you already have, use this prompt:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'text',
          code: 'Add Prisma ORM to this existing project.\n\nThis flow is for PostgreSQL. If the project uses MongoDB, follow https://www.prisma.io/docs/prisma-orm/add-to-existing-project/mongodb.md instead; for other databases, stop and tell me.\n\n1. Run `npx prisma@latest orm init --yes --target postgres --authoring psl` (the flags are required when the CLI cannot prompt). It writes `prisma.config.ts`, a starter contract and `db.ts` under `src/prisma/`, and installs dependencies. Then run `npx prisma skills sync` to install the Prisma ORM skills.\n2. Set `DATABASE_URL` in `.env` to my database. If I did not give you one, create a Prisma Postgres database with `npx create-db@latest`, put its connection string in `.env`, and show me the claim URL it prints so I can keep the database.\n3. If the database already has tables, infer the contract from it: `npx prisma contract infer`, then `npx prisma contract emit`, then sign it with `npx prisma db sign`. If the database is empty, keep the starter contract and run `npx prisma db init`.\n4. Write one query with the generated `db` client in an existing code path, run it, and show me the returned rows.\n\nFollow https://www.prisma.io/docs/prisma-orm/add-to-existing-project/postgresql.md and the installed Prisma ORM skills.',
        },
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
