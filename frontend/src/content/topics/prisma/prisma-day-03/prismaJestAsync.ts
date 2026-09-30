import type { ContentTopic } from '../../../types';

export const prismajestasyncTopics = {
  prismajestasync: {
    id: 'prismajestasync',
    heading: 'Testing Asynchronous Code',
    blocks: [
      {
        type: 'paragraph',
        text: "It's common in JavaScript for code to run asynchronously. When you have code that runs asynchronously, Jest needs to know when the code it is testing has completed, before it can move on to another test. Jest has several ways to handle this.",
      },
      {
        type: 'paragraph',
        text: 'Return a promise from your test, and Jest will wait for that promise to resolve. If the promise is rejected, the test will fail.',
      },
      {
        type: 'paragraph',
        text: "For example, let's say that fetchData returns a promise that is supposed to resolve to the string 'peanut butter'. We could test it with:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "test('the data is peanut butter', () => {\n  return fetchData().then(data => {\n    expect(data).toBe('peanut butter');\n  });\n});",
        },
      },
      {
        type: 'paragraph',
        text: 'Alternatively, you can use async and await in your tests. To write an async test, use the async keyword in front of the function passed to test. For example, the same fetchData scenario can be tested with:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "test('the data is peanut butter', async () => {\n  const data = await fetchData();\n  expect(data).toBe('peanut butter');\n});\n\ntest('the fetch fails with an error', async () => {\n  expect.assertions(1);\n  try {\n    await fetchData();\n  } catch (error) {\n    expect(error).toMatch('error');\n  }\n});",
        },
      },
      {
        type: 'paragraph',
        text: 'You can combine async and await with .resolves or .rejects.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "test('the data is peanut butter', async () => {\n  await expect(fetchData()).resolves.toBe('peanut butter');\n});\n\ntest('the fetch fails with an error', async () => {\n  await expect(fetchData()).rejects.toMatch('error');\n});",
        },
      },
      {
        type: 'paragraph',
        text: 'In these cases, async and await are effectively syntactic sugar for the same logic as the promises example uses.',
      },
      {
        type: 'paragraph',
        text: 'caution',
      },
      {
        type: 'paragraph',
        text: 'Be sure to return (or await) the promise - if you omit the return/await statement, your test will complete before the promise returned from fetchData resolves or rejects.',
      },
      {
        type: 'paragraph',
        text: 'If you expect a promise to be rejected, use the .catch method. Make sure to add expect.assertions to verify that a certain number of assertions are called. Otherwise, a fulfilled promise would not fail the test.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "test('the fetch fails with an error', () => {\n  expect.assertions(1);\n  return fetchData().catch(error => expect(error).toMatch('error'));\n});",
        },
      },
      {
        type: 'paragraph',
        text: "If you don't use promises, you can use callbacks. For example, let's say that fetchData, instead of returning a promise, expects a callback, i.e. fetches some data and calls callback(null, data) when it is complete. You want to test that this returned data is the string 'peanut butter'.",
      },
      {
        type: 'paragraph',
        text: 'By default, Jest tests complete once they reach the end of their execution. That means this test will not work as intended:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "// Don't do this!\ntest('the data is peanut butter', () => {\n  function callback(error, data) {\n    if (error) {\n      throw error;\n    }\n    expect(data).toBe('peanut butter');\n  }\n\n  fetchData(callback);\n});",
        },
      },
      {
        type: 'paragraph',
        text: 'The problem is that the test will complete as soon as fetchData completes, before ever calling the callback.',
      },
      {
        type: 'paragraph',
        text: 'There is an alternate form of test that fixes this. Instead of putting the test in a function with an empty argument, use a single argument called done. Jest will wait until the done callback is called before finishing the test.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "test('the data is peanut butter', done => {\n  function callback(error, data) {\n    if (error) {\n      done(error);\n      return;\n    }\n    try {\n      expect(data).toBe('peanut butter');\n      done();\n    } catch (error) {\n      done(error);\n    }\n  }\n\n  fetchData(callback);\n});",
        },
      },
      {
        type: 'paragraph',
        text: 'If done() is never called, the test will fail (with timeout error), which is what you want to happen.',
      },
      {
        type: 'paragraph',
        text: "If the expect statement fails, it throws an error and done() is not called. If we want to see in the test log why it failed, we have to wrap expect in a try block and pass the error in the catch block to done. Otherwise, we end up with an opaque timeout error that doesn't show what value was received by expect(data).",
      },
      {
        type: 'paragraph',
        text: 'caution',
      },
      {
        type: 'paragraph',
        text: 'Jest will throw an error, if the same test function is passed a done() callback and returns a promise. This is done as a precaution to avoid memory leaks in your tests.',
      },
      {
        type: 'paragraph',
        text: 'You can also use the .resolves matcher in your expect statement, and Jest will wait for that promise to resolve. If the promise is rejected, the test will automatically fail.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "test('the data is peanut butter', () => {\n  return expect(fetchData()).resolves.toBe('peanut butter');\n});",
        },
      },
      {
        type: 'paragraph',
        text: 'Be sure to return the assertion—if you omit this return statement, your test will complete before the promise returned from fetchData is resolved and then() has a chance to execute the callback.',
      },
      {
        type: 'paragraph',
        text: 'If you expect a promise to be rejected, use the .rejects matcher. It works analogically to the .resolves matcher. If the promise is fulfilled, the test will automatically fail.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "test('the fetch fails with an error', () => {\n  return expect(fetchData()).rejects.toMatch('error');\n});",
        },
      },
      {
        type: 'paragraph',
        text: 'None of these forms is particularly superior to the others, and you can mix and match them across a codebase or even in a single file. It just depends on which style you feel makes your tests simpler.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
