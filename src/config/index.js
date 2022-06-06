/*
 * @Author: chenghao
 * @Date: 2022-06-05 16:21:10
 * @Last Modified by: chenghao
 * @Last Modified time: 2022-06-05 22:29:55
 */

import breaks from "@bytemd/plugin-breaks";
import highlight from "@bytemd/plugin-highlight";
import footnotes from "@bytemd/plugin-footnotes";
import frontmatter from "@bytemd/plugin-frontmatter";
import gfm from "@bytemd/plugin-gfm";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import gemoji from "@bytemd/plugin-gemoji";
import zhHans from "bytemd/lib/locales/zh_Hans.json";

export const getPlugins = () => [
  breaks(),
  highlight(),
  footnotes(),
  frontmatter(),
  gfm(),
  mediumZoom(),
  gemoji(),
];

export const locale = zhHans;

export const REPO_URL = `https://github.com/zhuiyue132/markdown-editor`;

export const REPO_NAME = `markdown-editor`;
