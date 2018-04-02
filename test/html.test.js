import { expect } from 'chai';
import { inspect } from 'util'
import html from '../src/nodes/html';

// const text = `xxxxxx</a href='miaooo.me' />xxxx`;
const text = `
<div>
  i am <a href="miaooo.me">guo zhi hao</a>
  <img src='xxxxx.com' />
  <!-- annotation -->
  <p a<a='a'>bbbbb</p>
  <div>
  <p>xxxxx</li>xx</p>
  <&^xsdfa>
</div>
`;

describe ('# html', function () {
  it ('should parse html string', function () {
    console.log(inspect(html(text), false, null));
  })
})
