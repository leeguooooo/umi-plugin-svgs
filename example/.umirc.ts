import { resolve } from 'path';
import { defineConfig } from 'umi';

export default defineConfig({
  plugins: ['umi-plugin-svgs'],
  svgs: {
    entry: resolve(__dirname, './assets/svg'),
  },
});
