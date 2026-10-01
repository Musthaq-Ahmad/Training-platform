import type { ContentTopic } from '../../../types';

export const prismaowaspautherrorsTopics = {
  prismaowaspautherrors: {
    id: 'prismaowaspautherrors',
    heading: 'Authentication and Error Messages',
    blocks: [
      {
        type: 'paragraph',
        text: 'Incorrectly implemented error messages in the case of authentication functionality can be used for the purposes of user ID and password enumeration. An application should respond (both HTTP and HTML) in a generic manner.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Authentication Responses',
      },
      {
        type: 'paragraph',
        text: 'Using any of the authentication mechanisms (login, password reset, or password recovery), an application must respond with a generic error message regardless of whether:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'The user ID or password was incorrect.',
          'The account does not exist.',
          'The account is locked or disabled.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The account registration feature should also be taken into consideration, and the same approach of a generic error message can be applied regarding the case in which the user exists.',
      },
      {
        type: 'paragraph',
        text: 'The objective is to prevent the creation of a discrepancy factor, allowing an attacker to mount a user enumeration action against the application.',
      },
      {
        type: 'paragraph',
        text: 'It is interesting to note that the business logic itself can bring a discrepancy factor related to the processing time taken. Indeed, depending on the implementation, the processing time can be significantly different according to the case (success vs failure) allowing an attacker to mount a time-based attack (delta of some seconds for example).',
      },
      {
        type: 'paragraph',
        text: 'Example using pseudo-code for a login feature:',
      },
      {
        type: 'list',
        ordered: false,
        items: ['First implementation using the "quick exit" approach'],
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'text',
          code: 'IF USER_EXISTS(username) THEN\n    password_hash=HASH(password)\n    IS_VALID=LOOKUP_CREDENTIALS_IN_STORE(username, password_hash)\n    IF NOT IS_VALID THEN\n        RETURN Error("Invalid Username or Password!")\n    ENDIF\nELSE\n   RETURN Error("Invalid Username or Password!")\nENDIF',
        },
      },
      {
        type: 'paragraph',
        text: "It can be clearly seen that if the user doesn't exist, the application will directly throw an error. Otherwise, when the user exists and the password doesn't, it is apparent that there will be more processing before the application errors out. In return, the response time will be different for the same error, allowing the attacker to differentiate between a wrong username and a wrong password.",
      },
      {
        type: 'list',
        ordered: false,
        items: ['Second implementation without relying on the "quick exit" approach:'],
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'text',
          code: 'password_hash=HASH(password)\nIS_VALID=LOOKUP_CREDENTIALS_IN_STORE(username, password_hash)\nIF NOT IS_VALID THEN\n   RETURN Error("Invalid Username or Password!")\nENDIF',
        },
      },
      {
        type: 'paragraph',
        text: 'This code will go through the same process no matter what the user or the password is, allowing the application to return in approximately the same response time.',
      },
      {
        type: 'paragraph',
        text: 'The problem with returning a generic error message for the user is a User Experience (UX) matter. A legitimate user might feel confused with the generic messages, thus making it hard for them to use the application, and might after several retries, leave the application because of its complexity. The decision to return a generic error message can be determined based on the criticality of the application and its data. For example, for critical applications, the team can decide that under the failure scenario, a user will always be redirected to the support page and a generic error message will be returned.',
      },
      {
        type: 'paragraph',
        text: 'Regarding the user enumeration itself, protection against brute-force attacks is also effective because it prevents an attacker from applying the enumeration at scale. Usage of CAPTCHA can be applied to a feature for which a generic error message cannot be returned because the user experience must be preserved.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'Incorrect and correct response examples',
      },
      {
        type: 'subheading',
        level: 6,
        text: 'Login',
      },
      {
        type: 'paragraph',
        text: 'Incorrect response examples:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          '"Login for User foo: invalid password."',
          '"Login failed, invalid user ID."',
          '"Login failed; account disabled."',
          '"Login failed; this user is not active."',
        ],
      },
      {
        type: 'paragraph',
        text: 'Correct response example:',
      },
      {
        type: 'list',
        ordered: false,
        items: ['"Login failed; Invalid user ID or password."'],
      },
      {
        type: 'subheading',
        level: 6,
        text: 'Password recovery',
      },
      {
        type: 'paragraph',
        text: 'Incorrect response examples:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          '"We just sent you a password reset link."',
          '"This email address doesn\'t exist in our database."',
        ],
      },
      {
        type: 'paragraph',
        text: 'Correct response example:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          '"If that email address is in our database, we will send you an email to reset your password."',
        ],
      },
      {
        type: 'subheading',
        level: 6,
        text: 'Account creation',
      },
      {
        type: 'paragraph',
        text: 'Incorrect response examples:',
      },
      {
        type: 'list',
        ordered: false,
        items: ['"This user ID is already in use."', '"Welcome! You have signed up successfully."'],
      },
      {
        type: 'paragraph',
        text: 'Correct response example:',
      },
      {
        type: 'list',
        ordered: false,
        items: ['"A link to activate your account has been emailed to the address provided."'],
      },
      {
        type: 'subheading',
        level: 5,
        text: 'Error Codes and URLs',
      },
      {
        type: 'paragraph',
        text: 'The application may return a different HTTP Error code depending on the authentication attempt response. It may respond with a 200 for a positive result and a 403 for a negative result. Even though a generic error page is shown to a user, the HTTP response code may differ which can leak information about whether the account is valid or not.',
      },
      {
        type: 'paragraph',
        text: 'Error disclosure can also be used as a discrepancy factor, consult the error handling cheat sheet regarding the global handling of different errors in an application.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
