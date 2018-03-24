# MD-CORE


## Install

```bash
npm install md-core
```

## Usage

md-core is just a core, need plugins to parse markdown
see more: [md-plugins-vig](https://github.com/Val-istar-Guo/md-plugins-vig).

```javascript
// costom your md
// md.js
import md from 'md-core';
import {
  normalize, atxHeader, setextHeader,
  hr, list, blockquote, table, code, paragraph,
  hyperlink, image, autolink, escaped,
  inlineCode, inlineBold, inlineItalics,
  coseLineCode,
} from 'md-plugins-vig';


export default md({ debug : true })
  .use(normalize())
  .use(coseLineCode())
  .use(code())
  .use(atxHeader())
  .use(setextHeader())
  .use(hr())
  .use(list())
  .use(blockquote())
  .use(table())
  .use(paragraph())
  .use(inlineCode())
  .use(inlineBold())
  .use(inlineItalics())
  .use(hyperlink())
  .use(image())
  .use(autolink())
  .use(escaped())
```

Then import your costom md

```javascript
import md from './md.js'

md.parse('# header').toHTML();
// -> <h1>header</h1>
```
