# umi-plugin-svgs

更简单的 `SVG` 图标使用方案。

## 启用方式

配置开启。

## 介绍

svg 图标放到指定配置的文件夹， 即可直接引用组件使用，并有智能提示。

## 配置

```ts
export default {
  svgs: {
    entry: resolve(__dirname, './assets/svg'),
    alias: '@svgs', // 选填，默认 @svgs
  },
};
```

`entry` 指定为 `SVG` 图片文件夹

## tsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "@svgs": ["src/.umi/plugin-svgs"]
    }
  }
}
```

## 使用方式

完成上述配置后，启动项目，将会在 `src/.umi` 生成 `plugin-svgs` 图标组件。

![](https://pic1.zhimg.com/v2-9c9a5698bc8fd9f0e02f389ab7714b53.png)

```js
import React from 'react';
import Icon from '@svgs';

export default () => {
  return (
    <div>
      <Icon className="icon" type="noData" />
    </div>
  );
};
```

## API

| 参数 | 说明 | type |
| --- | --- | --- |
| type | 图标类型(图标名称) | ZHSvgInterface(根据 `entry` 目录文件名自动生成，空格转驼峰。) |
| className | 图标类名 | string |
