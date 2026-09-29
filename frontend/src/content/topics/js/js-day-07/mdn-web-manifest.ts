import type { ContentTopic } from '../../../types';

export const mdnWebManifestTopics = {
  'mdn-web-manifest': {
    id: 'mdn-web-manifest',
    heading: 'Members',
    blocks: [
      {
        type: 'paragraph',
        text: 'This section lists reference pages for manifest members that are documented on MDN. All members are optional in the specification, but some applications require some members to be present. For example, PWAs must provide certain manifest members.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          '*_localized',
          'background_color',
          'categories',
          'description',
          'display',
          'display_override',
          'file_handlers',
          'icons',
          'id',
          'launch_handler',
          'name',
          'note_taking',
          'orientation',
          'prefer_related_applications',
          'protocol_handlers',
          'related_applications',
          'scope',
          'scope_extensions',
          'screenshots',
          'serviceworker',
          'share_target',
          'short_name',
          'shortcuts',
          'start_url',
          'theme_color',
        ],
      },
      {
        type: 'paragraph',
        text: 'Note: The dir, lang, and iarc_rating_id members are not implemented.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '{\n  "short_name": "MDN",\n  "name": "MDN Web Docs",\n  "icons": [\n    {\n      "src": "/favicon-192x192.png",\n      "sizes": "192x192",\n      "type": "image/png"\n    },\n    {\n      "src": "/favicon-512x512.png",\n      "sizes": "512x512",\n      "type": "image/png"\n    }\n  ],\n  "start_url": ".",\n  "display": "standalone",\n  "theme_color": "black",\n  "background_color": "white"\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Web app manifests are deployed in your HTML pages using a <link> element in the <head> of a document:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<link rel="manifest" href="manifest.json" />',
        },
      },
      {
        type: 'paragraph',
        text: 'The .webmanifest extension is specified in the Media type registration section of the specification (the response of the manifest file should return Content-Type: application/manifest+json). Browsers generally support manifests with other appropriate extensions like .json (Content-Type: application/json).',
      },
      {
        type: 'paragraph',
        text: 'If the manifest requires credentials to fetch, the crossorigin attribute must be set to use-credentials, even if the manifest file is in the same origin as the current page.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<link rel="manifest" href="/app.webmanifest" crossorigin="use-credentials" />',
        },
      },
      {
        type: 'paragraph',
        text: 'In some browsers and operating systems, a splash screen is displayed when an installed PWA is launched. This splash screen is automatically generated and its appearance is defined by members in the web app manifest, specifically:',
      },
      {
        type: 'list',
        ordered: false,
        items: ['name', 'background_color', 'icons'],
      },
      {
        type: 'list',
        ordered: false,
        items: ['Progressive Web Apps (PWAs)'],
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
