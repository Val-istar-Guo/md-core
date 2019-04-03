# MD-CORE

[![version](https://img.shields.io/npm/v/md-core.svg?style=flat-square)](https://www.npmjs.com/package/md-core)
[![downloads](https://img.shields.io/npm/dm/md-core.svg?style=flat-square)](https://www.npmjs.com/package/md-core)


**This Package was deprecated. [Unified](https://github.com/unifiedjs/unified) is the better option. And you can use [rehype-prism](https://github.com/Val-istar-Guo/rehype-prism) to highlight code in markdown.**


## Install

```bash
npm install md-core
```

## Usage

md-core is just a core, need plugins to parse markdown

see more:
[md-plugins-vig](https://github.com/Val-istar-Guo/md-plugins-vig),
[md-highlight](https://github.com/Val-istar-Guo/md-plugins-highlight).


```javascript
// costom your md
// md.js
import md from 'md-core';
import { vigMdPlugins } from 'md-plugins-vig';
import highlightMdPlugins from 'md-plugins-highlight';


export default md()
  .use(vigMdPlugins())
  .use(highlightMdPlugins())
```

Then import your costom md

```javascript
import md from './md.js'

md.parse('# header').toHTML();
// -> <h1>header</h1>
```
