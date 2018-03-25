import { expect } from 'chai';
import { inspect } from 'util'
import html from '../src/nodes/html';

// const text = `xxxxxx</a href='miaooo.me' />`;
// const text = `
// <div>
//   i am <a href="miaooo.me">guo zhi hao</a>
//   <img src='xxxxx.com' />
//   <p a<a='a'>bbbbb</p>
//   <div>
//   <p>xxxxx</li>xx</p>
//   <&^xsdfa>
// </div>
// `;

const text = `
xxxxx
<div>aaa</div>
bbb
<p>ccccc</p>
`;

describe ('# html', function () {
  it ('should parse html string', function () {
    // expect(html('<p>xxxxxx</p>')).to.equal('');
    console.log(inspect(html(text), false, null));
  })
})
