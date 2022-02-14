import { defineConfig } from 'dumi';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import navs from './config/navs';

const commonLess = readFileSync(
  resolve(__dirname, './config/style.less'),
).toString();

export default defineConfig({
  title: '东颌子',
  mode: 'site',
  metas: [{ name: 'referrer', content: 'no-referrer' }],
  styles: [commonLess],
  navs,
  favicon: '/favicon.ico',
  logo: '/favicon.ico',
  // more config: https://d.umijs.org/config
});
