import { JSDOM } from 'jsdom';

async function main() {
  const html = await (await fetch('https://react.dev/learn/describing-the-ui')).text();
  const doc = new JSDOM(html).window.document;

  const target = doc.getElementById('your-first-component');
  const heading = target?.closest('h1,h2,h3,h4,h5,h6') ?? target;
  console.log(
    'heading:',
    heading?.tagName,
    '| parent:',
    heading?.parentElement?.tagName,
    heading?.parentElement?.className
  );

  let node = heading?.nextElementSibling ?? null;
  for (let i = 0; i < 6 && node; i++) {
    console.log(
      i,
      node.tagName,
      String(node.className).slice(0, 60),
      '| sp-wrapper:',
      node.querySelectorAll('.sp-wrapper').length,
      '| headings inside:',
      node.querySelectorAll('h1,h2,h3,h4,h5,h6').length,
      '| text:',
      (node.textContent ?? '').trim().slice(0, 40)
    );
    node = node.nextElementSibling;
  }
}

main();
