/*
 * @Author: chenghao
 * @Date: 2022-06-05 16:21:10
 * @Last Modified by: chenghao
 * @Last Modified time: 2022-06-23 19:01:49
 */

import breaks from '@bytemd/plugin-breaks';
import highlight from '@bytemd/plugin-highlight';
import footnotes from '@bytemd/plugin-footnotes';
import frontmatter from '@bytemd/plugin-frontmatter';
import gfm from '@bytemd/plugin-gfm';
import mediumZoom from '@bytemd/plugin-medium-zoom';
import gemoji from '@bytemd/plugin-gemoji';
import mermaid from '@bytemd/plugin-mermaid';
import zhHans from 'bytemd/locales/zh_Hans.json';
import gfm_zh from '@bytemd/plugin-gfm/locales/zh_Hans.json';
import mermaid_zh from '@bytemd/plugin-mermaid/locales/zh_Hans.json';
import math from '@bytemd/plugin-math';
import math_zh from '@bytemd/plugin-math/locales/zh_Hans.json';

export const getPlugins = () => [
  breaks(),
  highlight(),
  footnotes(),
  frontmatter(),
  gfm({
    locale: gfm_zh
  }),
  mediumZoom(),
  gemoji(),
  math({
    locale: math_zh,
    katexOptions: { output: 'html' }
  }),
  mermaid({
    locale: mermaid_zh
  })
];

export const locale = zhHans;

export const REPO_URL = `https://github.com/zhuiyue132/markdown-editor`;

export const REPO_NAME = `markdown-editor`;

export const CHEVERETO_KEY = `1e7580cb2cefcd195f214697fefe6cb3`;
export const CHEVERETO_URL = `https://picture.zhuiyue.vip:444/api/1/upload`;

export const articleColumns = [
  {
    label: `文章标题`
  }
];
