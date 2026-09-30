import type { ContentTopic } from '../../../types';

export const prismaowasplookupidsTopics = {
  prismaowasplookupids: {
    id: 'prismaowasplookupids',
    heading: 'Ensure Lookup IDs Are Not Accessible Even When Guessed or Cannot Be Tampered With',
    blocks: [
      {
        type: 'paragraph',
        text: 'Applications often expose the internal object identifiers (such as an account number or Primary Key in a database) that are used to locate and reference an object. This ID may be exposed as a query parameter, path variable, "hidden" form field or elsewhere. For example:',
      },
      {
        type: 'paragraph',
        text: 'https://mybank.com/accountTransactions?acct_id=901',
      },
      {
        type: 'paragraph',
        text: 'Based on this URL, one could reasonably assume that the application will return a listing of transactions and that the transactions returned will be restricted to a particular account - the account indicated in the acct_id param. But what would happen if the user changed the value of the acct_id param to another value such as 523. Will the user be able to view transactions associated with another account even if it does not belong to him? If not, will the failure simply be the result of the account "523" not existing/not being found or will it be due to a failed access control check? Although this example may be an oversimplification, it illustrates a very common security flaw in application development - CWE 639: Authorization Bypass Through User-Controlled Key. When exploited, this weakness can result in authorization bypasses, horizontal privilege escalation and, less commonly, vertical privilege escalation (see CWE-639). This type of vulnerability also represents a form of Insecure Direct Object Reference (IDOR). The following paragraphs will describe the weakness and possible mitigations.',
      },
      {
        type: 'paragraph',
        text: "In the example above, the lookup ID was not only exposed to the user and readily tampered with, but also appears to have been a fairly predictable, perhaps sequential, value. While one can use various techniques to mask or randomize these IDs and make them hard to guess, such an approach is generally not sufficient by itself. A user should not be able to access a resource they do not have permissions simply because they are able to guess and manipulate that object's identifier in a query param or elsewhere. Rather than relying on some form of security through obscurity, the focus should be on controlling access to the underlying objects and/or the identifiers themselves. Recommended mitigations for this weakness include the following:",
      },
      {
        type: 'list',
        ordered: false,
        items: [
          "Avoid exposing identifiers to the user when possible. For example it should be possible to retrieve some objects, such as account details, based solely on currently authenticated user's identity and attributes (e.g. through information contained in a securely implemented JSON Web Token (JWT) or server-side session).",
          'Implement user/session specific indirect references using a tool such as OWASP ESAPI (see OWASP Top 10:2025 A01 Broken Access Control and the Insecure Direct Object Reference Prevention Cheat Sheet)',
          'Perform access control checks on every request for the specific object or functionality being accessed. Just because a user has access to an object of a particular type does not mean they should have access to every object of that particular type.',
        ],
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
