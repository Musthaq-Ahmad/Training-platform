import type { ContentTopic } from '../../../types';

export const prismaowaspdenybydefaultTopics = {
  prismaowaspdenybydefault: {
    id: 'prismaowaspdenybydefault',
    heading: 'Deny by Default',
    blocks: [
      {
        type: 'paragraph',
        text: 'Even when no access control rules are explicitly matched, the application cannot remain neutral when an entity is requesting access to a particular resource. The application must always make a decision, whether implicitly or explicitly, to either deny or permit the requested access. Logic errors and other mistakes relating to access control may happen, especially when access requirements are complex; consequently, one should not rely entirely on explicitly defined rules for matching all possible requests. For security purposes an application should be configured to deny access by default.',
      },
      {
        type: 'paragraph',
        text: 'Consider the following points and best practices:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Adopt a "deny-by-default" mentality both during initial development and whenever new functionality or resources are exposed by the app. One should be able to explicitly justify why a specific permission was granted to a particular user or group rather than assuming access to be the default position.',
          "Although some frameworks or libraries may themselves adopt a deny-by-default strategy, explicit configuration should be preferred over relying on framework or library defaults. The logic and defaults of third-party code may evolve over time, without the developer's full knowledge or understanding of the change's implications for a particular project.",
        ],
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
