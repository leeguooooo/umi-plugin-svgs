import { resolve } from 'path';
import { defineConfig } from 'umi';

export default defineConfig({
  plugins: [resolve(__dirname, '../lib')],
  svgs: {
    entry: resolve(__dirname, './assets/svg'),
    alias: '@svgs',
  },
  npmClient: 'npm',
});
