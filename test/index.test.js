import { expect } from 'chai';
import md from '../src';

import {
  normalize, atxHeader, setextHeader,
  hr, list, blockquote, table, code, paragraph,
  hyperlink, image, autolink, escaped,
} from '../src/plugins';

const myMd = md()
  .use(normalize())
  .use(atxHeader())
  .use(setextHeader())
  .use(hr())
  .use(list())
  .use(blockquote())
  .use(table())
  .use(code())
  .use(paragraph())
  .use(hyperlink())
  .use(image())
  .use(autolink())
  .use(escaped());


describe('myMd', function () {
  it('', function () {
    console.log(myMd.parse('#aaaa').toHtml());
  });
});
