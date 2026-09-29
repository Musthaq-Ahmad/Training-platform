import type { ContentTopic } from '../../../types';

export const jsArrayMethodsTopics = {
  'js-array-methods': {
    id: 'js-array-methods',
    heading: 'Add/remove items',
    blocks: [
      {
        type: 'paragraph',
        text: 'We already know methods that add and remove items from the beginning or the end:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'arr.push(...items) – adds items to the end,',
          'arr.pop() – extracts an item from the end,',
          'arr.shift() – extracts an item from the beginning,',
          'arr.unshift(...items) – adds items to the beginning.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Here are a few others.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'splice',
      },
      {
        type: 'paragraph',
        text: 'How to delete an element from the array?',
      },
      {
        type: 'paragraph',
        text: 'The arrays are objects, so we can try to use delete:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let arr = ["I", "go", "home"];\n\ndelete arr[1]; // remove "go"\n\nalert( arr[1] ); // undefined\n\n// now arr = ["I",  , "home"];\nalert( arr.length ); // 3',
        },
      },
      {
        type: 'paragraph',
        text: 'The element was removed, but the array still has 3 elements, we can see that arr.length == 3.',
      },
      {
        type: 'paragraph',
        text: 'That’s natural, because delete obj.key removes a value by the key. It’s all it does. Fine for objects. But for arrays we usually want the rest of the elements to shift and occupy the freed place. We expect to have a shorter array now.',
      },
      {
        type: 'paragraph',
        text: 'So, special methods should be used.',
      },
      {
        type: 'paragraph',
        text: 'The arr.splice method is a Swiss army knife for arrays. It can do everything: insert, remove and replace elements.',
      },
      {
        type: 'paragraph',
        text: 'The syntax is:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'arr.splice(start[, deleteCount, elem1, ..., elemN])',
        },
      },
      {
        type: 'paragraph',
        text: 'It modifies arr starting from the index start: removes deleteCount elements and then inserts elem1, ..., elemN at their place. Returns the array of removed elements.',
      },
      {
        type: 'paragraph',
        text: 'This method is easy to grasp by examples.',
      },
      {
        type: 'paragraph',
        text: 'Let’s start with the deletion:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let arr = ["I", "study", "JavaScript"];\n\narr.splice(1, 1); // from index 1 remove 1 element\n\nalert( arr ); // ["I", "JavaScript"]',
        },
      },
      {
        type: 'paragraph',
        text: 'Easy, right? Starting from the index 1 it removed 1 element.',
      },
      {
        type: 'paragraph',
        text: 'In the next example, we remove 3 elements and replace them with the other two:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let arr = ["I", "study", "JavaScript", "right", "now"];\n\n// remove 3 first elements and replace them with another\narr.splice(0, 3, "Let\'s", "dance");\n\nalert( arr ) // now ["Let\'s", "dance", "right", "now"]',
        },
      },
      {
        type: 'paragraph',
        text: 'Here we can see that splice returns the array of removed elements:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let arr = ["I", "study", "JavaScript", "right", "now"];\n\n// remove 2 first elements\nlet removed = arr.splice(0, 2);\n\nalert( removed ); // "I", "study" <-- array of removed elements',
        },
      },
      {
        type: 'paragraph',
        text: 'The splice method is also able to insert the elements without any removals. For that, we need to set deleteCount to 0:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let arr = ["I", "study", "JavaScript"];\n\n// from index 2\n// delete 0\n// then insert "complex" and "language"\narr.splice(2, 0, "complex", "language");\n\nalert( arr ); // "I", "study", "complex", "language", "JavaScript"',
        },
      },
      {
        type: 'paragraph',
        text: 'Negative indexes allowed',
      },
      {
        type: 'paragraph',
        text: 'Here and in other array methods, negative indexes are allowed. They specify the position from the end of the array, like here:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let arr = [1, 2, 5];\n\n// from index -1 (one step from the end)\n// delete 0 elements,\n// then insert 3 and 4\narr.splice(-1, 0, 3, 4);\n\nalert( arr ); // 1,2,3,4,5',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'slice',
      },
      {
        type: 'paragraph',
        text: 'The method arr.slice is much simpler than the similar-looking arr.splice.',
      },
      {
        type: 'paragraph',
        text: 'The syntax is:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'arr.slice([start], [end])',
        },
      },
      {
        type: 'paragraph',
        text: 'It returns a new array copying to it all items from index start to end (not including end). Both start and end can be negative, in that case position from array end is assumed.',
      },
      {
        type: 'paragraph',
        text: 'It’s similar to a string method str.slice, but instead of substrings, it makes subarrays.',
      },
      {
        type: 'paragraph',
        text: 'For instance:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let arr = ["t", "e", "s", "t"];\n\nalert( arr.slice(1, 3) ); // e,s (copy from 1 to 3)\n\nalert( arr.slice(-2) ); // s,t (copy from -2 till the end)',
        },
      },
      {
        type: 'paragraph',
        text: 'We can also call it without arguments: arr.slice() creates a copy of arr. That’s often used to obtain a copy for further transformations that should not affect the original array.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'concat',
      },
      {
        type: 'paragraph',
        text: 'The method arr.concat creates a new array that includes values from other arrays and additional items.',
      },
      {
        type: 'paragraph',
        text: 'The syntax is:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'arr.concat(arg1, arg2...)',
        },
      },
      {
        type: 'paragraph',
        text: 'It accepts any number of arguments – either arrays or values.',
      },
      {
        type: 'paragraph',
        text: 'The result is a new array containing items from arr, then arg1, arg2 etc.',
      },
      {
        type: 'paragraph',
        text: 'If an argument argN is an array, then all its elements are copied. Otherwise, the argument itself is copied.',
      },
      {
        type: 'paragraph',
        text: 'For instance:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let arr = [1, 2];\n\n// create an array from: arr and [3,4]\nalert( arr.concat([3, 4]) ); // 1,2,3,4\n\n// create an array from: arr and [3,4] and [5,6]\nalert( arr.concat([3, 4], [5, 6]) ); // 1,2,3,4,5,6\n\n// create an array from: arr and [3,4], then add values 5 and 6\nalert( arr.concat([3, 4], 5, 6) ); // 1,2,3,4,5,6',
        },
      },
      {
        type: 'paragraph',
        text: 'Normally, it only copies elements from arrays. Other objects, even if they look like arrays, are added as a whole:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let arr = [1, 2];\n\nlet arrayLike = {\n  0: "something",\n  length: 1\n};\n\nalert( arr.concat(arrayLike) ); // 1,2,[object Object]',
        },
      },
      {
        type: 'paragraph',
        text: '…But if an array-like object has a special Symbol.isConcatSpreadable property, then it’s treated as an array by concat: its elements are added instead:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let arr = [1, 2];\n\nlet arrayLike = {\n  0: "something",\n  1: "else",\n  [Symbol.isConcatSpreadable]: true,\n  length: 2\n};\n\nalert( arr.concat(arrayLike) ); // 1,2,something,else',
        },
      },
      {
        type: 'paragraph',
        text: 'The arr.forEach method allows to run a function for every element of the array.',
      },
      {
        type: 'paragraph',
        text: 'The syntax:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'arr.forEach(function(item, index, array) {\n  // ... do something with an item\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'For instance, this shows each element of the array:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// for each element call alert\n["Bilbo", "Gandalf", "Nazgul"].forEach(alert);',
        },
      },
      {
        type: 'paragraph',
        text: 'And this code is more elaborate about their positions in the target array:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {\n  alert(`${item} is at index ${index} in ${array}`);\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'The result of the function (if it returns any) is thrown away and ignored.',
      },
      {
        type: 'paragraph',
        text: 'Now let’s cover methods that search in an array.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'indexOf/lastIndexOf and includes',
      },
      {
        type: 'paragraph',
        text: 'The methods arr.indexOf and arr.includes have the similar syntax and do essentially the same as their string counterparts, but operate on items instead of characters:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'arr.indexOf(item, from) – looks for item starting from index from, and returns the index where it was found, otherwise -1.',
          'arr.includes(item, from) – looks for item starting from index from, returns true if found.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Usually, these methods are used with only one argument: the item to search. By default, the search is from the beginning.',
      },
      {
        type: 'paragraph',
        text: 'For instance:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let arr = [1, 0, false];\n\nalert( arr.indexOf(0) ); // 1\nalert( arr.indexOf(false) ); // 2\nalert( arr.indexOf(null) ); // -1\n\nalert( arr.includes(1) ); // true',
        },
      },
      {
        type: 'paragraph',
        text: 'Please note that indexOf uses the strict equality === for comparison. So, if we look for false, it finds exactly false and not the zero.',
      },
      {
        type: 'paragraph',
        text: 'If we want to check if item exists in the array and don’t need the index, then arr.includes is preferred.',
      },
      {
        type: 'paragraph',
        text: 'The method arr.lastIndexOf is the same as indexOf, but looks for from right to left.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "let fruits = ['Apple', 'Orange', 'Apple']\n\nalert( fruits.indexOf('Apple') ); // 0 (first Apple)\nalert( fruits.lastIndexOf('Apple') ); // 2 (last Apple)",
        },
      },
      {
        type: 'paragraph',
        text: 'The includes method handles NaN correctly',
      },
      {
        type: 'paragraph',
        text: 'A minor, but noteworthy feature of includes is that it correctly handles NaN, unlike indexOf:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const arr = [NaN];\nalert( arr.indexOf(NaN) ); // -1 (wrong, should be 0)\nalert( arr.includes(NaN) );// true (correct)',
        },
      },
      {
        type: 'paragraph',
        text: 'That’s because includes was added to JavaScript much later and uses the more up-to-date comparison algorithm internally.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'find and findIndex/findLastIndex',
      },
      {
        type: 'paragraph',
        text: 'Imagine we have an array of objects. How do we find an object with a specific condition?',
      },
      {
        type: 'paragraph',
        text: 'Here the arr.find(fn) method comes in handy.',
      },
      {
        type: 'paragraph',
        text: 'The syntax is:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let result = arr.find(function(item, index, array) {\n  // if true is returned, item is returned and iteration is stopped\n  // for falsy scenario returns undefined\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'The function is called for elements of the array, one after another:',
      },
      {
        type: 'list',
        ordered: false,
        items: ['item is the element.', 'index is its index.', 'array is the array itself.'],
      },
      {
        type: 'paragraph',
        text: 'If it returns true, the search is stopped, the item is returned. If nothing is found, undefined is returned.',
      },
      {
        type: 'paragraph',
        text: 'For example, we have an array of users, each with the fields id and name. Let’s find the one with id == 1:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let users = [\n  {id: 1, name: "John"},\n  {id: 2, name: "Pete"},\n  {id: 3, name: "Mary"}\n];\n\nlet user = users.find(item => item.id == 1);\n\nalert(user.name); // John',
        },
      },
      {
        type: 'paragraph',
        text: 'In real life, arrays of objects are a common thing, so the find method is very useful.',
      },
      {
        type: 'paragraph',
        text: 'Note that in the example we provide to find the function item =&gt; item.id == 1 with one argument. That’s typical, other arguments of this function are rarely used.',
      },
      {
        type: 'paragraph',
        text: 'The arr.findIndex method has the same syntax but returns the index where the element was found instead of the element itself. The value of -1 is returned if nothing is found.',
      },
      {
        type: 'paragraph',
        text: 'The arr.findLastIndex method is like findIndex, but searches from right to left, similar to lastIndexOf.',
      },
      {
        type: 'paragraph',
        text: 'Here’s an example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let users = [\n  {id: 1, name: "John"},\n  {id: 2, name: "Pete"},\n  {id: 3, name: "Mary"},\n  {id: 4, name: "John"}\n];\n\n// Find the index of the first John\nalert(users.findIndex(user => user.name == \'John\')); // 0\n\n// Find the index of the last John\nalert(users.findLastIndex(user => user.name == \'John\')); // 3',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'filter',
      },
      {
        type: 'paragraph',
        text: 'The find method looks for a single (first) element that makes the function return true.',
      },
      {
        type: 'paragraph',
        text: 'If there may be many, we can use arr.filter(fn).',
      },
      {
        type: 'paragraph',
        text: 'The syntax is similar to find, but filter returns an array of all matching elements:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let results = arr.filter(function(item, index, array) {\n  // if true item is pushed to results and the iteration continues\n  // returns empty array if nothing found\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'For instance:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let users = [\n  {id: 1, name: "John"},\n  {id: 2, name: "Pete"},\n  {id: 3, name: "Mary"}\n];\n\n// returns array of the first two users\nlet someUsers = users.filter(item => item.id < 3);\n\nalert(someUsers.length); // 2',
        },
      },
      {
        type: 'paragraph',
        text: 'Let’s move on to methods that transform and reorder an array.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'map',
      },
      {
        type: 'paragraph',
        text: 'The arr.map method is one of the most useful and often used.',
      },
      {
        type: 'paragraph',
        text: 'It calls the function for each element of the array and returns the array of results.',
      },
      {
        type: 'paragraph',
        text: 'The syntax is:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let result = arr.map(function(item, index, array) {\n  // returns the new value instead of item\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'For instance, here we transform each element into its length:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);\nalert(lengths); // 5,7,6',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'sort(fn)',
      },
      {
        type: 'paragraph',
        text: 'The call to arr.sort() sorts the array in place, changing its element order.',
      },
      {
        type: 'paragraph',
        text: 'It also returns the sorted array, but the returned value is usually ignored, as arr itself is modified.',
      },
      {
        type: 'paragraph',
        text: 'For instance:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let arr = [ 1, 2, 15 ];\n\n// the method reorders the content of arr\narr.sort();\n\nalert( arr );  // 1, 15, 2',
        },
      },
      {
        type: 'paragraph',
        text: 'Did you notice anything strange in the outcome?',
      },
      {
        type: 'paragraph',
        text: 'The order became 1, 15, 2. Incorrect. But why?',
      },
      {
        type: 'paragraph',
        text: 'The items are sorted as strings by default.',
      },
      {
        type: 'paragraph',
        text: 'Literally, all elements are converted to strings for comparisons. For strings, lexicographic ordering is applied and indeed "2" &gt; "15".',
      },
      {
        type: 'paragraph',
        text: 'To use our own sorting order, we need to supply a function as the argument of arr.sort().',
      },
      {
        type: 'paragraph',
        text: 'The function should compare two arbitrary values and return:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function compare(a, b) {\n  if (a > b) return 1; // if the first value is greater than the second\n  if (a == b) return 0; // if values are equal\n  if (a < b) return -1; // if the first value is less than the second\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'For instance, to sort as numbers:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function compareNumeric(a, b) {\n  if (a > b) return 1;\n  if (a == b) return 0;\n  if (a < b) return -1;\n}\n\nlet arr = [ 1, 2, 15 ];\n\narr.sort(compareNumeric);\n\nalert(arr);  // 1, 2, 15',
        },
      },
      {
        type: 'paragraph',
        text: 'Now it works as intended.',
      },
      {
        type: 'paragraph',
        text: 'Let’s step aside and think about what’s happening. The arr can be an array of anything, right? It may contain numbers or strings or objects or whatever. We have a set of some items. To sort it, we need an ordering function that knows how to compare its elements. The default is a string order.',
      },
      {
        type: 'paragraph',
        text: 'The arr.sort(fn) method implements a generic sorting algorithm. We don’t need to care how it internally works (an optimized quicksort or Timsort most of the time). It will walk the array, compare its elements using the provided function and reorder them, all we need is to provide the fn which does the comparison.',
      },
      {
        type: 'paragraph',
        text: 'By the way, if we ever want to know which elements are compared – nothing prevents us from alerting them:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '[1, -2, 15, 2, 0, 8].sort(function(a, b) {\n  alert( a + " <> " + b );\n  return a - b;\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'The algorithm may compare an element with multiple others in the process, but it tries to make as few comparisons as possible.',
      },
      {
        type: 'paragraph',
        text: 'A comparison function may return any number',
      },
      {
        type: 'paragraph',
        text: 'Actually, a comparison function is only required to return a positive number to say “greater” and a negative number to say “less”.',
      },
      {
        type: 'paragraph',
        text: 'That allows to write shorter functions:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let arr = [ 1, 2, 15 ];\n\narr.sort(function(a, b) { return a - b; });\n\nalert(arr);  // 1, 2, 15',
        },
      },
      {
        type: 'paragraph',
        text: 'Arrow functions for the best',
      },
      {
        type: 'paragraph',
        text: 'Remember arrow functions? We can use them here for neater sorting:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'arr.sort( (a, b) => a - b );',
        },
      },
      {
        type: 'paragraph',
        text: 'This works exactly the same as the longer version above.',
      },
      {
        type: 'paragraph',
        text: 'Use localeCompare for strings',
      },
      {
        type: 'paragraph',
        text: 'Remember strings comparison algorithm? It compares letters by their codes by default.',
      },
      {
        type: 'paragraph',
        text: 'For many alphabets, it’s better to use str.localeCompare method to correctly sort letters, such as Ö.',
      },
      {
        type: 'paragraph',
        text: 'For example, let’s sort a few countries in German:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "let countries = ['Österreich', 'Andorra', 'Vietnam'];\n\nalert( countries.sort( (a, b) => a > b ? 1 : -1) ); // Andorra, Vietnam, Österreich (wrong)\n\nalert( countries.sort( (a, b) => a.localeCompare(b) ) ); // Andorra,Österreich,Vietnam (correct!)",
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'reverse',
      },
      {
        type: 'paragraph',
        text: 'The method arr.reverse reverses the order of elements in arr.',
      },
      {
        type: 'paragraph',
        text: 'For instance:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let arr = [1, 2, 3, 4, 5];\narr.reverse();\n\nalert( arr ); // 5,4,3,2,1',
        },
      },
      {
        type: 'paragraph',
        text: 'It also returns the array arr after the reversal.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'split and join',
      },
      {
        type: 'paragraph',
        text: 'Here’s the situation from real life. We are writing a messaging app, and the person enters the comma-delimited list of receivers: John, Pete, Mary. But for us an array of names would be much more comfortable than a single string. How to get it?',
      },
      {
        type: 'paragraph',
        text: 'The str.split(delim) method does exactly that. It splits the string into an array by the given delimiter delim.',
      },
      {
        type: 'paragraph',
        text: 'In the example below, we split by a comma followed by a space:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "let names = 'Bilbo, Gandalf, Nazgul';\n\nlet arr = names.split(', ');\n\nfor (let name of arr) {\n  alert( `A message to ${name}.` ); // A message to Bilbo  (and other names)\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'The split method has an optional second numeric argument – a limit on the array length. If it is provided, then the extra elements are ignored. In practice it is rarely used though:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "let arr = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2);\n\nalert(arr); // Bilbo, Gandalf",
        },
      },
      {
        type: 'paragraph',
        text: 'Split into letters',
      },
      {
        type: 'paragraph',
        text: 'The call to split(s) with an empty s would split the string into an array of letters:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let str = "test";\n\nalert( str.split(\'\') ); // t,e,s,t',
        },
      },
      {
        type: 'paragraph',
        text: 'The call arr.join(glue) does the reverse to split. It creates a string of arr items joined by glue between them.',
      },
      {
        type: 'paragraph',
        text: 'For instance:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "let arr = ['Bilbo', 'Gandalf', 'Nazgul'];\n\nlet str = arr.join(';'); // glue the array into a string using ;\n\nalert( str ); // Bilbo;Gandalf;Nazgul",
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'reduce/reduceRight',
      },
      {
        type: 'paragraph',
        text: 'When we need to iterate over an array – we can use forEach, for or for..of.',
      },
      {
        type: 'paragraph',
        text: 'When we need to iterate and return the data for each element – we can use map.',
      },
      {
        type: 'paragraph',
        text: 'The methods arr.reduce and arr.reduceRight also belong to that breed, but are a little bit more intricate. They are used to calculate a single value based on the array.',
      },
      {
        type: 'paragraph',
        text: 'The syntax is:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let value = arr.reduce(function(accumulator, item, index, array) {\n  // ...\n}, [initial]);',
        },
      },
      {
        type: 'paragraph',
        text: 'The function is applied to all array elements one after another and “carries on” its result to the next call.',
      },
      {
        type: 'paragraph',
        text: 'Arguments:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'accumulator – is the result of the previous function call, equals initial the first time (if initial is provided).',
          'item – is the current array item.',
          'index – is its position.',
          'array – is the array.',
        ],
      },
      {
        type: 'paragraph',
        text: 'As the function is applied, the result of the previous function call is passed to the next one as the first argument.',
      },
      {
        type: 'paragraph',
        text: 'So, the first argument is essentially the accumulator that stores the combined result of all previous executions. And at the end, it becomes the result of reduce.',
      },
      {
        type: 'paragraph',
        text: 'Sounds complicated?',
      },
      {
        type: 'paragraph',
        text: 'The easiest way to grasp that is by example.',
      },
      {
        type: 'paragraph',
        text: 'Here we get a sum of an array in one line:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let arr = [1, 2, 3, 4, 5];\n\nlet result = arr.reduce((sum, current) => sum + current, 0);\n\nalert(result); // 15',
        },
      },
      {
        type: 'paragraph',
        text: 'The function passed to reduce uses only 2 arguments, that’s typically enough.',
      },
      {
        type: 'paragraph',
        text: 'Let’s see the details of what’s going on.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'On the first run, sum is the initial value (the last argument of reduce), equals 0, and current is the first array element, equals 1. So the function result is 1.',
          'On the second run, sum = 1, we add the second array element (2) to it and return.',
          'On the 3rd run, sum = 3 and we add one more element to it, and so on…',
        ],
      },
      {
        type: 'paragraph',
        text: 'The calculation flow:',
      },
      {
        type: 'paragraph',
        text: 'Or in the form of a table, where each row represents a function call on the next array element:',
      },
      {
        type: 'table',
        headers: ['', 'sum', 'current', 'result'],
        rows: [
          ['the first call', '0', '1', '1'],
          ['the second call', '1', '2', '3'],
          ['the third call', '3', '3', '6'],
          ['the fourth call', '6', '4', '10'],
          ['the fifth call', '10', '5', '15'],
        ],
      },
      {
        type: 'paragraph',
        text: 'Here we can clearly see how the result of the previous call becomes the first argument of the next one.',
      },
      {
        type: 'paragraph',
        text: 'We also can omit the initial value:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let arr = [1, 2, 3, 4, 5];\n\n// removed initial value from reduce (no 0)\nlet result = arr.reduce((sum, current) => sum + current);\n\nalert( result ); // 15',
        },
      },
      {
        type: 'paragraph',
        text: 'The result is the same. That’s because if there’s no initial, then reduce takes the first element of the array as the initial value and starts the iteration from the 2nd element.',
      },
      {
        type: 'paragraph',
        text: 'The calculation table is the same as above, minus the first row.',
      },
      {
        type: 'paragraph',
        text: 'But such use requires an extreme care. If the array is empty, then reduce call without initial value gives an error.',
      },
      {
        type: 'paragraph',
        text: 'Here’s an example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let arr = [];\n\n// Error: Reduce of empty array with no initial value\n// if the initial value existed, reduce would return it for the empty arr.\narr.reduce((sum, current) => sum + current);',
        },
      },
      {
        type: 'paragraph',
        text: 'So it’s advised to always specify the initial value.',
      },
      {
        type: 'paragraph',
        text: 'The method arr.reduceRight does the same but goes from right to left.',
      },
      {
        type: 'paragraph',
        text: 'Arrays do not form a separate language type. They are based on objects.',
      },
      {
        type: 'paragraph',
        text: 'So typeof does not help to distinguish a plain object from an array:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'alert(typeof {}); // object\nalert(typeof []); // object (same)',
        },
      },
      {
        type: 'paragraph',
        text: '…But arrays are used so often that there’s a special method for that: Array.isArray(value). It returns true if the value is an array, and false otherwise.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'alert(Array.isArray({})); // false\n\nalert(Array.isArray([])); // true',
        },
      },
      {
        type: 'paragraph',
        text: 'Almost all array methods that call functions – like find, filter, map, with a notable exception of sort, accept an optional additional parameter thisArg.',
      },
      {
        type: 'paragraph',
        text: 'That parameter is not explained in the sections above, because it’s rarely used. But for completeness, we have to cover it.',
      },
      {
        type: 'paragraph',
        text: 'Here’s the full syntax of these methods:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'arr.find(func, thisArg);\narr.filter(func, thisArg);\narr.map(func, thisArg);\n// ...\n// thisArg is the optional last argument',
        },
      },
      {
        type: 'paragraph',
        text: 'The value of thisArg parameter becomes this for func.',
      },
      {
        type: 'paragraph',
        text: 'For example, here we use a method of army object as a filter, and thisArg passes the context:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'let army = {\n  minAge: 18,\n  maxAge: 27,\n  canJoin(user) {\n    return user.age >= this.minAge && user.age < this.maxAge;\n  }\n};\n\nlet users = [\n  {age: 16},\n  {age: 20},\n  {age: 23},\n  {age: 30}\n];\n\n// find users, for who army.canJoin returns true\nlet soldiers = users.filter(army.canJoin, army);\n\nalert(soldiers.length); // 2\nalert(soldiers[0].age); // 20\nalert(soldiers[1].age); // 23',
        },
      },
      {
        type: 'paragraph',
        text: 'If in the example above we used users.filter(army.canJoin), then army.canJoin would be called as a standalone function, with this=undefined, thus leading to an instant error.',
      },
      {
        type: 'paragraph',
        text: 'A call to users.filter(army.canJoin, army) can be replaced with users.filter(user =&gt; army.canJoin(user)), that does the same. The latter is used more often, as it’s a bit easier to understand for most people.',
      },
      {
        type: 'paragraph',
        text: 'A cheat sheet of array methods:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'To add/remove elements: * push(...items) – adds items to the end, * pop() – extracts an item from the end, * shift() – extracts an item from the beginning, * unshift(...items) – adds items to the beginning. * splice(pos, deleteCount, ...items) – at index pos deletes deleteCount elements and inserts items. * slice(start, end) – creates a new array, copies elements from index start till end (not inclusive) into it. * concat(...items) – returns a new array: copies all members of the current one and adds items to it. If any of items is an array, then its elements are taken.',
          'To search among elements: * indexOf/lastIndexOf(item, pos) – look for item starting from position pos, and return the index or -1 if not found. * includes(value) – returns true if the array has value, otherwise false. * find/filter(func) – filter elements through the function, return first/all values that make it return true. * findIndex is like find, but returns the index instead of a value.',
          'To iterate over elements: * forEach(func) – calls func for every element, does not return anything.',
          'To transform the array: * map(func) – creates a new array from results of calling func for every element. * sort(func) – sorts the array in-place, then returns it. * reverse() – reverses the array in-place, then returns it. * split/join – convert a string to array and back. * reduce/reduceRight(func, initial) – calculate a single value over the array by calling func for each element and passing an intermediate result between the calls.',
          'Additionally: * Array.isArray(value) checks value for being an array, if so returns true, otherwise false.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Please note that methods sort, reverse and splice modify the array itself.',
      },
      {
        type: 'paragraph',
        text: 'These methods are the most used ones, they cover 99% of use cases. But there are few others:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'arr.some(fn)/arr.every(fn) check the array. The function fn is called on each element of the array similar to map. If any/all results are true, returns true, otherwise false. These methods behave sort of like || and && operators: if fn returns a truthy value, arr.some() immediately returns true and stops iterating over the rest of items; if fn returns a falsy value, arr.every() immediately returns false and stops iterating over the rest of items as well. We can use every to compare arrays: function arraysEqual(arr1, arr2) { return arr1.length === arr2.length && arr1.every((value, index) =&gt; value === arr2[index]); } alert( arraysEqual([1, 2], [1, 2])); // true',
          'arr.fill(value, start, end) – fills the array with repeating value from index start to end.',
          'arr.copyWithin(target, start, end) – copies its elements from position start till position end into itself, at position target (overwrites existing).',
          'arr.flat(depth)/arr.flatMap(fn) create a new flat array from a multidimensional array.',
        ],
      },
      {
        type: 'paragraph',
        text: 'For the full list, see the manual.',
      },
      {
        type: 'paragraph',
        text: 'At first sight, it may seem that there are so many methods, quite difficult to remember. But actually, that’s much easier.',
      },
      {
        type: 'paragraph',
        text: 'Look through the cheat sheet just to be aware of them. Then solve the tasks of this chapter to practice, so that you have experience with array methods.',
      },
      {
        type: 'paragraph',
        text: 'Afterwards whenever you need to do something with an array, and you don’t know how – come here, look at the cheat sheet and find the right method. Examples will help you to write it correctly. Soon you’ll automatically remember the methods, without specific efforts from your side.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
